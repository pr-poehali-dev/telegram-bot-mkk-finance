import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

type Step = 'menu' | 'calculator' | 'application' | 'status';

const Index = () => {
  const [step, setStep] = useState<Step>('menu');
  const [amount, setAmount] = useState(15000);
  const [days, setDays] = useState(14);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    passport: '',
    amount: 15000,
    days: 14,
  });
  const [applicationId] = useState('ZH-' + Math.random().toString(36).substr(2, 9).toUpperCase());
  const { toast } = useToast();

  const interestRate = 1.5;
  const totalAmount = Math.round(amount + (amount * interestRate * days / 100));
  const dailyPayment = Math.round(totalAmount / days);

  const handleSubmit = () => {
    if (!formData.fullName || !formData.phone || !formData.passport) {
      toast({
        title: '⚠️ Заполните все поля',
        description: 'Пожалуйста, укажите все необходимые данные',
        variant: 'destructive',
      });
      return;
    }
    setStep('status');
    toast({
      title: '✅ Заявка принята!',
      description: `Номер заявки: ${applicationId}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mb-4 shadow-lg">
            <span className="text-4xl">🔥</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Жара Финансы
          </h1>
          <p className="text-muted-foreground text-lg">Экспресс-займы за 15 минут</p>
        </div>

        {step === 'menu' && (
          <div className="space-y-4 animate-scale-in">
            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-orange-200" onClick={() => setStep('calculator')}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  📊
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Калькулятор займа</h3>
                  <p className="text-sm text-muted-foreground">Рассчитайте сумму и срок займа</p>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground mt-2" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-purple-200" onClick={() => setStep('application')}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  📝
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Подать заявку</h3>
                  <p className="text-sm text-muted-foreground">Оформление займа онлайн</p>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground mt-2" />
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-orange-200" onClick={() => setStep('status')}>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">
                  ⚡
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-1">Статус заявки</h3>
                  <p className="text-sm text-muted-foreground">Проверить одобрение займа</p>
                </div>
                <Icon name="ChevronRight" className="text-muted-foreground mt-2" />
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-orange-500 to-purple-600 text-white border-0">
              <div className="flex items-start gap-4">
                <div className="text-3xl">💎</div>
                <div className="flex-1">
                  <Badge className="bg-white/20 text-white border-0 mb-2">Экспресс-займ</Badge>
                  <h3 className="font-bold text-xl mb-2">Одобрение за 15 минут</h3>
                  <ul className="space-y-1 text-sm opacity-90">
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} />
                      <span>Минимум документов</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} />
                      <span>Мгновенное решение</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="Check" size={16} />
                      <span>Деньги на карту сразу</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        )}

        {step === 'calculator' && (
          <div className="space-y-6 animate-scale-in">
            <Button variant="ghost" onClick={() => setStep('menu')} className="mb-4">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <h2 className="text-2xl font-bold">Калькулятор займа</h2>
              </div>

              <div className="space-y-8">
                <div>
                  <Label className="text-base font-semibold mb-4 block">Сумма займа</Label>
                  <div className="text-4xl font-bold text-orange-600 mb-4">{amount.toLocaleString('ru-RU')} ₽</div>
                  <Slider value={[amount]} min={3000} max={50000} step={1000} onValueChange={(val) => setAmount(val[0])} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>3 000 ₽</span>
                    <span>50 000 ₽</span>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-4 block">Срок займа</Label>
                  <div className="text-4xl font-bold text-purple-600 mb-4">{days} дней</div>
                  <Slider value={[days]} min={7} max={30} step={1} onValueChange={(val) => setDays(val[0])} className="mb-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>7 дней</span>
                    <span>30 дней</span>
                  </div>
                </div>

                <Card className="p-5 bg-gradient-to-r from-orange-50 to-purple-50 border-2 border-orange-200">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <span>💰</span>
                    Расчёт займа
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Сумма займа:</span>
                      <span className="font-semibold text-lg">{amount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Процентная ставка:</span>
                      <span className="font-semibold text-lg">{interestRate}% в день</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Срок:</span>
                      <span className="font-semibold text-lg">{days} дней</span>
                    </div>
                    <div className="border-t-2 border-orange-300 pt-3 mt-3 flex justify-between items-center">
                      <span className="font-bold text-lg">К возврату:</span>
                      <span className="font-bold text-2xl text-orange-600">{totalAmount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Ежедневный платёж:</span>
                      <span className="font-semibold text-purple-600">{dailyPayment.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  </div>
                </Card>

                <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700" onClick={() => {
                  setFormData({ ...formData, amount, days });
                  setStep('application');
                }}>
                  Оформить заявку
                  <Icon name="ArrowRight" className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {step === 'application' && (
          <div className="space-y-6 animate-scale-in">
            <Button variant="ghost" onClick={() => setStep('menu')} className="mb-4">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">
                  📝
                </div>
                <h2 className="text-2xl font-bold">Заявка на займ</h2>
              </div>

              <div className="space-y-6">
                <Card className="p-4 bg-orange-50 border-orange-200">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">⚡</span>
                    <div>
                      <p className="font-semibold text-sm">Экспресс-одобрение</p>
                      <p className="text-xs text-muted-foreground">Решение за 15 минут</p>
                    </div>
                  </div>
                </Card>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-semibold">ФИО полностью</Label>
                    <Input id="fullName" placeholder="Иванов Иван Иванович" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className="mt-2 h-12" />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base font-semibold">Номер телефона</Label>
                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="mt-2 h-12" />
                  </div>

                  <div>
                    <Label htmlFor="passport" className="text-base font-semibold">Серия и номер паспорта</Label>
                    <Input id="passport" placeholder="1234 567890" value={formData.passport} onChange={(e) => setFormData({ ...formData, passport: e.target.value })} className="mt-2 h-12" />
                  </div>

                  <Card className="p-4 bg-purple-50 border-purple-200">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <span>💰</span>
                      Условия займа
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Сумма:</span>
                        <span className="font-semibold">{formData.amount.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Срок:</span>
                        <span className="font-semibold">{formData.days} дней</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">К возврату:</span>
                        <span className="font-semibold text-purple-600">{Math.round(formData.amount + (formData.amount * interestRate * formData.days / 100)).toLocaleString('ru-RU')} ₽</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Button className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800" onClick={handleSubmit}>
                  Отправить заявку
                  <Icon name="Send" className="ml-2" />
                </Button>
              </div>
            </Card>
          </div>
        )}

        {step === 'status' && (
          <div className="space-y-6 animate-scale-in">
            <Button variant="ghost" onClick={() => setStep('menu')} className="mb-4">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Назад
            </Button>

            <Card className="p-6 border-2 border-orange-200">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full mb-4 animate-pulse">
                  <span className="text-4xl">⏳</span>
                </div>
                <h2 className="text-2xl font-bold mb-2">Заявка на рассмотрении</h2>
                <p className="text-muted-foreground">Мы обрабатываем вашу заявку</p>
              </div>

              <Card className="p-5 bg-orange-50 border-orange-200 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-semibold text-muted-foreground">Номер заявки</span>
                  <Badge className="bg-orange-600 text-white">{applicationId}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Сумма:</span>
                    <span className="font-semibold">{formData.amount.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Срок:</span>
                    <span className="font-semibold">{formData.days} дней</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Статус:</span>
                    <span className="font-semibold text-orange-600">Рассматривается</span>
                  </div>
                </div>
              </Card>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5">
                    <Icon name="Check" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Заявка получена</p>
                    <p className="text-xs text-muted-foreground">Ваша заявка принята в обработку</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 mt-0.5 animate-pulse">
                    <Icon name="Clock" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Проверка данных</p>
                    <p className="text-xs text-muted-foreground">Осталось ~10-12 минут</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 opacity-50">
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="FileCheck" size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">Решение по заявке</p>
                    <p className="text-xs text-muted-foreground">Ожидание</p>
                  </div>
                </div>
              </div>

              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💡</span>
                  <div>
                    <p className="font-semibold text-sm mb-1">Совет</p>
                    <p className="text-xs text-muted-foreground">Держите телефон под рукой. Мы можем позвонить для уточнения информации.</p>
                  </div>
                </div>
              </Card>
            </Card>

            <Button variant="outline" className="w-full h-12" onClick={() => {
              toast({
                title: '🔄 Обновлено',
                description: 'Статус заявки актуален',
              });
            }}>
              <Icon name="RefreshCw" size={20} className="mr-2" />
              Обновить статус
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
