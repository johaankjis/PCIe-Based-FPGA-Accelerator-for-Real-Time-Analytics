import { Card, CardContent } from "@/components/ui/card"
import { Activity, Cpu, HardDrive } from "lucide-react"
import type { MetricsState } from "@/hooks/use-fpga-metrics"

interface SystemStatusProps {
  metrics: MetricsState
  isConnected: boolean
}

export function SystemStatus({ metrics, isConnected }: SystemStatusProps) {
  const statusItems = [
    {
      icon: Activity,
      label: "PCIe Link",
      status: metrics.current.pcieStatus,
      detail: "Gen3 x8",
    },
    {
      icon: HardDrive,
      label: "DMA Engine",
      status: metrics.current.dmaStatus,
      detail: `${metrics.dmaBandwidth.toFixed(1)} GB/s`,
    },
    {
      icon: Cpu,
      label: "Compute Cores",
      status: metrics.current.computeStatus,
      detail: `${metrics.config.activeCores}/8 Active`,
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {statusItems.map((item) => (
        <Card key={item.label}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={`rounded-lg p-3 ${item.status === "active" ? "bg-green-500/10" : "bg-muted"}`}>
              <item.icon
                className={`h-6 w-6 ${item.status === "active" ? "text-green-500" : "text-muted-foreground"}`}
              />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
              <p className="text-2xl font-bold">{item.detail}</p>
            </div>
            <div
              className={`h-3 w-3 rounded-full ${item.status === "active" ? "bg-green-500" : "bg-muted-foreground"}`}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
