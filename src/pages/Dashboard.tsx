import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const stats = [
  { label: "Активные заказы", value: "24", change: "+3 за неделю", icon: "ClipboardList", color: "bg-primary/10 text-primary" },
  { label: "Клиенты", value: "156", change: "+12 за месяц", icon: "Users", color: "bg-emerald-50 text-emerald-600" },
  { label: "Проекты", value: "38", change: "8 в работе", icon: "Building2", color: "bg-amber-50 text-amber-600" },
  { label: "Выручка", value: "2.4M ₽", change: "+18% к прошл.", icon: "TrendingUp", color: "bg-violet-50 text-violet-600" },
];

const recentOrders = [
  { id: "ORD-2401", client: "Петров А.В.", project: "Коттедж, Рублёвка", status: "В работе", amount: "340 000 ₽", date: "19 фев" },
  { id: "ORD-2400", client: "Сидорова М.К.", project: "Дом, Барвиха", status: "Новый", amount: "180 000 ₽", date: "18 фев" },
  { id: "ORD-2399", client: "Козлов И.П.", project: "Терраса, Жуковка", status: "Завершён", amount: "520 000 ₽", date: "17 фев" },
  { id: "ORD-2398", client: "Морозова Е.А.", project: "Веранда, Горки", status: "В работе", amount: "275 000 ₽", date: "16 фев" },
  { id: "ORD-2397", client: "Волков Д.С.", project: "Фасад, Одинцово", status: "Завершён", amount: "890 000 ₽", date: "15 фев" },
];

const statusColors: Record<string, string> = {
  "Новый": "bg-blue-50 text-blue-700 border-blue-200",
  "В работе": "bg-amber-50 text-amber-700 border-amber-200",
  "Завершён": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Dashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Добро пожаловать</h1>
        <p className="text-muted-foreground mt-1">Обзор текущей деятельности</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon name={stat.icon} size={20} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Последние заказы</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name="FileText" size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{order.client}</span>
                      <span className="text-xs text-muted-foreground">{order.id}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{order.project}</p>
                  </div>
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-sm font-medium">{order.amount}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <Badge variant="outline" className={`shrink-0 ${statusColors[order.status]}`}>
                    {order.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { icon: "Plus", label: "Новый заказ", desc: "Создать заказ на остекление" },
              { icon: "UserPlus", label: "Добавить клиента", desc: "Внести нового заказчика" },
              { icon: "Settings2", label: "Конфигуратор", desc: "Собрать конфигурацию" },
              { icon: "Camera", label: "Сканировать", desc: "Фото объекта или замеры" },
            ].map((action) => (
              <button
                key={action.label}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-left"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name={action.icon} size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{action.label}</p>
                  <p className="text-xs text-muted-foreground">{action.desc}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
