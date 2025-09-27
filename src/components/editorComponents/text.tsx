"use client";

import { EditorElement, useEditorStore } from "@/lib/store";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
type Props = {
  element: EditorElement;
};
"use client";

import { EditorElement, useEditorStore } from "@/lib/store";
import clsx from "clsx";
import { Trash } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
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

  // const handleBlurElement = () => {
  //   if (spanRef.current) {
  //     updateElement({
  //       ...element,
  //       content: {
  //         innerText: spanRef.current.innerText,
  //       },
  //     });
  //   }
  // };

  const handleDeleteElement = () => {
    deleteElement(element.id);
  };

  // Sync content with span
  // useEffect(() => {
  //   if (spanRef.current && !Array.isArray(content)) {
  //     spanRef.current.innerText = content.innerText ?? "";
  //   }
  // }, [content]);

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

  // const handleBlurElement = () => {
  //   if (spanRef.current) {
  //     updateElement({
  //       ...element,
  //       content: {
  //         innerText: spanRef.current.innerText,
  //       },
  //     });
  //   }
  // };

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
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": selected?.id === id,
          "!border-solid": selected?.id === id,
          "!border-dashed border border-slate-300": !liveMode,
        }
      )}
      onClick={handleOnClickBody}
      onDragStop={(e, d) => {
        if (editor.previewMode) return;
        updateElement({
          ...element,
          styles: {
            ...styles,
            left: `${d.x}px`,
            top: `${d.y}px`,
          },
        });
      }}
      disableDragging={editor.previewMode}
      enableResizing={!editor.previewMode && editor.previewMode}
    >
      <span
        ref={spanRef}
        suppressHydrationWarning={true}
        contentEditable={!liveMode && !previewMode}
        // onBlur={handleBlurElement}
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
    </Rnd>
  );
};
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
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500": selected?.id === id,
          "!border-solid": selected?.id === id,
          "!border-dashed border border-slate-300": !liveMode,
        }
      )}
      onClick={handleOnClickBody}
      onDragStop={(e, d) => {
        if (editor.previewMode) return;
        updateElement({
          ...element,
          styles: {
            ...styles,
            left: `${d.x}px`,
            top: `${d.y}px`,
          },
        });
      }}
      disableDragging={editor.previewMode}
      enableResizing={!editor.previewMode && editor.previewMode}
    >
      <span
        ref={spanRef}
        suppressHydrationWarning={true}
        contentEditable={!liveMode && !previewMode}
        // onBlur={handleBlurElement}
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
    </Rnd>
  );
};

export default TextComponent;

export default TextComponent;
