import React from 'react'
import {  MenuIcon } from 'lucide-react';
import { EditorBtns } from "@/lib/store";
type Props = {}

const NavBarPlaceHolder = (props: Props) => {
     const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
            if (type === null) return;
            e.dataTransfer.setData("type", type);
            console.log("DragStart stored type:", e.dataTransfer.getData("type"));
        };
  return (
     <div draggable onDragStart={(e) => handleDragStart(e, "navbar")} className=" h-14 w-14 bg-muted/70 rounded-lg p-2 flex flex-row gap-[4px]">
      
         <MenuIcon className='h-full rounded-sm bg-muted border-muted-foreground/50 w-full ' />

      

    </div>
  )
}

export default NavBarPlaceHolder