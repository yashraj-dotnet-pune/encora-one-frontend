import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FilePlus, UserCheck, BarChart3, MessageSquare, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "Raise Grievance",
    description: "Employees log issues directly via the portal with attachments and priority levels.",
    icon: FilePlus,
    color: "bg-blue-500",
    glow: "shadow-[0_0_20px_rgba(59,130,246,0.5)]"
  },
  {
    id: 2,
    title: "Manager Review",
    description: "Department heads receive instant alerts, review details, and assign tasks.",
    icon: UserCheck,
    color: "bg-violet-500",
    glow: "shadow-[0_0_20px_rgba(139,92,246,0.5)]"
  },
  {
    id: 3,
    title: "Admin Oversight",
    description: "Admins monitor SLAs and system-wide performance through real-time dashboards.",
    icon: BarChart3,
    color: "bg-pink-500",
    glow: "shadow-[0_0_20px_rgba(236,72,153,0.5)]"
  },
  {
    id: 4,
    title: "Collaborate & Resolve",
    description: "Seamless chat integration allows everyone to discuss and close tickets faster.",
    icon: MessageSquare,
    color: "bg-emerald-500",
    glow: "shadow-[0_0_20px_rgba(16,185,129,0.5)]"
  }
];

const WorkflowSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-violet-200 to-pink-200">
             How It Works
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A seamless flow from problem to resolution.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          
          {/* CENTRAL BEAM LINE (Background Track) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full" />

          {/* ANIMATED BEAM LINE (Filling up) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-blue-500 via-violet-500 to-emerald-500 -translate-x-1/2 rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)] z-0"
          />

          <div className="space-y-16 md:space-y-24">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0;
              const Icon = step.icon;
              
              return (
                <div key={step.id} className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0a0a] border-4 border-[#1a1a1a] z-10 flex items-center justify-center">
                    <div className={`w-4 h-4 rounded-full ${step.color} ${step.glow}`} />
                  </div>

                  {/* Content Card */}
                  <div className={`ml-16 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="group relative p-6 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.06] hover:border-white/20 transition-all duration-300"
                    >
                      {/* Glow Effect behind card */}
                      <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r ${step.color.replace('bg-', 'from-')} to-transparent rounded-2xl blur-xl -z-10`} />

                      <div className={`flex items-center gap-4 mb-3 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                        <div className={`p-3 rounded-lg ${step.color} bg-opacity-20 text-white border border-white/10`}>
                          <Icon size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                      </div>
                      
                      <p className="text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>
                  
                  {/* Empty spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Final Checkmark */}
        <div className="flex justify-center mt-20 relative z-10">
          <motion.div 
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-[#050505] border-4 border-emerald-500/30 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]"
          >
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default WorkflowSection;