import React, { useRef, useState, useEffect } from "react";
import Editor from "@monaco-editor/react";

function CodeEditor() {
  const [fileName, setFileName] = useState("script.js");
  const [output, setOutput] = useState("");
  const editorRef = useRef(null);

  const files = {
    "script.py": {
      name: "script.py",
      language: "python",
    },
    "index.html": {
      name: "index.html",
      language: "html",
    },
    "script.js": {
      name: "script.js",
      language: "javascript",
    },
  };

  useEffect(() => {
    const originalConsoleLog = console.log;
    console.log = (...args) => {
      originalConsoleLog(...args);
      setOutput((prevOutput) => prevOutput + args.join(" ") + "\n");
    };

    return () => {
      console.log = originalConsoleLog;
    };
  }, []);

  const handleEditor = (editor, monaco) => {
    editorRef.current = editor;
  };

  const runCode = () => {
    try {
      const code = editorRef.current.getValue();
      setOutput("");
      eval(code);
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };
  

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>
          <Editor
            height="50vh"
            width="100%"
            theme="vs-dark"
            onMount={handleEditor}
            defaultLanguage={files[fileName].language}
            path={files[fileName].language}
          />
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          {output && (
            <div>
              <h2>Console Output:</h2>
              <pre>{output}</pre>
            </div>
          )}
        </div>
      </div>
      <button onClick={runCode}>Run Code</button>
    </div>
  );
}

export default CodeEditor;
