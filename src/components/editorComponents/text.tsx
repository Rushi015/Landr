"use client";

import { EditorElement, useEditorStore } from "@/lib/store";
import React, { useRef } from "react";
import { Rnd } from "react-rnd";
import clsx from "clsx";
import { Doto } from "next/font/google";

const dotoFont = Doto({
  subsets: ["latin"],
  weight: ["900"],
});

type Props = { element: EditorElement };

const TextComponent = ({ element }: Props) => {
  const { id, styles } = element;

  const spanRef = useRef<HTMLSpanElement | null>(null);
  const editor = useEditorStore((state) => state.editor);
  const changeClickedElement = useEditorStore((state) => state.changeClickedElement);

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  return (
    <Rnd
      size={{
        width:
          typeof styles.width === "string"
            ? parseInt(styles.width)
            : styles.width || 200,
        height:
          typeof styles.height === "string"
            ? parseInt(styles.height)
            : styles.height || 50,
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
      bounds="parent"
      enableResizing={true}
      onDragStop={(e, d) => {
        element.styles.left = d.x;
        element.styles.top = d.y;
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        element.styles.width = parseInt(ref.style.width);
        element.styles.height = parseInt(ref.style.height);
        element.styles.left = position.x;
        element.styles.top = position.y;
      }}
      className={clsx(
        "group relative cursor-move",
        {
          "!border-blue-500": editor.selected?.id === id,
          "!border-solid": editor.selected?.id === id,
          "!border-dashed border border-slate-300": !editor.previewMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      <span
        ref={spanRef}
        contentEditable={!editor.previewMode}
        suppressContentEditableWarning
        className={`${dotoFont.className} block w-full h-full text-3xl outline-none`}
      >
        enter your text here
      </span>
    </Rnd>
  );
};

export default TextComponent;
[]