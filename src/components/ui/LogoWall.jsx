import React from 'react';
import { 
  Code2, Database, Server, Cloud, Zap, Layout, Box, ShieldCheck, Globe, Cpu 
} from 'lucide-react';

const techs = [
  { name: ".NET 8", icon: Server, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  { name: "React", icon: Code2, color: "text-cyan-400", bg: "bg-cyan-400/10", border: "border-cyan-400/20" },
  { name: "SQL Server", icon: Database, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
  { name: "SignalR", icon: Zap, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  { name: "Tailwind", icon: Layout, color: "text-teal-400", bg: "bg-teal-400/10", border: "border-teal-400/20" },
  { name: "Azure", icon: Cloud, color: "text-blue-600", bg: "bg-blue-600/10", border: "border-blue-600/20" },
  { name: "EF Core", icon: Box, color: "text-indigo-500", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  { name: "JWT Auth", icon: ShieldCheck, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
];

const LogoCard = ({ tech }) => {
  const Icon = tech.icon;
  return (
    <div 
      className={`
        flex items-center gap-4 px-8 py-4 mx-4 rounded-2xl 
        border ${tech.border} ${tech.bg} backdrop-blur-md
        transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.1)]
        group cursor-default select-none min-w-[200px] justify-center
      `}
    >
      <Icon className={`w-8 h-8 ${tech.color} transition-transform group-hover:rotate-12`} strokeWidth={1.5} />
      <span className="text-xl font-bold text-white/90 tracking-wide">{tech.name}</span>
    </div>
  );
};

const MarqueeRow = ({ items, direction = 'left', speed = '40s' }) => {
  return (
    <div className="relative flex overflow-hidden py-4 group">
      {/* Gradient Masks for smooth fade in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none" />

      <div 
        className="flex flex-nowrap gap-0"
        style={{
          animation: `marquee-${direction} ${speed} linear infinite`,
        }}
      >
        {/* Double the items to ensure seamless loop */}
        {[...items, ...items, ...items, ...items].map((tech, idx) => (
          <LogoCard key={`${tech.name}-${idx}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};

const LogoWall = () => {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-black/50 backdrop-blur-sm border-y border-white/5">
      <style>
        {`
          @keyframes marquee-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>

      <div className="container mx-auto px-4 mb-12 text-center">
        <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium tracking-widest uppercase">
          Powering The Platform
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mt-6 mb-4">
          Built with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Next-Gen Tech</span>
        </h3>
      </div>

      <div className="flex flex-col gap-8 rotate-[-2deg] scale-105 opacity-80 hover:opacity-100 transition-opacity duration-500">
        <MarqueeRow items={techs} direction="left" speed="60s" />
        <MarqueeRow items={[...techs].reverse()} direction="right" speed="60s" />
      </div>
    </section>
  );
};

export default LogoWall;