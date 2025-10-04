"use client"

import { useState, useEffect, useCallback } from "react"

export interface FPGAConfig {
  windowSize: number
  activeCores: number
  dataRate: number
  filterThreshold: number
}

export interface FPGAMetrics {
  timestamp: number
  latency: number
  throughput: number
  jitter: number
  pcieStatus: "active" | "idle" | "error"
  dmaStatus: "active" | "idle" | "error"
  computeStatus: "active" | "idle" | "error"
}

export interface MetricsState {
  current: FPGAMetrics
  latencyHistory: Array<{ time: string; latency: number }>
  throughputHistory: Array<{ time: string; throughput: number }>
  jitterHistory: Array<{ time: string; jitter: number }>
  avgLatency: number
  p99Latency: number
  maxJitter: number
  speedup: number
  dmaBandwidth: number
  config: FPGAConfig
  logs: Array<{ timestamp: string; level: string; message: string }>
}

const MAX_HISTORY = 50

export function useFPGAMetrics() {
  const [isConnected, setIsConnected] = useState(true)
  const [metrics, setMetrics] = useState<MetricsState>({
    current: {
      timestamp: Date.now(),
      latency: 0,
      throughput: 0,
      jitter: 0,
      pcieStatus: "active",
      dmaStatus: "active",
      computeStatus: "active",
    },
    latencyHistory: [],
    throughputHistory: [],
    jitterHistory: [],
    avgLatency: 0,
    p99Latency: 0,
    maxJitter: 0,
    speedup: 0,
    dmaBandwidth: 0,
    config: {
      windowSize: 1024,
      activeCores: 4,
      dataRate: 1000,
      filterThreshold: 100,
    },
    logs: [],
  })

  const addLog = useCallback((level: string, message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setMetrics((prev) => ({
      ...prev,
      logs: [{ timestamp, level, message }, ...prev.logs].slice(0, 100),
    }))
  }, [])

  const updateConfig = useCallback(
    (newConfig: Partial<FPGAConfig>) => {
      setMetrics((prev) => ({
        ...prev,
        config: { ...prev.config, ...newConfig },
      }))
      addLog("info", `Configuration updated: ${JSON.stringify(newConfig)}`)
    },
    [addLog],
  )

  useEffect(() => {
    // Simulate real-time FPGA metrics
    const interval = setInterval(() => {
      const now = Date.now()
      const time = new Date().toLocaleTimeString()

      // Generate realistic metrics based on config
      const baseLatency = 50 + (8 - metrics.config.activeCores) * 10
      const latency = baseLatency + Math.random() * 20
      const throughput = metrics.config.activeCores * 250 + Math.random() * 100
      const jitter = Math.random() * 5

      const newMetric: FPGAMetrics = {
        timestamp: now,
        latency,
        throughput,
        jitter,
        pcieStatus: "active",
        dmaStatus: "active",
        computeStatus: "active",
      }

      setMetrics((prev) => {
        const newLatencyHistory = [...prev.latencyHistory, { time, latency }].slice(-MAX_HISTORY)
        const newThroughputHistory = [...prev.throughputHistory, { time, throughput }].slice(-MAX_HISTORY)
        const newJitterHistory = [...prev.jitterHistory, { time, jitter }].slice(-MAX_HISTORY)

        // Calculate statistics
        const latencies = newLatencyHistory.map((h) => h.latency)
        const avgLatency = latencies.reduce((a, b) => a + b, 0) / latencies.length
        const sortedLatencies = [...latencies].sort((a, b) => a - b)
        const p99Latency = sortedLatencies[Math.floor(sortedLatencies.length * 0.99)] || 0
        const maxJitter = Math.max(...newJitterHistory.map((h) => h.jitter))
        const speedup = 150 / avgLatency // Baseline 150µs CPU time
        const dmaBandwidth = (throughput / 1000) * 8 // Convert to GB/s

        return {
          current: newMetric,
          latencyHistory: newLatencyHistory,
          throughputHistory: newThroughputHistory,
          jitterHistory: newJitterHistory,
          avgLatency,
          p99Latency,
          maxJitter,
          speedup,
          dmaBandwidth,
          config: prev.config,
          logs: prev.logs,
        }
      })
    }, 1000)

    // Initial log
    addLog("info", "FPGA accelerator initialized successfully")
    addLog("info", "PCIe Gen3 x8 link established")
    addLog("info", "DMA engine ready")

    return () => clearInterval(interval)
  }, [metrics.config.activeCores, addLog])

  return { metrics, isConnected, updateConfig }
}
