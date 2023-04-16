import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/i18n/ko-kr";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";

function WriteEditor({ setDesc }) {
  const editorRef = useRef();

  const onChange = () => {
    const data = editorRef.current.getInstance().getHTML();
    setDesc(data);
  };

  const onUploadImage = async (blob, callback) => {
    let formData = new FormData();
    formData.append("file", blob);

    const url = await axios.post(
      `http://localhost:3000/images/upload`,
      formData,
      {
        headers: { "Content-type": "multipart/formData" },
      }
    );
    callback(`http://localhost:5000/images/${url.data.key}`);
    return false;
  };

  return (
    <div>
      <Editor
        previewStyle="tab"
        height="600px"
        width="1500px"
        initialEditType="markdown"
        useCommandShortcut={true}
        language="ko-KR"
        plugins={[colorSyntax]}
        ref={editorRef}
        onChange={onChange}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
      />
    </div>
  );
}

export default WriteEditor;
