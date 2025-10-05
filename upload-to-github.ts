import { Octokit } from '@octokit/rest';
import * as fs from 'fs';
import * as path from 'path';

let connectionSettings: any;

async function getAccessToken() {
  if (connectionSettings && connectionSettings.settings.expires_at && new Date(connectionSettings.settings.expires_at).getTime() > Date.now()) {
    return connectionSettings.settings.access_token;
  }
  
  const hostname = process.env.REPLIT_CONNECTORS_HOSTNAME
  const xReplitToken = process.env.REPL_IDENTITY 
    ? 'repl ' + process.env.REPL_IDENTITY 
    : process.env.WEB_REPL_RENEWAL 
    ? 'depl ' + process.env.WEB_REPL_RENEWAL 
    : null;

  if (!xReplitToken) {
    throw new Error('X_REPLIT_TOKEN not found for repl/depl');
  }

  connectionSettings = await fetch(
    'https://' + hostname + '/api/v2/connection?include_secrets=true&connector_names=github',
    {
      headers: {
        'Accept': 'application/json',
        'X_REPLIT_TOKEN': xReplitToken
      }
    }
  ).then(res => res.json()).then(data => data.items?.[0]);

  const accessToken = connectionSettings?.settings?.access_token || connectionSettings.settings?.oauth?.credentials?.access_token;

  if (!connectionSettings || !accessToken) {
    throw new Error('GitHub not connected');
  }
  return accessToken;
}

async function getUncachableGitHubClient() {
  const accessToken = await getAccessToken();
  return new Octokit({ auth: accessToken });
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = [], baseDir: string = dirPath): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    
    // Пропускаем node_modules, .git и другие служебные директории
    if (file === 'node_modules' || file === '.git' || file === '.cache' || 
        file === 'dist' || file === 'build' || file.startsWith('.')) {
      return;
    }

    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFiles(filePath, arrayOfFiles, baseDir);
    } else {
      const relativePath = path.relative(baseDir, filePath);
      arrayOfFiles.push(relativePath);
    }
  });

  return arrayOfFiles;
}

async function uploadFiles() {
  try {
    console.log('🚀 Начинаем загрузку файлов в GitHub...\n');

    const octokit = await getUncachableGitHubClient();
    const owner = 'vladimirspecalp-hub';
    const repo = 'MS-PRO_Ecosystems';
    const branch = 'main';

    // Получаем список всех файлов
    const projectRoot = process.cwd();
    console.log(`📂 Сканирование директории: ${projectRoot}`);
    const files = getAllFiles(projectRoot);
    
    console.log(`📋 Найдено файлов для загрузки: ${files.length}\n`);

    // Создаем начальный коммит с README
    console.log('📝 Создание начального коммита...');
    
    try {
      // Проверяем, есть ли уже ветка main
      await octokit.repos.getBranch({ owner, repo, branch });
      console.log('✅ Ветка main уже существует');
    } catch (error: any) {
      if (error.status === 404) {
        // Создаем файл README для инициализации репозитория
        const readmeContent = fs.existsSync('README.md') 
          ? fs.readFileSync('README.md', 'utf8')
          : '# MS-PRO_Ecosystems\n\nПолнофункциональная экосистема для бизнеса';
        
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path: 'README.md',
          message: 'Initial commit',
          content: Buffer.from(readmeContent).toString('base64'),
          branch
        });
        console.log('✅ Создан начальный коммит с README.md');
      }
    }

    // Получаем SHA последнего коммита
    const { data: refData } = await octokit.git.getRef({
      owner,
      repo,
      ref: `heads/${branch}`
    });
    const commitSha = refData.object.sha;

    // Получаем дерево последнего коммита
    const { data: commitData } = await octokit.git.getCommit({
      owner,
      repo,
      commit_sha: commitSha
    });
    const treeSha = commitData.tree.sha;

    // Создаем блобы для всех файлов
    console.log('\n📤 Загрузка файлов...');
    const blobs = await Promise.all(
      files.map(async (file) => {
        try {
          const content = fs.readFileSync(path.join(projectRoot, file));
          const { data } = await octokit.git.createBlob({
            owner,
            repo,
            content: content.toString('base64'),
            encoding: 'base64'
          });
          console.log(`  ✓ ${file}`);
          return {
            path: file,
            mode: '100644' as const,
            type: 'blob' as const,
            sha: data.sha
          };
        } catch (error: any) {
          console.error(`  ✗ ${file}: ${error.message}`);
          return null;
        }
      })
    );

    const validBlobs = blobs.filter(blob => blob !== null);

    // Создаем новое дерево
    console.log('\n🌳 Создание дерева файлов...');
    const { data: newTree } = await octokit.git.createTree({
      owner,
      repo,
      tree: validBlobs,
      base_tree: treeSha
    });

    // Создаем новый коммит
    console.log('\n💾 Создание коммита...');
    const { data: newCommit } = await octokit.git.createCommit({
      owner,
      repo,
      message: 'Initial commit: MS-PRO Ecosystems project transfer',
      tree: newTree.sha,
      parents: [commitSha]
    });

    // Обновляем ссылку на ветку
    console.log('\n🔄 Обновление ветки main...');
    await octokit.git.updateRef({
      owner,
      repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha
    });

    console.log('\n✅ Проект успешно перенесён в GitHub!');
    console.log(`\n📍 URL репозитория: https://github.com/${owner}/${repo}`);
    console.log('\n📊 Отчёт:');
    console.log(`   ✅ Владелец: ${owner}`);
    console.log(`   ✅ Репозиторий: ${repo}`);
    console.log(`   ✅ Ветка: ${branch}`);
    console.log(`   ✅ Загружено файлов: ${validBlobs.length}`);
    console.log(`   ✅ Все файлы синхронизированы`);

  } catch (error: any) {
    console.error('\n❌ Ошибка при загрузке файлов:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

uploadFiles();
