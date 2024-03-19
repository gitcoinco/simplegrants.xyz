import { currentUser } from "@clerk/nextjs";
import type { PropsWithChildren } from "react";
import { PageSection } from "../(layout)/_components/page-section";
import { AdminTabs } from "./tabs";

export default async function AdminLayout({ children }: PropsWithChildren) {
  const user = await currentUser();

  if (!user?.publicMetadata.admin) {
    return <div>not authorized</div>;
  }

  return (
    <PageSection
      title="Admin"
      description="Review and approve rounds and grants"
    >
      <AdminTabs />
      {children}
    </PageSection>
  );
}
