"use client";

import { EditorElement, useEditorStore } from "@/lib/store";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React, { useEffect, useRef } from "react";

type Props = {
  element: EditorElement;
};

const TextComponent = ({ element }: Props) => {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  // Zustand state
  const editor = useEditorStore((state) => state.editor);
  const { selected, liveMode, previewMode } = editor;

  // Zustand actions
  const changeClickedElement = useEditorStore(
    (state) => state.changeClickedElement
  );
  const updateElement = useEditorStore((state) => state.updateElement);
  const deleteElement = useEditorStore((state) => state.deleteElement);

  const { id, styles, content } = element;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    changeClickedElement(element);
  };

  const handleBlurElement = () => {
    if (spanRef.current) {
      updateElement({
        ...element,
        content: {
          innerText: spanRef.current.innerText,
        },
      });
    }
  };

  const handleDeleteElement = () => {
    deleteElement(element.id);
  };

  // Sync content with span
  // useEffect(() => {
  //   if (spanRef.current && !Array.isArray(content)) {
  //     spanRef.current.innerText = content.innerText ?? "";
  //   }
  // }, [content]);

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": selected?.id === id,
          "!border-solid": selected?.id === id,
          "!border-dashed border border-slate-300": !liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      <span
        ref={spanRef}
        suppressHydrationWarning={true}
        contentEditable={!liveMode && !previewMode}
        onBlur={handleBlurElement}
      />

      {selected?.id === id && !liveMode && !previewMode && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
          <Trash
            className="cursor-pointer"
            size={16}
            onClick={handleDeleteElement}
          />
        </div>
      )}
    </div>
  );
};

export default TextComponent;
