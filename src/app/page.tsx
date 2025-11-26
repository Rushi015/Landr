"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function SignInPage() {
   const handleClick = () => {
      signIn("google", { callbackUrl: "/workspace" });
   };
   return (
      <div className="flex flex-row h-screen items-center justify-center">
         {/*<Button onClick={handleClick}>Sign in with Google</Button>*/}

         <button
            onClick={() => {
               redirect("/editor-components");
            }}
         >
            go to the editor{" "}
         </button>
      </div>
   );
}

/*what is important right now
    authentication
    subaccount and hosting of that website
    little bit abbout sections/containers/accepting stripe
    - frontend part

    whole thing on the aws i have to see that
    media file uploading

    how i am thinking this is like the flow is
    first auth ---> then subdomains figure out the video


i am watching the video now
until the whole authentication

i am not wrting the db on api routes what is the difference between

*/
