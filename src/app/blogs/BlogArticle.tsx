"use client";

import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { BLOG_POSTS, type BlogPost } from "./blog-posts-data";

export default function BlogArticle({ post }: { post: BlogPost }) {
  const reduced = useReducedMotion();

  // Find up to 4 related posts (excluding the current one) prioritizing matching tags or category
  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const commonTagsA = a.tags.filter((t) => post.tags.includes(t)).length;
      const commonTagsB = b.tags.filter((t) => post.tags.includes(t)).length;
      if (commonTagsA !== commonTagsB) {
        return commonTagsB - commonTagsA;
      }
      return a.category === post.category ? -1 : 1;
    })
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section id="hero" className="always-dark relative flex flex-col overflow-clip">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_-10%,var(--radial-glow),transparent_60%)]" aria-hidden="true" />
        <div className="container-j relative pt-32 pb-12 max-w-5xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-[0.8125rem] tracking-[0.2em] text-ink-3 uppercase mb-6">
            Insight · {post.date}
          </motion.p>
          <h1 className="text-[clamp(1.5rem,2.4vw,2.1rem)] leading-[1.15]">
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
        <article className="section pt-6">
          <div className="container-j max-w-5xl grid lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Column: Article content */}
            <div className="lg:col-span-8 flex flex-col gap-5">
              {/* Hero image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-tint mb-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pb-4 border-b border-line">
                {post.tags.map((t) => (
                  <span key={t} className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm">
                    {t}
                  </span>
                ))}
              </div>

              {post.body.map((b, i) => {
                if (b.t === "h") return <h2 key={i} className="text-[1.25rem] md:text-[1.4rem] font-medium text-ink mt-6">{b.text}</h2>;
                if (b.t === "p") return <p key={i} className="text-ink-2 leading-relaxed max-w-[70ch]">{b.text}</p>;
                return (
                  <ul key={i} className="flex flex-col gap-2.5 my-2">
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

            {/* Right Column: Sidebar suggested blogs */}
            <aside className="lg:col-span-4 flex flex-col gap-5 lg:sticky lg:top-28 h-fit lg:border-l lg:border-line lg:pl-8 mt-12 lg:mt-0">
              <div className="flex flex-col gap-1 pb-3 border-b border-line">
                <span className="font-mono text-[0.75rem] tracking-[0.2em] text-ink-3 uppercase font-medium">Resources</span>
                <h3 className="font-sans font-medium text-[1.15rem] text-ink">Related Insights</h3>
              </div>
              <div className="flex flex-col">
                {relatedPosts.map((rp) => (
                  <a
                    key={rp.slug}
                    href={`/blogs/${rp.slug}/`}
                    className="group flex gap-4 py-4 border-b border-line/60 last:border-b-0 hover:bg-paper/40 transition-all duration-300"
                  >
                    <div className="relative aspect-[16/10] w-24 shrink-0 overflow-hidden bg-tint">
                      <img
                        src={rp.image}
                        alt={rp.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center min-w-0">
                      <span className="font-mono text-[0.625rem] text-ink-3 uppercase tracking-wider mb-1 truncate block">
                        {rp.category.split(" · ")[0]}
                      </span>
                      <h4 className="font-sans font-medium text-[0.875rem] text-ink leading-snug group-hover:underline decoration-1 underline-offset-2 transition-colors line-clamp-2">
                        {rp.title}
                      </h4>
                    </div>
                  </a>
                ))}
              </div>
            </aside>
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
