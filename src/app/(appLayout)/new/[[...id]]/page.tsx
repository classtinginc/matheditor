import NewDocument from "@/components/NewDocument";
import type { OgMetadata } from "@/app/api/og/route";
import { findUserDocument } from "@/repositories/document";
import type { Metadata } from "next";

export async function generateMetadata({ params, searchParams }: { params: { id: string }, searchParams: { v?: string } }): Promise<Metadata> {
  if (!(params.id && params.id[0])) return {
    title: "New Document | Math Editor",
    description: "Create a new document on Math Editor",
  };
  const metadata: OgMetadata = { id: params.id[0], title: 'Math Editor' };
  const document = await findUserDocument(params.id[0], searchParams.v);
  if (document) {
    if (document.collab || document.published) {
      metadata.title = `${document.name} | Math Editor`;
      metadata.subtitle = `Last updated: ${new Date(document.updatedAt).toLocaleString()}`;
      metadata.user = { name: document.author.name, image: document.author.image!, email: document.author.email };
    } else {
      metadata.title = 'Private Document | Math Editor';
      metadata.subtitle = 'if you have access, please sign in to fork it';
    }
  } else {
    metadata.subtitle = 'Document not found';
  }
  const { title, subtitle, description } = metadata;
  const image = `/api/og?metadata=${encodeURIComponent(JSON.stringify(metadata))}`;

  return {
    title: `${title}`,
    description: description ?? subtitle,
    openGraph: {
      images: [image],
    },
  }
}
export const dynamic = "force-static";

const page = () => <NewDocument />;

export default page;