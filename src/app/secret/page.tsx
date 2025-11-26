import { Button } from "@/components/ui/button";
import { auth, signOut } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
export default async function Secret() {
  const session = await auth();
  if (!session) return redirect("/profile");

  const handleClick = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <div>
      welcome to the secret
      <div>
        <Button onClick={handleClick}>signout</Button>
      </div>
    </div>
  );
}
