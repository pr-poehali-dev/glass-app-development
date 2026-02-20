import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Icon from "@/components/ui/icon";

interface Project {
  id: number;
  name: string;
  client: string;
  address: string;
  status: string;
  progress: number;
  items: number;
  total: string;
  deadline: string;
}

const projects: Project[] = [
  { id: 1, name: "Панорамное остекление фасада", client: "Петров А.В.", address: "Рублёвское ш., 24", status: "В работе", progress: 65, items: 12, total: "340 000 ₽", deadline: "28 фев" },
  { id: 2, name: "Остекление террасы", client: "Козлов И.П.", address: "Жуковка, д. 15", status: "Замеры", progress: 20, items: 6, total: "520 000 ₽", deadline: "10 мар" },
  { id: 3, name: "Входная группа", client: "Сидорова М.К.", address: "Барвиха, ул. Лесная, 8", status: "Новый", progress: 0, items: 4, total: "180 000 ₽", deadline: "15 мар" },
  { id: 4, name: "Зимний сад", client: "Морозова Е.А.", address: "Горки-2, д. 7", status: "Производство", progress: 85, items: 18, total: "890 000 ₽", deadline: "22 фев" },
  { id: 5, name: "Остекление балкона и лоджии", client: "Волков Д.С.", address: "Одинцово, ул. Центральная, 3", status: "Завершён", progress: 100, items: 8, total: "275 000 ₽", deadline: "14 фев" },
];

const statusColors: Record<string, string> = {
  "Новый": "bg-blue-50 text-blue-700 border-blue-200",
  "Замеры": "bg-purple-50 text-purple-700 border-purple-200",
  "В работе": "bg-amber-50 text-amber-700 border-amber-200",
  "Производство": "bg-orange-50 text-orange-700 border-orange-200",
  "Завершён": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function Projects() {
  const [search, setSearch] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Проекты</h1>
          <p className="text-muted-foreground mt-1">Объекты остекления и их статусы</p>
        </div>
        <Button>
          <Icon name="FolderPlus" size={18} className="mr-2" />
          Новый проект
        </Button>
      </div>

      <div className="relative">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по названию или клиенту..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="grid gap-4">
        {filtered.map((project) => (
          <Card key={project.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Icon name="Building2" size={22} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-semibold">{project.name}</h3>
                      <p className="text-sm text-muted-foreground mt-0.5">{project.client} · {project.address}</p>
                    </div>
                    <Badge variant="outline" className={`shrink-0 ${statusColors[project.status]}`}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-sm mb-1.5">
                      <span className="text-muted-foreground">Прогресс</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Icon name="Package" size={14} />
                      {project.items} изделий
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Banknote" size={14} />
                      {project.total}
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      до {project.deadline}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
