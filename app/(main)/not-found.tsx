import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import type { Content } from "@prismicio/client";
import { components } from "@/slices";
import { PageWrapper } from "@/components/PageWrapper";

export default async function Error() {
  const client = createClient();
  const page = await client.getSingle("error").catch(() => notFound());

  return (
    <PageWrapper>
      <SliceZone slices={page.data.slices} components={components} />
    </PageWrapper>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("error").catch(() => notFound());
  const metadata = await client
    .getSingle<Content.MetadataDocument>("metadata")
    .catch();

  // Pass optional metadata, if available
  const title = {
    ...(page?.data?.title ? { title: page.data.title } : null),
    ...(page?.data?.meta_title ? { title: page.data.meta_title } : null),
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
