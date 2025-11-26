import { redirect } from "next/navigation";
import { auth } from "../api/auth/[...nextauth]/auth";
import { getAuthUserdetails, getWorkSpaceByUserID } from "@/lib/queries";
import WorkspaceForm from "@/components/WorkSpace/WorkspaceForm";

const WorkSpacePage = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  const user = await getAuthUserdetails();
  if (!user?.id) {
    throw new Error("User ID not found");
  }
  const existingWorkSpace = await getWorkSpaceByUserID(user?.id);
  if (existingWorkSpace) {
    // User already has a workspace, send them to their dashboard
    redirect(`/workspace/${existingWorkSpace.id}`);
  }
  return (
    <div>
      <WorkspaceForm user={user} />
    </div>
  );
};

export default WorkSpacePage;
