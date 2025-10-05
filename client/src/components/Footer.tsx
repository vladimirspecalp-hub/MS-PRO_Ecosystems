import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4">MS-PRO Ecosystems</h3>
            <p className="text-sm text-muted-foreground">
              Промышленные услуги по покраске труб, антикоррозионной защите и огнезащитному покрытию MSPRO Quad. 20+ лет опыта.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Услуги</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/pokraska-dymovoj-truby">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-painting">
                    Покраска дымовых труб
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/antikorrozionnaya-zashchita">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-anticorrosion">
                    Антикоррозионная защита
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/mspro-quad">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-msproquad">
                    MSPRO Quad покрытие
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Компания</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-about">
                    О компании
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/calculator">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-calculator">
                    Калькулятор стоимости
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contacts">
                  <a className="text-muted-foreground hover:text-primary transition-colors" data-testid="footer-link-contacts">
                    Контакты
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">Контакты</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li data-testid="footer-phone">
                Тел: <a href="tel:+74951234567" className="hover:text-primary transition-colors">+7 (495) 123-45-67</a>
              </li>
              <li data-testid="footer-email">
                Email: <a href="mailto:info@ms-pro.ru" className="hover:text-primary transition-colors">info@ms-pro.ru</a>
              </li>
              <li data-testid="footer-address">
                Москва, Россия
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground" data-testid="footer-copyright">
            © {currentYear} MS-PRO Ecosystems. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}
