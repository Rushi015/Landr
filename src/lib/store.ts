import { create } from 'zustand'

export type DeviceTypes = "Desktop" | "Mobile" | "Tablet";
export type EditorBtns =
  | "text"
  | "container"
  | "section"
  | "contactForm"
  | "paymentForm"
  | "link"
  | "2Col"
  | "video"
  | "__body"
  | "image"
  | null
  |"navbar"
  | "3Col";

  
 export const defaultStyles: React.CSSProperties = {
    backgroundPosition: "center",
    objectFit: "cover",
    backgroundRepeat: "no-repeat",
    textAlign: "left",
    opacity: "100%",
    height:"100px",
    width:"1000px"

};
export type EditorElement = {
  id: string;
  styles: React.CSSProperties;
  name: string;
  type: EditorBtns;
  content: EditorElement[] | { innerText?: string };
};

export type Editor = {
  liveMode: Boolean;
  elements: EditorElement[];
  selected: EditorElement;
  device: DeviceTypes;
  previewMode: boolean;
};

export type HistoryState = {
  history: Editor[];
  currentIndex: number;
};

export type EditorState = {
  editor: Editor;
  history: HistoryState;
};

// export type initialEditorState = EditorState['editor']
// export type initialHistoryState = EditorState['history']

const initialEditorState: EditorState["editor"] = {
  elements: [
    {
      content: [],
      id: "_body",
      name: "Body",
      styles: {},
      type: "__body",
    },
  ],
  selected: {
    content: [],
    id: "__body",
    name: "Body",
    styles: {},
    type: "__body",
  },
  liveMode: false,
  device: "Desktop",
  previewMode: false,
};

const initialHistoryState: EditorState["history"] = {
  history: [initialEditorState],
  currentIndex: 0,
};

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState,
};

const addAnElement = (
  editorArray: EditorElement[],
  containerId: string,
  elementDetails: EditorElement
): EditorElement[] => {
  return editorArray.map((item) => {
    if (item.id === containerId && Array.isArray(item.content)) {
      return {
        ...item,
        content: [...item.content, elementDetails],
      };
    } else if (Array.isArray(item.content)) {
      return {
        ...item,
        content: addAnElement(item.content, containerId, elementDetails),
      };
    }
    return item;
  });
};
const updateAnElement = ( editorArray:EditorElement[],
    elementDetails:EditorElement
):EditorElement[] => {
    return editorArray.map((item)=>{
        if(item.id===elementDetails.id){
return{...item,...elementDetails}
        } else if (Array.isArray(item.content)) {
      return { ...item, content: updateAnElement(item.content, elementDetails) };

    }
    return item
    })
};
const deleteAnElement = (editorArray:EditorElement[],elementId:string) :EditorElement[]=> {
    return editorArray
    .filter((item) => item.id !== elementId)
    .map((item) => {
      if (Array.isArray(item.content)) {
        return { ...item, content: deleteAnElement(item.content, elementId) };
      }
      return item;
    });
};


const getDefaultSelectedElement =():EditorElement=>({
     id: "__body",
  name: "Body",
  styles: {},
  type: "__body",
  content: [],
})


const pushHistory = (prev:EditorState,nextEditor:Editor):HistoryState=>{
  const base = prev.history.history.slice(0,prev.history.currentIndex+1);
  const history =[...base,nextEditor];
  return{
    history,
    currentIndex:history.length-1,
  }
}

export type EditorActions = {
 addElement: (params: { containerId: string; elementDetails: EditorElement }) => void

  updateElement: (elementDetails:EditorElement) => void;
  deleteElement:(elementId:string) => void;
  changeClickedElement:(elementDetails?:EditorElement)=>{};
  chnageDevice:(device:DeviceTypes)=>void;
  togglePreviewMode:()=>{}
//    toggleLiveMode: (value?: boolean) => void;
    undo: () => void;
  redo: () => void;
  loadData: (payload: { elements?: EditorElement[]; withLive?: boolean }) => void;
};


type EditorStore = EditorState & EditorActions

export const useEditorStore = create<EditorState & EditorActions>()(
    (set,get)=>({
      ...initialState,
      addElement({ containerId, elementDetails }: { containerId: string; elementDetails: EditorElement }) {
  const state = get();
  const nextElements = addAnElement(state.editor.elements, containerId, elementDetails);
  const nextEditor: Editor = { ...state.editor, elements: nextElements };
  set({
    editor: nextEditor,
    history: pushHistory(state, nextEditor),
  });
},

 updateElement: (elementDetails) => {
        const state = get();
        const nextElements = updateAnElement(state.editor.elements, elementDetails);

        const selectedSame =
          state.editor.selected?.id === elementDetails.id;

        const nextEditor: Editor = {
          ...state.editor,
          elements: nextElements,
          selected: selectedSame ? elementDetails : state.editor.selected,
        };

        set({
          editor: nextEditor,
          history: pushHistory(state, nextEditor),
        });
      },

       deleteElement: (elementId) => {
        const state = get();
        const nextElements = deleteAnElement(state.editor.elements, elementId);

        const isDeletingSelected =
          state.editor.selected?.id === elementId;

        const nextEditor: Editor = {
          ...state.editor,
          elements: nextElements,
          selected: isDeletingSelected
            ? getDefaultSelectedElement()
            : state.editor.selected,
        };

        set({
          editor: nextEditor,
          history: pushHistory(state, nextEditor),
        });
      },

      changeClickedElement: (elementDetails) => {
        const state = get();
        const nextEditor: Editor = {
          ...state.editor,
          selected: elementDetails ?? getDefaultSelectedElement(),

    
        };

        // Your original reducer also pushed to history here; we mirror that:
        set({
          editor: nextEditor,
          history: pushHistory(state, nextEditor),
        });
      },

      changeDevice: (device:DeviceTypes) => {
        const state = get();
        const nextEditor: Editor = { ...state.editor, device };
        // In your reducer, device change didn't push to history. Keep that behavior:
        set({ editor: nextEditor });
      },

        togglePreviewMode:() => {
        const state = get();
        const nextEditor: Editor = {
          ...state.editor,
          previewMode: !(state.editor.previewMode),
        };

        
        // In your reducer, preview toggle didn't push history. Keep it:
        set({ editor: nextEditor });
      },
     
      undo: () => {
        const state = get();
        if (state.history.currentIndex > 0) {
          const previousIndex = state.history.currentIndex - 1;
          const previousEditor = { ...state.history.history[previousIndex] };
          set({
            editor: previousEditor,
            history: { ...state.history, currentIndex: previousIndex },
          });
        }
      },

        redo: () => {
        const state = get();
        if (state.history.currentIndex < state.history.history.length - 1) {
          const nextIndex = state.history.currentIndex + 1;
          const nextEditor = { ...state.history.history[nextIndex] };
          set({
            editor: nextEditor,
            history: { ...state.history, currentIndex: nextIndex },
          });
        }
      },


       loadData: ({ elements, withLive }) => {
        // Mirror your reducer's LOAD_DATA: reset to initial, then apply
        const editor: Editor = {
          ...initialEditorState,
          elements: elements ?? initialEditorState.elements,
          liveMode: !!withLive,
        };

        const history: HistoryState = {
          history: [editor],
          currentIndex: 0,
        };

        set({ editor, history });
      },

    })
)


//today list 
/*

1st is to complete the 
this basic editor with the text and container component and 
to built the one home layout component 
and to move and resize the component with cursor and 
height and width must change by it 




*/





