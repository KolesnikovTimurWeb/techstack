import React, { useEffect, useState } from "react";

// @ts-ignore
import { ContentState, convertToRaw, EditorState } from "draft-js";

// @ts-ignore
import draftToHtml from "draftjs-to-html";

// @ts-ignore
import htmlToDraft from "html-to-draftjs";

// @ts-ignore
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@/styles/Editor.scss"



const WYSIWYGEditor = ({ onChange, value }:{onChange:any, value:any}) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [updated, setUpdated] = useState(false);

  
  useEffect(() => {
    if (!updated) {
      const defaultValue = value ? value : "";
      const blocksFromHtml = htmlToDraft(defaultValue);
      const contentState = ContentState.createFromBlockArray(
        blocksFromHtml.contentBlocks,
        blocksFromHtml.entityMap
      );
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  }, [value]);

  const onEditorStateChange = (editorState:any) => {
    setUpdated(true);
    setEditorState(editorState);

    return onChange(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };


  return (
      <div className="editor">
        <Editor
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
        />
      </div>
  );
};

export default WYSIWYGEditor;