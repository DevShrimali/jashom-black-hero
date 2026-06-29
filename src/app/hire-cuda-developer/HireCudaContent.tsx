"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import HeroIllustration from "@/components/HeroIllustration";

const BADGES = ["15 Days Risk-Free Trial", "24x7 Technical Support", "On-Time Delivery"];

const EXPERTISE = [
  { title: "Advanced Kernel Optimization", body: "We optimize CUDA kernels by creating them to be more warp efficient and less divergent, and optimize instruction throughput. We have a stable implementation and quantifiable speed scalability with complicated workloads." },
  { title: "Scalable Parallel Architecture", body: "In order to achieve higher throughput, our engineers design GPU-oriented systems with maximum concurrency and optimization in the distribution of computational tasks among threads and streaming multiprocessors." },
  { title: "Performance Profiling & Bottleneck Analysis", body: "With the help of modern profiling tools, we will examine execution times, latency, and utilization of the compute to be able to identify areas of inefficiency and employ data-based optimization measures." },
  { title: "AI & Machine Learning Acceleration", body: "We execute model training and inference pipelines at a faster pace by tuning CUDA implementations and better participation of the GPUs, and less computational intensity of large-scale AI tasks." },
  { title: "Efficient Memory Management", body: "Shared, global, pinned, and unified memory usage is optimized by our CUDA developers to minimize the latency of data transfer and maximize the overall application performance." },
  { title: "Multi-GPU & Distributed Computing", body: "We support a multi-GPU execution platform with tuned communication patterns, which enable enterprises to use optimized communication patterns and scale applications with high compute intensity." },
];

const HIRE_STEPS = [
  { title: "Share Your Project Requirements", body: "Characterize your type of workload and performance objectives, infrastructure, and the type of interaction you want so we can match the appropriate technical resources." },
  { title: "Examine Certified Profile of Developers", body: "We offer extensively vetted CUDA engineers who have skills that fit your whenever-needed computational and architectural requirements." },
  { title: "Select Your Hiring Model", body: "Select flexible staffing arrangements, such as full-time, part-time, and project hiring, depending on the scope and the timeline." },
  { title: "Start Development Implementation", body: "The CUDA developer of your choice is integrated with your working process and immediately begins to optimize and accelerate your application." },
];

const WHY_HIRE = [
  { title: "High-Quality Engineering Standards", body: "Our developers observe the best practices of coding and performance to provide stable and maintainable solutions for the GPU." },
  { title: "Strong Data Security & Confidentiality", body: "Our business works under the broad NDAs and safe development procedures to maintain the delicate business logic and intellectual property." },
  { title: "Proven GPU Development Experience", body: "Our group has practical experience in the fields of AI, analytics, simulation, and high-performance computing." },
  { title: "Cost-Optimized Resource Allocation", body: "Dependent employment platforms make sure that you only spend what is needed for your project." },
  { title: "Senior-Level Technical Expertise", body: "Our CUDA engineers have a combination of architectural and practical experience with the implementation of the efficient use of GPUs." },
  { title: "Rapid Onboarding Process", body: "We also make sure that we deploy resources as fast as possible, and this makes your project pick up without any unnecessary delays." },
];

const HIRING_MODELS = [
  { title: "Full-Time", body: "Contract a CUDA developer to work on your long-term project of non-temporal GPU or AI acceleration." },
  { title: "Part-Time", body: "Outsource CUDA specialists on a part-time basis to maintain optimization, upgrades, or performance enhancements." },
  { title: "Time & Material", body: "Flexible hourly development of the scale with changing CUDA needs and optimization via iteration." },
  { title: "Custom Model", body: "Receive a customized staffing plan that is based on your technical, scheduling, and budget requirements." },
];

const WHY_CHOOSE = [
  { title: "High-Impact GPU Acceleration", body: "We re-architect compute workflows to achieve the maximum amount of parallel performance, providing huge improvements in processing time on AI, analytics, and simulation workloads." },
  { title: "Enterprise-Ready AI Systems", body: "We develop CUDA-based AI systems with a scalable, stable, and real-world production foundation, all the way up to architecture planning to deployment pipelines." },
  { title: "Secure Development Framework", body: "To ensure protection of sensitive data and GPU infrastructure, we have strict security criteria, controlled access policies, and processes driven by compliance." },
  { title: "Accelerated Deployment Cycles", body: "Our streamlined development model is designed to be fast prototyping, highly optimizing and easy to move into production systems." },
  { title: "Dedicated Technical Assistance", body: "We maintain a long-term stability of the GPU in terms of performance and stability through constant monitoring, performance tuning, and troubleshooting by our experts." },
  { title: "Performance-Oriented Cost Strategy", body: "We maximize compute usage and assigning GPU resources to minimize infrastructure wastage and maximize investment." },
];

