"""
Performance Profiling Script
Validates latency, jitter, and determinism requirements
"""

import time
import statistics
from typing import List, Dict
from fpga_controller import FPGAController, PerformanceMetrics


class PerformanceProfiler:
    """
    Profiler for FPGA accelerator performance validation
    Measures latency, jitter, and determinism
    """
    
    def __init__(self, controller: FPGAController):
        self.controller = controller
        self.results: List[PerformanceMetrics] = []
    
    def run_latency_test(self, iterations: int = 1000) -> Dict:
        """
        Run latency benchmark
        Target: <100µs average latency
        """
        print(f"\n[TEST] Running latency benchmark ({iterations} iterations)...")
        
        latencies = []
        for i in range(iterations):
            start = time.perf_counter()
            
            # Simulate data transfer and processing
            test_data = b"x" * 1024  # 1KB test payload
            self.controller.stream_data(test_data)
            
            elapsed = (time.perf_counter() - start) * 1e6  # Convert to µs
            latencies.append(elapsed)
            
            if (i + 1) % 100 == 0:
                print(f"  Progress: {i+1}/{iterations}")
        
        results = {
            "mean": statistics.mean(latencies),
            "median": statistics.median(latencies),
            "stdev": statistics.stdev(latencies),
            "min": min(latencies),
            "max": max(latencies),
            "p95": sorted(latencies)[int(len(latencies) * 0.95)],
            "p99": sorted(latencies)[int(len(latencies) * 0.99)],
        }
        
        print(f"\n[RESULTS] Latency Test:")
        print(f"  Mean:   {results['mean']:.2f} µs")
        print(f"  Median: {results['median']:.2f} µs")
        print(f"  StdDev: {results['stdev']:.2f} µs")
        print(f"  P95:    {results['p95']:.2f} µs")
        print(f"  P99:    {results['p99']:.2f} µs")
        print(f"  Range:  {results['min']:.2f} - {results['max']:.2f} µs")
        
        # Validate against target
        if results['mean'] < 100:
            print(f"  ✓ PASS: Mean latency < 100µs target")
        else:
            print(f"  ✗ FAIL: Mean latency exceeds 100µs target")
        
        return results
    
    def run_jitter_test(self, duration_seconds: int = 60) -> Dict:
        """
        Run jitter analysis
        Target: <10µs jitter for determinism
        """
        print(f"\n[TEST] Running jitter analysis ({duration_seconds}s)...")
        
        latencies = []
        start_time = time.time()
        
        while time.time() - start_time < duration_seconds:
            metrics = self.controller.read_metrics()
            latencies.append(metrics.latency_us)
            time.sleep(0.1)  # 10Hz sampling
        
        # Calculate jitter (variance in latency)
        jitter_values = []
        for i in range(1, len(latencies)):
            jitter = abs(latencies[i] - latencies[i-1])
            jitter_values.append(jitter)
        
        results = {
            "mean_jitter": statistics.mean(jitter_values),
            "max_jitter": max(jitter_values),
            "stdev_jitter": statistics.stdev(jitter_values),
        }
        
        print(f"\n[RESULTS] Jitter Test:")
        print(f"  Mean Jitter: {results['mean_jitter']:.2f} µs")
        print(f"  Max Jitter:  {results['max_jitter']:.2f} µs")
        print(f"  StdDev:      {results['stdev_jitter']:.2f} µs")
        
        # Validate against target
        if results['max_jitter'] < 10:
            print(f"  ✓ PASS: Max jitter < 10µs target")
        else:
            print(f"  ✗ FAIL: Max jitter exceeds 10µs target")
        
        return results
    
    def run_throughput_test(self, duration_seconds: int = 30) -> Dict:
        """
        Run throughput benchmark
        Measure sustained data processing rate
        """
        print(f"\n[TEST] Running throughput benchmark ({duration_seconds}s)...")
        
        throughputs = []
        start_time = time.time()
        
        while time.time() - start_time < duration_seconds:
            metrics = self.controller.read_metrics()
            throughputs.append(metrics.throughput_mbps)
            time.sleep(0.5)
        
        results = {
            "mean_throughput": statistics.mean(throughputs),
            "min_throughput": min(throughputs),
            "max_throughput": max(throughputs),
        }
        
        print(f"\n[RESULTS] Throughput Test:")
        print(f"  Mean: {results['mean_throughput']:.0f} MB/s")
        print(f"  Min:  {results['min_throughput']:.0f} MB/s")
        print(f"  Max:  {results['max_throughput']:.0f} MB/s")
        
        return results
    
    def run_full_validation(self) -> Dict:
        """Run complete validation suite"""
        print("=" * 70)
        print("FPGA ACCELERATOR PERFORMANCE VALIDATION")
        print("=" * 70)
        
        results = {
            "latency": self.run_latency_test(iterations=1000),
            "jitter": self.run_jitter_test(duration_seconds=30),
            "throughput": self.run_throughput_test(duration_seconds=30),
        }
        
        print("\n" + "=" * 70)
        print("VALIDATION COMPLETE")
        print("=" * 70)
        
        return results


def main():
    """Run performance profiling"""
    # Initialize FPGA controller
    controller = FPGAController()
    controller.connect()
    
    # Configure for optimal performance
    controller.update_config(
        active_cores=8,
        window_size=2048,
        data_rate=2000
    )
    
    # Run profiling
    profiler = PerformanceProfiler(controller)
    results = profiler.run_full_validation()
    
    # Cleanup
    controller.disconnect()
    
    return results


if __name__ == "__main__":
    main()
