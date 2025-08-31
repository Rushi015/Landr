"use client";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowLeftCircle,
  EyeIcon,
  Laptop,
  Redo2,
  Smartphone,
  Tablet,
  Undo2,
} from "lucide-react";
import { useEditorStore } from "@/lib/store";

const EditorNavigation = () => {
 const editor = useEditorStore(state=>state.editor)    
const Preview = useEditorStore(state=>state.togglePreviewMode)

    function handlePreview(){
       Preview()
    }
    function handleUndo(){

    }
    function handleRedo(){

    }



  return (
    <TooltipProvider>
      <nav className={clsx(
          `border-b flex items-center justify-between p-6 gap-2 transition-all`,
          {
            "!h-0 !p-0 !overflow-hidden": editor.previewMode,
          }
        )}>
        <aside className="flex items-center gap-4 max-w-[260px] w-[300px] ">
          <Link href={"/"}>
            <ArrowLeftCircle />
          </Link>

          <div className="w-full">
            <Input
              defaultValue={""}
              className="border-none h-5 m-0 p-0 text-lg"
            />
          </div>


        </aside>
<aside className="flex items-center gap-2">
    <Tooltip>
    <TooltipTrigger>
   <Button 
   variant={'ghost'}
   size={'icon'}
   className="hover:bg-slate-500"
   onClick={handlePreview}
   >  <EyeIcon/></Button>
   </TooltipTrigger>
   <TooltipContent>Preview</TooltipContent>
</Tooltip>

<Tooltip>
    <TooltipTrigger>
   <Button 
   variant={'ghost'}
   size={'icon'}
   className="hover:bg-slate-500"
   onClick={handleUndo}
   >  <Undo2/></Button>
   </TooltipTrigger>
 <TooltipContent>Undo</TooltipContent>

   </Tooltip>

<Tooltip>
     <TooltipTrigger>
   <Button 
   variant={'ghost'}
   size={'icon'}
   className="hover:bg-slate-500"
   onClick={handleRedo}
   >  <Redo2/></Button>
</TooltipTrigger>
 <TooltipContent>Redo</TooltipContent>

</Tooltip>
</aside>


      </nav>
    </TooltipProvider>
  );
};
export default EditorNavigation;
