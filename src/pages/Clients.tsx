import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  orders: number;
  total: string;
  lastOrder: string;
}

const initialClients: Client[] = [
  { id: 1, name: "Петров Алексей Владимирович", phone: "+7 (916) 123-45-67", email: "petrov@mail.ru", address: "Рублёвское ш., 24", orders: 3, total: "920 000 ₽", lastOrder: "19 фев" },
  { id: 2, name: "Сидорова Мария Константиновна", phone: "+7 (903) 987-65-43", email: "sidorova@gmail.com", address: "Барвиха, ул. Лесная, 8", orders: 1, total: "180 000 ₽", lastOrder: "18 фев" },
  { id: 3, name: "Козлов Игорь Петрович", phone: "+7 (926) 555-33-11", email: "kozlov@yandex.ru", address: "Жуковка, д. 15", orders: 5, total: "1 450 000 ₽", lastOrder: "17 фев" },
  { id: 4, name: "Морозова Елена Андреевна", phone: "+7 (915) 777-22-88", email: "morozova@mail.ru", address: "Горки-2, д. 7", orders: 2, total: "540 000 ₽", lastOrder: "16 фев" },
  { id: 5, name: "Волков Дмитрий Сергеевич", phone: "+7 (905) 444-11-99", email: "volkov@gmail.com", address: "Одинцово, ул. Центральная, 3", orders: 4, total: "2 100 000 ₽", lastOrder: "15 фев" },
];

export default function Clients() {
  const [search, setSearch] = useState("");
  const [clients] = useState<Client[]>(initialClients);

  const filtered = clients.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Клиенты</h1>
          <p className="text-muted-foreground mt-1">База заказчиков и контактов</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon name="UserPlus" size={18} className="mr-2" />
              Добавить клиента
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Новый клиент</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label>ФИО</Label>
                <Input placeholder="Иванов Иван Иванович" className="mt-1.5" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Телефон</Label>
                  <Input placeholder="+7 (___) ___-__-__" className="mt-1.5" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input placeholder="email@example.com" className="mt-1.5" />
                </div>
              </div>
              <div>
                <Label>Адрес</Label>
                <Input placeholder="Адрес объекта" className="mt-1.5" />
              </div>
              <Button className="w-full">Сохранить</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по имени, телефону, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-3">
        {filtered.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary font-semibold text-lg">
                    {client.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{client.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Phone" size={14} />
                      {client.phone}
                    </span>
                    <span className="hidden sm:flex items-center gap-1">
                      <Icon name="Mail" size={14} />
                      {client.email}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0 hidden md:block">
                  <p className="text-sm font-medium">{client.total}</p>
                  <p className="text-xs text-muted-foreground">{client.orders} заказов</p>
                </div>
                <Badge variant="outline" className="shrink-0 hidden sm:inline-flex">
                  {client.lastOrder}
                </Badge>
                <Icon name="ChevronRight" size={18} className="text-muted-foreground shrink-0" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-40" />
          <p>Клиенты не найдены</p>
        </div>
      )}
    </div>
  );
}
