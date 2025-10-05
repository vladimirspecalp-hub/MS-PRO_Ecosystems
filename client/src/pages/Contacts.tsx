import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contacts() {
  const { toast } = useToast();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      serviceType: "",
      message: "",
      source: "contact-form",
    },
  });

  const createLeadMutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка",
        description: error.message || "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    createLeadMutation.mutate(data);
  };

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" data-testid="text-contacts-heading">
            Свяжитесь с нами
          </h1>
          <p className="mt-4 text-lg text-muted-foreground" data-testid="text-contacts-description">
            Оставьте заявку и наш менеджер свяжется с вами в течение часа
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Оставить заявку</CardTitle>
                <CardDescription>
                  Заполните форму и мы рассчитаем стоимость работ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Имя *</FormLabel>
                          <FormControl>
                            <Input placeholder="Ваше имя" {...field} data-testid="input-name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Телефон *</FormLabel>
                            <FormControl>
                              <Input placeholder="+7 (999) 123-45-67" {...field} data-testid="input-phone" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="email@example.com" {...field} data-testid="input-email" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="serviceType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Интересующая услуга *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-service-type">
                                <SelectValue placeholder="Выберите услугу" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="chimney-painting" data-testid="option-chimney-painting">
                                Покраска дымовых труб
                              </SelectItem>
                              <SelectItem value="anti-corrosion" data-testid="option-anti-corrosion">
                                Антикоррозионная защита
                              </SelectItem>
                              <SelectItem value="mspro-quad" data-testid="option-mspro-quad">
                                MSPRO Quad покрытие
                              </SelectItem>
                              <SelectItem value="other" data-testid="option-other">
                                Другое
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Сообщение</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Опишите ваш проект или задайте вопрос..."
                              className="min-h-32"
                              {...field}
                              data-testid="textarea-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={createLeadMutation.isPending}
                      data-testid="button-submit-lead"
                    >
                      {createLeadMutation.isPending ? "Отправка..." : "Отправить заявку"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Телефон
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+74951234567" className="text-lg font-semibold hover:text-primary transition-colors" data-testid="link-phone">
                  +7 (495) 123-45-67
                </a>
                <p className="mt-1 text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:info@ms-pro.ru" className="text-lg font-semibold hover:text-primary transition-colors" data-testid="link-email">
                  info@ms-pro.ru
                </a>
                <p className="mt-1 text-sm text-muted-foreground">Ответим в течение часа</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Адрес
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold" data-testid="text-address">Москва, Россия</p>
                <p className="mt-1 text-sm text-muted-foreground">Работаем по всей России</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
