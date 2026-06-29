"use client";

import { motion, useReducedMotion } from "motion/react";
import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { BLOG_POSTS } from "./blog-posts-data";

export default function BlogsContent() {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative min-h-[50svh] flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative flex-1 flex flex-col justify-center pt-28 pb-10 max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Insights • AI • GPU • CUDA
          </motion.p>
          <h1 className="text-[clamp(1.6rem,2.5vw,2.1rem)] leading-[1.1]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                Latest Blogs
              </motion.span>
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, transform: reduced ? "none" : "translateY(16px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mt-7 max-w-[62ch] text-[1.0625rem] text-ink-2">
            Practical guidance, best practices, and real engineering learnings across AI systems, GPU optimization, and enterprise technology.
          </motion.p>
        </div>
      </section>

      <main>
        {/* Articles */}
        <section className="section" id="articles">
          <div className="container-j">
            <div className="max-w-2xl mb-10 md:mb-12 flex flex-col gap-4">
              <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">All articles</SplitHeading>
              <Reveal><p className="text-ink-2 max-w-[58ch]">Practical guidance, engineering insights, and case-study learnings from the Jashom team.</p></Reveal>
            </div>
            <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-line" itemClassName="h-full" step={0.06}>
              {BLOG_POSTS.map((p) => (
                <a key={p.slug} href={`/blogs/${p.slug}/`} className="group h-full flex flex-col p-6 md:p-7 border-b border-line hover:bg-tint transition-all duration-300">
                  <span className="font-mono text-[0.75rem] tracking-wider text-ink-3 uppercase mb-4">Insight</span>
                  <h2 className="text-[1.125rem] font-medium text-ink mb-3 leading-snug">{p.title}</h2>
                  <p className="text-[0.9375rem] text-ink-2 flex-1">{p.excerpt}</p>
                  <div className="mt-6 pt-4 border-t border-line flex items-center justify-between text-[0.8125rem]">
                    <span className="text-ink-3 font-mono">{p.date}</span>
                    <span className="link-line text-ink font-medium">Read more →</span>
                  </div>
                </a>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="relative section always-dark border-y border-line overflow-clip" id="contact">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <span className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-5">Subscribe / Collaborate</span>
            <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] text-ink max-w-2xl">Have a Question or Project in Mind?</SplitHeading>
            <Reveal delay={0.1}><p className="mt-6 text-ink-2 max-w-[60ch]">Let&rsquo;s discuss how we can help you leverage AI and GPU computing to transform your business. Our team is ready to answer your questions.</p></Reveal>
            <Reveal delay={0.18}><div className="mt-10"><Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Contact Us</a></Magnetic></div></Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
