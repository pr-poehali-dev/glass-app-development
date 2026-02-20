import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const monthlyData = [
  { month: "Сен", value: 1200 },
  { month: "Окт", value: 1800 },
  { month: "Ноя", value: 1500 },
  { month: "Дек", value: 2100 },
  { month: "Янв", value: 1900 },
  { month: "Фев", value: 2400 },
];

const maxVal = Math.max(...monthlyData.map((d) => d.value));

const topProducts = [
  { name: "Панорамное остекление", count: 34, percent: 40 },
  { name: "Окна ПВХ (VEKA)", count: 28, percent: 33 },
  { name: "Алюминиевые двери", count: 12, percent: 14 },
  { name: "Зимние сады", count: 8, percent: 9 },
  { name: "Балконное остекление", count: 3, percent: 4 },
];

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Отчёты</h1>
          <p className="text-muted-foreground mt-1">Аналитика и статистика по проектам</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="FileSpreadsheet" size={18} className="mr-2" />
            Excel
          </Button>
          <Button variant="outline">
            <Icon name="FileText" size={18} className="mr-2" />
            PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Заказов за месяц</p>
            <p className="text-3xl font-bold mt-1">24</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <Icon name="TrendingUp" size={14} />
              +18% к прошлому
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Средний чек</p>
            <p className="text-3xl font-bold mt-1">98 500 ₽</p>
            <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
              <Icon name="TrendingUp" size={14} />
              +5% к прошлому
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Конверсия</p>
            <p className="text-3xl font-bold mt-1">67%</p>
            <p className="text-xs text-muted-foreground mt-1">из замера в заказ</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Выручка по месяцам (тыс. ₽)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-3 h-48 pt-4">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs font-medium text-muted-foreground">{d.value}</span>
                  <div
                    className="w-full bg-primary/20 rounded-t-md relative overflow-hidden transition-all"
                    style={{ height: `${(d.value / maxVal) * 140}px` }}
                  >
                    <div className="absolute inset-0 bg-primary rounded-t-md opacity-80" />
                  </div>
                  <span className="text-xs text-muted-foreground">{d.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Популярные продукты</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.name}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span>{product.name}</span>
                  <span className="text-muted-foreground">{product.count} шт. ({product.percent}%)</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${product.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
