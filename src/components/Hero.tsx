import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Cpu, Zap, Activity, Box, Server, Globe } from 'lucide-react';

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const isoX = (x: number, y: number) => (x - y) * 0.866;
    const isoY = (x: number, y: number, z: number) => (x + y) * 0.5 - z;

    let time = 0;

    // Generate random brain nodes
    const brainNodes: {x: number, y: number, z: number, offset: number}[] = [];
    for(let i=0; i<60; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const r = 60 + Math.random() * 20;
      brainNodes.push({
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        offset: Math.random() * Math.PI * 2
      });
    }

    const drawSimulation = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.015;

      const cx = width * 0.7;
      const cy = height * 0.65;

      // 1. Draw glowing floor grid
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.1)';
      ctx.lineWidth = 1;
      const gridCells = 20;
      const cellSize = 40;
      ctx.beginPath();
      for (let i = -gridCells; i <= gridCells; i++) {
        const x1 = -gridCells * cellSize, y1 = i * cellSize;
        const x2 = gridCells * cellSize, y2 = i * cellSize;
        ctx.moveTo(cx + isoX(x1, y1), cy + isoY(x1, y1, -20));
        ctx.lineTo(cx + isoX(x2, y2), cy + isoY(x2, y2, -20));
        
        const x3 = i * cellSize, y3 = -gridCells * cellSize;
        const x4 = i * cellSize, y4 = gridCells * cellSize;
        ctx.moveTo(cx + isoX(x3, y3), cy + isoY(x3, y3, -20));
        ctx.lineTo(cx + isoX(x4, y4), cy + isoY(x4, y4, -20));
      }
      ctx.stroke();

      // Floor highlight
      const floorGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 400);
      floorGrad.addColorStop(0, 'rgba(14, 165, 233, 0.15)');
      floorGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.moveTo(cx + isoX(-400, -400), cy + isoY(-400, -400, -20));
      ctx.lineTo(cx + isoX(400, -400), cy + isoY(400, -400, -20));
      ctx.lineTo(cx + isoX(400, 400), cy + isoY(400, 400, -20));
      ctx.lineTo(cx + isoX(-400, 400), cy + isoY(-400, 400, -20));
      ctx.fill();

      // 2. Draw outer server racks
      const drawRack = (rx: number, ry: number, rz: number, size: number) => {
        const h = size * 0.5;
        const w = size * 0.866;
        const px = cx + isoX(rx, ry);
        const py = cy + isoY(rx, ry, 0);

        // Top
        ctx.beginPath();
        ctx.moveTo(px, py - rz - h);
        ctx.lineTo(px + w, py - rz);
        ctx.lineTo(px, py - rz + h);
        ctx.lineTo(px - w, py - rz);
        ctx.closePath();
        ctx.fillStyle = '#0f172a';
        ctx.fill();
        ctx.strokeStyle = '#0ea5e9';
        ctx.stroke();

        // Left
        ctx.beginPath();
        ctx.moveTo(px - w, py - rz);
        ctx.lineTo(px, py - rz + h);
        ctx.lineTo(px, py + h);
        ctx.lineTo(px - w, py);
        ctx.closePath();
        ctx.fillStyle = '#020617';
        ctx.fill();
        ctx.stroke();

        // Right
        ctx.beginPath();
        ctx.moveTo(px, py - rz + h);
        ctx.lineTo(px + w, py - rz);
        ctx.lineTo(px + w, py);
        ctx.lineTo(px, py + h);
        ctx.closePath();
        ctx.fillStyle = '#09090b';
        ctx.fill();
        ctx.stroke();
        
        // Rack details (lights)
        ctx.fillStyle = 'rgba(14, 165, 233, 0.8)';
        for(let i=1; i<4; i++) {
           ctx.beginPath();
           ctx.arc(px - w * 0.5, py - rz + (rz/4)*i, 1.5, 0, Math.PI*2);
           ctx.fill();
           ctx.beginPath();
           ctx.arc(px + w * 0.5, py - rz + (rz/4)*i, 1.5, 0, Math.PI*2);
           ctx.fill();
        }
      };

      // Draw ring of racks
      const rackPositions = [
        [-120, -120], [0, -120], [120, -120],
        [-120, 0],               [120, 0],
        [-120, 120],  [0, 120],  [120, 120]
      ];
      
      rackPositions.forEach(([rx, ry]) => {
         drawRack(rx, ry, 60, 40);
      });

      // 3. Draw Central Core
      const coreSize = 120;
      const coreZ = 100;
      const ch = coreSize * 0.5;
      const cw = coreSize * 0.866;
      
      // Core Base
      ctx.beginPath();
      ctx.moveTo(cx, cy - coreZ - ch);
      ctx.lineTo(cx + cw, cy - coreZ);
      ctx.lineTo(cx, cy - coreZ + ch);
      ctx.lineTo(cx - cw, cy - coreZ);
      ctx.closePath();
      ctx.fillStyle = '#002855';
      ctx.fill();
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Core Left
      ctx.beginPath();
      ctx.moveTo(cx - cw, cy - coreZ);
      ctx.lineTo(cx, cy - coreZ + ch);
      ctx.lineTo(cx, cy + ch);
      ctx.lineTo(cx - cw, cy);
      ctx.closePath();
      ctx.fillStyle = '#001a33';
      ctx.fill();
      ctx.stroke();

      // Core Right
      ctx.beginPath();
      ctx.moveTo(cx, cy - coreZ + ch);
      ctx.lineTo(cx + cw, cy - coreZ);
      ctx.lineTo(cx + cw, cy);
      ctx.lineTo(cx, cy + ch);
      ctx.closePath();
      ctx.fillStyle = '#001122';
      ctx.fill();
      ctx.stroke();

      // Core glowing accents
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx - cw, cy - coreZ + 20);
      ctx.lineTo(cx, cy - coreZ + ch + 20);
      ctx.lineTo(cx + cw, cy - coreZ + 20);
      ctx.stroke();

      // Core Text (Simulated on left face using shear/transform)
      ctx.save();
      ctx.translate(cx - cw/2, cy - coreZ/2);
      ctx.transform(0.866, 0.5, 0, 1, 0, 0);
      ctx.fillStyle = 'rgba(255,255,255,0.9)';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText("VERTEXGRID", -40, -10);
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(14, 165, 233, 0.8)';
      ctx.fillText("AI COMPUTE ENGINE", -40, 5);
      ctx.restore();

      // 4. Draw Brain / Network Sphere above core
      const brainZ = coreZ + 120 + Math.sin(time*3) * 10;
      
      // Brain Glow
      const brainGrad = ctx.createRadialGradient(cx, cy - brainZ, 0, cx, cy - brainZ, 120);
      brainGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      brainGrad.addColorStop(0.4, 'rgba(14, 165, 233, 0.1)');
      brainGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = brainGrad;
      ctx.beginPath();
      ctx.arc(cx, cy - brainZ, 120, 0, Math.PI*2);
      ctx.fill();

      // Brain Lines & Nodes
      ctx.lineWidth = 1;
      brainNodes.forEach((node, i) => {
         const nx = cx + isoX(node.x, node.y);
         const ny = cy + isoY(node.x, node.y, brainZ + node.z) + Math.sin(time + node.offset) * 5;
         
         ctx.fillStyle = '#bae6fd';
         ctx.beginPath();
         ctx.arc(nx, ny, 2, 0, Math.PI*2);
         ctx.fill();

         // Connect to nearby nodes
         brainNodes.slice(i+1).forEach(other => {
            const dx = node.x - other.x;
            const dy = node.y - other.y;
            const dz = node.z - other.z;
            const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
            if (dist < 45) {
               const ox = cx + isoX(other.x, other.y);
               const oy = cy + isoY(other.x, other.y, brainZ + other.z) + Math.sin(time + other.offset) * 5;
               ctx.strokeStyle = `rgba(56, 189, 248, ${1 - dist/45})`;
               ctx.beginPath();
               ctx.moveTo(nx, ny);
               ctx.lineTo(ox, oy);
               ctx.stroke();
            }
         });
      });

      // Beam connecting core to brain
      const beamGrad = ctx.createLinearGradient(cx, cy - coreZ, cx, cy - brainZ);
      beamGrad.addColorStop(0, 'rgba(56, 189, 248, 0.8)');
      beamGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = beamGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - coreZ);
      ctx.lineTo(cx + 20, cy - coreZ);
      ctx.lineTo(cx + 5, cy - brainZ);
      ctx.lineTo(cx - 5, cy - brainZ);
      ctx.fill();

      animationFrameId = requestAnimationFrame(drawSimulation);
    };

    drawSimulation();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-10 flex flex-col justify-center overflow-hidden bg-[#0F172A]"
    >
      {/* Canvas Background for Exact 3D Replica */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block z-0" />

      {/* SVG Connecting Lines for Callouts */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 hidden lg:block" style={{ filter: 'drop-shadow(0 0 4px rgba(14,165,233,0.5))' }}>
         <path d="M 380 200 L 480 200 L 520 280" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
         <path d="M 980 160 L 880 160 L 840 250" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
         <path d="M 1080 380 L 980 380 L 900 450" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
         <path d="M 1020 620 L 920 620 L 860 550" fill="none" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 4" />
      </svg>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 flex-1 flex flex-col justify-center h-full">
        
        {/* Absolute Callouts - Styled exactly like the image */}
        <div className="hidden lg:block absolute top-[180px] left-[150px] bg-[#0F172A]/80 border border-[#0ea5e9]/40 px-4 py-2.5 rounded-[10px] backdrop-blur-md flex items-center gap-3">
           <div className="text-[#38bdf8]"><Box className="w-5 h-5" /></div>
           <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">DISTRIBUTED<br/>TRAINING</span>
        </div>

        <div className="hidden lg:block absolute top-[140px] right-[250px] bg-[#0F172A]/80 border border-[#0ea5e9]/40 px-4 py-2.5 rounded-[10px] backdrop-blur-md flex items-center gap-3">
           <div className="text-[#38bdf8]"><Activity className="w-5 h-5" /></div>
           <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">INFERENCE<br/>ACCELERATION</span>
        </div>

        <div className="hidden lg:block absolute top-[360px] right-[150px] bg-[#0F172A]/80 border border-[#0ea5e9]/40 px-4 py-2.5 rounded-[10px] backdrop-blur-md flex items-center gap-3">
           <div className="text-[#38bdf8]"><Server className="w-5 h-5" /></div>
           <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">INTELLIGENT<br/>ORCHESTRATION</span>
        </div>

        <div className="hidden lg:block absolute bottom-[220px] right-[210px] bg-[#0F172A]/80 border border-[#0ea5e9]/40 px-4 py-2.5 rounded-[10px] backdrop-blur-md flex items-center gap-3">
           <div className="text-[#38bdf8]"><Cpu className="w-5 h-5" /></div>
           <span className="text-[11px] font-bold text-white uppercase tracking-wider leading-tight">GPU RESOURCE<br/>MANAGEMENT</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-10">
          
          {/* Left Column - Text Content */}
          <div className="flex flex-col items-start text-left relative z-30">
            
            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-1.5 bg-transparent border border-[#0ea5e9]/40 rounded-full mb-8"
            >
              <span className="text-[#38bdf8] font-bold text-[10px] tracking-[0.2em] uppercase">
                AI COMPUTE PLATFORM
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-[76px] font-bold text-white tracking-tight leading-[1.1]"
            >
              Enterprise AI <br />
              Compute Infrastructure <br />
              <span className="text-[#3b82f6]">Built for Scale.</span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-[17px] text-slate-300/90 leading-relaxed max-w-lg font-normal"
            >
              VertexGrid orchestrates GPU resources, distributed training, and AI inference at any scale—across cloud, edge, and on-premise infrastructure.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-5 w-full sm:w-auto"
            >
              <a
                href="#contact"
                className="px-8 py-3.5 bg-[#1E3A8A] hover:bg-[#162d6e] text-white font-medium rounded-[8px] text-center transition-all flex items-center justify-center gap-2 text-[15px]"
              >
                Request Demo <span className="text-xl leading-none -mt-1">›</span>
              </a>
              <a
                href="#architecture"
                className="px-8 py-3.5 border border-[#334155] text-white font-medium rounded-[8px] text-center hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-[15px]"
              >
                Explore Platform <span className="text-xl leading-none -mt-1">›</span>
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-8 w-full"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#0ea5e9]">
                  <Cpu className="w-5 h-5" />
                  <span className="font-display text-2xl font-bold text-white tracking-tight">10K+</span>
                </div>
                <div className="text-[13px] text-slate-400 font-medium">GPU's Managed</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#0ea5e9]">
                  <Globe className="w-5 h-5" />
                  <span className="font-display text-2xl font-bold text-white tracking-tight">1.2M+</span>
                </div>
                <div className="text-[13px] text-slate-400 font-medium">Compute Nodes</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#0ea5e9]">
                  <Zap className="w-5 h-5" />
                  <span className="font-display text-2xl font-bold text-white tracking-tight">99.9%</span>
                </div>
                <div className="text-[13px] text-slate-400 font-medium">Uptime SLA</div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-[#0ea5e9]">
                  <Activity className="w-5 h-5" />
                  <span className="font-display text-2xl font-bold text-white tracking-tight">85%</span>
                </div>
                <div className="text-[13px] text-slate-400 font-medium">Better Efficiency</div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Powered By Bottom Strip Card */}
      <div className="absolute bottom-6 right-6 lg:right-12 bg-[#020617]/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-6 px-8 py-4 z-30 shadow-2xl">
        <span className="text-[10px] font-bold text-slate-500 tracking-[0.2em]">POWERED BY</span>
        <div className="flex items-center gap-6 opacity-90">
          <div className="flex items-center gap-1.5 text-white font-bold text-sm">
             <div className="w-5 h-5 bg-[#76B900] rounded-sm flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-white rounded-tr-sm rotate-45 transform translate-y-[1px] -translate-x-[1px]"></div>
             </div>
             NVIDIA <span className="font-normal text-slate-400 text-xs ml-1">SDK</span>
          </div>
          <div className="text-white font-bold text-sm flex items-center gap-1">
             <span className="text-[#FF9900]">aws</span>
          </div>
          <div className="text-white font-bold text-sm flex items-center gap-1">
             <div className="grid grid-cols-2 gap-[1px] w-4 h-4">
               <div className="bg-[#f25022]"></div><div className="bg-[#7fba00]"></div>
               <div className="bg-[#00a4ef]"></div><div className="bg-[#ffb900]"></div>
             </div>
             Microsoft Azure
          </div>
          <div className="text-white font-bold text-sm">
             Google Cloud
          </div>
          <div className="text-white font-bold text-sm flex items-center gap-1">
             <div className="text-[#326ce5] text-lg leading-none">⎈</div>
             kubernetes
          </div>
        </div>
      </div>
    </section>
  );
}