const REVIEWS = [
  { quote: "Our GPU workloads were dramatically improved after working with this team. Their CUDA optimization strategy enhanced throughput and reduced system latency beyond expectations.", who: "CTO, AI Solutions Firm" },
  { quote: "Their way of doing things in parallel contributed to us being able to meet our tight performance deadlines. Very well acquainted and technologically reliable.", who: "VP Engineering, Data Platform Company" },
  { quote: "The extraordinary knowledge of CUDA architecture. They assisted us in moving away the CPU-bound systems to scalable GPU infrastructure quickly.", who: "Lead ML Engineer, Tech Startup" },
  { quote: "Effective communication, good performance, and quantifiable performance benefits. They used their graphics prowess to enhance our analytics engine.", who: "Director of Technology" },
  { quote: "The team provided CUDA versions that were optimized and that reduced the training time of our AI models by a large margin.", who: "Head of AI Research" },
  { quote: "Professional, responsive, and highly skilled in GPU computing. We achieved performance milestones much faster than anticipated.", who: "Product Engineering Manager" },
];

const RELATED = [
  { title: "GPU Optimization Service", body: "Finetune your GPU workloads for maximum speed and efficiency, eliminating bottlenecks and maximizing resource utilization.", href: "/gpu-optimization-service/" },
  { title: "CUDA Development Service", body: "Build high-performance parallel applications with expert CUDA development tailored for speed, scalability and precision.", href: "/cuda-development-service/" },
];

const CONTACT_HIGHLIGHTS = [
  { title: "Quick Response", body: "We respond to all inquiries within 24 hours" },
  { title: "No Obligation", body: "Free consultation with no commitment required" },
  { title: "Expert Matching", body: "We'll match you with developers suited to your project" },
];

const HIRING_OPTIONS = ["Hourly Basis", "Monthly Basis", "Fixed Price Project", "Not Sure Yet"];

const FAQS = [
  { q: "Why should I hire a dedicated CUDA developer instead of a general developer?", a: "The CUDA developers are experts in the domain of the architecture of the GPUs, parallel computing, and optimization of performance. They reorganize algorithms with a specific execution in the GPU and provide much faster and more efficient performance in comparison to the general-purpose programming methods." },
  { q: "What types of projects require CUDA development expertise?", a: "AI/ML training, real-time data analytics, scientific simulations, computer vision, video processing, high-performance computing (HPC), and additional applications that rely on the acceleration provided by a graphics card are all applications that need CUDA skills." },
  { q: "How do CUDA developers improve application performance?", a: "They enhance the execution of the kernel, thread setup, memory, and the transfer of data between the CPU and the GPU. They remove bottlenecks and maximize throughput using profiling tools to get measurable performance improvements." },
  { q: "Can you optimize an existing GPU or CUDA-based application?", a: "Of course. Our CUDA team developers will examine existing implementations, uncover inefficiencies, and implement special-purpose optimization to achieve faster execution speed, scalability, and system stability." },
  { q: "Do you support multi-GPU or distributed GPU environments?", a: "Yes. Our work is scalable multi-GPU designs, where each workload is placed on multiple processors and devices communicate in a more efficient and optimal way to provide the performance of an enterprise." },
  { q: "What hiring models are available for CUDA developers?", a: "You can hire CUDA developers on a full-time basis, part-time basis, hourly basis (time and material), and various other custom ability basis according to your project scope and performance needs." },
];

