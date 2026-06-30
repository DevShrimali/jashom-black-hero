import SplitHeading from "@/components/motion/SplitHeading";
import { Reveal, Stagger } from "@/components/motion/Reveal";

const POSTS = [
  {
    title: "LLM Inference Optimization on Constrained GPU Infrastructure",
    category: "Enterprise AI · LLM Deployment",
    tags: ["CUDA", "TensorRT", "LLM"],
    image: "/blog-img/gpu.optimization.png",
  },
  {
    title: "GPU Workload Orchestration Framework on Rocky Linux 9.7",
    category: "Infrastructure · GPU Operations",
    tags: ["FastAPI", "Docker", "Rocky Linux"],
    image: "/blog-img/cuda.service.hero.png",
  },
  {
    title: "Cloud GPU Fine-Tuning Strategy for Production LLM Deployment",
    category: "AI Engineering · Cloud Infrastructure",
    tags: ["LoRA", "DeepSpeed", "Cloud GPU"],
    image: "/blog-img/blog.png",
  },
];

export default function Blog() {
  return (
    <section className="section border-t border-line" id="blog">
      <div className="container-j">
        {/* Header Section */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12">
          <SplitHeading className="text-[clamp(1.6rem,2.5vw,2.1rem)]">
            Latest Insights
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
              className="bg-transparent border border-line hover:bg-paper group flex flex-col p-6 md:p-7 h-full transition-all duration-300"
            >
              {/* Blog Post Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-tint mb-6">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>

              {/* Tag / Category */}
              <p className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider mb-2.5">
                {p.category}
              </p>

              {/* Title */}
              <h3 className="font-sans font-medium text-[1.2rem] leading-snug text-ink mb-3 group-hover:underline decoration-1 underline-offset-4 transition-colors">
                {langTitleFormatter(p.title)}
              </h3>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[0.7rem] uppercase tracking-wider text-ink-2 bg-tint border border-line/60 px-2 py-0.5 rounded-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer Metadata */}
              <div className="mt-auto pt-4 border-t border-line/40 flex items-center justify-between">
                <span className="font-mono text-[0.75rem] text-ink-3 uppercase tracking-wider font-medium">
                  View More
                </span>
                <span className="inline-block transition-all duration-300 group-hover:translate-x-1.5 text-ink-3 group-hover:text-ink">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
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
