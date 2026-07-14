import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoUrl from '../assets/logos/logo.svg';

// Custom high-visibility SVG Icons
const CpuIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M9 9h6v6H9z" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const ServerIcon = () => (
  <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" />
    <line x1="6" y1="18" x2="6.01" y2="18" />
  </svg>
);

const LayersIcon = () => (
  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polygon points="2 17 12 22 22 17" />
    <polygon points="2 12 12 17 22 12" />
  </svg>
);

const ZapIcon = () => (
  <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function Products() {
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'future'>('all');

  const sdkRoadmap = [
    {
      name: 'NVIDIA CUDA',
      status: 'PLANNED',
      purpose: 'Accelerate custom compute workloads and enable efficient execution of AI operations directly on NVIDIA GPUs.',
      benefits: ['Parallel GPU computation', 'Reduced CPU bottlenecks', 'Higher throughput for AI workloads', 'Improved infrastructure efficiency']
    },
    {
      name: 'NVIDIA TENSORRT',
      status: 'PLANNED',
      purpose: 'Optimize trained AI models for production inference with low latency and high throughput.',
      benefits: ['FP16 and INT8 optimization', 'Faster inference execution', 'Improved GPU utilization', 'Lower operational costs']
    },
    {
      name: 'NVIDIA TRITON INFERENCE SERVER',
      status: 'PLANNED',
      purpose: 'Provide centralized, production-grade model serving across multiple AI frameworks.',
      benefits: ['Dynamic batching', 'Concurrent model execution', 'Multi-GPU scheduling', 'Simplified deployment pipeline']
    },
    {
      name: 'NVIDIA RAPIDS',
      status: 'PLANNED',
      purpose: 'Accelerate GPU-native data engineering and preprocessing pipelines before model training and inference.',
      benefits: ['Faster ETL workflows', 'GPU-accelerated DataFrames using cuDF', 'High-performance feature engineering', 'Reduced preprocessing time']
    },
    {
      name: 'NVIDIA NIM',
      status: 'FUTURE ROADMAP',
      purpose: 'Deploy standardized AI inference microservices for enterprise workloads.',
      benefits: ['Rapid deployment', 'Consistent runtime environments', 'Simplified scaling', 'Enterprise-ready AI infrastructure']
    }
  ];

  const filteredSdks = sdkRoadmap.filter(sdk => {
    if (activeTab === 'planned') return sdk.status === 'PLANNED';
    if (activeTab === 'future') return sdk.status === 'FUTURE ROADMAP';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500 selection:text-slate-900 overflow-x-hidden relative font-sans antialiased">
      
      {/* Heavy Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-950/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-cyan-950/20 rounded-full blur-[150px] pointer-events-none" />

      {/* Floating Navigation Header */}
      <header className="sticky top-4 z-50 max-w-7xl mx-auto px-4 md:px-8">
        <div className="bg-[#070c19]/95 backdrop-blur-md border border-slate-800 rounded-lg px-6 py-1 flex items-center justify-between shadow-2xl">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <img src={logoUrl} alt="VertexGrid" className="w-28 md:w-36 h-auto hover:opacity-80 transition-opacity" />
            </Link>
            <span className="text-[9px] md:text-[10px] uppercase tracking-widest bg-slate-900 text-cyan-400 px-2.5 py-1 rounded border border-slate-800 font-mono font-bold">
              INCEPTION PROFILE
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-xs font-bold uppercase tracking-wider text-slate-300">
            <a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a>
            <a href="#tech-stack" className="hover:text-cyan-400 transition-colors">Core Stack</a>
            <a href="#roadmap" className="hover:text-cyan-400 transition-colors">SDK Roadmap</a>
            <a href="#infrastructure" className="hover:text-cyan-400 transition-colors">Hardware</a>
          </nav>
          <div>
            <span className="text-xs font-mono font-black text-cyan-300 bg-cyan-950/80 border border-cyan-800/80 px-4 py-2 rounded shadow-[0_0_15px_rgba(34,211,238,0.15)]">
              VertexGrid.one
            </span>
          </div>
        </div>
      </header>

      {/* Section 1: Hero & Executive Overview */}
      <section id="overview" className="relative max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-blue-950/60 border border-blue-800/60 rounded px-3.5 py-1.5 text-xs text-blue-300 font-mono font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>NVIDIA INCEPTION PROGRAM // TECHNICAL APPLICATION PROFILE</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white leading-[1.1] uppercase">
              Enterprise AI Compute <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Without Complexity
              </span>
            </h1>

            <p className="text-base md:text-lg text-slate-200 font-medium leading-relaxed max-w-3xl">
              VertexGrid is an AI compute platform designed to provide scalable infrastructure for training, deploying, and managing modern artificial intelligence workloads. The platform enables developers and businesses to efficiently execute machine learning pipelines, inference services, and distributed AI applications through a unified cloud-native environment.
            </p>

            <p className="text-base text-slate-300 leading-relaxed max-w-3xl">
              Our architecture focuses on high-performance compute orchestration, intelligent workload scheduling, and efficient resource utilization for AI applications. As AI models continue to increase in size and computational complexity, GPU acceleration is a core requirement for reducing training time, improving inference performance, and supporting production-scale deployments.
            </p>

            <div className="pt-4 flex flex-wrap gap-3">
              <span className="bg-slate-900 border border-slate-800 text-slate-100 px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider">
                AI Compute Platform
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-100 px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider">
                GPU-Accelerated AI Infrastructure
              </span>
              <span className="bg-slate-900 border border-slate-800 text-slate-100 px-4 py-2 rounded text-xs font-mono font-bold uppercase tracking-wider">
                Distributed Model Execution
              </span>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-4">
              <a href="https://app.vertexgrid.one" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center space-x-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-8 py-3.5 rounded font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                <span>Explore Platform</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a href="/#contact" className="inline-flex items-center justify-center space-x-2 bg-slate-900 border-2 border-slate-700 hover:border-cyan-500 text-slate-100 hover:text-cyan-400 px-8 py-3.5 rounded font-bold uppercase tracking-wider transition-all duration-300">
                <span>Request a Demo</span>
              </a>
            </div>
          </div>

          {/* Right Column Interactive Node Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-square rounded-xl border border-slate-800 bg-[#060b16] p-8 relative overflow-hidden shadow-2xl shadow-cyan-950/20 group">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#33415512_1px,transparent_1px),linear-gradient(to_bottom,#33415512_1px,transparent_1px)] bg-[size:2rem_2rem]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-56 h-56 rounded border border-cyan-500/30 bg-slate-950/90 flex flex-col items-center justify-center p-6 relative group-hover:border-cyan-400 transition-colors duration-500 shadow-2xl">
                  <div className="absolute -top-3 left-4 bg-slate-900 border border-slate-700 px-3 py-0.5 text-[9px] font-mono font-bold text-cyan-400 rounded">
                    SYSTEM STATUS
                  </div>
                  <CpuIcon />
                  <span className="text-white font-mono font-bold text-base mt-4 tracking-wider uppercase">VertexGrid Core</span>
                  <span className="text-xs text-slate-300 font-mono mt-1 font-bold">READY FOR ACCELERATION</span>
                </div>
              </div>

              <div className="absolute inset-0 border-2 border-dashed border-slate-800/80 rounded-full animate-[spin_60s_linear_infinite] pointer-events-none m-8" />
              <div className="absolute inset-0 border border-cyan-500/10 rounded-full animate-[spin_20s_linear_infinite] pointer-events-none m-2" />
            </div>
          </div>

        </div>
      </section>

      {/* Stats Divider Bar */}
      <section className="border-y border-slate-800 bg-[#040813] py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="border-l-4 border-cyan-400 pl-4">
            <div className="text-3xl font-black text-white font-mono">H100 / A100</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Target Cloud Hardware</div>
          </div>
          <div className="border-l-4 border-blue-400 pl-4">
            <div className="text-3xl font-black text-white font-mono">MICROSERVICES</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Orchestration Layer</div>
          </div>
          <div className="border-l-4 border-emerald-400 pl-4">
            <div className="text-3xl font-black text-white font-mono">AWS EKS</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Core Deployments</div>
          </div>
          <div className="border-l-4 border-amber-500 pl-4">
            <div className="text-3xl font-black text-white font-mono">Q3 - Q4 2026</div>
            <div className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Roadmap Integration</div>
          </div>
        </div>
      </section>

      {/* Section 2: Production Core Technical Stack */}
      <section id="tech-stack" className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold mb-3">SYSTEM ARCHITECTURE</h2>
          <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">Production Core Technical Stack</p>
          <p className="text-slate-300 mt-4 text-base font-medium leading-relaxed">
            VertexGrid is engineered around a reliable microservices grid designed to orchestrate heavy, distributed workloads seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Core Development Stack */}
          <div className="bg-[#070b13] border border-slate-800 rounded-xl p-8 relative hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <LayersIcon />
              </div>
              <div>
                <h3 className="text-white text-lg font-black uppercase">Core Stack</h3>
                <p className="text-xs text-slate-400 font-mono font-bold">DEVELOPMENT FRAMEWORKS</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm font-semibold text-slate-200">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3" /> <span><strong>Python</strong> - AI Services & Orchestration</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3" /> <span><strong>PyTorch</strong> - Model Development & Training</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3" /> <span><strong>FastAPI</strong> - High-Performance APIs</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-cyan-400 mr-3" /> <span><strong>ONNX</strong> - Interoperable Model Deployment</span></li>
            </ul>
          </div>

          {/* Core Orchestration Stack */}
          <div className="bg-[#070b13] border border-slate-800 rounded-xl p-8 relative hover:border-slate-700 transition-colors">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <ServerIcon />
              </div>
              <div>
                <h3 className="text-white text-lg font-black uppercase">Infrastructure</h3>
                <p className="text-xs text-slate-400 font-mono font-bold">SYSTEM ORCHESTRATION</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm font-semibold text-slate-200">
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3" /> <span><strong>Docker</strong> - Containerized Deployments</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3" /> <span><strong>Kubernetes (EKS)</strong> - Core Cluster Orchestration</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3" /> <span><strong>PostgreSQL</strong> - Platform Metadata Store</span></li>
              <li className="flex items-center"><span className="w-2 h-2 rounded-full bg-blue-400 mr-3" /> <span><strong>Redis</strong> - Distributed Cache & Caching Systems</span></li>
            </ul>
          </div>

          {/* Current NVIDIA Integration Status */}
          <div className="bg-gradient-to-b from-[#070b13] to-[#040811] border border-cyan-900/40 rounded-xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center space-x-2.5 text-cyan-400 mb-5">
                <ZapIcon />
                <h3 className="text-white font-bold tracking-widest uppercase text-xs font-mono">CURRENT STATUS</h3>
              </div>
              <p className="text-[15px] text-slate-200 font-semibold leading-relaxed">
                VertexGrid is preparing its production infrastructure for <strong>NVIDIA GPU acceleration</strong>. While NVIDIA SDKs are not yet integrated into the production environment, our platform architecture has been designed to support NVIDIA's AI software ecosystem as we transition toward GPU-optimized deployments.
              </p>
            </div>
            <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between text-xs font-mono font-bold text-slate-300">
              <span>Next Step: SDK Roadmap Activation</span>
              <span className="text-cyan-400 animate-pulse">● PHASE ZERO ACTIVE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: NVIDIA SDK Integration Roadmap */}
      <section id="roadmap" className="bg-[#040814]/60 border-y border-slate-900 py-20 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold mb-3">INTEGRATION STRATEGY</h2>
              <p className="text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">NVIDIA SDK Integration Roadmap</p>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex bg-[#070b13] p-1.5 rounded border border-slate-800 font-mono text-xs font-bold">
              <button 
                onClick={() => setActiveTab('all')} 
                className={`px-4 py-2.5 rounded transition-all ${activeTab === 'all' ? 'bg-[#111827] text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:text-white'}`}
              >
                ALL MODULES
              </button>
              <button 
                onClick={() => setActiveTab('planned')} 
                className={`px-4 py-2.5 rounded transition-all ${activeTab === 'planned' ? 'bg-[#111827] text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:text-white'}`}
              >
                PLANNED
              </button>
              <button 
                onClick={() => setActiveTab('future')} 
                className={`px-4 py-2.5 rounded transition-all ${activeTab === 'future' ? 'bg-[#111827] text-cyan-400 border border-cyan-900/50' : 'text-slate-400 hover:text-white'}`}
              >
                FUTURE ROADMAP
              </button>
            </div>
          </div>

          {/* 2-Column Exact Layout from Screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredSdks.map((sdk, index) => (
              <div 
                key={index} 
                className="bg-[#070b13] border border-slate-800/80 rounded-xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-wide uppercase">
                      {sdk.name}
                    </h3>
                    <span className={`text-[10px] uppercase font-mono font-black tracking-widest px-3 py-1 rounded border-2 ${
                      sdk.status === 'PLANNED' 
                        ? 'bg-blue-950/40 text-blue-400 border-blue-900/60' 
                        : 'bg-amber-950/40 text-amber-400 border-amber-900/60'
                    }`}>
                      {sdk.status}
                    </span>
                  </div>
                  <p className="text-slate-200 text-[15px] font-semibold leading-relaxed mb-8">
                    {sdk.purpose}
                  </p>
                </div>
                
                <div className="border-t border-slate-800/80 pt-6">
                  <span className="text-[11px] uppercase font-mono font-black tracking-[0.15em] text-slate-400 block mb-4">
                    EXPECTED BENEFITS:
                  </span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {sdk.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-start text-sm font-bold text-slate-100 leading-relaxed">
                        <CheckCircleIcon />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Section 4: Compute & Hardware Justification (AWS Infrastructure) */}
      <section id="infrastructure" className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="bg-[#070b13] border border-slate-800 rounded-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono font-bold">COMPUTE CALCULATION</h2>
              <h3 className="text-3xl font-extrabold text-white tracking-tight uppercase">Compute & Hardware Justification</h3>
              
              <p className="text-slate-200 text-base md:text-lg font-semibold leading-relaxed">
                VertexGrid is designed to support computationally intensive AI workloads that require significant GPU resources for model training, inference, and distributed execution.
              </p>

              <div className="space-y-2 text-sm text-slate-300 font-semibold pl-4 border-l-2 border-slate-800">
                <p>• Large language model fine-tuning</p>
                <p>• Real-time computer vision inference</p>
                <p>• High-performance batch AI processing and dataset transformations</p>
                <p>• Distributed multi-GPU model serving and architecture validation</p>
              </div>

              <blockquote className="border-l-4 border-cyan-400 bg-slate-950 p-5 rounded text-sm md:text-base text-slate-100 font-mono font-semibold leading-relaxed">
                Access to AWS GPU credits through the NVIDIA Inception Program will accelerate platform development, infrastructure validation, and production deployment while enabling us to benchmark and optimize our AI compute platform using NVIDIA's latest GPU technologies.
              </blockquote>
            </div>

            {/* Target Hardware Blueprint Panels */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-950 border-2 border-slate-850 rounded p-6 hover:border-cyan-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-white font-mono uppercase">Amazon EC2 P5 Instances</span>
                  <span className="text-xs text-cyan-300 bg-cyan-950/80 border border-cyan-700/60 px-2.5 py-0.5 rounded font-mono font-bold">NVIDIA H100</span>
                </div>
                <p className="text-sm text-slate-300 font-bold leading-relaxed">
                  Utilizes advanced Transformer Engines, ultra high-bandwidth HBM3 internal system memory, and deep pipeline compute optimization steps.
                </p>
              </div>

              <div className="bg-slate-950 border-2 border-slate-850 rounded p-6 hover:border-blue-500/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-base font-black text-white font-mono uppercase">Amazon EC2 P4 Instances</span>
                  <span className="text-xs text-blue-300 bg-blue-950/80 border border-blue-700/60 px-2.5 py-0.5 rounded font-mono font-bold">NVIDIA A100</span>
                </div>
                <p className="text-sm text-slate-300 font-bold leading-relaxed">
                  Targeted for core model development, baseline parallel validation steps, and standard multi-GPU microservices arrays.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Section 5: Advanced Technology Roadmap Timeline (Q3–Q4) */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-16 border-t border-slate-900">
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight">Advanced Technology Roadmap (Q3–Q4)</h3>
          <p className="text-xs text-cyan-400 font-mono font-bold uppercase tracking-widest mt-2">Operational Milestones & Acceleration Pipeline</p>
        </div>

        <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-8">
          {[
            "Integrate NVIDIA CUDA for GPU-native compute acceleration",
            "Deploy TensorRT for optimized inference pipelines",
            "Implement NVIDIA Triton Inference Server for production model serving",
            "Integrate NVIDIA RAPIDS to accelerate AI data pipelines",
            "Evaluate NVIDIA NIM for enterprise AI microservices",
            "Benchmark distributed AI workloads on NVIDIA H100 Tensor Core GPUs",
            "Optimize Kubernetes-based GPU scheduling for scalable AI infrastructure"
          ].map((milestone, idx) => (
            <div key={idx} className="relative pl-6 group">
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[7px] top-2 w-3 h-3 rounded-full bg-slate-900 group-hover:bg-cyan-400 border-2 border-slate-800 transition-colors" />
              <div className="bg-[#070b13] border border-slate-800 rounded p-4 text-base font-bold text-slate-100 hover:border-slate-700 transition-colors leading-relaxed">
                <span className="text-xs text-cyan-400 font-mono font-bold mr-3">MILESTONE 0{idx + 1} //</span>
                {milestone}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Contrast Info Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-10 text-xs text-slate-400 font-mono font-bold">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© 2026 VertexGrid. All platform architectures prepared for NVIDIA Inception Application.</p>
          <div className="flex space-x-4 uppercase tracking-wider text-slate-400">
            <span className="hover:text-cyan-300 cursor-pointer">Security Systems</span>
            <span>•</span>
            <span className="hover:text-cyan-300 cursor-pointer">API Registries</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
