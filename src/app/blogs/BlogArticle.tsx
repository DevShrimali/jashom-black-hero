"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import type { BlogPost } from "./blog-posts-data";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const reduced = useReducedMotion();

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative pt-32 pb-12 max-w-3xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Insight · {post.date}
          </motion.p>
          <h1 className="text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15]">
            <span className="block overflow-clip">
              <motion.span className="block"
                initial={{ transform: reduced ? "none" : "translateY(105%)" }}
                animate={{ transform: "translateY(0%)" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}>
                {post.title}
              </motion.span>
            </span>
          </h1>
        </div>
      </section>

      <main>
        <article className="section">
          <div className="container-j max-w-3xl flex flex-col gap-5">
            {post.body.map((b, i) => {
              if (b.t === "h") return <h2 key={i} className="text-[1.25rem] md:text-[1.4rem] font-medium text-ink mt-6">{b.text}</h2>;
              if (b.t === "p") return <p key={i} className="text-ink-2 leading-relaxed max-w-[70ch]">{b.text}</p>;
              return (
                <ul key={i} className="flex flex-col gap-2.5">
                  {b.items.map((it) => (
                    <li key={it} className="flex gap-3 text-[0.9375rem] text-ink-2">
                      <span className="w-4 h-px bg-ink shrink-0 mt-3" aria-hidden="true" />
                      <span className="max-w-[66ch]">{it}</span>
                    </li>
                  ))}
                </ul>
              );
            })}
          </div>
        </article>

        {/* CTA */}
        <section className="relative section always-dark border-t border-line overflow-clip">
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
          <div className="container-j relative flex flex-col items-center text-center">
            <p className="text-[clamp(1.4rem,2.2vw,1.9rem)] text-ink max-w-xl font-medium">Ready to accelerate your AI workloads?</p>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Magnetic strength={0.18}><a href="/contact/" className="btn btn-primary">Talk to our team</a></Magnetic>
                <a href="/blogs/" className="btn btn-secondary">Back to all blogs</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
