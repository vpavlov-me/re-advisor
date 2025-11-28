import LearningPathDetailClient from "./client";

// For static export, all paths must be pre-generated
export async function generateStaticParams() {
  // Pre-generate the first learning path
  // In production, fetch all learning path IDs from database
  return [{ id: 'lp-1' }];
}

export default function LearningPathDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <LearningPathDetailClient params={params} />;
}
