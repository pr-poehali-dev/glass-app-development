import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

export default function Configurator() {
  const [width, setWidth] = useState("1400");
  const [height, setHeight] = useState("1600");
  const [sections, setSections] = useState("2");

  const w = parseInt(width) || 1400;
  const h = parseInt(height) || 1600;
  const sectionCount = parseInt(sections) || 2;
  const maxDim = Math.max(w, h);
  const scale = 240 / maxDim;
  const svgW = w * scale;
  const svgH = h * scale;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold">Конфигуратор</h1>
        <p className="text-muted-foreground mt-1">Создание конфигураций окон и дверей</p>
      </div>

      <Tabs defaultValue="window" className="space-y-6">
        <TabsList>
          <TabsTrigger value="window" className="gap-2">
            <Icon name="Square" size={16} />
            Окно
          </TabsTrigger>
          <TabsTrigger value="door" className="gap-2">
            <Icon name="DoorOpen" size={16} />
            Дверь
          </TabsTrigger>
          <TabsTrigger value="facade" className="gap-2">
            <Icon name="Columns3" size={16} />
            Фасад
          </TabsTrigger>
        </TabsList>

        <TabsContent value="window" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Параметры изделия</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Ширина, мм</Label>
                    <Input value={width} onChange={(e) => setWidth(e.target.value)} className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Высота, мм</Label>
                    <Input value={height} onChange={(e) => setHeight(e.target.value)} className="mt-1.5" />
                  </div>
                </div>

                <div>
                  <Label>Количество секций</Label>
                  <Select value={sections} onValueChange={setSections}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 секция</SelectItem>
                      <SelectItem value="2">2 секции</SelectItem>
                      <SelectItem value="3">3 секции</SelectItem>
                      <SelectItem value="4">4 секции</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Профиль</Label>
                  <Select defaultValue="veka-softline">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="veka-softline">VEKA Softline 82</SelectItem>
                      <SelectItem value="veka-euroline">VEKA Euroline 60</SelectItem>
                      <SelectItem value="alutech-w62">ALU TECH W62</SelectItem>
                      <SelectItem value="alutech-w72">ALU TECH W72+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Тип открывания</Label>
                  <Select defaultValue="tilt-turn">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Глухое</SelectItem>
                      <SelectItem value="tilt-turn">Поворотно-откидное</SelectItem>
                      <SelectItem value="sliding">Раздвижное</SelectItem>
                      <SelectItem value="turn">Поворотное</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Стеклопакет</Label>
                  <Select defaultValue="double">
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single">Однокамерный</SelectItem>
                      <SelectItem value="double">Двухкамерный</SelectItem>
                      <SelectItem value="triple">Трёхкамерный</SelectItem>
                      <SelectItem value="energy">Энергосберегающий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Цвет профиля</Label>
                  <div className="flex gap-2 mt-2">
                    {[
                      { color: "bg-white border-2 border-gray-300", label: "Белый" },
                      { color: "bg-amber-800", label: "Дуб" },
                      { color: "bg-gray-700", label: "Антрацит" },
                      { color: "bg-amber-950", label: "Махагон" },
                      { color: "bg-stone-400", label: "Серый" },
                    ].map((c) => (
                      <button
                        key={c.label}
                        className={`w-8 h-8 rounded-full ${c.color} hover:ring-2 ring-primary ring-offset-2 transition-all`}
                        title={c.label}
                      />
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-2">
                  <Icon name="Save" size={18} className="mr-2" />
                  Сохранить конфигурацию
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Предпросмотр</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-xl p-6 flex items-center justify-center min-h-[320px]">
                  <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`}>
                    <rect x="0" y="0" width={svgW} height={svgH} fill="none" stroke="#64748b" strokeWidth="6" rx="2" />
                    <rect x="3" y="3" width={svgW - 6} height={svgH - 6} fill="#e0f2fe" stroke="#94a3b8" strokeWidth="1" />
                    {Array.from({ length: sectionCount - 1 }).map((_, i) => {
                      const x = ((i + 1) * svgW) / sectionCount;
                      return (
                        <line key={i} x1={x} y1="3" x2={x} y2={svgH - 3} stroke="#64748b" strokeWidth="4" />
                      );
                    })}
                    {sectionCount >= 2 && (
                      <>
                        <line
                          x1={svgW / sectionCount - 10}
                          y1={svgH / 2}
                          x2={svgW / sectionCount - 3}
                          y2={svgH / 2}
                          stroke="#475569"
                          strokeWidth="2"
                        />
                        <circle cx={svgW / sectionCount - 10} cy={svgH / 2} r="3" fill="#475569" />
                      </>
                    )}
                    <text x={svgW / 2} y={svgH + 20} textAnchor="middle" fontSize="11" fill="#64748b">
                      {width} мм
                    </text>
                    <text x={svgW + 20} y={svgH / 2} textAnchor="middle" fontSize="11" fill="#64748b" transform={`rotate(90, ${svgW + 20}, ${svgH / 2})`}>
                      {height} мм
                    </text>
                  </svg>
                </div>

                <div className="mt-4 p-4 bg-muted/50 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Профиль</span>
                    <span className="font-medium">VEKA Softline 82</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Размер</span>
                    <span className="font-medium">{width} × {height} мм</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Площадь</span>
                    <span className="font-medium">{((w * h) / 1_000_000).toFixed(2)} м²</span>
                  </div>
                  <div className="flex justify-between text-sm pt-2 border-t">
                    <span className="text-muted-foreground">Ориент. стоимость</span>
                    <span className="font-bold text-primary">
                      {(Math.round(((w * h) / 1_000_000) * 12000 / 100) * 100).toLocaleString("ru-RU")} ₽
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="door">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Icon name="DoorOpen" size={48} className="mx-auto mb-3 opacity-40" />
              <p>Конфигуратор дверей — в разработке</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="facade">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              <Icon name="Columns3" size={48} className="mx-auto mb-3 opacity-40" />
              <p>Конфигуратор фасадов — в разработке</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
