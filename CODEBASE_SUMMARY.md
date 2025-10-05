# PCIe-Based FPGA Accelerator for Real-Time Analytics

## Project Overview

This project implements a **PCIe-Based FPGA Accelerator** for real-time data analytics with an interactive web-based monitoring dashboard. The system provides low-latency data processing with comprehensive performance monitoring and configuration capabilities.

### Key Features

- **High-Performance Computing**: FPGA-accelerated data processing with configurable compute cores
- **Low-Latency Design**: Target latency <100µs with deterministic performance
- **Real-Time Monitoring**: Live performance metrics, charts, and system status
- **Dynamic Configuration**: Runtime adjustment of FPGA parameters
- **PCIe Gen3 x8 Interface**: High-bandwidth communication between host and FPGA
- **DMA Engine**: Direct Memory Access for efficient data transfer

## Architecture

### System Components

```
┌─────────────────────────────────────────────────────────┐
│              Web Dashboard (Next.js)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Metrics    │  │   Charts     │  │   Control    │  │
│  │   Overview   │  │   Display    │  │   Panel      │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
                          │
                          │ WebSocket/HTTP
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

## Technology Stack

### Frontend (Web Dashboard)

- **Framework**: Next.js 15.2.4 (React 19)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Charts**: Recharts
- **State Management**: React Hooks
- **Fonts**: Geist Sans & Geist Mono

### Backend (FPGA Control)

- **Language**: Python 3.x
- **Purpose**: FPGA configuration and monitoring
- **Key Modules**:
  - `fpga_controller.py`: Main controller interface
  - `performance_profiler.py`: Performance validation and benchmarking

### Build & Development

- **Package Manager**: pnpm
- **Build Tool**: Next.js
- **Type Checking**: TypeScript 5.x
- **CSS Processing**: PostCSS, Autoprefixer

## Directory Structure

```
PCIe-Based-FPGA-Accelerator-for-Real-Time-Analytics/
├── app/                          # Next.js application pages
│   ├── page.tsx                  # Main dashboard page
│   ├── layout.tsx                # Root layout component
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── metrics-overview.tsx      # Performance metrics cards
│   ├── latency-chart.tsx         # Real-time latency visualization
│   ├── throughput-chart.tsx      # Throughput monitoring
│   ├── jitter-analysis.tsx       # Jitter analysis charts
│   ├── control-panel.tsx         # FPGA configuration controls
│   ├── system-status.tsx         # Component status indicators
│   ├── performance-logs.tsx      # Event log viewer
│   ├── theme-provider.tsx        # Theme context
│   └── ui/                       # Reusable UI components
│
├── hooks/                        # React custom hooks
│   ├── use-fpga-metrics.ts       # FPGA metrics state management
│   ├── use-mobile.ts             # Mobile device detection
│   └── use-toast.ts              # Toast notifications
│
├── scripts/                      # Python backend scripts
│   ├── fpga_controller.py        # FPGA controller interface
│   └── performance_profiler.py   # Performance benchmarking
│
├── lib/                          # Utility libraries
│   └── utils.ts                  # Helper functions
│
├── styles/                       # Additional stylesheets
│   └── globals.css               # Extended global styles
│
├── public/                       # Static assets
│   └── *.png, *.svg, *.jpg       # Images and icons
│
└── Configuration files
    ├── package.json              # Node.js dependencies
    ├── tsconfig.json             # TypeScript configuration
    ├── next.config.mjs           # Next.js configuration
    ├── postcss.config.mjs        # PostCSS configuration
    └── components.json           # UI components config
```

## Core Components

### 1. Web Dashboard (`app/page.tsx`)

The main dashboard provides a comprehensive view of FPGA accelerator performance:

- **Metrics Overview**: Real-time display of key performance indicators
- **Performance Charts**: 
  - Latency monitoring with historical data
  - Throughput visualization
  - Jitter analysis for determinism validation
- **Control Panel**: Runtime configuration of FPGA parameters
- **System Status**: Component health monitoring (PCIe, DMA, Compute)
- **Performance Logs**: Real-time event logging

**Key Features:**
- Tabbed interface for organized information display
- Real-time updates (1Hz refresh rate)
- Responsive design for mobile and desktop

### 2. FPGA Metrics Hook (`hooks/use-fpga-metrics.ts`)

Central state management for FPGA performance data:

```typescript
interface FPGAConfig {
  windowSize: number        // Aggregation window size
  activeCores: number       // Number of active compute cores (1-8)
  dataRate: number          // DMA transfer rate (MB/s)
  filterThreshold: number   // Data filtering threshold
}

