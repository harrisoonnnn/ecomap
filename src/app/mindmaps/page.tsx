import { Suspense } from "react";
import { MindMapClient } from "@/components/mindmap/MindMapClient";

export default async function MindMapsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <Suspense>
      <MindMapClient topicId={topic ?? "ev-tariffs"} />
    </Suspense>
  );
}
