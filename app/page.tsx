"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MetricsOverview } from "@/components/metrics-overview"
import { LatencyChart } from "@/components/latency-chart"
import { ThroughputChart } from "@/components/throughput-chart"
import { JitterAnalysis } from "@/components/jitter-analysis"
import { ControlPanel } from "@/components/control-panel"
import { SystemStatus } from "@/components/system-status"
import { PerformanceLogs } from "@/components/performance-logs"
import { useFPGAMetrics } from "@/hooks/use-fpga-metrics"

export default function Home() {
  const { metrics, isConnected, updateConfig } = useFPGAMetrics()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">FPGA Accelerator Control</h1>
              <p className="text-sm text-muted-foreground">PCIe-Based Real-Time Analytics Platform</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm font-medium">{isConnected ? "Connected" : "Disconnected"}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <div className="grid gap-6">
          {/* System Status Overview */}
          <SystemStatus metrics={metrics} isConnected={isConnected} />

          {/* Metrics Overview Cards */}
          <MetricsOverview metrics={metrics} />

          {/* Main Content Tabs */}
          <Tabs defaultValue="monitoring" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="monitoring">Real-Time Monitoring</TabsTrigger>
              <TabsTrigger value="control">Control Panel</TabsTrigger>
              <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
              <TabsTrigger value="logs">System Logs</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <LatencyChart data={metrics.latencyHistory} />
                <ThroughputChart data={metrics.throughputHistory} />
              </div>
              <JitterAnalysis data={metrics.jitterHistory} />
            </TabsContent>

            <TabsContent value="control" className="space-y-6">
              <ControlPanel config={metrics.config} onConfigUpdate={updateConfig} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Summary</CardTitle>
                    <CardDescription>Statistical analysis of FPGA performance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Avg Latency</p>
                        <p className="text-2xl font-bold">{metrics.avgLatency.toFixed(2)} µs</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">P99 Latency</p>
                        <p className="text-2xl font-bold">{metrics.p99Latency.toFixed(2)} µs</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Max Jitter</p>
                        <p className="text-2xl font-bold">{metrics.maxJitter.toFixed(2)} µs</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Speedup</p>
                        <p className="text-2xl font-bold">{metrics.speedup.toFixed(1)}x</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resource Utilization</CardTitle>
                    <CardDescription>FPGA resource usage statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compute Cores</span>
                          <span className="font-medium">{metrics.config.activeCores}/8</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all"
                            style={{ width: `${(metrics.config.activeCores / 8) * 100}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>DMA Bandwidth</span>
                          <span className="font-medium">{metrics.dmaBandwidth.toFixed(1)} GB/s</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-500 transition-all"
                            style={{ width: `${(metrics.dmaBandwidth / 16) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="logs" className="space-y-6">
              <PerformanceLogs logs={metrics.logs} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
