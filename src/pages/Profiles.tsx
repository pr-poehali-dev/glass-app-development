import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

interface Profile {
  id: number;
  name: string;
  brand: string;
  chambers: number;
  depth: string;
  thermal: string;
  material: string;
  price: string;
  popular: boolean;
}

const profiles: Profile[] = [
  { id: 1, name: "Softline 82", brand: "VEKA", chambers: 7, depth: "82 мм", thermal: "0.67 Вт/м²К", material: "ПВХ", price: "от 4 200 ₽/м.п.", popular: true },
  { id: 2, name: "Euroline 60", brand: "VEKA", chambers: 3, depth: "60 мм", thermal: "1.8 Вт/м²К", material: "ПВХ", price: "от 2 800 ₽/м.п.", popular: false },
  { id: 3, name: "Softline 70", brand: "VEKA", chambers: 5, depth: "70 мм", thermal: "1.0 Вт/м²К", material: "ПВХ", price: "от 3 500 ₽/м.п.", popular: true },
  { id: 4, name: "Alphaline 90", brand: "VEKA", chambers: 6, depth: "90 мм", thermal: "0.62 Вт/м²К", material: "ПВХ", price: "от 5 100 ₽/м.п.", popular: false },
  { id: 5, name: "W62", brand: "ALU TECH", chambers: 0, depth: "62 мм", thermal: "2.4 Вт/м²К", material: "Алюминий", price: "от 6 500 ₽/м.п.", popular: true },
  { id: 6, name: "W72+", brand: "ALU TECH", chambers: 0, depth: "72 мм", thermal: "1.3 Вт/м²К", material: "Алюминий", price: "от 8 200 ₽/м.п.", popular: false },
  { id: 7, name: "C48", brand: "ALU TECH", chambers: 0, depth: "48 мм", thermal: "3.8 Вт/м²К", material: "Алюминий", price: "от 5 800 ₽/м.п.", popular: false },
  { id: 8, name: "ALT F50", brand: "ALU TECH", chambers: 0, depth: "50 мм", thermal: "5.0 Вт/м²К", material: "Алюминий", price: "от 4 900 ₽/м.п.", popular: true },
];

export default function Profiles() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const filtered = profiles.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
    if (tab === "all") return matchSearch;
    if (tab === "veka") return matchSearch && p.brand === "VEKA";
    if (tab === "alutech") return matchSearch && p.brand === "ALU TECH";
    return matchSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Профили</h1>
        <p className="text-muted-foreground mt-1">База профильных систем VEKA и ALU TECH</p>
      </div>

      <Tabs value={tab} onValueChange={setTab}>
        <div className="flex flex-col sm:flex-row gap-4">
          <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="veka">VEKA</TabsTrigger>
            <TabsTrigger value="alutech">ALU TECH</TabsTrigger>
          </TabsList>
          <div className="relative flex-1">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск профиля..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <TabsContent value={tab} className="mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((profile) => (
              <Card key={profile.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${profile.brand === "VEKA" ? "bg-blue-50" : "bg-slate-100"}`}>
                      <Icon name="Layers" size={22} className={profile.brand === "VEKA" ? "text-blue-600" : "text-slate-600"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{profile.brand} {profile.name}</h3>
                        {profile.popular && (
                          <Badge variant="secondary" className="text-xs bg-primary/10 text-primary border-0">
                            Популярный
                          </Badge>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Материал</span>
                          <span className="font-medium">{profile.material}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Глубина</span>
                          <span className="font-medium">{profile.depth}</span>
                        </div>
                        {profile.chambers > 0 && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Камеры</span>
                            <span className="font-medium">{profile.chambers}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Теплопровод.</span>
                          <span className="font-medium">{profile.thermal}</span>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t flex items-center justify-between">
                        <span className="font-bold text-primary">{profile.price}</span>
                        <button className="text-sm text-primary hover:underline flex items-center gap-1">
                          Подробнее
                          <Icon name="ArrowRight" size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Icon name="SearchX" size={48} className="mx-auto mb-3 opacity-40" />
          <p>Профили не найдены</p>
        </div>
      )}
    </div>
  );
}
