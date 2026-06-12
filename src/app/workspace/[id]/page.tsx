import { WorkspaceClient } from "@/components/workspace/WorkspaceClient";

export default async function WorkspacePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { id } = await params;
  const { q } = await searchParams;
  return <WorkspaceClient id={id} query={q} />;
}
