import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/prismicio';
import { SliceZone } from '@prismicio/react';
import { components } from '@/slices';

import { PageWrapper } from '@/components/PageWrapper';

export default async function Homepage() {
  const client = createClient();
  const page = await client.getSingle('homepage').catch(() => notFound());

  return (
    <PageWrapper>
      <SliceZone slices={page.data.slices} components={components} />
    </PageWrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle('homepage').catch(() => {});

  // Pass optional metadata, if available
  const title = {
    ...(page?.data?.meta_title
      ? { title: page.data.meta_title }
      : { title: 'Uncrowded by Design' }),
  };

  const description = {
    ...(page?.data?.meta_description
      ? { description: page.data.meta_description }
      : null),
  };

  const openGraph = {
    ...(page?.data?.meta_image?.url
      ? { openGraph: { images: page?.data?.meta_image?.url } }
      : null),
  };

  return {
    ...title,
    ...description,
    ...openGraph,
  };
}
