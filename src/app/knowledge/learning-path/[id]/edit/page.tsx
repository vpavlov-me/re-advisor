import EditLearningPathClient from "./client";

export async function generateStaticParams() {
  return [{ id: 'lp-1' }];
}

export default function EditLearningPathPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditLearningPathClient params={params} />;
}
