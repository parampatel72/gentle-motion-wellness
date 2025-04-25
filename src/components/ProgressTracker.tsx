
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProgressStat {
  label: string;
  value: number;
  max: number;
  unit: string;
}

interface ProgressTrackerProps {
  title: string;
  stats: {
    daily: ProgressStat[];
    weekly: ProgressStat[];
    monthly: ProgressStat[];
  };
}

const ProgressTracker = ({ title, stats }: ProgressTrackerProps) => {
  return (
    <Card className="p-5">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      
      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>
        
        <TabsContent value="daily" className="space-y-5">
          {stats.daily.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </TabsContent>
        
        <TabsContent value="weekly" className="space-y-5">
          {stats.weekly.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-5">
          {stats.monthly.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </TabsContent>
      </Tabs>
    </Card>
  );
};

const StatItem = ({ stat }: { stat: ProgressStat }) => {
  const percentage = Math.min(Math.round((stat.value / stat.max) * 100), 100);
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{stat.label}</span>
        <span className="text-sm text-muted-foreground">
          {stat.value} / {stat.max} {stat.unit}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
};

export default ProgressTracker;
