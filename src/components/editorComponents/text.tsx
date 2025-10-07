import { EditorElement, useEditorStore } from "@/lib/store";
import React, { useRef, useState } from "react";
import { Rnd } from "react-rnd";
import clsx from "clsx";

import { Doto } from "next/font/google"; 
const DotoWgt ="500"
const dotoFont = Doto({
 subsets:["latin"],
 weight:["900"]
});

type Props = { element: EditorElement };

const TextComponent = ({ element }: Props) => {
  const { id, styles, content } = element;
  const spanRef = useRef<HTMLSpanElement | null>(null);
  const editor = useEditorStore((state) => state.editor);
  const changeClickedElement = useEditorStore((state)=>state.changeClickedElement)
const handleOnClickBody =(e:React.MouseEvent)=>{
      e.stopPropagation()
      changeClickedElement(element)
}
  return (
    <Rnd
    size={{
      width:
      typeof styles.width === "string"
            ? parseInt(styles.width)
            : styles.width||200,
      height:
       typeof styles.height === "string"
            ? parseInt(styles.height)
            : styles.height ||  50,
    }}
    
     position={{
        x:
          typeof styles.left === "string"
            ? parseInt(styles.left)
            : styles.left || 0,
        y:
          typeof styles.top === "string"
            ? parseInt(styles.top)
            : styles.top || 0,
      }}
        style={{ fontFamily: "Monosans-Italic" }}
     className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": editor.selected?.id === id,
          "!border-solid": editor.selected?.id === id,
          "!border-dashed border border-slate-300": !editor.previewMode,
        }
      )}
    onClick={handleOnClickBody}
    > 
    
      <span
        className={`${dotoFont.className} text-3xl w-60 h-60`}
        
        
      
        ref={spanRef}
        contentEditable={true}
      >
        enter your text here
      </span>
    </Rnd>
  );
};

export default TextComponent;
