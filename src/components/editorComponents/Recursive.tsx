import React from "react";
import { EditorElement } from "@/lib/store";
import TextComponent from "./text";
import Container from "./container";
import NavBar from "./navbar";
type Props = {
  element: EditorElement;
};

const Recursive = ({ element }: Props) => {
  switch (element.type) {
    case "text":  
      return <TextComponent element={element} />;

    case "container":
      return <Container element={element} />;
    case "__body":
      return <Container element={element} />;
      case "navbar":
      return <NavBar/>;
    default:
      return null;
  }
};

export default Recursive;
