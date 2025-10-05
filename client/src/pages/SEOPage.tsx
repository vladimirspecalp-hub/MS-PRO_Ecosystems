import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight } from "lucide-react";
import seoData from "../../../content/seo_core.json";
import NotFound from "./not-found";

interface SEOEntry {
  slug: string;
  title: string;
  description: string;
  cta: string;
  serviceType?: string;
}

export default function SEOPage() {
  const [, params] = useRoute("/:slug");
  const [pageData, setPageData] = useState<SEOEntry | null>(null);

  useEffect(() => {
    if (params?.slug) {
      const data = seoData.find((entry) => entry.slug === params.slug);
      setPageData(data || null);
    }
  }, [params?.slug]);

  if (!pageData) {
    return <NotFound />;
  }

  const benefits = [
    "Профессиональное оборудование и материалы",
    "Опытные специалисты с допуском к высотным работам",
    "Гарантия качества до 20 лет",
    "Полный пакет документации",
    "Соблюдение всех норм безопасности",
    "Работаем по всей России",
  ];

  return (
    <div className="flex flex-col">
      <Hero
        subtitle="MS-PRO Ecosystems"
        title={pageData.title}
        description={pageData.description}
        primaryCta={{
          text: pageData.cta,
          href: "/calculator",
        }}
        secondaryCta={{
          text: "Связаться с нами",
          href: "/contacts",
        }}
      />

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-service-details-heading">
              Наши преимущества
            </h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`benefit-item-${index}`}>
                  <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-process-heading">
              Как мы работаем
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {[
                { step: "1", title: "Заявка", description: "Оставьте заявку на сайте или позвоните нам" },
                { step: "2", title: "Осмотр", description: "Выезд специалиста для оценки объема работ" },
                { step: "3", title: "Расчет", description: "Составление коммерческого предложения" },
                { step: "4", title: "Работы", description: "Выполнение работ в согласованные сроки" },
              ].map((item, index) => (
                <Card key={index} data-testid={`step-card-${index}`}>
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <span className="text-2xl font-bold text-primary">{item.step}</span>
                    </div>
                    <CardTitle className="text-lg">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-cta-section-heading">
              Готовы начать проект?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Рассчитайте стоимость работ или свяжитесь с нами для консультации
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 flex-wrap gap-y-4">
              <Link href="/calculator">
                <Button size="lg" data-testid="button-goto-calculator">
                  Рассчитать стоимость
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contacts">
                <Button variant="outline" size="lg" data-testid="button-goto-contacts">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
