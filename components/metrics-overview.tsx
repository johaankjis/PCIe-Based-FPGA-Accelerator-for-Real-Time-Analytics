import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Zap, Activity, TrendingUp } from "lucide-react"
import type { MetricsState } from "@/hooks/use-fpga-metrics"

interface MetricsOverviewProps {
  metrics: MetricsState
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const cards = [
    {
      title: "Current Latency",
      value: `${metrics.current.latency.toFixed(2)} µs`,
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Throughput",
      value: `${metrics.current.throughput.toFixed(0)} MB/s`,
      icon: Zap,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Current Jitter",
      value: `${metrics.current.jitter.toFixed(2)} µs`,
      icon: Activity,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    {
      title: "Speedup vs CPU",
      value: `${metrics.speedup.toFixed(1)}x`,
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            <div className={`rounded-lg p-2 ${card.bgColor}`}>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
