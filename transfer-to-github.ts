import { Octokit } from '@octokit/rest';
import { execSync } from 'child_process';
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

async function transferProject() {
  try {
    console.log('🚀 Начинаем перенос проекта в GitHub...\n');

    const octokit = await getUncachableGitHubClient();
    const owner = 'vladimirspecalp-hub';
    const repoName = 'MS-PRO_Ecosystems';

    // Проверяем, существует ли репозиторий
    let repoExists = false;
    try {
      await octokit.repos.get({ owner, repo: repoName });
      repoExists = true;
      console.log(`✅ Репозиторий ${owner}/${repoName} уже существует`);
    } catch (error: any) {
      if (error.status === 404) {
        console.log(`📝 Создаем новый репозиторий ${owner}/${repoName}...`);
        try {
          await octokit.repos.createForAuthenticatedUser({
            name: repoName,
            private: false,
            description: 'MS-PRO Ecosystems - Полнофункциональная экосистема для бизнеса',
            auto_init: false
          });
          console.log('✅ Репозиторий успешно создан');
        } catch (createError: any) {
          console.error('❌ Ошибка при создании репозитория:', createError.message);
          throw createError;
        }
      } else {
        throw error;
      }
    }

    // Получаем токен для Git операций
    const token = await getAccessToken();
    const repoUrl = `https://${token}@github.com/${owner}/${repoName}.git`;

    console.log('\n📦 Подготовка Git репозитория...');

    // Инициализируем Git, если еще не инициализирован
    try {
      execSync('git rev-parse --git-dir', { stdio: 'ignore' });
      console.log('✅ Git репозиторий уже инициализирован');
    } catch {
      console.log('🔧 Инициализация Git репозитория...');
      execSync('git init', { stdio: 'inherit' });
    }

    // Добавляем все файлы
    console.log('\n📁 Добавление файлов в индекс...');
    execSync('git add .', { stdio: 'inherit' });

    // Создаем коммит
    console.log('\n💾 Создание коммита...');
    try {
      execSync('git commit -m "Initial commit: MS-PRO Ecosystems project transfer"', { stdio: 'inherit' });
    } catch (error) {
      console.log('ℹ️  Нет изменений для коммита или коммит уже существует');
    }

    // Переименовываем ветку в main
    console.log('\n🌿 Переименование ветки в main...');
    try {
      execSync('git branch -M main', { stdio: 'inherit' });
    } catch (error) {
      console.log('ℹ️  Ветка main уже существует');
    }

    // Удаляем старый remote, если существует
    try {
      execSync('git remote remove origin', { stdio: 'ignore' });
    } catch {
      // Remote не существует, это нормально
    }

    // Добавляем новый remote
    console.log('\n🔗 Добавление удаленного репозитория...');
    execSync(`git remote add origin ${repoUrl}`, { stdio: 'inherit' });

    // Пушим в GitHub
    console.log('\n⬆️  Отправка файлов в GitHub...');
    execSync('git push -u origin main --force', { stdio: 'inherit' });

    console.log('\n✅ Проект успешно перенесён в GitHub!');
    console.log(`📍 URL репозитория: https://github.com/${owner}/${repoName}`);
    console.log('\n📊 Отчёт:');
    console.log(`   ✅ Владелец: ${owner}`);
    console.log(`   ✅ Репозиторий: ${repoName}`);
    console.log(`   ✅ Ветка: main`);
    console.log(`   ✅ Все файлы синхронизированы`);

  } catch (error: any) {
    console.error('\n❌ Ошибка при переносе проекта:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

transferProject();
