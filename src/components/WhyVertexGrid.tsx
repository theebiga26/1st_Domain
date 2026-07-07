import { Check, X, ShieldCheck, Lock, Award, HeartHandshake } from 'lucide-react';
import { motion } from 'motion/react';

interface RowData {
  feature: string;
  traditional: string | boolean;
  vertex: string | boolean;
  isImportant?: boolean;
}

import ShapeGrid from './ShapeGrid';

export default function WhyVertexGrid() {
  const comparisonData: RowData[] = [
    {
      feature: 'Fractional GPU Partitioning',
      traditional: false,
      vertex: true,
      isImportant: true,
    },
    {
      feature: 'P99 Cluster Latency Overhead',
      traditional: '>120ms (Virtualization overhead)',
      vertex: '<15ms (Direct bare metal)',
      isImportant: true,
    },
    {
      feature: 'Weight State Failover Restoration',
      traditional: 'Manual / Script-based (Minutes lost)',
      vertex: 'Automatic Hot Weight Swap (<2.5 seconds)',
      isImportant: true,
    },
    {
      feature: 'Average GPU Utilization Rate',
      traditional: '35% - 45% (Idle overhead)',
      vertex: '85% - 95% (Dynamic rebalancing)',
    },
    {
      feature: 'SLA Guaranteed Uptime',
      traditional: '99.9% (Standard VM level)',
      vertex: '99.99% (Compute cluster level)',
    },
    {
      feature: 'High-Bandwidth Cloud Interconnect',
      traditional: 'Charged extra (Egress fee locks)',
      vertex: 'Included (Zero internal egress)',
      isImportant: true,
    },
    {
      feature: 'SOC2 & HIPAA Compliance',
      traditional: 'Requires custom VPC build-out',
      vertex: 'Native isolated sandboxes included',
    },
  ];

  return (
    <section id="why-vertexgrid" className="py-24 sm:py-32 bg-[#0F172A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 z-0">
        <ShapeGrid 
          speed={0.3} 
          squareSize={60}
          direction='diagonal'
          borderColor='rgba(255,255,255,0.05)'
          hoverFillColor='rgba(56,189,248,0.2)'
          shape='hexagon'
          hoverTrailAmount={5}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intentionally left empty as per original content to be populated later */}
      </div>
    </section>
  );
}
