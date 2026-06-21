import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const POSTS = [
  {
    title: "When to Reach for Custom CUDA Kernels (and When Not To)",
    category: "GPU Optimization",
    excerpt: "Framework abstractions cover 90% of workloads. Here's how to recognize the other 10% — and what a kernel rewrite actually buys you.",
    date: "June 2, 2026",
    read: "8 min read",
    image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "TensorRT vs. Raw CUDA: An Inference Latency Field Guide",
    category: "Benchmarks",
    excerpt: "Benchmarks from real production deployments across A100, H100, and L40S — where each approach wins and why.",
    date: "May 19, 2026",
    read: "11 min read",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "GPU Memory Bandwidth Is Your Real Bottleneck",
    category: "Hardware Profiling",
    excerpt: "Compute is rarely the limit. A practical walkthrough of profiling memory-bound workloads and restructuring around them.",
    date: "May 5, 2026",
    read: "9 min read",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function Blog() {
  return (
    <section className="section border-t border-line" id="blog">
      <div className="container-j">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)] uppercase tracking-wider font-bold">
            LATEST INSIGHTS
          </SplitHeading>
          <Reveal>
            <a
              href="/blogs/"
              className="border border-ink px-5 py-2.5 font-mono text-[0.75rem] uppercase tracking-wider hover:bg-ink hover:text-warmwhite transition-colors duration-300 font-medium"
            >
              View All Posts
            </a>
          </Reveal>
        </div>

        {/* Blog Post Cards Grid */}
        <Stagger className="grid md:grid-cols-3 gap-6" itemClassName="h-full" step={0.07}>
          {POSTS.map((p) => (
            <a
              key={p.title}
              href="/blogs/"
              className="bg-paper border border-line group flex flex-col p-6 md:p-7 h-full hover:bg-tint hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_var(--color-line)] transition-all duration-300"
            >
              {/* Blog Post Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint mb-6">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover grayscale contrast-[1.10] brightness-[0.95] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
              </div>

              {/* Tag / Category */}
              <p className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider mb-2.5">
                {p.category}
              </p>

              {/* Title */}
              <h3 className="font-sans font-medium text-[1.2rem] leading-snug text-ink mb-3 transition-colors">
                {langTitleFormatter(p.title)}
              </h3>

              {/* Description / Excerpt */}
              <p className="text-[0.9375rem] text-ink-2 mb-6 line-clamp-3">
                {p.excerpt}
              </p>

              {/* Footer Metadata */}
              <p className="mt-auto font-mono text-[0.75rem] text-ink-3 pt-4 border-t border-line/40">
                {p.date} • {p.read}
              </p>
            </a>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

// Simple title length helper to keep text clean
function langTitleFormatter(title: string) {
  return title;
}
