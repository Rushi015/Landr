import React from "react";
import { EditorBtns, EditorElement, useEditorStore, defaultStyles } from "@/lib/store";
import clsx from "clsx";
import { Badge, Trash } from "lucide-react";
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
    console.log(element.content)
  };

  const handleDragStart = (e: React.DragEvent, type: string) => {
    if (type === "__body") return;
    e.dataTransfer.setData("type", type);
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
      default:
        console.warn("Unknown component type:", componentType);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDeleteElement = () => {
    deleteElement(element.id);
  };

  if (type === "__body") {
    // The canvas wrapper
    return (
      <div
        style={{
          ...styles,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        className={clsx("relative w-full h-full overflow-y-auto group transition-all", {
          "border-dashed border-[1px] border-slate-300": !editor.liveMode,
          "!border-yellow-400 !border-4": editor.selected.id === id,
        })}
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
  className={clsx("group transition-all border bg-white", {
    "border-dashed border-[1px] border-slate-300": !editor.liveMode,
    "!border-blue-500":
      editor.selected.id === id && editor.selected.type !== "__body",
  })}
>



      {/* Label when selected */}
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          { block: editor.selected.id === id }
        )}
      >
        {name}
      </Badge>

     
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

     
      {editor.selected.id === id && editor.selected.type !== "__body" && (
        <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
          <Trash size={16} onClick={handleDeleteElement} />
        </div>
      )}
    </Rnd>
  );
};

export default Container;


// styles 
// container 
//typography,decoration  - each font and styles till tomorrwo -6th sep

//payment ,dashboard form and backend databases 7 and image 
//hosting made websites 8
// hosting 
//3 layout includes navigation bar - awards website 
//background image maker just where we can choose a colour in this we should be make a 
//either add pattern or make a canvas for this only 
//chatgpt whats is the mostt important 
//zapier 
