"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState } from 'react'

const MenuBar = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`px-2 py-1 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}`}
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-2 py-1 rounded ${editor.isActive('bold') ? 'bg-gray-200' : ''}`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-2 py-1 rounded ${editor.isActive('underline') ? 'bg-gray-200' : ''}`}
      >
        Underline
      </button>
    </div>
  )
}

export default function Editor({ data, handleData }) {
  const [mounted, setMounted] = useState(false)
  
  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content: data?.description || '',
    onUpdate: ({ editor }) => {
      handleData("description", editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: "prose max-w-none focus:outline-none p-4 min-h-[300px]",
      },
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return <div className="p-4 border rounded-lg">Loading editor...</div>

  return (
    <div className='flex-1 flex-wrap'>
      <section className="flex flex-col gap-3 bg-white p-4 rounded-xl">
      <h1 className="font-semibold">Description</h1>
      <div className="rounded-lg overflow-hidden">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
    </section>
    </div>
  )
}