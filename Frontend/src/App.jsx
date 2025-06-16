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
  const [loading, setLoading] = useState(false); // Added loading state

  useEffect(() => {
    Prism.highlightAll();
  }, [])
  
  async function reviewCode() {
    setLoading(true); // Start loader
    try {
      const response = await axios.post('https://ai-code-reviewer-m0ma.onrender.com/ai/ask-ai', { code })
      setResponse(response.data);
    } catch (err) {
      setResponse("Error fetching data");
    } finally {
      setLoading(false); // Stop loader
    }
  }

  return (
    <main style={{ 
      display: 'flex', 
      height: '100vh',
      overflow: 'hidden',
      margin: 0
    }}>
      {/* Left Panel - Editor */}
      <div style={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        background: '#1e1e1e',
        overflow: 'hidden'
      }}> 
        <div style={{
          flex: 1,
          overflow: 'auto',
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
              minHeight: '100%',
              border: '1px solid #444',
              borderRadius: '6px',
              lineHeight: '1.6',
              boxSizing: 'border-box'
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
            flexShrink: 0
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
        overflow: 'auto',
        borderLeft: '1px solid #444',
        boxSizing: 'border-box'
      }}>
        {
          loading ? (
            <p style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: '16px',
              color: '#aaa'
            }}>⏳ Loading...</p>
          ) : (
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
          )
        }
      </div>
    </main>
  )
}

export default App;
