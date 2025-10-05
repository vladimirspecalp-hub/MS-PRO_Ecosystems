import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Flame, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero
        subtitle="MS-PRO Ecosystems"
        title="Промышленные услуги высотных работ и защитных покрытий"
        description="Покраска дымовых труб, антикоррозионная защита и огнезащитное покрытие MSPRO Quad. Гарантия 20 лет. Работаем по всей России."
        primaryCta={{
          text: "Рассчитать стоимость",
          href: "/calculator",
        }}
        secondaryCta={{
          text: "Наши услуги",
          href: "#services",
        }}
      />

      <section id="services" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-services-heading">
              Наши услуги
            </h2>
            <p className="mt-4 text-lg text-muted-foreground" data-testid="text-services-description">
              Комплексные решения для промышленных объектов
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              title="Покраска дымовых труб"
              description="Высотные работы по покраске промышленных труб с использованием профессиональных материалов и оборудования."
              icon={Flame}
              href="/pokraska-dymovoj-truby"
            />
            <ServiceCard
              title="Антикоррозионная защита"
              description="Защита металлоконструкций от коррозии с гарантией до 20 лет. Современные технологии нанесения покрытий."
              icon={Shield}
              href="/antikorrozionnaya-zashchita"
            />
            <ServiceCard
              title="MSPRO Quad покрытие"
              description="Инновационное огнезащитное покрытие для промышленных объектов. Сертифицировано и протестировано."
              icon={Sparkles}
              href="/mspro-quad"
            />
          </div>
        </div>
      </section>

      <section className="bg-accent/10 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-cta-heading">
              Готовы начать проект?
            </h2>
            <div className="mt-10 flex items-center gap-x-6">
              <Link href="/calculator">
                <Button size="lg" data-testid="button-cta-calculator">
                  Рассчитать стоимость
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" size="lg" data-testid="button-cta-contact">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-why-heading">
              Почему выбирают нас
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground" data-testid="text-why-description">
              Мы предоставляем полный цикл услуг для промышленных объектов
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col" data-testid="feature-experience">
                <dt className="text-lg font-semibold leading-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-2xl font-bold text-primary">20+</span>
                  </div>
                  Лет опыта работы
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Более двух десятилетий успешной работы в сфере промышленных услуг
                  </p>
                </dd>
              </div>
              <div className="flex flex-col" data-testid="feature-guarantee">
                <dt className="text-lg font-semibold leading-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  Гарантия качества
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Официальная гарантия на все виды работ до 20 лет
                  </p>
                </dd>
              </div>
              <div className="flex flex-col" data-testid="feature-projects">
                <dt className="text-lg font-semibold leading-7">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <span className="text-2xl font-bold text-primary">500+</span>
                  </div>
                  Реализованных объектов
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">
                    Успешно завершенные проекты по всей России
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}
