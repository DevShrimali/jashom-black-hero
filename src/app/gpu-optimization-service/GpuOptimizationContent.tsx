"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Magnetic from "@/components/motion/Magnetic";
import GpuHeroSvg from "./GpuHeroSvg";

/* ---- Source content (jashom.com/gpu-optimization-service) ---- */

const STATS = [
  { value: 10, suffix: "x", label: "Faster Execution" },
  { value: 40, suffix: "%", label: "Reduced Compute Costs" },
];

const CAPABILITIES = [
  {
    title: "CUDA Optimization",
    body: "We optimize the underlying kernel execution, better shared memory assignment, and also readjust thread block settings to optimize performance. The services of our CUDA Development are aimed at removing the warp divergence and the latency in the NVIDIA GPU architecture.",
  },
  {
    title: "AI/ML Acceleration",
    body: "Optimize the equilibrium of both the speed of model training and inference via optimized batch operations and the control of accessing memory. We optimize compute to reduce training time and improve predictive performance.",
  },
  {
    title: "Performance Profiling",
    body: "We identify the areas of inefficiency in the execution flow and memory transfers into increasingly sophisticated profiling frameworks. The benefits of detailed benchmarking are accuracy in making optimization decisions and quantifiable performance improvements.",
  },
];

const INDUSTRIES = [
  "AI & Machine Learning",
  "Scientific Computing",
  "Data Analytics",
  "Rendering & Graphics",
];

