"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface JitterAnalysisProps {
  data: Array<{ time: string; jitter: number }>
}

export function JitterAnalysis({ data }: JitterAnalysisProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Jitter Analysis</CardTitle>
        <CardDescription>Latency variance for determinism validation</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            jitter: {
              label: "Jitter (µs)",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="jitter" fill="var(--color-jitter)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