interface MetricsState {
  current: FPGAMetrics           // Latest metrics
  latencyHistory: Array<...>     // Historical latency data
  throughputHistory: Array<...>  // Historical throughput data
  jitterHistory: Array<...>      // Historical jitter data
  avgLatency: number             // Average latency
  p99Latency: number             // 99th percentile latency
  maxJitter: number              // Maximum jitter observed
  speedup: number                // Speedup vs CPU baseline
  dmaBandwidth: number           // DMA bandwidth utilization
  config: FPGAConfig             // Current configuration
  logs: Array<...>               # System event logs
}
```

**Functionality:**
- Simulates real-time FPGA metrics generation
- Maintains rolling history (50 samples)
- Calculates statistical metrics (avg, p99, max)
- Provides configuration update interface
- Generates system logs

### 3. Python FPGA Controller (`scripts/fpga_controller.py`)

Python interface for FPGA management:

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
        """Read current performance metrics"""
        
    def stream_data(self, data: bytes) -> bytes:
        """Stream data for processing (DMA workflow)"""
        
    def get_statistics(self) -> Dict:
        """Calculate performance statistics"""
```

**Data Flow:**
1. **DMA Write**: Host → FPGA memory transfer
2. **Compute**: Pipelined RTL processing
3. **DMA Read**: FPGA → Host result transfer

**Configuration Parameters:**
- `window_size`: Aggregation window (default: 1024)
- `active_cores`: Number of compute cores (default: 4, max: 8)
- `data_rate`: Target data rate in MB/s (default: 1000)
- `filter_threshold`: Data filtering threshold (default: 100)

### 4. Performance Profiler (`scripts/performance_profiler.py`)

Comprehensive performance validation suite:

```python
class PerformanceProfiler:
    """Profiler for FPGA accelerator validation"""
    
    def run_latency_test(self, iterations=1000) -> Dict:
        """Latency benchmark - Target: <100µs average"""
        
    def run_jitter_test(self, duration_seconds=60) -> Dict:
        """Jitter analysis - Target: <10µs for determinism"""
        
    def run_throughput_test(self, duration_seconds=30) -> Dict:
        """Throughput benchmark - Sustained data rate"""
        
    def run_full_validation(self) -> Dict:
        """Complete validation suite"""
```

**Test Metrics:**
- **Latency**: Mean, median, stdev, min, max, P95, P99
- **Jitter**: Mean jitter, max jitter, stdev
- **Throughput**: Mean, min, max throughput

**Validation Targets:**
- Average latency < 100µs
- Maximum jitter < 10µs for determinism
- Sustained high throughput

## Performance Metrics

### Key Performance Indicators (KPIs)

1. **Latency**
   - Current latency (real-time)
   - Average latency
   - P99 latency (99th percentile)
   - Target: <100µs average

2. **Throughput**
   - Current throughput (MB/s)
   - Scales with active cores (250 MB/s per core)
   - Maximum: ~2000 MB/s (8 cores)

3. **Jitter**
   - Current jitter (latency variance)
   - Maximum jitter observed
   - Target: <10µs for deterministic performance

4. **Speedup**
   - FPGA vs CPU baseline comparison
   - Baseline: 150µs CPU processing time
   - Typical speedup: 1.5x - 3x

5. **Resource Utilization**
   - Active compute cores (1-8)
   - DMA bandwidth (GB/s)
   - PCIe link status

### System Status Components

- **PCIe Link**: Gen3 x8 connection status
- **DMA Engine**: Direct Memory Access engine status
- **Compute Cores**: Active core count and status

## UI Components

### Visualization Components

1. **MetricsOverview** (`components/metrics-overview.tsx`)
   - Grid of metric cards
   - Color-coded indicators
   - Icons for visual identification

2. **LatencyChart** (`components/latency-chart.tsx`)
   - Line chart for latency trends
   - Real-time updates
   - Historical view (50 samples)

3. **ThroughputChart** (`components/throughput-chart.tsx`)
   - Area chart for throughput visualization
   - Data processing rate display

4. **JitterAnalysis** (`components/jitter-analysis.tsx`)
   - Bar chart for jitter distribution
   - Determinism validation

5. **ControlPanel** (`components/control-panel.tsx`)
   - Sliders for parameter adjustment
   - Apply/Reset controls
   - Real-time configuration updates

6. **SystemStatus** (`components/system-status.tsx`)
   - Component status indicators
   - Health monitoring
   - Status badges

7. **PerformanceLogs** (`components/performance-logs.tsx`)
   - Scrollable log viewer
   - Color-coded log levels
   - Timestamp display

### UI Component Library

The project uses **Radix UI** primitives with custom styling:

- **Cards**: Container components for content sections
- **Tabs**: Navigation between dashboard views
- **Sliders**: Parameter adjustment controls
- **Buttons**: Action triggers
- **Badges**: Status indicators
- **ScrollArea**: Scrollable content regions
- **Charts**: Recharts integration for data visualization

## Data Flow

### Real-Time Metrics Pipeline

```
FPGA Hardware
     ↓
Status Registers
     ↓
Python Controller (read_metrics)
     ↓
Metrics State (React Hook)
     ↓
Dashboard Components
     ↓
User Interface
```

### Configuration Update Flow

```
User Input (Control Panel)
     ↓
React State Update
     ↓
updateConfig() callback
     ↓
Python Controller (update_config)
     ↓
FPGA Control Registers
     ↓
Hardware Reconfiguration
```

