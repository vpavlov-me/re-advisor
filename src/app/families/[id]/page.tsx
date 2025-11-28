import FamilyDetailPage from "./client";

// Required for static export - generate placeholder paths
export async function generateStaticParams() {
  return [{ id: 'placeholder' }];
}

export default function Page() {
  return <FamilyDetailPage />;
}
