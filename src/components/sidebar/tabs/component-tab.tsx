import { EditorBtns } from "@/lib/store";
import React from "react";
import Textplaceholder from "../sidebar-components-placeholder/text-placeholder";
import ContainerPlaceholder from "../sidebar-components-placeholder/container-placeholder";
type Props = {};

const ComponentTab = (props: Props) => {
  const elements: {
    Component: React.ReactNode;
    label: string;
    id: EditorBtns;
    group: "elements"; //|"layout"
  }[] = [
    {
      Component: <Textplaceholder />,
      label: "Text",
      id: "text",
      group: "elements",
    },
     {
            Component: <ContainerPlaceholder />,
            label: "Container",
            id: "container",
            group: "elements",
        },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {elements.map((element) => (
        <div
          key={element.id}
          className="flex-col items-center justify-center flex"
        >
          {element.Component}
          <span className="text-muted-foreground">{element.label}</span>
        </div>
      ))}
    </div>
  );
};

export default ComponentTab;
