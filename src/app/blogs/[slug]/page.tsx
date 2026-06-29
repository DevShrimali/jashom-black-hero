import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Customizer from "@/components/Customizer";
import QuickActions from "@/components/QuickActions";
import { BLOG_POSTS, getBlogPost } from "../blog-posts-data";
import BlogArticle from "../BlogArticle";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: post.metaTitle, description: post.metaDescription };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <BlogArticle post={post} />
      <Footer />
      <Customizer />
      <QuickActions
        actions={[
          { label: "Subscribe", href: "/contact/" },
          { label: "Read Latest", href: "/blogs/" },
          { label: "Write for Us", href: "/careers/" },
        ]}
      />
    </>
  );
}
