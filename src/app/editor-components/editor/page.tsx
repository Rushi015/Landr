"use client";

import clsx from "clsx";
import { useEditorStore } from "@/lib/store";
import React from "react";
import { Button } from "@/components/ui/button";
import { EyeOff } from "lucide-react";
type Props = {};
import Recursive from "@/components/editorComponents/Recursive";
const EditorPage = (props: Props) => {
  const editor = useEditorStore((state) => state.editor);
  console.log(editor.previewMode);
  console.log(editor.selected.styles)
  const Preview = useEditorStore((state) => state.togglePreviewMode);
  function handleUnPreview() {
    Preview();
  }

  return (
    <div
      className={clsx(
        "use-automation-zoom-in h-[calc(100vh_-_97px)] overflow-hidden mr-[385px] transition-all rounded-md ",
        {
          "!p-0 !mr-0 !mb-0": editor.previewMode === true,
          // "!w-[850px]": state.editor.device === "Tablet",
          // "!w-[420px]": state.editor.device === "Mobile",
          // "w-full": state.editor.device === "Desktop",
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
        editor.elements.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}
    </div>
  );
};

export default EditorPage;
