"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Counter from "@/components/motion/Counter";
import Magnetic from "@/components/motion/Magnetic";
import CudaHeroSvg from "./CudaHeroSvg";
import CudaOverviewSvg from "./CudaOverviewSvg";

const STATS = [
  { value: 100, prefix: "", suffix: "x", label: "Compute Throughput Increase" },
  { value: 50, prefix: "Up to ", suffix: "%", label: "Hardware Efficiency Optimization" },
];

const SOLUTIONS = [
  { title: "Custom Parallel Algorithm Design", body: "To maintain long-term computational performance, we build workload-specific parallel plans, compromising thread allocation, the use of memory hierarchy, and synchronization." },
  { title: "GPU Acceleration for Existing Systems", body: "With little disturbance, legacy applications are reformed to run on the GPU. We control the optimization of data transfer, API correspondence, and validation to production readiness." },
  { title: "End-to-End Performance Architecture", body: "Since we do initial modeling, benchmark validation, and hardening against deployment, we manage all the steps of the CUDA implementation with precision-driven engineering requirements." },
];

const INDUSTRIES = [
  "Artificial Intelligence Model Training & Inference Systems",
  "Super-Accurate Scientific Research Platforms",
  "Risk Engines and Algorithms Trading",
  "Instant Media Rendering and Analysis",
];

const PROCESS = [
  { title: "Computational Profiling", body: "We measure execution patterns, memory loads, and bottlenecks in order to come up with realistic acceleration targets." },
  { title: "Parallel Systems Blueprint", body: "Models known as thread hierarchy, shared memory models, and workload partitioning are designed for models that are ideal to execute using the GPUs." },
  { title: "CUDA Core Development", body: "The high-occupancy kernels are also designed to provide the predictability of throughput when operating at peak loading." },
  { title: "Bottleneck Elimination & Benchmarking", body: "The profiling tools reveal the areas of inefficiency so that they can be refined to achieve continuous and reliable performance improvements." },
  { title: "Application Integration", body: "GPU modules are integrated into your software ecosystem with clean interfaces and continuity." },
  { title: "Production Optimization", body: "Scalability is guaranteed during post-deployment analysis, based on the changing workloads and multi-GPUs." },
];

const BENEFITS = [
  { title: "Accelerated Computational Performance", body: "CUDA allows parallel computation of thousands of Cores on the GPU, which saves a lot of processing time when dealing with complex workloads, like AI training, simulations, and applications of large data analytics." },
  { title: "Improved Infrastructure Efficiency", body: "By moving more intensive workloads off of CPU and onto the GPUs, the organizations are able to handle larger data volumes with reduced hardware resources to enhance performance-per-watt and infrastructure ROI." },
  { title: "Enhanced Competitive Positioning", body: "A rapid computational speed can be more useful in fast experimentation, real-time analysis, and sophisticated modeling, which will enable companies to innovate faster and have a high level of technological superiority in their industry." },
  { title: "Scalable High-Performance Architecture", body: "The architecture of CUDA-based systems is built so that it can be used in both multi-GPU architectures and high-performance clusters, both in terms of throughput and reliability, as data requirements and computing complexity rise." },
  { title: "Future-Ready Technology Investment", body: "Adopting CUDA aligns your infrastructure with evolving GPU advancements, ensuring compatibility with emerging AI frameworks, deep learning models, and next-generation computational workloads." },
  { title: "Reduced Development Cycles", body: "The performance in terms of optimization of GPU acceleration reduces the time of implementation in testing and in the process of iteration, whereby development teams can quickly rise above their experimental levels and proceed with their production processes more efficiently." },
];

const WHY = [
  { title: "Advanced Parallel Computing Expertise", body: "Our engineers have extensive practical experience in CUDA programming and in the design of large-scale parallel architecture, as well as in the management of the GPU memory. We build production-ready acceleration frameworks that prioritize execution stability, optimal resource utilization, and sustained high-throughput performance across demanding computational environments." },
  { title: "Quantifiable Performance Improvements", body: "All CUDA implementations have advanced profiling, benchmarking, and performance analysis. We quantify the reduction of latency, throughput improvement as well as resource efficiency to make sure that optimization outcomes are realistic, evidence-based, and consistent with clearly established performance goals." },
  { title: "Workload-Specific Optimization Strategy", body: "We do not just make some arbitrary acceleration, but instead analyze the patterns of execution of your application, data dependencies, and scaling needs. This enables us to design CUDA solutions that are highly targeted to optimally match workload behaviour and provide predictable and orderable computational benefits." },
];

