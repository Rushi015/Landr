"use client";
import clsx from "clsx";
import Recursive from "@/components/editorComponents/Recursive";
import { Button } from "@/components/ui/button";
import { useEditorStore } from "@/lib/store";
import { EyeOff } from "lucide-react";
const EditorPage = () => {
  const editor = useEditorStore((state) => state.editor);
  const Preview = useEditorStore((state)=>state.togglePreviewMode)
   function handleUnPreview() {
    Preview();
  }
  return (
    <div
    //  className="border-black border-2 h-screen mr-[385px]"
      className={clsx(
        "use-automation-zoom-in h-[calc(100vh_-_97px)] overflow-hidden mr-[385px] transition-all rounded-md ",
        {
          "!p-0 !mr-0 !mb-0": editor.previewMode === true,
          
        }
      )}
    >


       {editor.previewMode && (
        <Button
          variant={"ghost"}
          size={"icon"}
          className="w-6 h-6 bg-slate-600 p-[2px] fixed top-10 left-10 z-[100]"
          onClick={handleUnPreview}
        >
          <EyeOff />
        </Button>
      )}
      {Array.isArray(editor.elements) &&
        editor.elements.map((childELement) => (
          <Recursive key={childELement.id} element={childELement} />
        ))}
    </div>
  );
};

export default EditorPage;

/*
i will give 1 hr - page 
            1.5 hr - recursive and container
            1.5hr - store

            after all this i will try 

            text component

so recursive element is something that takes an element
checks it types then renders it 


*/