const PROCESS = [
  {
    title: "Assessment",
    body: "Assess existing GPU architecture, load, and establish specific optimization objectives.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="9" y="2" width="6" height="4" rx="1" />
        <path d="M9 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-3" />
        <path d="M9 12l2 2 4-4" />
        <line x1="8" y1="17" x2="16" y2="17" />
      </svg>
    ),
  },
  {
    title: "Analysis",
    body: "Gather real-time monitoring information and spot performance issues and performance bottlenecks.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="2 12 6 5 10 16 14 9 18 13 22 8" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
  {
    title: "Kernel Optimization",
    body: "Refine CUDA kernels and improve parallel execution balance.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="1" />
        <line x1="9" y1="4" x2="9" y2="20" />
        <line x1="15" y1="4" x2="15" y2="20" />
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Tuning",
    body: "Expenses in runtime parameters and memory allocation, better throughput.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="4" y1="6" x2="20" y2="6" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="18" x2="20" y2="18" />
        <circle cx="9" cy="6" r="2" fill="var(--color-paper,white)" />
        <circle cx="15" cy="12" r="2" fill="var(--color-paper,white)" />
        <circle cx="9" cy="18" r="2" fill="var(--color-paper,white)" />
      </svg>
    ),
  },
  {
    title: "Testing",
    body: "Authenticate gains with validation checkpoints.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3l8 4.5v5c0 4.5-3.5 8.5-8 9.5-4.5-1-8-5-8-9.5v-5z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    title: "Deployment",
    body: "Employ workloads that are optimized, monitored, and improved.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C8 6 7 10 7 13a5 5 0 0 0 10 0c0-3-1-7-5-11z" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="8" y1="22" x2="16" y2="22" />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

const BENEFITS = [
  { title: "Faster Processing Speed", body: "Fasten hardened compute tasks with an ideal use of parallelization and data movement. With decreased processing time, there will be shorter experimentation times and shorter delivery times." },
  { title: "Lower Costs of Infrastructure", body: "Optimize the use of GPUs in order to reduce costs on clouds and hardware. Harmful efficiency brings a decrease in over-provisioning and enhanced resource allocation." },
  { title: "Improved Scalability", body: "Processes more data and intricate programs with no drop in performance or increased proportional cost." },
  { title: "Enhanced Model Performance", body: "Improve the performance of AI models training and inference with optimal CUDA execution paths." },
  { title: "Competitive Advantage", body: "Become better computers to hasten innovation and become more powerful in data-based markets." },
  { title: "Energy Efficiency", body: "Minimize energy use by optimizing the use of GPUs, which helps on the sustainability agenda and limits the cost of running the operations." },
];

const MODELS = [
  {
    name: "GPT-4o",
    logo: "https://www.edigitalagency.com.au/wp-content/uploads/new-ChatGPT-logo-black-png-large-size.png",
    cls: "h-14 md:h-16",
  },
  {
    name: "Google Gemini",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/600px-Google_Gemini_logo.svg.png",
    cls: "h-12 md:h-14",
  },
  {
    name: "Claude",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Claude_ai_logo.svg/600px-Claude_ai_logo.svg.png",
    cls: "h-14 md:h-16",
  },
  {
    name: "Llama 3",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Meta-Logo.png",
    cls: "h-12 md:h-14",
  },
  {
    name: "Mistral",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Mistral_AI_logo.svg/600px-Mistral_AI_logo.svg.png",
    cls: "h-12 md:h-14",
  },
  {
    name: "Hugging Face",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Hf-logo-with-title.svg",
    cls: "h-12 md:h-14",
  },
  {
    name: "Stability AI",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Stability_AI_Logo.svg/600px-Stability_AI_Logo.svg.png",
    cls: "h-10 md:h-12",
  },
  {
    name: "Ollama",
    logo: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/ollama-logo-hd.png",
    cls: "h-14 md:h-16",
  },
];

const WHY = [
  { title: "Advanced Parallel Computing Expertise", body: "Our experts have extensive expertise in CUDA implementation, tuning of the GPU architecture, and high-performance parallel systems. This is done at low-level kernel optimization all the way up to optimizing an entire NVIDIA GPU, and we work to squeeze the highest performance out of every tier of your computing system." },
  { title: "Results Backed by Data", body: "We value quantitative difference. Each interaction is predetermined by profiling information, systematic testing, and efficiency metrics showing evident acceleration, competitive advantages, and enhanced hardware use." },
  { title: "Optimization Built Around Your Workload", body: "No generic templates. We will create application-specific GPU optimization that will respond to your application and run a discussion, infrastructure configuration, as well as scalability needs by making the performance consistently enhanced on a long-term basis." },
];

const TESTIMONIALS = [
  { quote: "Their graphics processing optimization experience minimized our processing latency. The CUDA execution benefits were fast and quantifiable.", name: "Arjun Mehta", org: "Director of Engineering, NovaAI Labs" },
  { quote: "Our AI training pipeline became significantly faster after their optimization work. Clear performance gains with reduced infrastructure strain.", name: "Sofia Alvarez", org: "CTO, Quantix Systems" },
  { quote: "We hired their CUDA developers for complex optimization tasks. The results were stable, scalable, and production-ready.", name: "Daniel Brooks", org: "Chief Operating Officer, CoreTech Solutions" },
];

const FAQS = [
  { q: "How long does a GPU optimization project typically take?", a: "The timelines of projects are based on the complexity of the workload, the level of infrastructure, and the objectives of the performance. Enterprise environments take most optimization engagements between a few weeks and a few months." },
  { q: "Can you optimize legacy CUDA codebases?", a: "Yes. We test current CUDA implementations, determine architectural waste, and cull kernels to optimize memory access characteristics, parallel execution ratio, and total performance." },
  { q: "What metrics do you use to measure optimization success?", a: "We assess the use of GPUs, the performance, the ability to use memory, the decrease in latency, the efficiency of the scalability, and the savings in costs using structured profiling and benchmarking techniques." },
  { q: "Do optimized workloads remain stable in production?", a: "Absolutely. All optimizations are tested, regressed, and monitored during deployment to make sure that the performance improvements will be maintained in the field." },
];

/** Minimal overview SVG — performance bar chart with GPU grid motif */
function OverviewSvg() {
  return (
    <svg
      viewBox="0 0 360 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
      aria-hidden="true"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* background grid */}
      <g stroke="var(--color-line)" strokeWidth="0.6" opacity="0.5">
        {[0, 45, 90, 135, 180, 225, 270, 315, 360].map((x) => (
          <line key={`gx${x}`} x1={x} y1="0" x2={x} y2="180" />
        ))}
        {[0, 36, 72, 108, 144, 180].map((y) => (
          <line key={`gy${y}`} x1="0" y1={y} x2="360" y2={y} />
        ))}
      </g>

      {/* baseline */}
      <line x1="40" y1="148" x2="320" y2="148" stroke="var(--color-line)" strokeWidth="1.5" />

      {/* Bar 1 — 40% height, muted */}
      <rect x="72" y="92" width="36" height="56" stroke="var(--color-ink-3)" strokeWidth="1.5" />

      {/* Bar 2 — 65% height, muted */}
      <rect x="142" y="66" width="36" height="82" stroke="var(--color-ink-2)" strokeWidth="1.5" />

      {/* Bar 3 — 100% height, accent fill */}
      <rect
        x="212"
        y="28"
        width="36"
        height="120"
        fill="var(--color-ink)"
        fillOpacity="0.07"
        stroke="var(--color-ink)"
        strokeWidth="2"
      />

      {/* accent top cap on bar 3 */}
      <line x1="212" y1="28" x2="248" y2="28" stroke="var(--color-ink)" strokeWidth="3" />

      {/* arrow up — indicating performance */}
      <path
        d="M230 148 L230 36 M222 50 L230 36 L238 50"
        stroke="var(--color-ink)"
        strokeWidth="1.5"
        opacity="0.25"
      />

      {/* labels */}
      <text x="72" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">BEFORE</text>
      <text x="136" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">OPTIMISED</text>
      <text x="210" y="165" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="1">WITH JASHOM</text>

      {/* top label */}
      <text x="40" y="20" fill="var(--color-ink-3)" fontSize="9" fontFamily="var(--font-mono)" letterSpacing="2" opacity="0.7">GPU PERFORMANCE</text>
    </svg>
  );
}

