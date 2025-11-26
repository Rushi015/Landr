import React from "react";

import { SquareDashed } from "lucide-react";
import { EditorBtns } from "@/lib/store";

const SectionPlaceholder = () => {
   const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
      if (type === null) return;
      e.dataTransfer.setData("type", type);
      console.log("DragStart stored type:", e.dataTransfer.getData("type"));
   };
   return (
      <div
         draggable
         onDragStart={(e) => handleDragStart(e, "section")}
         className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]"
      >
         <div className="border-dashed border-[1px] h-full rounded-sm bg-muted border-muted-foreground/50 w-full" />
      </div>
   );
};

export default SectionPlaceholder;