### Data Processing Pipeline

```
Host Application
     ↓
DMA Write (PCIe)
     ↓
FPGA Memory Buffer
     ↓
Compute Kernels (Pipelined RTL)
     ↓
Result Buffer
     ↓
DMA Read (PCIe)
     ↓
Host Application
```

## Configuration Options

### FPGA Configuration Parameters

| Parameter | Description | Range | Default | Unit |
|-----------|-------------|-------|---------|------|
| `windowSize` | Aggregation window size | 256-4096 | 1024 | samples |
| `activeCores` | Number of compute cores | 1-8 | 4 | cores |
| `dataRate` | DMA transfer rate | 100-2000 | 1000 | MB/s |
| `filterThreshold` | Data filtering threshold | 10-500 | 100 | units |

### Impact of Configuration

- **More Active Cores**: ↑ Throughput, ↓ Latency
- **Higher Data Rate**: ↑ Bandwidth utilization
- **Larger Window Size**: ↓ Update frequency, ↑ aggregation
- **Filter Threshold**: Controls data processing selectivity

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

### Python Scripts

```bash
# Run FPGA controller demo
python scripts/fpga_controller.py

# Run performance profiler
python scripts/performance_profiler.py
```

### Development Server

- Local URL: `http://localhost:3000`
- Hot reload enabled
- TypeScript type checking
- Real-time linting

## Key Technologies & Libraries

### Frontend Dependencies

- **UI Framework**: Next.js 15, React 19
- **UI Components**: @radix-ui/* (20+ components)
- **Charts**: recharts
- **Forms**: react-hook-form, zod
- **Styling**: tailwindcss, class-variance-authority
- **Icons**: lucide-react
- **Theming**: next-themes
- **Analytics**: @vercel/analytics

### Design System

- **Color System**: CSS variables with dark/light mode
- **Typography**: Geist Sans & Geist Mono fonts
- **Spacing**: Tailwind spacing scale
- **Components**: shadcn/ui inspired design system
- **Animations**: tailwindcss-animate

## Performance Characteristics

### Expected Performance

- **Latency**: 50-90µs typical (varies with core count)
- **Throughput**: 1000-2000 MB/s (depends on active cores)
- **Jitter**: 0-5µs typical, <10µs target
- **Speedup**: 1.5-3x vs CPU baseline (150µs)
- **PCIe Bandwidth**: Up to 16 GB/s (Gen3 x8)

### Scalability

- **Compute Cores**: Linear scaling up to 8 cores
- **Data Rate**: Configurable up to 2000 MB/s
- **History Buffer**: 50 samples for real-time display
- **Log Buffer**: 100 entries

## Simulation Mode

**Note**: The current implementation operates in **simulation mode**:

- FPGA controller simulates hardware interactions
- Metrics are generated algorithmically
- PCIe/DMA operations are timing-simulated
- Designed for demonstration and testing

**Production Implementation Would Include**:
- Actual PCIe driver integration
- Real DMA engine control
- Hardware-specific RTL kernels
- Physical FPGA device communication

## Use Cases

1. **Real-Time Analytics**: High-frequency data processing
2. **Financial Computing**: Low-latency trading systems
3. **Network Processing**: Packet filtering and analysis
4. **Scientific Computing**: Parallel data processing
5. **IoT Analytics**: Sensor data aggregation
6. **Video Processing**: Real-time video analytics
7. **Signal Processing**: DSP applications

## Future Enhancements

### Potential Improvements

- [ ] WebSocket integration for live updates
- [ ] Historical data persistence (database)
- [ ] Alert/notification system
- [ ] Advanced filtering and data analysis
- [ ] Multi-FPGA support
- [ ] Export metrics to CSV/JSON
- [ ] Performance comparison tools
- [ ] Automated testing framework
- [ ] Hardware integration (production FPGA)
- [ ] Advanced visualization options

### Hardware Roadmap

- [ ] PCIe Gen4 support (doubled bandwidth)
- [ ] Multi-board configurations
- [ ] HBM memory integration
- [ ] Advanced power management
- [ ] Thermal monitoring
- [ ] Failover and redundancy

## Troubleshooting

### Common Issues

1. **High Latency**
   - Increase active cores
   - Check DMA bandwidth utilization
   - Verify PCIe link status

2. **Low Throughput**
   - Increase active cores
   - Raise data rate configuration
   - Check system bottlenecks

3. **High Jitter**
   - Reduce system load
   - Check for interference
   - Optimize data flow

## License

This project is a demonstration/educational implementation of FPGA-accelerated computing with web-based monitoring.

## Credits

- **Framework**: Next.js by Vercel
- **UI Components**: Radix UI
- **Design System**: Inspired by shadcn/ui
- **Charts**: Recharts library
- **Icons**: Lucide Icons

---

**Last Updated**: 2024
**Version**: 0.1.0
**Status**: Development/Simulation Mode