function Cards({ items, cols = "sm:grid-cols-2 lg:grid-cols-3" }: { items: { title: string; body: string }[]; cols?: string }) {
  return (
    <Stagger className={`grid ${cols} border-t border-line`} itemClassName="h-full" step={0.05}>
      {items.map((c) => (
        <div key={c.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
          <h3 className="font-sans font-medium text-[1rem] text-ink mb-2">{c.title}</h3>
          <p className="text-[0.875rem] text-ink-2">{c.body}</p>
        </div>
      ))}
    </Stagger>
  );
}

export default function HireCudaContent() {
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
                  Hire CUDA Developers
                </motion.span>
              </span>
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-5 font-mono text-[0.9375rem] text-ink-3">
              CUDA Programming Experts | GPU Acceleration Engineers | Parallel Processing Specialists
            </motion.p>
            <motion.p
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
              className="mt-6 max-w-[58ch] text-[1.0625rem] text-ink-2">
              Create high-performance GPU applications using expert CUDA programmers. We develop optimized parallel designs, stream memory, and access the full potential of GPUs to run AI models, simulations, and other data-intensive computing environments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.23, 1, 0.32, 1] }}
              className="mt-9 flex flex-col gap-6">
              <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary w-fit">HIRE CUDA DEVELOPER NOW</a></Magnetic>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.875rem] text-ink-2">
                {BADGES.map((b) => (
                  <li key={b} className="flex items-center gap-2"><span className="w-4 h-px bg-ink shrink-0" aria-hidden="true" />{b}</li>
                ))}
              </ul>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="hidden lg:block">
            <HeroIllustration />
          </motion.div>
        </div>
      </section>

      <main>
        {/* Intro */}
        <section className="section" id="intro">
          <div className="container-j">
            <div className="max-w-3xl flex flex-col gap-5">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Enhance GPU Performance with Dedicated CUDA Engineers</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[68ch]">Our CUDA development team assists companies in taking CPU-based systems to high-performance asymmetric solutions on GPUs. Scheduling the algorithms to perform the parallel execution and refining the thread-level activities, we provide significant improvements in the speed and resource usage. Our engineers become a natural part of your design, all the way to optimization of deployment, and concentrate on providing stable, scalable, and production-ready CUDA implementations.</p></Reveal>
              <Reveal delay={0.1}><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">TALK TO OUR EXPERT</a></Magnetic></Reveal>
            </div>
          </div>
        </section>

        {/* Technical expertise */}
        <section className="section bg-paper border-y border-line" id="expertise">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Technical Expertise of Our CUDA Developers</SplitHeading>
            </div>
            <Cards items={EXPERTISE} />
          </div>
        </section>

        {/* How to hire */}
        <section className="section" id="how-to-hire">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">How to Hire Our CUDA Developers?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">The process of hiring CUDA skills to work on your project is simple and clear.</p></Reveal>
            </div>
            <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 border-t border-line" itemClassName="h-full" step={0.05}>
              {HIRE_STEPS.map((p, i) => (
                <div key={p.title} className="group h-full p-5 md:p-6 border-b border-line hover:bg-tint transition-all duration-300">
                  <span className="font-mono text-[0.875rem] text-ink-3">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-sans font-medium text-[1rem] text-ink mt-3 mb-2">{p.title}</h3>
                  <p className="text-[0.875rem] text-ink-2">{p.body}</p>
                </div>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Why hire from us */}
        <section className="section bg-paper border-y border-line" id="why-hire">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Hire CUDA Developers from Us?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Our entire process revolves around the peace of mind for our clients, explore what you get when you choose us.</p></Reveal>
            </div>
            <Cards items={WHY_HIRE} />
          </div>
        </section>

        {/* Hiring models */}
        <section className="section" id="hiring-models">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Flexible Hiring Models</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">To achieve your performance goals and the scope of developing CUDA, use the appropriate engagement model.</p></Reveal>
            </div>
            <Cards items={HIRING_MODELS} cols="sm:grid-cols-2 lg:grid-cols-4" />
          </div>
        </section>

        {/* CTA banner */}
        <section className="relative section always-dark border-y border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-xl">Ready to unleash the power of CUDA?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[58ch]">Accelerate your compute workloads with production-grade CUDA engineering and performance-first architecture.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Take Charge</a></Magnetic></div></Reveal>
          </div>
        </section>

        {/* Why choose us */}
        <section className="section" id="why-choose">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Why Choose Us for CUDA Development?</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Partner with a CUDA-focused engineering team that blends deep GPU expertise with practical business execution. We assist companies in changing the compute-intensive systems into scalable and performance-oriented architectures.</p></Reveal>
            </div>
            <Cards items={WHY_CHOOSE} />
          </div>
        </section>

        {/* Reviews */}
        <section className="section bg-paper border-y border-line" id="reviews">
          <div className="container-j">
            <div className="grid lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
              <div className="lg:col-span-8 flex flex-col gap-4">
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Trusted by Global Technology Leaders</SplitHeading>
                <Reveal><p className="text-ink-2 text-[1.0625rem] max-w-[60ch]">Companies in all sectors are using our CUDA knowledge to address the intricate performance issues and speed up the most important applications. Long-term partnerships are developed as a result of our focus on precision engineering and quantifiable outcomes.</p></Reveal>
              </div>
              <div className="lg:col-span-4 flex flex-col gap-1 lg:items-end">
                <span className="font-mono text-[0.8125rem] text-ink-3 uppercase tracking-wider">Jashom Reviews</span>
                <span className="font-mono text-[2.5rem] leading-none text-ink font-bold">4.8</span>
                <span className="text-[0.8125rem] text-ink-2">Powered by Clutch</span>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {REVIEWS.map((t, i) => (
                <Reveal key={i} delay={i * 0.06} className="h-full">
                  <figure className="h-full flex flex-col p-6 md:p-8 hover:bg-tint transition-all duration-300 border border-line">
                    <blockquote className="font-mono text-[16px] leading-[1.45] text-ink flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
                    <figcaption className="mt-6 pt-5 border-t border-line text-[0.9375rem] text-ink-2">{t.who}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Related services */}
        <section className="section" id="related">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Explore Related GPU Services</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[60ch]">Want to hire best CUDA developer experts? Browse some other complimentary GPU oriented services that can make the system even more performance-efficient and scalable.</p></Reveal>
            </div>
            <Stagger className="grid md:grid-cols-2 gap-6" step={0.08}>
              {RELATED.map((r) => (
                <div key={r.title} className="group flex flex-col p-6 md:p-8 border border-line hover:bg-tint transition-all duration-300">
                  <h3 className="text-[1.25rem] font-medium mb-3">{r.title}</h3>
                  <p className="text-ink-2 mb-6 flex-1">{r.body}</p>
                  <a href={r.href} className="link-line text-ink font-medium text-[0.9375rem] w-fit">Know More →</a>
                </div>
              ))}
            </Stagger>
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
                <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">Get Started with Expert CUDA Developers</SplitHeading>
                <Reveal><p className="text-ink-2 max-w-[48ch]">Fill out the form and our team will get back to you within 24 hours. Share your project requirements and we&rsquo;ll match you with the perfect CUDA developer for your needs.</p></Reveal>
                <Reveal delay={0.1}>
                  <div className="mt-2 flex flex-col gap-5">
                    {CONTACT_HIGHLIGHTS.map((h) => (
                      <div key={h.title}>
                        <p className="text-ink font-medium mb-1">{h.title}</p>
                        <p className="text-[0.9375rem] text-ink-2">{h.body}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
              <div className="lg:col-span-7">
                {status === "sent" ? (
                  <div className="h-full flex flex-col items-start justify-center bg-linen border border-line rounded-none p-10">
                    <p className="font-mono text-3xl mb-3">Request received.</p>
                    <p className="text-ink-2">Thank you — we&rsquo;ll get back to you within 24 hours.</p>
                  </div>
                ) : (
                  <Reveal delay={0.08}>
                    <form onSubmit={(e) => { e.preventDefault(); setStatus("sent"); }} className="grid sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5"><label htmlFor="name" className="text-sm text-ink-2">Full Name *</label><input id="name" name="name" required autoComplete="name" className="field-j" placeholder="Your name" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="email" className="text-sm text-ink-2">Email Address *</label><input id="email" name="email" type="email" required autoComplete="email" className="field-j" placeholder="you@company.com" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="phone" className="text-sm text-ink-2">Phone Number</label><input id="phone" name="phone" type="tel" autoComplete="tel" className="field-j" placeholder="+91" /></div>
                      <div className="flex flex-col gap-1.5"><label htmlFor="company" className="text-sm text-ink-2">Company Name</label><input id="company" name="company" autoComplete="organization" className="field-j" placeholder="Company name" /></div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2">
                        <label htmlFor="model" className="text-sm text-ink-2">Preferred Hiring Model *</label>
                        <select id="model" name="model" required defaultValue="" className="field-j">
                          <option value="" disabled>Select a hiring model</option>
                          {HIRING_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-1.5 sm:col-span-2"><label htmlFor="message" className="text-sm text-ink-2">Project Requirements *</label><textarea id="message" name="message" rows={5} required className="field-j resize-y" placeholder="Tell us about your project and performance targets." /></div>
                      <div className="sm:col-span-2 flex flex-col gap-3 items-start">
                        <button type="submit" className="btn btn-primary">Submit Request</button>
                        <p className="text-[0.8125rem] text-ink-3">By submitting this form, you agree to our privacy policy and terms of service.</p>
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
