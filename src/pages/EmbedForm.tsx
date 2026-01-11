import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

const EmbedForm = () => {
  const [step, setStep] = useState<'form' | 'approved'>('form');
  const [amount, setAmount] = useState(15000);
  const [days, setDays] = useState(14);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    passport: '',
  });
  const [applicationId] = useState('ZH-' + Math.random().toString(36).substr(2, 9).toUpperCase());

  const interestRate = 1.5;
  const totalAmount = Math.round(amount + (amount * interestRate * days / 100));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.passport) {
      setStep('approved');
    }
  };

  if (step === 'approved') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-lg w-full p-8 text-center border-2 border-green-200 animate-scale-in">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6">
            <Icon name="CheckCircle2" size={48} className="text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-green-600 mb-3">
            Заявка предварительно одобрена! 🎉
          </h2>
          
          <p className="text-lg text-muted-foreground mb-6">
            Ожидайте звонка нашего менеджера
          </p>
          
          <Card className="p-5 bg-green-50 border-green-200 mb-6 text-left">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-3 border-b border-green-200">
                <span className="text-sm font-semibold text-muted-foreground">Номер заявки</span>
                <span className="font-bold text-green-700">{applicationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Сумма займа:</span>
                <span className="font-semibold">{amount.toLocaleString('ru-RU')} ₽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Срок:</span>
                <span className="font-semibold">{days} дней</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">К возврату:</span>
                <span className="font-semibold text-orange-600">{totalAmount.toLocaleString('ru-RU')} ₽</span>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <Card className="p-4 bg-orange-50 border-orange-200 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">⏰</span>
                <div>
                  <p className="font-semibold text-sm mb-1">Менеджер свяжется с вами</p>
                  <p className="text-xs text-muted-foreground">В течение 15 минут для подтверждения данных</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-purple-50 border-purple-200 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <div>
                  <p className="font-semibold text-sm mb-1">Держите телефон рядом</p>
                  <p className="text-xs text-muted-foreground">Звонок поступит с номера: +7 (800) 555-35-35</p>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-4">
              <Icon name="Shield" size={16} className="text-green-600" />
              <span>Ваши данные защищены и конфиденциальны</span>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-lg w-full p-6 sm:p-8 animate-scale-in">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl mb-4 shadow-lg">
            <span className="text-3xl">🔥</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Заявка на займ
          </h1>
          <p className="text-muted-foreground">Быстрое одобрение за 15 минут</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Card className="p-4 bg-orange-50 border-orange-200">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚡</span>
              <div>
                <p className="font-semibold text-sm">Экспресс-одобрение</p>
                <p className="text-xs text-muted-foreground">Минимум документов, решение за 15 минут</p>
              </div>
            </div>
          </Card>

          <div className="space-y-5">
            <div>
              <Label className="text-base font-semibold mb-3 block">Сумма займа</Label>
              <div className="text-3xl font-bold text-orange-600 mb-3">{amount.toLocaleString('ru-RU')} ₽</div>
              <Slider 
                value={[amount]} 
                min={3000} 
                max={50000} 
                step={1000} 
                onValueChange={(val) => setAmount(val[0])} 
                className="mb-2" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>3 000 ₽</span>
                <span>50 000 ₽</span>
              </div>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Срок займа</Label>
              <div className="text-3xl font-bold text-purple-600 mb-3">{days} дней</div>
              <Slider 
                value={[days]} 
                min={7} 
                max={30} 
                step={1} 
                onValueChange={(val) => setDays(val[0])} 
                className="mb-2" 
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>7 дней</span>
                <span>30 дней</span>
              </div>
            </div>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">К возврату</p>
                  <p className="text-2xl font-bold text-purple-600">{totalAmount.toLocaleString('ru-RU')} ₽</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-1">Ставка</p>
                  <p className="text-lg font-semibold">{interestRate}% в день</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <Label htmlFor="fullName" className="text-base font-semibold">ФИО полностью *</Label>
              <Input 
                id="fullName" 
                placeholder="Иванов Иван Иванович" 
                value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} 
                className="mt-2 h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-base font-semibold">Номер телефона *</Label>
              <Input 
                id="phone" 
                type="tel" 
                placeholder="+7 (999) 123-45-67" 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                className="mt-2 h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="passport" className="text-base font-semibold">Серия и номер паспорта *</Label>
              <Input 
                id="passport" 
                placeholder="1234 567890" 
                value={formData.passport} 
                onChange={(e) => setFormData({ ...formData, passport: e.target.value })} 
                className="mt-2 h-12"
                required
              />
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            Отправить заявку
            <Icon name="Send" className="ml-2" />
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных
          </p>
        </form>
      </Card>
    </div>
  );
};

export default EmbedForm;
