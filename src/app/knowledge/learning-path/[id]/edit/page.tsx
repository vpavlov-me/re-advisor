import EditLearningPathClient from "./client";

export default function EditLearningPathPage({ params }: { params: Promise<{ id: string }> }) {
  return <EditLearningPathClient params={params} />;
}