export default function GpuOptimizationContent() {
  const reduced = useReducedMotion();
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[60svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] gap-12 items-center pt-28 pb-10">
          <div className="flex flex-col justify-center">
            <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
              <span className="block overflow-clip">
                <motion.span
                  className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  NVIDIA GPU Optimization Services
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2"
            >
              We provide advanced GPU Optimization Services, used to maximize your computing infrastructure to full performance. Our team optimizes workload patterns, execution pipes, and parallel processing to remove bottlenecks.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10"
            >
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Get Free Consultation</a>
              </Magnetic>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <GpuHeroSvg />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Overview + stats */}
        <section className="section" id="overview">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Overview</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">What is GPU Optimization?</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 max-w-[60ch]">
                    GPU optimization is a performance engineering science that aims at making the best use of throughput in a parallel computing system. It requires workload profiling, CUDA kernel restructuring, thread synchronization optimization, and efficient use of memory access to deliver consistent high-performance execution on modern hardware.
                  </p>
                </Reveal>
                <Reveal delay={0.08}>
                  <p className="text-ink-2 max-w-[60ch]">
                    Training time can also be minimized by optimized workloads on GPUs, infrastructure waste is minimized, and AI, scientific simulations, and data analytics apps are able to achieve higher compute densities. The result is accelerated processing, optimal use of hardware for compute-intensive processes, and cost-sustainability.
                  </p>
                </Reveal>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-10">
                {/* Minimal themed SVG illustration */}
                <Reveal>
                  <OverviewSvg />
                </Reveal>
                {/* KPI stats */}
                <Stagger className="grid grid-cols-2 gap-x-8 gap-y-8" step={0.08}>
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none text-ink font-bold">
                        <Counter value={s.value} suffix={s.suffix} />
                      </p>
                      <p className="mt-2.5 text-[0.8125rem] md:text-[0.875rem] text-ink-3 uppercase tracking-[0.15em] font-mono">{s.label}</p>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="section bg-paper border-y border-line" id="capabilities">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Optimize Performance That Drives Real Results</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Our engineers integrate CUDA Development Services with profound architectural experience to increase the use of a GPU on a wide range of workloads.
                </p>
              </Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{c.body}</p>
                </div>
              ))}
            </Stagger>
            <Reveal className="mt-10">
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Get in Touch With Us</a>
              </Magnetic>
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section className="section" id="industries">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Industry-Focused GPU Optimization Solutions</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">
                  Our GPU optimization services are designed to satisfy the computational needs of industry-specific situations. Each of our solutions is differentiated based on workload complexity, goals, and scalability goals.
                </p>
              </Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line" itemClassName="h-full" step={0.06}>
              {INDUSTRIES.map((name) => (
                <div key={name} className="h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink">{name}</h3>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Process */}
        <section className="section bg-paper border-y border-line" id="process">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Our Process</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">GPU Optimization Journey</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">A dedicated six-step model to attain regular improvement in the performance of GPUs.</p>
              </Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.05}>
              {PROCESS.map((p, i) => (
                <div key={p.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300 flex flex-col">
                  {/* icon + step number row */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-ink-2 transition-colors duration-300 group-hover:text-ink">
                      {p.icon}
                    </span>
                    <span className="font-mono text-[0.8rem] text-ink-3 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{p.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{p.body}</p>
                </div>
              ))}
            </Stagger>
            <Reveal className="mt-10">
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Start Your Optimization Journey</a>
              </Magnetic>
            </Reveal>
          </div>
        </section>

        {/* Mid CTA banner */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Need a Custom AI Development Partner?</SplitHeading>
            <Reveal delay={0.1}>
              <p className="mt-6 text-ink-2 max-w-[60ch]">
                We develop high-performing AI systems based on optimized GPU architecture. Whether you need to hire CUDA Developers for specialized projects or require end-to-end CUDA Development Services, our team delivers scalable solutions engineered for production-grade performance.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-10">
                <Magnetic strength={0.18}>
                  <a href="/contact/" className="btn btn-primary">Let&rsquo;s talk about Your Project</a>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="section" id="benefits">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Business Benefits of GPU Optimization</SplitHeading>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.05}>
              {BENEFITS.map((b) => (
                <div key={b.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{b.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{b.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* AI models */}
        <section className="section bg-paper border-y border-line" id="models">
          <div className="container-j">
            <div className="max-w-2xl mb-10">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">AI Models We Have Expertise In</SplitHeading>
            </div>
            {/* 5-per-row logo grid, last row centered */}
            <div className="max-w-5xl mx-auto">
              {/* Row 1: first 5 logos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 border-t border-l border-line bg-linen shadow-[6px_6px_0px_0px_var(--color-line)]">
                {MODELS.slice(0, 5).map((m) => (
                  <div key={m.name}
                    className="group flex flex-col items-center justify-center gap-4 py-10 px-6 min-h-[150px] border-r border-b border-line hover:bg-tint/50 transition-colors duration-300">
                    <img src={m.logo} alt={m.name}
                      className={`${m.cls} w-auto max-w-[80%] object-contain transition-all duration-300`} />
                    <span className="font-mono text-[0.7rem] text-ink-3 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">{m.name}</span>
                  </div>
                ))}
              </div>
              {/* Row 2: remaining 3 logos, centered */}
              <div className="flex justify-center border-l border-line bg-linen">
                {MODELS.slice(5).map((m) => (
                  <div key={m.name}
                    style={{ width: "20%" }}
                    className="group flex flex-col items-center justify-center gap-4 py-10 px-6 min-h-[150px] border-r border-b border-line hover:bg-tint/50 transition-colors duration-300">
                    <img src={m.logo} alt={m.name}
                      className={`${m.cls} w-auto max-w-[80%] object-contain transition-all duration-300`} />
                    <span className="font-mono text-[0.7rem] text-ink-3 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-200">{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section" id="why">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Choose Us for GPU Optimization?</SplitHeading>
            </div>
            <Stagger className="grid md:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {WHY.map((w) => (
                <div key={w.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{w.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{w.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Testimonials */}
        <section className="section bg-paper border-y border-line" id="testimonials">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Client Testimonials</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">What Our Clients Say</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">Trusted by forward-thinking organizations to deliver high-performance GPU and CUDA solutions.</p>
                </Reveal>
              </div>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              {TESTIMONIALS.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08} className="h-full">
                  <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300">
                    <blockquote className="font-mono text-[18px] leading-[1.4] text-ink flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem]">
                      <span className="text-ink font-medium">{t.name}</span>
                      <span className="text-ink-2"> · {t.org}</span>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" id="faq">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
              <Reveal>
                <p className="text-ink-2 max-w-[58ch]">Common questions about GPU optimization services from Jashom</p>
              </Reveal>
            </div>
            <div className="border-t border-line max-w-3xl">
              {FAQS.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5 text-ink font-medium">
                    {f.q}
                    <span className="text-ink-2 transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </summary>
                  <p className="text-ink-2 pb-5 max-w-[60ch]">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="section bg-paper border-y border-line" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Get In Touch</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get Started with GPU Optimization</SplitHeading>
                <Reveal>
                  <p className="text-ink-2 max-w-[48ch]">Fill out the form and our team will get back to you within 24 hours.</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 text-[0.9375rem] text-ink-2 flex flex-col gap-5">
                    <div>
                      <p className="text-ink font-medium mb-1">Address</p>
                      <p>SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat</p>
                    </div>
                    <div>
                      <p className="text-ink font-medium mb-1">Email</p>
                      <a href="mailto:info@jashom.com" className="link-line w-fit text-ink">info@jashom.com</a>
                      <p className="text-ink-3 text-[0.8125rem] mt-1">We respond within 24 hours</p>
                    </div>
                    <div>
                      <p className="text-ink font-medium mb-1">Phone</p>
                      <a href="tel:+919023906363" className="link-line w-fit text-ink">+91 90239 06363</a>
                      <p className="text-ink-3 text-[0.8125rem] mt-1">Mon-Fri, 9AM-6PM IST</p>
                    </div>
                  </div>
                </Reveal>
              </div>

              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Message received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={(e) => { e.preventDefault(); setStatus("sent"); }} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm text-ink-2">Full Name *</label>
                        <input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm text-ink-2">Email Address *</label>
                        <input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="company" className="text-sm text-ink-2">Company Name</label>
                        <input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="phone" className="text-sm text-ink-2">Phone Number</label>
                        <input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" />
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="message" className="text-sm text-ink-2">Project Details *</label>
                        <textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your workload and performance targets." />
                      </div>
                      <div className="sm:col-span-2 flex justify-end">
                        <button type="submit" className="btn btn-primary">Send Message</button>
                      </div>
                    </form>
                  </Reveal>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
