import React from "react";
import { EditorBtns, EditorElement, useEditorStore, defaultStyles } from "@/lib/store";
import clsx from "clsx";
import { Trash } from "lucide-react";
import Recursive from "./Recursive";
import { v4 } from "uuid";
import { Rnd } from "react-rnd";

type Props = {
   element: EditorElement;
};

const Container = ({ element }: Props) => {
   const { id, styles, type, content, name } = element;

   const editor = useEditorStore((state) => state.editor);
   const changeClickedElement = useEditorStore((state) => state.changeClickedElement);
   const addElement = useEditorStore((state) => state.addElement);
   const deleteElement = useEditorStore((state) => state.deleteElement);
   const updateElement = useEditorStore((state) => state.updateElement);

   const handleOnclickBody = (e: React.MouseEvent) => {
      e.stopPropagation();
      changeClickedElement(element);
   };

   const handleDrop = (e: React.DragEvent, type: string) => {
      e.stopPropagation();

      const componentType = e.dataTransfer.getData("type") as EditorBtns;

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      switch (componentType) {
         case "container":
            addElement({
               containerId: id,
               elementDetails: {
                  id: v4(),
                  name: "Container",
                  content: [],
                  styles: {
                     ...defaultStyles,
                     position: "relative",
                     top: y,
                     left: x,
                     width: 200,
                     height: 150,
                  },
                  type: "container",
               },
            });
            break;

         case "text":
            addElement({
               containerId: id,
               elementDetails: {
                  id: v4(),
                  name: "Text",
                  content: [],
                  styles: {
                     ...defaultStyles,
                     position: "absolute",
                     top: y,
                     left: x,
                     width: 200,
                     height: 150,
                  },
                  type: "text",
               },
            });
            break;

         case "navbar":
            addElement({
               containerId: id,
               elementDetails: {
                  id: v4(),
                  name: "Navbar",
                  content: [],
                  styles: {
                     ...defaultStyles,
                     position: "absolute",
                     top: y,
                     left: x,
                     width: 700,
                     height: 400,
                  },
                  type: "navbar",
               },
            });
            break;

         case "section":
            addElement({
               containerId: id,
               elementDetails: {
                  id: v4(),
                  name: "Section",
                  content: [],
                  styles: {
                     ...defaultStyles,
                     position: "absolute",
                     width: 700,
                     height: 400,
                  },
                  type: "section",
               },
            });
            break;
      }
   };

   const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
   };

   const handleDeleteElement = () => {
      deleteElement(element.id);
   };

   // 🟦 BODY (root canvas)
   if (type === "__body") {
      return (
         <div
            style={{
               ...styles,
               position: "relative",
               width: "100%",
               height: "100%",
            }}
            className={clsx(
               "relative w-full h-full overflow-y-auto group transition-all",
               {
                  "border-dashed border-[1px] border-slate-300": !editor.liveMode,
                  "!border-yellow-400 !border-4": editor.selected.id === id,
               },
            )}
            onClick={handleOnclickBody}
            onDrop={(e) => handleDrop(e, id)}
            onDragOver={handleDragOver}
         >
            {Array.isArray(content) &&
               content.map((childElement) => (
                  <Recursive key={childElement.id} element={childElement} />
               ))}
         </div>
      );
   }

   // 🟦 CHILD CONTAINERS
   return (
      <Rnd
         dragHandleClassName="parent-drag-handle"
         cancel=".no-parent-drag" // ⭐ prevents parent movement from child area
         size={{
            width:
               typeof styles.width === "string"
                  ? parseInt(styles.width)
                  : styles.width || 200,
            height:
               typeof styles.height === "string"
                  ? parseInt(styles.height)
                  : styles.height || 150,
         }}
         position={{
            x: typeof styles.left === "string" ? parseInt(styles.left) : styles.left || 0,
            y: typeof styles.top === "string" ? parseInt(styles.top) : styles.top || 0,
         }}
         bounds="parent"
         onClick={handleOnclickBody}
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
         onResizeStop={(e, dir, ref, delta, pos) => {
            if (editor.previewMode) return;
            updateElement({
               ...element,
               styles: {
                  ...styles,
                  width: `${ref.offsetWidth}px`,
                  height: `${ref.offsetHeight}px`,
                  left: `${pos.x}px`,
                  top: `${pos.y}px`,
               },
            });
         }}
         disableDragging={editor.previewMode}
         enableResizing={!editor.previewMode}
         className={clsx("group transition-all border bg-white rounded", {
            "border-dashed border-[1px] border-slate-300": !editor.liveMode,
            "!border-blue-500":
               editor.selected.id === id && editor.selected.type !== "__body",
         })}
      >
         {/* 🔵 Webflow drag handle */}
         <div
            className="parent-drag-handle absolute top-0 left-0 w-full h-6 bg-blue-500 text-white text-xs px-2 flex items-center"
            style={{
               pointerEvents: "auto",
               zIndex: 10,
               borderTopLeftRadius: 4,
               borderTopRightRadius: 4,
               cursor: "grab",
               userSelect: "none",
            }}
            onClick={(e) => e.stopPropagation()}
         >
            {name}
         </div>

         {/* 🟩 Child workspace (parent drag canceled here) */}
         <div
            className="no-parent-drag"
            style={{
               width: "100%",
               height: "100%",
               position: "relative",
               pointerEvents: "auto",
               zIndex: 2,
               marginTop: "24px",
            }}
            onDrop={(e) => handleDrop(e, id)}
            onDragOver={handleDragOver}
            onClick={handleOnclickBody}
         >
            {Array.isArray(content) &&
               content.map((childElement) => (
                  <Recursive key={childElement.id} element={childElement} />
               ))}
         </div>

         {editor.selected.id === id && editor.selected.type !== "__body" && (
            <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg">
               <Trash size={16} onClick={handleDeleteElement} />
            </div>
         )}
      </Rnd>
   );
};

export default Container;
