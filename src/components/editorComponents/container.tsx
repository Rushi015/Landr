import React from "react";
import { EditorBtns, EditorElement, useEditorStore } from "@/lib/store";
import clsx from "clsx";
import { Badge,Trash } from "lucide-react";
import Recursive from "./Recursive";
import { v4 } from "uuid";
import { defaultStyles } from "@/lib/store";
type Props = {
  element: EditorElement;
};

const Container = ({ element }: Props) => {
  const { id, styles, type, content, name } = element;

  const editor = useEditorStore((state) => state.editor);

  const changeClickedElement = useEditorStore(
    (state) => state.changeClickedElement
  );
  const handleOnclickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(element);
    changeClickedElement(element);
  };


  const handleDragStart =(e:React.DragEvent,type:string)=>{
    if(type==="__body") return;
    e.dataTransfer.setData("type",type);
  }


     const addElement = useEditorStore(state=>state.addElement)

const handleDrop =(e:React.DragEvent,type:string)=>{
e.stopPropagation();

 const draggedType = e.dataTransfer.getData("type");
  console.log("Dropped element type:", draggedType);

const componentType = e.dataTransfer.getData("type") as EditorBtns
 
 console.log("Dropped componentType:", componentType);

  switch (componentType){
    case "container":
    addElement({
          containerId:id,
          elementDetails: {
            id: v4(),
            name: "Container",
            content: [],
            styles: { ...defaultStyles },
            type: "container",
          },
        });
        break;
         default:
        console.warn("Unknown component type:", componentType);
  }
}


 const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
const deleteElement = useEditorStore(state=>state.deleteElement)
  const handleDeleteElement =()=>{
deleteElement(element.id)
  }

  return (
    <div
      style={styles}
      className={clsx("relative p-6 transition-all group", {
        "max-w-full w-full": type === "container",
        "h-full": type === "__body",
        "overflow-y-auto": type === "__body",
        "!border-blue-500":
          editor.selected.id === id && editor.selected.type !== "__body",
        "!border-yellow-400 !border-4":
          editor.selected.id === id && editor.selected.type === "__body",
        "!border-solid": editor.selected.id === id,
        "border-dashed border-[1px] border-slate-300": !editor.liveMode,
      })}
      onClick={handleOnclickBody}
      onDragStart={(e)=> handleDragStart(e,"container")}
      onDrop ={(e)=>handleDrop(e,id)}
      onDragOver={handleDragOver}
    >
      <Badge
        className={clsx(
          "absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg hidden",
          {
            block: editor.selected.id === element.id 
          }
        )}
      >
        {element.name}
      </Badge>
      {Array.isArray(content) &&
        content.map((childElement) => (
          <Recursive key={childElement.id} element={childElement} />
        ))}

       {editor.selected.id === element.id  && editor.selected.type !== "__body" && (
                <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
                    <Trash size={16} onClick={handleDeleteElement} />
                </div>
            )}

    </div>
  );
};

export default Container;
