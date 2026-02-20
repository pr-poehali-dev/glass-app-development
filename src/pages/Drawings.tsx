import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const drawings = [
  { id: 1, name: "Фасадное остекление — Вид спереди", project: "Коттедж, Рублёвка", type: "2D", format: "PDF", date: "19 фев", status: "Готов" },
  { id: 2, name: "Терраса — Разрез А-А", project: "Дом, Жуковка", type: "2D", format: "DWG", date: "18 фев", status: "Готов" },
  { id: 3, name: "Входная группа — 3D модель", project: "Дом, Барвиха", type: "3D", format: "PDF", date: "17 фев", status: "Черновик" },
  { id: 4, name: "Зимний сад — План сверху", project: "Дом, Горки-2", type: "2D", format: "PDF", date: "16 фев", status: "Готов" },
  { id: 5, name: "Балконное остекление — Развёртка", project: "Квартира, Одинцово", type: "2D", format: "DWG", date: "15 фев", status: "На проверке" },
];

const statusColors: Record<string, string> = {
  "Готов": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Черновик": "bg-gray-50 text-gray-600 border-gray-200",
  "На проверке": "bg-amber-50 text-amber-700 border-amber-200",
};

export default function Drawings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Чертежи</h1>
          <p className="text-muted-foreground mt-1">Автоматическая генерация и экспорт</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Icon name="Download" size={18} className="mr-2" />
            Экспорт
          </Button>
          <Button>
            <Icon name="FilePlus" size={18} className="mr-2" />
            Создать чертёж
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drawings.map((drawing) => (
          <Card key={drawing.id} className="hover:shadow-md transition-shadow cursor-pointer group">
            <CardContent className="p-0">
              <div className="aspect-[4/3] bg-muted rounded-t-lg flex items-center justify-center relative overflow-hidden">
                <svg width="160" height="120" viewBox="0 0 160 120" className="opacity-30">
                  <rect x="20" y="10" width="120" height="100" fill="none" stroke="#64748b" strokeWidth="2" />
                  <line x1="80" y1="10" x2="80" y2="110" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,2" />
                  <line x1="20" y1="60" x2="140" y2="60" stroke="#64748b" strokeWidth="1" strokeDasharray="4,2" />
                  <text x="80" y="130" textAnchor="middle" fontSize="8" fill="#94a3b8">1400 мм</text>
                </svg>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="sm" variant="secondary">
                    <Icon name="Eye" size={16} className="mr-1.5" />
                    Открыть
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2" variant="secondary">
                  {drawing.type}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-sm truncate">{drawing.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{drawing.project}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={statusColors[drawing.status]}>
                      {drawing.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{drawing.format}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{drawing.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