const TESTIMONIALS = [
  { quote: "GPU acceleration significantly enhanced our data processing framework, reducing execution cycles under high-load scenarios.", name: "Director of Engineering", org: "AI Platform" },
  { quote: "Our migration to CUDA-based execution improved analytical throughput without expanding infrastructure costs.", name: "Chief Technology Officer", org: "Technology Company" },
  { quote: "The architectural redesign delivered predictable performance scaling across multiple GPU nodes.", name: "Head of Systems Engineering", org: "Engineering Company" },
];

const FAQS = [
  { q: "How do I know if my application is suitable for CUDA acceleration?", a: "Applications whose operations are frequently repeated in numbers, process large datasets, matrix calculations, or can be performed in parallel are good candidates. Performing profiling measurements helps us identify whether there are any performance improvements that can be realized and achieved through the use of GPU acceleration." },
  { q: "Can CUDA be integrated into an existing production system?", a: "Yes. We refactor and modularize elements such that there is no disruption to other business operations, and a full system rebuild is not necessary to add the acceleration of a graphics card to your existing architecture." },
  { q: "What is the difference between CPU optimization and CUDA optimization?", a: "CPU optimization enhances the ability to run sequence-related tasks, whereas CUDA optimization rearranges workloads to execute them in a massively parallel fashion across the armies of cores in GPUs, which is much more efficient at providing high throughput in tasks of high compute intensity." },
  { q: "Do you support multi-GPU and cluster-based deployments?", a: "Absolutely. Our CUDA architectures are optimized to be scaled to multi-GPU and high-performance cluster environments, such that the performance remains consistent as the level of computational requirements rises." },
  { q: "How do you measure performance improvement in CUDA projects?", a: "Before and after optimization, we measure the reduction of execution time, the increased memory efficiency, and scalability through profiling tools, benchmarking frameworks, and throughput analysis." },
  { q: "Is ongoing CUDA performance tuning necessary?", a: "Yes. With the changing workloads, periodical profiling and optimization will ensure the efficiency is maintained and avoid any bottlenecks, keeping the utilization of the GPUs optimal over time." },
];

