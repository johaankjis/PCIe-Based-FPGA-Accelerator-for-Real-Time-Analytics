# PCIe-Based FPGA Accelerator for Real-Time Analytics

<div align="center">

![Project Banner](https://img.shields.io/badge/FPGA-Accelerator-blue?style=for-the-badge&logo=xilinx)
![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.x-3776ab?style=for-the-badge&logo=python)

**A high-performance FPGA accelerator system with real-time monitoring dashboard for low-latency data analytics**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [Documentation](#-documentation) • [Performance](#-performance)

</div>

---

## 📋 Overview

This project implements a **PCIe-Based FPGA Accelerator** for real-time data analytics with an interactive web-based monitoring dashboard. The system provides low-latency data processing with comprehensive performance monitoring and dynamic configuration capabilities.

The implementation includes:
- 🚀 **High-Performance Computing**: FPGA-accelerated data processing with configurable compute cores (1-8 cores)
- ⚡ **Ultra-Low Latency**: Target latency <100µs with deterministic performance
- 📊 **Real-Time Dashboard**: Live performance metrics, interactive charts, and system status monitoring
- 🎛️ **Dynamic Configuration**: Runtime adjustment of FPGA parameters through intuitive web interface
- 🔗 **PCIe Gen3 x8**: High-bandwidth communication (up to 16 GB/s bidirectional)
- 💾 **DMA Engine**: Direct Memory Access for efficient data transfer between host and FPGA

> **Note**: The current implementation operates in **simulation mode**, making it perfect for development, testing, and demonstration without physical FPGA hardware. It can be easily adapted for production deployment with actual FPGA devices.

---

## ✨ Features

### Hardware Acceleration
- **Configurable Compute Cores**: Scale from 1 to 8 parallel processing cores
- **PCIe Gen3 x8 Interface**: High-bandwidth host-FPGA communication
- **DMA Engine**: Zero-copy data transfers for maximum efficiency
- **Low-Latency Pipeline**: Optimized for real-time analytics (50-100µs typical)
- **Deterministic Performance**: Jitter control for real-time applications (<10µs target)

### Real-Time Monitoring Dashboard
- **Interactive Charts**: Live latency, throughput, and jitter visualization using Recharts
- **Performance Metrics**: Real-time KPIs including average/P99 latency, speedup, and bandwidth
- **System Status**: Component health monitoring (PCIe, DMA, Compute cores)
- **Event Logging**: Comprehensive system event logs with filtering
- **Dark/Light Themes**: Beautiful UI with theme switching support
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Configuration & Control
- **Runtime Reconfiguration**: Adjust FPGA parameters without restart
- **Parameter Validation**: Safe bounds checking for all configuration values
- **Visual Controls**: Intuitive sliders and inputs for parameter adjustment
- **Immediate Feedback**: See performance impact of configuration changes in real-time

### Performance Analysis
- **Latency Profiling**: Mean, median, P95, P99, min/max latency tracking
- **Jitter Analysis**: Determinism validation for real-time applications
- **Throughput Monitoring**: Sustained data rate measurement
- **Statistical Analysis**: Comprehensive performance statistics
- **Automated Testing**: Built-in performance validation suite

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ (for Next.js 15)
- **pnpm** 8+ (package manager)
- **Python** 3.8+ (for backend scripts)

### Installation

```bash
# Clone the repository
git clone https://github.com/johaankjis/PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics.git
cd PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The dashboard will be available at **http://localhost:3000**

### Python Backend Usage

```bash
# Run FPGA controller demo
python scripts/fpga_controller.py

# Run performance validation suite
python scripts/performance_profiler.py
```

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Web Dashboard (Next.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Metrics    │  │   Charts     │  │   Control    │  │
│  │   Overview   │  │   Display    │  │   Panel      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ HTTP/WebSocket (Future)
                          ▼
┌─────────────────────────────────────────────────────────┐
│         Python Controller (Backend)                      │
│  ┌──────────────────────────────────────────────────┐   │
│  │         FPGAController                           │   │
│  │  • Configuration Management                      │   │
│  │  • Metrics Collection                            │   │
│  │  • Data Flow Control                             │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                          │
                          │ PCIe Gen3 x8
                          ▼
┌─────────────────────────────────────────────────────────┐
│              FPGA Accelerator                            │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │   DMA    │→│  Compute  │→│   Result Buffer      │  │
│  │  Engine  │  │  Kernels  │  │                      │  │
│  └──────────┘  └──────────┘  └──────────────────────┘  │
│       ↑              ↑                    ↓              │
│       └──────────────┴────────────────────┘              │
│              Memory & Control Fabric                     │
└─────────────────────────────────────────────────────────┘
```

### Data Flow Pipeline

```
Host Application
     ↓
DMA Write (PCIe) → FPGA Memory Buffer
     ↓
Compute Kernels (Pipelined RTL Processing)
     ↓
Result Buffer → DMA Read (PCIe)
     ↓
Host Application
```

### Technology Stack

#### Frontend (Web Dashboard)
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19 with Server Components
- **Language**: TypeScript 5.x for type safety
- **Styling**: Tailwind CSS 4.1.9 with utility-first approach
- **Components**: Radix UI primitives (20+ accessible components)
- **Charts**: Recharts for data visualization
- **State Management**: React Hooks (useState, useEffect, useCallback)
- **Fonts**: Geist Sans & Geist Mono for modern typography

#### Backend (FPGA Control)
- **Language**: Python 3.x with type hints
- **Dependencies**: Standard library only (zero external dependencies)
- **Key Modules**:
  - `fpga_controller.py` - Main FPGA interface (207 lines)
  - `performance_profiler.py` - Validation suite (181 lines)

#### Build & Development
- **Package Manager**: pnpm for fast, efficient installs
- **Build Tool**: Next.js with Turbopack
- **Type Checking**: TypeScript compiler
- **Linting**: ESLint with Next.js config
- **CSS Processing**: PostCSS with Autoprefixer

---

## 📁 Project Structure

```
PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics/
├── app/                          # Next.js application
│   ├── page.tsx                  # Main dashboard page
│   ├── layout.tsx                # Root layout with providers
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── metrics-overview.tsx      # Performance KPI cards
│   ├── latency-chart.tsx         # Real-time latency visualization
│   ├── throughput-chart.tsx      # Throughput monitoring
│   ├── jitter-analysis.tsx       # Jitter analysis charts
│   ├── control-panel.tsx         # FPGA configuration controls
│   ├── system-status.tsx         # Component status indicators
│   ├── performance-logs.tsx      # Event log viewer
│   ├── theme-provider.tsx        # Dark/light theme support
│   └── ui/                       # Reusable UI primitives (56 files)
│
├── hooks/                        # React custom hooks
│   ├── use-fpga-metrics.ts       # Core state management (147 lines)
│   ├── use-mobile.ts             # Mobile device detection
│   └── use-toast.ts              # Toast notification system
│
├── scripts/                      # Python backend
│   ├── fpga_controller.py        # FPGA controller interface
│   └── performance_profiler.py   # Performance benchmarking
│
├── lib/                          # Utilities
│   └── utils.ts                  # Helper functions (cn, etc.)
│
├── public/                       # Static assets
│   └── *.png, *.svg, *.jpg       # Images and icons
│
├── styles/                       # Additional styles
│   └── globals.css               # Extended global styles
│
└── Configuration files
    ├── package.json              # Dependencies and scripts
    ├── tsconfig.json             # TypeScript configuration
    ├── next.config.mjs           # Next.js configuration
    ├── postcss.config.mjs        # PostCSS configuration
    ├── tailwind.config.ts        # Tailwind CSS theme
    └── components.json           # UI components config
```

---

## 🎯 Core Components

### 1. Web Dashboard (`app/page.tsx`)

The main dashboard provides a comprehensive view with:
- **Tabbed Interface**: Monitoring, Logs, and future sections
- **Metrics Overview**: 4 key performance indicator cards
- **Performance Charts**: Latency, throughput, and jitter visualization
- **Control Panel**: Runtime FPGA configuration
- **System Status**: Component health monitoring
- **Real-Time Updates**: 1Hz refresh rate for smooth animations

### 2. FPGA Metrics Hook (`hooks/use-fpga-metrics.ts`)

Central state management with:

```typescript
interface FPGAConfig {
  windowSize: number        // Aggregation window (256-4096)
  activeCores: number       // Active compute cores (1-8)
  dataRate: number          // DMA transfer rate (100-2000 MB/s)
  filterThreshold: number   // Data filtering threshold (10-500)
}

interface MetricsState {
  current: FPGAMetrics           // Latest metrics snapshot
  latencyHistory: Array<...>     // 50 historical samples
  throughputHistory: Array<...>  // 50 historical samples
  jitterHistory: Array<...>      // 50 historical samples
  avgLatency: number             // Rolling average
  p99Latency: number             // 99th percentile
  maxJitter: number              // Maximum observed jitter
  speedup: number                // Speedup vs CPU baseline
  dmaBandwidth: number           // DMA bandwidth (GB/s)
  config: FPGAConfig             // Current configuration
  logs: Array<...>               # System event logs (last 100)
}
```

### 3. Python FPGA Controller (`scripts/fpga_controller.py`)

```python
class FPGAController:
    """Main controller for FPGA accelerator"""
    
    def connect(self) -> bool:
        """Establish PCIe connection to FPGA"""
        
    def disconnect(self):
        """Safely disconnect from FPGA"""
        
    def update_config(self, **kwargs) -> bool:
        """Update FPGA configuration parameters"""
        
    def read_metrics(self) -> PerformanceMetrics:
        """Read current performance metrics from FPGA"""
        
    def stream_data(self, data: bytes) -> bytes:
        """Stream data for processing (DMA workflow)"""
        
    def get_statistics(self) -> Dict:
        """Calculate performance statistics"""
```

**Example Usage:**

```python
# Initialize and connect
controller = FPGAController()
controller.connect()

# Configure for maximum performance
controller.update_config(
    active_cores=8,
    window_size=2048,
    data_rate=2000
)

# Collect metrics
for i in range(10):
    metrics = controller.read_metrics()
    print(f"Latency: {metrics.latency_us:.2f}µs, "
          f"Throughput: {metrics.throughput_mbps:.0f}MB/s")

# Get statistics
stats = controller.get_statistics()
print(f"Average latency: {stats['avg_latency_us']:.2f}µs")
print(f"Speedup: {stats['speedup_vs_cpu']:.2f}x")

# Cleanup
controller.disconnect()
```

### 4. Performance Profiler (`scripts/performance_profiler.py`)

Comprehensive validation suite:

```python
profiler = PerformanceProfiler(controller)

# Run individual tests
latency_results = profiler.run_latency_test(iterations=1000)
jitter_results = profiler.run_jitter_test(duration_seconds=60)
throughput_results = profiler.run_throughput_test(duration_seconds=30)

# Or run full validation
all_results = profiler.run_full_validation()
```

**Test Metrics:**
- **Latency Test**: Mean, median, stdev, P95, P99, min/max (Target: <100µs)
- **Jitter Test**: Mean, max, stdev (Target: <10µs for determinism)
- **Throughput Test**: Mean, min, max sustained rate

---

## ⚙️ Configuration

### FPGA Configuration Parameters

| Parameter | Description | Range | Default | Unit |
|-----------|-------------|-------|---------|------|
| `windowSize` | Aggregation window size | 256-4096 | 1024 | samples |
| `activeCores` | Number of compute cores | 1-8 | 4 | cores |
| `dataRate` | DMA transfer rate | 100-2000 | 1000 | MB/s |
| `filterThreshold` | Data filtering threshold | 10-500 | 100 | units |

### Performance Impact

- **More Active Cores**: ↑ Throughput (~250 MB/s per core), ↓ Latency (~10µs per core)
- **Higher Data Rate**: ↑ Bandwidth utilization
- **Larger Window Size**: ↓ Update frequency, ↑ Data aggregation
- **Filter Threshold**: Controls data processing selectivity

### Configuration via Web UI

1. Navigate to the **Control Panel** tab in the dashboard
2. Adjust parameters using sliders or input fields
3. Click **Apply Changes** to update the configuration
4. Observe performance impact in real-time charts

### Configuration via Python API

```python
controller.update_config(
    window_size=2048,      # Increase window size
    active_cores=6,        # Enable 6 cores
    data_rate=1500,        # Set to 1500 MB/s
    filter_threshold=150   # Adjust threshold
)
```

---

## 📊 Performance

### Key Performance Indicators (KPIs)

#### Latency
- **Current**: Real-time latency measurement
- **Average**: Rolling average over 50 samples
- **P99**: 99th percentile (99% of samples below this value)
- **Target**: <100µs average
- **Typical Range**: 50-90µs (varies with core count)

#### Throughput
- **Current**: Real-time throughput
- **Scaling**: ~250 MB/s per active core
- **Maximum**: ~2000 MB/s (8 cores)
- **Typical Range**: 1000-2000 MB/s

#### Jitter
- **Current**: Latency variance
- **Maximum**: Peak jitter observed
- **Target**: <10µs (for deterministic performance)
- **Typical Range**: 0-5µs

#### Speedup
- **Baseline**: 150µs CPU processing time
- **Typical**: 1.5-3x speedup
- **Best Case**: Up to 5x with 8 cores

#### Resource Utilization
- **Compute Cores**: Active core count and percentage
- **DMA Bandwidth**: Real-time bandwidth in GB/s
- **PCIe Link**: Gen3 x8 status (up to 16 GB/s)

### Performance Scaling

| Cores | Latency | Throughput | Use Case |
|-------|---------|------------|----------|
| 1 | ~120µs | 250 MB/s | Low power mode |
| 2 | ~110µs | 500 MB/s | Balanced mode |
| 4 | ~90µs | 1000 MB/s | **Standard (default)** |
| 6 | ~70µs | 1500 MB/s | High performance |
| 8 | ~50µs | 2000 MB/s | Maximum performance |

### Validation Results

Example output from `performance_profiler.py`:

```
[RESULTS] Latency Test:
  Mean:   74.23 µs
  Median: 73.50 µs
  StdDev: 8.45 µs
  P95:    78.12 µs
  P99:    80.26 µs
  Range:  69.69 - 80.26 µs
  ✓ PASS: Mean latency < 100µs target

[RESULTS] Jitter Test:
  Mean Jitter: 2.34 µs
  Max Jitter:  4.25 µs
  StdDev:      1.12 µs
  ✓ PASS: Max jitter < 10µs target

[RESULTS] Throughput Test:
  Mean: 1502 MB/s
  Min:  1465 MB/s
  Max:  1548 MB/s
```

---

## 🎨 User Interface

### Dashboard Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Dark/Light Themes**: Seamless theme switching
- **Responsive Layout**: Mobile-first design that scales to desktop
- **Accessible**: WCAG AA compliant with Radix UI primitives
- **Interactive Charts**: Zoom, hover tooltips, real-time updates
- **Color-Coded Metrics**: Visual indicators for quick status assessment

### UI Components

The project uses a comprehensive UI component library:

- **Cards**: Container components for metrics and charts
- **Tabs**: Navigation between dashboard sections
- **Sliders**: Interactive parameter adjustment
- **Buttons**: Action triggers with variants
- **Badges**: Status indicators (active, idle, error)
- **ScrollArea**: Scrollable log viewer
- **Charts**: Recharts integration with custom theming

### Theme System

```typescript
// Supports dark and light modes
// Colors defined as CSS variables
// Automatic theme detection
// Manual theme toggle
```

---

## 🔧 Development

### Development Workflow

```bash
# Install dependencies
pnpm install

# Start development server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type check
pnpm type-check  # (if configured)
```

### Development Server

- **URL**: http://localhost:3000
- **Hot Reload**: Automatic updates on file changes
- **Fast Refresh**: Preserves component state
- **TypeScript**: Real-time type checking
- **ESLint**: Live linting feedback

### Python Development

```bash
# Run controller demo
python scripts/fpga_controller.py

# Run performance tests
python scripts/performance_profiler.py

# Interactive Python REPL
python
>>> from scripts.fpga_controller import FPGAController
>>> controller = FPGAController()
>>> controller.connect()
```

### Code Quality

- **TypeScript**: 100% TypeScript in frontend, zero `any` types
- **Type Hints**: Python 3.x type hints throughout
- **Linting**: ESLint with Next.js config
- **Formatting**: Consistent code style
- **Documentation**: Comprehensive inline comments and docstrings

---

## 🧪 Testing

### Current Testing

**Python Validation Suite:**
- Latency benchmark (1000 iterations)
- Jitter analysis (60 seconds sustained)
- Throughput measurement (30 seconds)
- Statistical validation with pass/fail criteria

**Manual Testing:**
- Visual inspection of dashboard
- Configuration parameter adjustment
- Theme switching (dark/light)
- Responsive design verification

### Recommended Testing Strategy

**Frontend Unit Tests** (recommended):
```typescript
// Using Jest + React Testing Library
describe('useFPGAMetrics', () => {
  it('should initialize with default config', () => {
    const { result } = renderHook(() => useFPGAMetrics())
    expect(result.current.metrics.config.activeCores).toBe(4)
  })
})
```

**Integration Tests** (recommended):
```typescript
// Using Playwright or Cypress
test('should update latency when cores changed', async () => {
  await page.goto('http://localhost:3000')
  // Test configuration updates
})
```

**Python Unit Tests** (recommended):
```python
import unittest

class TestFPGAController(unittest.TestCase):
    def test_metrics_generation(self):
        controller = FPGAController()
        controller.connect()
        metrics = controller.read_metrics()
        self.assertGreater(metrics.latency_us, 0)
```

---

## 🚢 Deployment

### Simulation Mode (Current)

The application currently runs in **simulation mode**:
- FPGA controller simulates hardware interactions
- Metrics generated algorithmically
- PCIe/DMA operations timing-simulated
- Perfect for development, testing, and demonstration

### Production Deployment

For production use with real FPGA hardware:

**1. Hardware Requirements:**
- FPGA board with PCIe Gen3 x8 interface (e.g., Xilinx Alveo U50/U280)
- Host system with available PCIe slot
- Compatible PCIe driver (XDMA for Xilinx)

**2. Software Integration:**
```python
# Replace simulation with actual driver calls
import pcie_driver

def connect(self) -> bool:
    self.device = pcie_driver.enumerate_devices()[0]
    self.device.initialize()
    return self.device.is_ready()

def read_metrics(self) -> PerformanceMetrics:
    # Read from FPGA status registers
    latency = self.device.read_register(LATENCY_REG)
    throughput = self.device.read_register(THROUGHPUT_REG)
    ...
```

**3. Deployment Options:**
- **Development**: Single board, local testing
- **Production**: Multi-board setup with load balancing
- **Cloud**: AWS F1 instances or Azure FPGA VMs

### Vercel Deployment (Web Only)

```bash
# Deploy to Vercel
vercel deploy

# Or use Vercel CLI
npm i -g vercel
vercel
```

---

## 🎯 Use Cases

### Target Applications

| Application Domain | Latency Req. | Throughput Req. | Jitter Req. | Suitability |
|-------------------|--------------|-----------------|-------------|-------------|
| **High-Frequency Trading** | <10µs | High | <1µs | ⭐⭐⭐☆☆ |
| **Network Packet Processing** | <100µs | Very High | <10µs | ⭐⭐⭐⭐⭐ |
| **Video Analytics** | <16ms | Medium | Moderate | ⭐⭐⭐⭐⭐ |
| **IoT Data Aggregation** | <1s | Medium | Low | ⭐⭐⭐⭐⭐ |
| **Scientific Computing** | Variable | Very High | Low | ⭐⭐⭐⭐☆ |
| **Signal Processing (DSP)** | <100µs | High | <10µs | ⭐⭐⭐⭐⭐ |
| **Real-Time Analytics** | <1ms | High | Moderate | ⭐⭐⭐⭐⭐ |

### Example Applications

1. **Financial Computing**: Low-latency trading systems with deterministic performance
2. **Network Processing**: High-speed packet filtering and deep packet inspection
3. **Video Processing**: Real-time video transcoding and analytics
4. **IoT Analytics**: Sensor data aggregation and real-time processing
5. **Scientific Computing**: Parallel data processing for research applications
6. **Signal Processing**: Digital signal processing (DSP) applications
7. **Machine Learning**: Inference acceleration for AI models

---

## 📚 Documentation

### Available Documentation

- **README.md** (this file): Main project documentation
- **CODEBASE_SUMMARY.md**: Comprehensive codebase overview (566 lines)
- **REPOSITORY_INSIGHTS.md**: Deep technical analysis (1199 lines)

### Key Documentation Sections

- **Architecture**: System design and data flow
- **Components**: Detailed component breakdown
- **API Reference**: Python and TypeScript interfaces
- **Configuration**: Parameter reference and tuning guide
- **Performance**: Benchmarking and optimization
- **Deployment**: Production setup guide

### Learning Resources

**For Beginners:**
1. Start with this README for overview
2. Run the development server and explore the UI
3. Execute Python scripts to understand backend
4. Read CODEBASE_SUMMARY.md for architecture details

**For Advanced Users:**
1. Review REPOSITORY_INSIGHTS.md for deep technical analysis
2. Study component implementations
3. Explore performance profiling results
4. Plan production hardware integration

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### High Priority
- [ ] Unit test coverage for React components
- [ ] Integration tests for Python backend
- [ ] Documentation improvements
- [ ] Bug fixes and issue resolution

### Medium Priority
- [ ] Additional chart types (heatmaps, histograms)
- [ ] Export functionality (CSV, JSON, PDF)
- [ ] Configuration presets/templates
- [ ] Performance optimizations

### Low Priority
- [ ] Theme customization options
- [ ] Internationalization (i18n)
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)

### Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics.git

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git commit -m "Add your feature"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request
```

---

## 🗺️ Roadmap

### Short-Term (1-3 months)
- [ ] WebSocket server for real-time push updates
- [ ] RESTful API for configuration management
- [ ] Database integration (TimescaleDB) for historical data
- [ ] Alert system for performance threshold violations
- [ ] Export metrics to CSV/JSON
- [ ] Unit test coverage >80%

### Mid-Term (3-6 months)
- [ ] Real FPGA hardware integration
- [ ] PCIe driver implementation
- [ ] DMA engine control
- [ ] Multi-FPGA support
- [ ] Load balancing across devices
- [ ] Kubernetes orchestration

### Long-Term (6-12 months)
- [ ] PCIe Gen4 support (2x bandwidth)
- [ ] HBM memory integration
- [ ] Machine learning for anomaly detection
- [ ] Cloud deployment (AWS F1, Azure FPGA)
- [ ] Multi-tenancy and RBAC
- [ ] Enterprise features (audit logging, compliance)

---

## ⚠️ Troubleshooting

### Common Issues

**High Latency:**
- ✅ Increase number of active cores
- ✅ Check DMA bandwidth utilization
- ✅ Verify PCIe link status

**Low Throughput:**
- ✅ Increase active cores configuration
- ✅ Raise data rate setting
- ✅ Check for system bottlenecks

**High Jitter:**
- ✅ Reduce system load
- ✅ Check for interference
- ✅ Optimize data flow pipeline

**Build Errors:**
- ✅ Ensure Node.js 18+ is installed
- ✅ Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- ✅ Check for TypeScript errors: `pnpm build`

**Dashboard Not Loading:**
- ✅ Verify port 3000 is available
- ✅ Check console for errors
- ✅ Try clearing browser cache

---

## 📄 License

This project is a demonstration/educational implementation of FPGA-accelerated computing with web-based monitoring.

---

## 🙏 Credits

### Technologies & Libraries
- **Framework**: [Next.js](https://nextjs.org/) by Vercel
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Design System**: Inspired by [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) library
- **Icons**: [Lucide Icons](https://lucide.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### Project Information
- **Version**: 0.1.0
- **Status**: Development/Simulation Mode
- **Last Updated**: 2024
- **Author**: [johaankjis](https://github.com/johaankjis)

---

## 📞 Support

For questions, issues, or contributions:
- **Issues**: [GitHub Issues](https://github.com/johaankjis/PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics/issues)
- **Discussions**: [GitHub Discussions](https://github.com/johaankjis/PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics/discussions)

---

<div align="center">

**⭐ Star this repository if you find it useful! ⭐**

Made with ❤️ for the FPGA and real-time analytics community

</div>
