"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import "@/components/sidebar/tabs/TabList";
import ComponentTab from "@/components/sidebar/tabs/component-tab";
import clsx from "clsx";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEditorStore } from "@/lib/store";
import TabList from "@/components/sidebar/tabs/TabList";
type Props = {};

const EditorSidebar = (props: Props) => {
  const editor = useEditorStore((state) => state.editor);
  return (
    <Sheet open={true} modal={false}>
      <Tabs>
        <SheetContent
          className={clsx(
            "mt-[97px] w-16 z-[80] shadow-none p-0 focus:border-none transition-all overflow-hidden",
            {
              hidden: editor.previewMode,
            }
          )}
          showX={false}
          side="right"
        >
          <TabList />
        </SheetContent>

        <SheetContent
          showX={false}
          side={"right"}
          className={clsx(
            "mt-[97px] w-80  z-[40] p-0 mr-16 focus:border-none transition-all overflow-hidden ",
            {
              hidden: editor.previewMode,
            }
          )}
        >
          <div className="grid gap-4 h-[calc(100%_-_97px)] ">
          
          
            <TabsContent value="Settings">
              <SheetHeader className="text-left p-6">
                <SheetTitle>Styles</SheetTitle>
                <SheetDescription>
                  Show your creativity! You can customize every component as you
                  like.
                </SheetDescription>
              </SheetHeader>
              Settings
            </TabsContent>

           <TabsContent value="Components">
                  <SheetHeader className="text-left p-6">
                <SheetTitle>Components </SheetTitle>
                <SheetDescription>
                 Add the components
                </SheetDescription>
              </SheetHeader>
             <ComponentTab/>
           </TabsContent>
           <TabsContent value="Media">
                 
             Media
           </TabsContent>

          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default EditorSidebar;
