import { Metadata } from "next";
import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";

import { PageWrapper } from "@/components/PageWrapper";

type Params = { uid: string };

export default async function Page({ params }: { params: Params }) {
  if (!params) notFound();

  const client = createClient();
  const page = await client
    .getByUID("page", params.uid)
    .catch(() => notFound());

  return (
    <PageWrapper>
      <SliceZone slices={page.data.slices} components={components} />
    </PageWrapper>
  );
}

type Props = {
  params: { uid: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const client = createClient();

  const page = await client.getByUID("page", params!.uid).catch(() => {});

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

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("page").catch(() => []);

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
