import LearningPathDetailClient from "./client";

export default function LearningPathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <LearningPathDetailClient params={params} />;
}
