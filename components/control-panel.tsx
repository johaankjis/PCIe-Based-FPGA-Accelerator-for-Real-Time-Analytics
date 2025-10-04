"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Settings, Play, RotateCcw } from "lucide-react"
import type { FPGAConfig } from "@/hooks/use-fpga-metrics"
import { useState } from "react"

interface ControlPanelProps {
  config: FPGAConfig
  onConfigUpdate: (config: Partial<FPGAConfig>) => void
}

export function ControlPanel({ config, onConfigUpdate }: ControlPanelProps) {
  const [localConfig, setLocalConfig] = useState(config)

  const handleApply = () => {
    onConfigUpdate(localConfig)
  }

  const handleReset = () => {
    const defaultConfig: FPGAConfig = {
      windowSize: 1024,
      activeCores: 4,
      dataRate: 1000,
      filterThreshold: 100,
    }
    setLocalConfig(defaultConfig)
    onConfigUpdate(defaultConfig)
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Compute Configuration
          </CardTitle>
          <CardDescription>Adjust FPGA compute parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="cores">Active Cores</Label>
              <span className="text-sm font-medium">{localConfig.activeCores}</span>
            </div>
            <Slider
              id="cores"
              min={1}
              max={8}
              step={1}
              value={[localConfig.activeCores]}
              onValueChange={([value]) => setLocalConfig({ ...localConfig, activeCores: value })}
            />
            <p className="text-xs text-muted-foreground">Number of parallel compute cores to utilize</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="window">Window Size</Label>
              <span className="text-sm font-medium">{localConfig.windowSize}</span>
            </div>
            <Slider
              id="window"
              min={256}
              max={4096}
              step={256}
              value={[localConfig.windowSize]}
              onValueChange={([value]) => setLocalConfig({ ...localConfig, windowSize: value })}
            />
            <p className="text-xs text-muted-foreground">Aggregation window size in samples</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Flow Configuration</CardTitle>
          <CardDescription>Control data ingestion parameters</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="datarate">Data Rate (MB/s)</Label>
              <span className="text-sm font-medium">{localConfig.dataRate}</span>
            </div>
            <Slider
              id="datarate"
              min={100}
              max={2000}
              step={100}
              value={[localConfig.dataRate]}
              onValueChange={([value]) => setLocalConfig({ ...localConfig, dataRate: value })}
            />
            <p className="text-xs text-muted-foreground">DMA transfer rate from host to FPGA</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="threshold">Filter Threshold</Label>
            <Input
              id="threshold"
              type="number"
              value={localConfig.filterThreshold}
              onChange={(e) =>
                setLocalConfig({ ...localConfig, filterThreshold: Number.parseInt(e.target.value) || 0 })
              }
            />
            <p className="text-xs text-muted-foreground">Minimum value for data filtering</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button onClick={handleApply} className="flex-1">
              <Play className="mr-2 h-4 w-4" />
              Apply Changes
            </Button>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
