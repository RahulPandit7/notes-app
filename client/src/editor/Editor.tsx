import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Heading1, Heading2, Heading3,
    AlignLeft, List, ListTodo, Quote, Code, Minus,
    Copy, Calendar, Clock
} from 'lucide-react';

interface EditorProps {
    title: string;
    content: string;
    onChangeTitle: (title: string) => void;
    onChangeContent: (content: string) => void;
}

export default function Editor({ title, content, onChangeTitle, onChangeContent }: EditorProps) {
    const [wordCount, setWordCount] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Placeholder.configure({
                placeholder: 'Start writing...',
            }),
            TaskList,
            TaskItem.configure({
                nested: true,
            }),
            CharacterCount,
        ],
        content: content || '',
        onUpdate: ({ editor }) => {
            setWordCount(editor.storage.characterCount.words());
            onChangeContent(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'tiptap-custom-editor',
            },
        },
    });

    useEffect(() => {
        if (editor && editor.getHTML() !== content) {
            editor.commands.setContent(content || '');
        }
    }, [content, editor]);

    // Formatting date
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    if (!editor) {
        return null;
    }

    const ToolbarButton = ({ onClick, isActive = false, children }: { onClick: () => void, isActive?: boolean, children: React.ReactNode }) => (
        <button
            type="button"
            onClick={onClick}
            className={`p-1.5 rounded-md flex items-center justify-center transition-all duration-200 ${isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
        >
            {children}
        </button>
    );

    const Divider = () => (
        <div className="w-px h-5 bg-border/60 mx-1" />
    );

    return (
        <div className="flex flex-col bg-background text-foreground font-sans w-full border rounded-lg shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-ring transition-shadow">
            <style>{`
                .tiptap-custom-editor {
                    outline: none;
                    font-size: 1rem;
                    line-height: 1.6;
                    color: hsl(var(--foreground));
                    min-height: 200px;
                }
                .tiptap-custom-editor p.is-editor-empty:first-child::before {
                    content: attr(data-placeholder);
                    float: left;
                    color: hsl(var(--muted-foreground));
                    pointer-events: none;
                    height: 0;
                    opacity: 0.6;
                }
                .tiptap-custom-editor h1 {
                    font-size: 1.875rem;
                    font-weight: 700;
                    margin-top: 1.5rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.2;
                }
                .tiptap-custom-editor h2 {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-top: 1.25rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.3;
                }
                .tiptap-custom-editor h3 {
                    font-size: 1.25rem;
                    font-weight: 600;
                    margin-top: 1rem;
                    margin-bottom: 0.5rem;
                    line-height: 1.4;
                }
                .tiptap-custom-editor ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .tiptap-custom-editor ol {
                    list-style-type: decimal;
                    padding-left: 1.5rem;
                    margin-top: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .tiptap-custom-editor p {
                    margin-bottom: 0.75rem;
                }
                .tiptap-custom-editor blockquote {
                    border-left: 3px solid hsl(var(--border));
                    padding-left: 1rem;
                    margin-left: 0;
                    margin-right: 0;
                    margin-top: 0.75rem;
                    margin-bottom: 0.75rem;
                    font-style: italic;
                    color: hsl(var(--muted-foreground));
                    background: hsl(var(--muted) / 0.3);
                    padding-top: 0.5rem;
                    padding-bottom: 0.5rem;
                    border-radius: 0 0.5rem 0.5rem 0;
                }
                .tiptap-custom-editor pre {
                    background: hsl(var(--muted));
                    border-radius: 0.5rem;
                    padding: 1rem;
                    font-family: monospace;
                    overflow-x: auto;
                    margin-top: 0.75rem;
                    margin-bottom: 0.75rem;
                }
                .tiptap-custom-editor code {
                    background: hsl(var(--muted));
                    padding: 0.2rem 0.4rem;
                    border-radius: 0.25rem;
                    font-family: monospace;
                    font-size: 0.9em;
                }
                .tiptap-custom-editor hr {
                    border: none;
                    border-top: 2px solid hsl(var(--border) / 0.5);
                    margin: 1.5rem 0;
                }
                .tiptap-custom-editor ul[data-type="taskList"] {
                    list-style: none;
                    padding: 0;
                }
                .tiptap-custom-editor ul[data-type="taskList"] li {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }
                .tiptap-custom-editor ul[data-type="taskList"] li input[type="checkbox"] {
                    margin-top: 0.3rem;
                    width: 1rem;
                    height: 1rem;
                    accent-color: hsl(var(--primary));
                    cursor: pointer;
                }
            `}</style>

            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center gap-y-1 border-b border-border/60 px-2 py-1.5 bg-muted/20">
                <div className="flex items-center space-x-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')}>
                        <Bold size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')}>
                        <Italic size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')}>
                        <UnderlineIcon size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')}>
                        <Strikethrough size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })}>
                        <Heading1 size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })}>
                        <Heading2 size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })}>
                        <Heading3 size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => { }}>
                        <AlignLeft size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')}>
                        <List size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')}>
                        <ListTodo size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')}>
                        <Quote size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')}>
                        <Code size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                        <Minus size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                </div>
                <div className="flex-1" />
                <div className="flex items-center space-x-1 pr-1">
                    <ToolbarButton onClick={() => navigator.clipboard.writeText(editor.getText())}>
                        <Copy size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor Area */}
            <div className="flex-1 w-full p-4 flex flex-col gap-4">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onChangeTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full bg-transparent text-2xl font-serif font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all"
                />

                <div className="flex items-center flex-wrap gap-4 text-xs text-muted-foreground/80 pb-3 border-b border-border/40">
                    <div className="flex items-center gap-1.5 cursor-default">
                        <Calendar size={13} />
                        <span>{currentDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5 cursor-default">
                        <Clock size={13} />
                        <span>{wordCount} words</span>
                    </div>
                </div>

                <div className="w-full animate-in fade-in duration-500">
                    <EditorContent editor={editor} />
                </div>
            </div>
        </div>
    );
}