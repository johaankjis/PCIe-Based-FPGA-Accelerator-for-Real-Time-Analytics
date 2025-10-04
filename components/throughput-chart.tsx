"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ThroughputChartProps {
  data: Array<{ time: string; throughput: number }>
}

export function ThroughputChart({ data }: ThroughputChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Throughput Monitor</CardTitle>
        <CardDescription>Data processing rate (MB/s)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            throughput: {
              label: "Throughput (MB/s)",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="throughput"
                stroke="var(--color-throughput)"
                fill="var(--color-throughput)"
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
