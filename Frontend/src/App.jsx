// import { useState,useEffect } from 'react'
// import './App.css'
// import Prism from 'prismjs'
// import Editor from 'react-simple-code-editor'
// import "prismjs/themes/prism.css"
// import "prismjs/components/prism-jsx"
// import axios from 'axios'
// import Markdown from 'react-markdown';
// import rehypeHighlight from 'rehype-highlight';
// import "highlight.js/styles/github-dark.css";
// function App() {
//   const [code, setCode] = useState(`function App() {return 1+1 }`);
//   const [response, setResponse] = useState(``);
//   useEffect(() => {
//     Prism.highlightAll();
//   },[])
  
//   async function reviewCode() {
// const response = await axios.post('http://localhost:3131/ai/ask-ai', { code })
//       setResponse(response.data);
//   }
//   return(
//   <>
//   <main>
//     <div className="left"> 

//     <div id="code">
//       <Editor
//         value={code}
//         onValueChange={code => setCode(code)}
//         highlight={code => Prism.highlight(code, Prism.languages.jsx)}
//         padding={10}
//         style={{
//           // fontFamily: '"Fira code", "Fira Mono", monospace',
//           // fontSize: 18,
//           // color: "#ffffff",
//           // height: "100vh"
//           fontFamily: '"Fira Code", monospace',
//           fontSize: 16,
//           theme : 'vs-dark',
//           backgroundColor: '#1e1e1e',
//           color: '#d4d4d4',
//           minHeight: '100vh',
//           border: '1px solid #333',
//           borderRadius: '8px',
//           overflow: 'auto',
//           outline: 'none'
//         }}/>
//        </div>
//     <div id="rev" onClick={reviewCode} >
//       review button
//     </div>
//     </div>

//     <div className="right">
//       {/* {response} */}
//      <Markdown rehypePlugins={[rehypeHighlight]} >{response}</Markdown>
//     </div>
//   </main>
//   </>
//   )
// }
// export default App;

import { useState, useEffect } from 'react'
import './App.css'
import Prism from 'prismjs'
import Editor from 'react-simple-code-editor'
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-jsx"
import axios from 'axios'
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import "highlight.js/styles/github-dark.css";

function App() {
  const [code, setCode] = useState(`function App() {\n  return 1 + 1;\n}`);
  const [response, setResponse] = useState('');

  useEffect(() => {
    Prism.highlightAll();
  }, [])
  
  async function reviewCode() {
    const response = await axios.post('http://localhost:3131/ai/ask-ai', { code })
    setResponse(response.data);
  }

  return (
    <main style={{ 
      display: 'flex', 
      height: '100vh',
      overflow: 'hidden', // Prevents main container from scrolling
      margin: 0
    }}>
      {/* Left Panel - Editor */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        background: '#1e1e1e',
        overflow: 'hidden' // Contains editor and button
      }}> 
        <div style={{
          flex: 1,
          overflow: 'auto', // Allows scrolling within editor
          marginBottom: '10px'
        }}>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => Prism.highlight(code, Prism.languages.jsx, 'jsx')}
            padding={16}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 14,
              backgroundColor: '#1e1e1e',
              color: '#d4d4d4',
              minHeight: '100%', // Fills available space
              border: '1px solid #444',
              borderRadius: '6px',
              lineHeight: '1.6',
              boxSizing: 'border-box' // Ensures padding is included in height
            }}
          />
        </div>
        <button 
          onClick={reviewCode}
          style={{
            padding: '10px 20px',
            background: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"Fira Code", monospace',
            fontSize: '14px',
            flexShrink: 0 // Prevents button from being squished
          }}
        >
          Review Code
        </button>
      </div>

      {/* Right Panel - Output */}
      <div style={{
        flex: 1,
        padding: '20px',
        background: '#1e1e1e',
        color: '#d4d4d4',
        overflow: 'auto', // Allows scrolling for content
        borderLeft: '1px solid #444',
        boxSizing: 'border-box'
      }}>
        <Markdown 
          rehypePlugins={[rehypeHighlight]}
          components={{
            pre({node, children, ...props}) {
              return <pre style={{
                background: '#1e1e1e',
                padding: '16px',
                borderRadius: '6px',
                overflow: 'auto',
                border: '1px solid #444',
                margin: '16px 0',
                lineHeight: '1.6',
                maxWidth: '100%',
                boxSizing: 'border-box'
              }} {...props}>{children}</pre>
            },
            code({node, inline, className, children, ...props}) {
              return <code style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: '14px',
                background: inline ? '#2d2d2d' : 'transparent',
                padding: inline ? '3px 5px' : '0',
                borderRadius: inline ? '4px' : '0',
                lineHeight: '1.6',
                wordBreak: 'break-word'
              }} {...props}>{children}</code>
            }
          }}
        >
          {response}
        </Markdown>
      </div>
    </main>
  )
}

export default App;