export default function CudaDevelopmentContent() {
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
                <motion.span className="block"
                  initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                  animate={{ transform: "translateY(0%)" }}
                  transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                  CUDA Development Services
                </motion.span>
              </span>
            </h1>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
              className="mt-7 max-w-[58ch] text-[1.0625rem] text-ink-2">
              Revolutionize computational pressure to run scalable performance using master CUDA engineering. Our architectures are built and deployed in the form of GPU-native, which opens the door to the efficiency of parallel processing of the AI systems, simulations, and data-intensive programs.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.66, ease: [0.23, 1, 0.32, 1] }}
              className="mt-10">
              <Magnetic strength={0.18}>
                <a href="/contact/" className="btn btn-primary">Get Free Consultation</a>
              </Magnetic>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <CudaHeroSvg />
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
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">What CUDA Means for Your Architecture</SplitHeading>
                <Reveal><p className="text-ink font-medium text-[1.0625rem]">Redefining Performance with GPU Parallelism</p></Reveal>
                <Reveal delay={0.06}>
                  <p className="text-ink-2 max-w-[60ch]">CUDA development is concentrated on reengineering applications that perform effectively in thousands of cores of GPUs at the same time. Workloads are separated into parallel operations that are optimized to high throughput environments, rather than creating sequential CPU execution.</p>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="text-ink-2 max-w-[60ch]">Such a solution will minimize latency, optimize the use of resources, and increase the scalability of machine learning, quantitative analytics, visualization engines, and scientific modeling systems. The correct use of CUDA is not acceleration; it is an architectural change.</p>
                </Reveal>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-8">
                <CudaOverviewSvg />
                <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10" step={0.08}>
                  {STATS.map((s) => (
                    <div key={s.label} className="flex flex-col">
                      <p className="font-mono text-[clamp(2rem,4vw,3rem)] leading-none text-ink font-bold">
                        <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} />
                      </p>
                      <p className="mt-3 text-[0.875rem] md:text-[0.9375rem] text-ink-2 uppercase tracking-wider font-mono">{s.label}</p>
                    </div>
                  ))}
                </Stagger>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section className="section bg-paper border-y border-line" id="solutions">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">End-to-End CUDA Solutions for High-Performance Computing</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">From kernel design to system integration, we deliver full-stack CUDA development that meets the most demanding performance and scalability requirements.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {SOLUTIONS.map((c) => (
                <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{c.body}</p>
                </div>
              ))}
            </Stagger>
            <Reveal className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Get in Touch With Us</a></Magnetic></Reveal>
          </div>
        </section>

        {/* Industries */}
        <section className="section" id="industries">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Industries</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Accelerating Compute-Intensive Industries</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">We design CUDA-driven solutions to industries whose speed of processing has a direct consequence on the results of their operation.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 border-t border-line" itemClassName="h-full" step={0.06}>
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
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Structured CUDA Implementation Process</SplitHeading>
              <Reveal><p className="text-ink font-medium text-[1.0625rem]">A Six-Phase GPU Engineering Model</p></Reveal>
              <Reveal delay={0.06}><p className="text-ink-2 max-w-[58ch]">Our design guarantees high availability, acceleration, and system integrity as well as scalability.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.05}>
              {PROCESS.map((p, i) => (
                <div key={p.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <span className="font-mono text-[0.875rem] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-sans font-medium text-[1rem] text-ink mt-3 mb-2">{p.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{p.body}</p>
                </div>
              ))}
            </Stagger>
            <Reveal className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Start Your Development Journey</a></Magnetic></Reveal>
          </div>
        </section>

        {/* Benefits */}
        <section className="section" id="benefits">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Strategic Benefits of CUDA Development</SplitHeading>
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

        {/* Why trust */}
        <section className="section bg-paper border-y border-line" id="why">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Organizations Trust Our CUDA Team</SplitHeading>
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
        <section className="section" id="testimonials">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Client Testimonials</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Client Experiences</SplitHeading>
                <Reveal><p className="text-ink-2 text-[1.0625rem] max-w-[55ch]">Proven Impact Across Industries</p></Reveal>
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
        <section className="section bg-paper border-y border-line" id="faq">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">FAQs</span>
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Frequently Asked Questions</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Common questions about hiring CUDA developers from Jashom</p></Reveal>
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
        <section className="section" id="contact">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="font-mono text-[1rem] tracking-[0.25em] text-ink-3 uppercase font-medium">Get In Touch</span>
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get Started with CUDA Development</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">Fill out the form and our team will get back to you within 24 hours.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 text-[0.9375rem] text-ink-2 flex flex-col gap-5">
                    <div><p className="text-ink font-medium mb-1">Address</p><p>SATYAM 1, 414, AMBA BUSINESS PARK, B/H TRI MANDIR, ADALAJ 382421, Dist Gandhinagar Gujarat</p></div>
                    <div><p className="text-ink font-medium mb-1">Email</p><a href="mailto:info@jashom.com" className="link-line w-fit text-ink">info@jashom.com</a><p className="text-ink-3 text-[0.8125rem] mt-1">We respond within 24 hours</p></div>
                    <div><p className="text-ink font-medium mb-1">Phone</p><a href="tel:+919023906363" className="link-line w-fit text-ink">+91 90239 06363</a><p className="text-ink-3 text-[0.8125rem] mt-1">Available Mon-Fri, 9AM-6PM IST</p></div>
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
                      <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Full Name *</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email Address *</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company Name</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Project Details *</label><textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your workload and performance targets." /></div>
                      <div className="sm:col-span-2 flex justify-end"><button type="submit" className="btn btn-primary">Send Message</button></div>
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
