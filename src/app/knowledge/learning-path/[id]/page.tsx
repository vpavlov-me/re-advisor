import LearningPathDetailClient from "./client";

export async function generateStaticParams() {
  return [{ id: 'lp-1' }];
}

export default function LearningPathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <LearningPathDetailClient params={params} />;
}
