import Image from "next/image";
import EditorPage from "./editor-components/editor/page";
import EditorNavigation from "./editor-components/editor-nav/page";
import EditorSidebar from "./editor-components/editor-sidebar/page";

export default function Home() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[20] bg-background overflow-hidden ">
        <div>

       
        <EditorNavigation />
        <div className="h-full  w-full">
          <EditorPage />
        </div>
         <EditorSidebar></EditorSidebar>
          </div>
    </div>
  );
}
