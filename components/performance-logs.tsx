import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface PerformanceLogsProps {
  logs: Array<{ timestamp: string; level: string; message: string }>
}

export function PerformanceLogs({ logs }: PerformanceLogsProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "destructive"
      case "warning":
        return "secondary"
      case "info":
        return "default"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>System Logs</CardTitle>
        <CardDescription>Real-time FPGA accelerator events and diagnostics</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
          <div className="space-y-2">
            {logs.length === 0 ? (
              <p className="text-sm text-muted-foreground">No logs available</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 text-sm font-mono">
                  <span className="text-muted-foreground shrink-0">{log.timestamp}</span>
                  <Badge variant={getLevelColor(log.level)} className="shrink-0">
                    {log.level}
                  </Badge>
                  <span className="text-foreground">{log.message}</span>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
