import InvitationsClient from "./client";

// Required for static export - generate placeholder paths
export async function generateStaticParams() {
  return [{ familyId: 'placeholder' }];
}

export default function Page() {
  return <InvitationsClient />;
}
