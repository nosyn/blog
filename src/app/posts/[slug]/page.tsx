import dynamic from 'next/dynamic';

export async function generateStaticParams() {
  const blogPosts = ['hello-world']; // FIXME: Read from file system
  const blogStaticParams = blogPosts.map((post) => ({
    slug: post,
  }));

  return blogStaticParams;
}

type BlogPageProps = { params: { slug: string } };

export default function BlogPage({ params }: BlogPageProps) {
  const PostMarkdown = dynamic(
    () => import(`@/markdown/posts/${params.slug}.mdx`)
  );

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-xl'>{params.slug}</h2>
      <PostMarkdown />
    </div>
  );
}
