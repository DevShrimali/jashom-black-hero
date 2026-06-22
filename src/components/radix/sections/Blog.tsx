/* eslint-disable @next/next/no-img-element */
import { Section, Container, Grid, Card, Flex, Heading, Text, Badge, Box, Link } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";

const posts = [
  {
    title: "When to Reach for Custom CUDA Kernels (and When Not To)",
    category: "GPU Optimization",
    excerpt: "Framework abstractions cover 90% of workloads. Here's how to recognize the other 10% — and what a kernel rewrite actually buys you.",
    date: "June 2, 2026", read: "8 min read", img: "https://picsum.photos/seed/cudakernel/640/400",
  },
  {
    title: "TensorRT vs. Raw CUDA: An Inference Latency Field Guide",
    category: "Benchmarks",
    excerpt: "Benchmarks from real production deployments across A100, H100, and L40S — where each approach wins and why.",
    date: "May 19, 2026", read: "11 min read", img: "https://picsum.photos/seed/tensorrt/640/400",
  },
  {
    title: "GPU Memory Bandwidth Is Your Real Bottleneck",
    category: "Hardware Profiling",
    excerpt: "Compute is rarely the limit. A practical walkthrough of profiling memory-bound workloads and restructuring around them.",
    date: "May 5, 2026", read: "9 min read", img: "https://picsum.photos/seed/bandwidth/640/400",
  },
];

export default function Blog() {
  return (
    <Section size="3" style={{ borderTop: "1px solid #e4e3de" }}>
      <Container style={{ maxWidth: 1280 }} px="5">
        <Flex align="center" justify="between" mb="7" wrap="wrap" gap="3">
          <span className="j-eyebrow" style={{ fontSize: "1.25rem", letterSpacing: "0.06em", color: "#111113", fontWeight: 600 }}>
            Latest Insights
          </span>
          <Link href="/blogs/" color="gray" highContrast weight="medium">
            <Flex align="center" gap="1">View All Posts <ArrowRightIcon /></Flex>
          </Link>
        </Flex>
        <Grid columns={{ initial: "1", sm: "3" }} gap="4">
          {posts.map((p) => (
            <Card key={p.title} size="3" className="j-blog-card" asChild>
              <a href="/blogs/">
                <Box style={{ aspectRatio: "16 / 10", overflow: "hidden", marginBottom: 16, background: "#eceae4" }}>
                  <img src={p.img} alt="" className="j-blog-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(1) brightness(0.95)" }} />
                </Box>
                <Flex direction="column" gap="2">
                  <Text size="1" color="gray" style={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.category}</Text>
                  <Heading as="h3" size="4">{p.title}</Heading>
                  <Text size="2" color="gray" style={{ display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.excerpt}</Text>
                  <Text size="1" color="gray" mt="2" style={{ borderTop: "1px solid #e4e3de", paddingTop: 12 }}>{p.date} · {p.read}</Text>
                </Flex>
              </a>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
