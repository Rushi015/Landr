import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EditorElement, useEditorStore } from "@/lib/store";
//import { Monosans, Monosans_Italic } from "@/lib/font"; 
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  element: EditorElement;
};




const SettingTabs = ({ element }: Props) => {






const editor = useEditorStore(state=>state.editor)
const updateElement = useEditorStore(state=>state.updateElement)



// const fonts = [
//   { label: "Mona Sans", value: Monosans.style.fontFamily },
//   { label: "Mona Sans Italic", value: Monosans_Italic.style.fontFamily },
//   { label: "Arial", value: "Arial, sans-serif" },
//   { label: "Inter", value: "Inter, sans-serif" },
// ];

const handleOnChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
  const styleKey = e.target.id as keyof React.CSSProperties;
  let value: string | number = e.target.value;

  // Ensure px values are strings


  updateElement({
    ...editor.selected, // always update the selected element from store
    styles: {
      ...editor.selected.styles,
      [styleKey]: value,
    },
  });
};


  return (
    <Accordion type="multiple" className="w-full " defaultValue={[ "Dimensions","Typography"]}>
    <AccordionItem value="Dimensions" className="px-0 py-0 border-y">
      <AccordionTrigger className="px-6 !no-underline">
        Dimensions
      </AccordionTrigger>
      <AccordionContent className="px-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div>
                  <Label className="text-muted-foreground">Height</Label>
                  <Input
                    id="height"
                    placeholder="px"
                    onChange={handleOnChanges}
                    value={editor.selected.styles.height}
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">Width</Label>
                  <Input
                    placeholder="px"
                    id="width"
                    onChange={handleOnChanges}
                    value={editor.selected.styles.width}
                  />
                </div>
              </div>
              <p>Margin px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      id="marginTop"
                      placeholder="px"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.marginTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="marginBottom"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.marginBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="marginLeft"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.marginLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="marginRight"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.marginRight}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p>Padding px</p>
              <div className="flex gap-4 flex-col">
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Top</Label>
                    <Input
                      placeholder="px"
                      id="paddingTop"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.paddingTop}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bottom</Label>
                    <Input
                      placeholder="px"
                      id="paddingBottom"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.paddingBottom}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div>
                    <Label className="text-muted-foreground">Left</Label>
                    <Input
                      placeholder="px"
                      id="paddingLeft"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.paddingLeft}
                    />
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Right</Label>
                    <Input
                      placeholder="px"
                      id="paddingRight"
                      onChange={handleOnChanges}
                      value={editor.selected.styles.paddingRight}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>

      <AccordionItem value="Typography" className="px-0 py-0 border-y">
           <AccordionTrigger className="px-6 !no-underline ">Typography</AccordionTrigger>
         <AccordionContent className="px-6">
             <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
<Select
  onValueChange={(val) => {
    updateElement({
      ...editor.selected,
      styles: {
        ...editor.selected.styles,
        fontFamily: val,
      },
    });
  }}
>
  <SelectTrigger className="w-full">
    <SelectValue placeholder="Choose font" />
  </SelectTrigger>
  {/* <SelectContent>
    {fonts.map((font) => (
      <SelectItem key={font.value} value={font.value}>
        {font.label}
      </SelectItem>
    ))}
  </SelectContent> */}
</Select>

                    </div>
             </div>
         
         </AccordionContent>

      </AccordionItem>
    </Accordion>
  );
};

export default SettingTabs

