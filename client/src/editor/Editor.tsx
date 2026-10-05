import { useState, useEffect, useRef, useCallback } from 'react';
import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Underline from '@tiptap/extension-underline';
import CharacterCount from '@tiptap/extension-character-count';
import ImageBase from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';
import toast from 'react-hot-toast';
import {
    Bold, Italic, Underline as UnderlineIcon, Strikethrough,
    Heading1, Heading2, Heading3,
    AlignLeft, List, ListTodo, Quote, Code, Minus,
    Copy, Calendar, Clock, ImageIcon, X
} from 'lucide-react';

interface EditorProps {
    title: string;
    content: string;
    onChangeTitle: (title: string) => void;
    onChangeContent: (content: string) => void;
}

// Resizable Image NodeView Component
function ResizableImageNodeView({ node, updateAttributes, selected, deleteNode }: any) {
    const [resizing, setResizing] = useState(false);
    const startX = useRef(0);
    const startW = useRef(0);
    const startH = useRef(0);
    const imgRef = useRef<HTMLImageElement>(null);

    const width = Number(node.attrs.width) || 200;
    const height = Number(node.attrs.height) || 200;

    const onMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        startX.current = e.clientX;
        startW.current = imgRef.current?.offsetWidth || width;
        startH.current = imgRef.current?.offsetHeight || height;
        setResizing(true);
    }, [width, height]);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!resizing) return;
            const diffX = e.clientX - startX.current;
            const ratio = startW.current > 0 ? startH.current / startW.current : 1;
            const newW = Math.max(50, Math.round(startW.current + diffX));
            const newH = Math.max(50, Math.round(newW * ratio));
            updateAttributes({ width: newW, height: newH });
        };
        const onUp = () => setResizing(false);
        if (resizing) {
            window.addEventListener('mousemove', onMove);
            window.addEventListener('mouseup', onUp);
        }
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resizing, updateAttributes]);

    return (
        <NodeViewWrapper
            style={{ display: 'inline-block', position: 'relative', maxWidth: '100%', margin: '6px 0' }}
            data-drag-handle
        >
            <div
                className="group/img relative inline-block leading-none rounded-md transition-all"
                style={{
                    outline: selected ? '2px solid hsl(var(--primary))' : '2px solid transparent',
                    outlineOffset: 2,
                    cursor: resizing ? 'se-resize' : 'default',
                }}
            >
                <img
                    ref={imgRef}
                    src={node.attrs.src}
                    alt={node.attrs.alt ?? ''}
                    width={width}
                    height={height}
                    style={{
                        width: `${width}px`,
                        height: `${height}px`,
                        maxWidth: '100%',
                        display: 'block',
                        borderRadius: 6,
                        objectFit: 'cover',
                    }}
                    draggable={false}
                />

                {/* Close / Remove Image Button */}
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        deleteNode();
                    }}
                    title="Remove image"
                    aria-label="Remove image"
                    className={`absolute top-1.5 right-1.5 p-1 rounded-full bg-black/70 hover:bg-destructive text-white border border-white/30 shadow-md transition-all duration-150 cursor-pointer flex items-center justify-center z-10 ${
                        selected ? 'opacity-100 scale-100' : 'opacity-0 group-hover/img:opacity-100 scale-95 group-hover/img:scale-100'
                    }`}
                >
                    <X size={12} strokeWidth={2.5} />
                </button>

                {/* Resize handle — bottom-right corner */}
                {selected && (
                    <div
                        onMouseDown={onMouseDown}
                        title="Drag to resize"
                        style={{
                            position: 'absolute',
                            right: -6,
                            bottom: -6,
                            width: 14,
                            height: 14,
                            background: 'hsl(var(--primary))',
                            border: '2px solid white',
                            borderRadius: 3,
                            cursor: 'se-resize',
                            zIndex: 10,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.35)',
                        }}
                    />
                )}
                {/* Size label while resizing */}
                {resizing && (
                    <div style={{
                        position: 'absolute',
                        top: -30,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        background: '#374151',
                        color: '#f9fafb',
                        fontSize: 11,
                        padding: '2px 8px',
                        borderRadius: 4,
                        whiteSpace: 'nowrap',
                        pointerEvents: 'none',
                        fontFamily: 'monospace',
                        zIndex: 20,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                        border: '1px solid rgba(255,255,255,0.15)',
                    }}>
                        {Math.round(width)}px × {Math.round(height)}px
                    </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}

// Custom Image extension with width and height attributes & ResizableImage NodeView
const ResizableImage = ImageBase.extend({
    name: 'image',
    addAttributes() {
        return {
            ...this.parent?.(),
            src: {
                default: null,
                parseHTML: el => el.getAttribute('src'),
                renderHTML: attrs => attrs.src ? { src: attrs.src } : {},
            },
            alt: {
                default: null,
                parseHTML: el => el.getAttribute('alt'),
                renderHTML: attrs => attrs.alt ? { alt: attrs.alt } : {},
            },
            width: {
                default: 200,
                parseHTML: el => {
                    const w = el.getAttribute('width') || el.style.width;
                    if (w) {
                        const parsed = parseInt(w, 10);
                        return isNaN(parsed) ? 200 : parsed;
                    }
                    return 200;
                },
                renderHTML: attrs => ({
                    width: attrs.width ?? 200,
                }),
            },
            height: {
                default: 200,
                parseHTML: el => {
                    const h = el.getAttribute('height') || el.style.height;
                    if (h) {
                        const parsed = parseInt(h, 10);
                        return isNaN(parsed) ? 200 : parsed;
                    }
                    return 200;
                },
                renderHTML: attrs => ({
                    height: attrs.height ?? 200,
                }),
            },
        };
    },
    parseHTML() {
        return [
            {
                tag: 'img[src]',
            },
        ];
    },
    renderHTML({ HTMLAttributes }) {
        return ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
    },
    addNodeView() {
        return ReactNodeViewRenderer(ResizableImageNodeView);
    },
});


export default function Editor({ title, content, onChangeTitle, onChangeContent }: EditorProps) {
    const [wordCount, setWordCount] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            ResizableImage.configure({ inline: false, allowBase64: true }),
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

    const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !editor) return;

        if (file.size > 7 * 1024 * 1024) {
            toast.error("Image size must be less than 7MB");
            e.target.value = '';
            return;
        }

        const reader = new FileReader();
        reader.onload = (ev) => {
            const src = ev.target?.result as string;
            editor.chain().focus().setImage({
                src,
                width: 200,
                height: 200,
            }).run();
        };
        reader.readAsDataURL(file);
        // reset so same file can be re-selected
        e.target.value = '';
    }, [editor]);

    const ToolbarButton = ({ onClick, isActive = false, title, children }: { onClick: () => void, isActive?: boolean, title?: string, children: React.ReactNode }) => (
        <button
            type="button"
            onClick={onClick}
            title={title}
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
        <div className="flex flex-col bg-background text-foreground font-sans w-full h-full border rounded-lg shadow-sm overflow-hidden focus-within:ring-1 focus-within:ring-ring transition-shadow">
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
                    position: relative;
                    border-left: 4px solid hsl(var(--primary) / 0.7);
                    padding: 0.75rem 1rem 0.75rem 2.25rem;
                    margin: 1.25rem 0;
                    font-style: italic;
                    color: hsl(var(--foreground) / 0.85);
                    background: none;
                    border-radius: 0 0.5rem 0.5rem 0;
                    animation: quote-in 0.25s ease both;
                }
                @keyframes quote-in {
                    from { opacity: 0; transform: translateX(-6px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .tiptap-custom-editor blockquote::before {
                    content: '\u201C';
                    position: absolute;
                    left: 0.4rem;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 2rem;
                    line-height: 1;
                    font-family: Georgia, serif;
                    font-style: normal;
                    color: hsl(var(--primary) / 0.5);
                    pointer-events: none;
                    user-select: none;
                }
                .tiptap-custom-editor blockquote p {
                    margin-bottom: 0;
                    line-height: 1.75;
                }
                .tiptap-custom-editor blockquote p + p {
                    margin-top: 0.5rem;
                }
                .tiptap-custom-editor blockquote p:last-child::after {
                    content: '\u201D';
                    display: inline;
                    font-size: 2rem;
                    line-height: 0;
                    vertical-align: -0.45em;
                    font-family: Georgia, serif;
                    font-style: normal;
                    color: hsl(var(--primary) / 0.5);
                    margin-left: 0.05em;
                    user-select: none;
                }
                .tiptap-custom-editor pre {
                    position: relative;
                    display: inline-block;
                    width: fit-content;
                    max-width: 100%;
                    background: #1a1a2e;
                    border-radius: 0.625rem;
                    padding: 2.75rem 1.25rem 1.25rem 1.25rem;
                    font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
                    font-size: 0.875rem;
                    line-height: 1.7;
                    overflow-x: auto;
                    margin-top: 1rem;
                    margin-bottom: 1rem;
                    border: 1px solid rgba(255,255,255,0.07);
                    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
                }
                .tiptap-custom-editor pre::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 2rem;
                    background: #111122;
                    border-radius: 0.625rem 0.625rem 0 0;
                    border-bottom: 1px solid rgba(255,255,255,0.06);
                }
                .tiptap-custom-editor pre::after {
                    content: '\u2022\u2022\u2022';
                    position: absolute;
                    top: 0.45rem;
                    left: 0.75rem;
                    font-size: 1.1rem;
                    letter-spacing: 0.25rem;
                    color: rgba(255,255,255,0.2);
                    pointer-events: none;
                }
                .tiptap-custom-editor pre code {
                    background: none;
                    padding: 0;
                    border-radius: 0;
                    font-size: inherit;
                    color: #e2e8f0;
                    display: block;
                    white-space: pre;
                }
                .tiptap-custom-editor code:not(pre code) {
                    background: hsl(var(--primary) / 0.1);
                    color: hsl(var(--primary));
                    padding: 0.15rem 0.45rem;
                    border-radius: 0.3rem;
                    font-family: 'Cascadia Code', 'Fira Code', 'Consolas', monospace;
                    font-size: 0.875em;
                    border: 1px solid hsl(var(--primary) / 0.15);
                    font-weight: 500;
                }
                .tiptap-custom-editor hr {
                    position: relative;
                    display: block;
                    width: 100%;
                    border: none;
                    height: 1px;
                    margin: 2rem 0;
                    background: linear-gradient(
                        to right,
                        transparent,
                        hsl(var(--border)),
                        transparent
                    );
                }
                .tiptap-custom-editor hr::after {
                    content: '\u25C6';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: hsl(var(--background));
                    padding: 0 0.5rem;
                    font-size: 0.55rem;
                    color: hsl(var(--border));
                    line-height: 1;
                    user-select: none;
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

            {/* Top Toolbar - Fixed */}
            <div className="flex-shrink-0 flex flex-wrap items-center gap-y-1 border-b border-border/60 px-2 py-1.5 bg-muted/20">
                <div className="flex items-center space-x-0.5">
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
                        <Bold size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
                        <Italic size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
                        <UnderlineIcon size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
                        <Strikethrough size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
                        <Heading1 size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
                        <Heading2 size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
                        <Heading3 size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton onClick={() => { }} title="Align Left">
                        <AlignLeft size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
                        <List size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} title="Task List">
                        <ListTodo size={15} strokeWidth={2.5} />
                    </ToolbarButton>

                    <Divider />

                    <ToolbarButton
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        isActive={editor.isActive('blockquote')}
                        title="Blockquote"
                    >
                        <Quote size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton
                        onClick={() => {
                            if (editor.isActive('codeBlock')) {
                                editor.chain().focus().toggleCodeBlock().run();
                            } else if (!editor.state.selection.empty) {
                                editor.chain().focus().toggleCode().run();
                            } else {
                                editor.chain().focus().toggleCodeBlock().run();
                            }
                        }}
                        isActive={editor.isActive('codeBlock') || editor.isActive('code')}
                        title="Code"
                    >
                        <Code size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">
                        <Minus size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                </div>
                <div className="flex-1" />
                <div className="flex items-center space-x-1 pr-1">
                    {/* Hidden image file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                    />
                    <ToolbarButton onClick={() => fileInputRef.current?.click()} title="Insert Image">
                        <ImageIcon size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                    <ToolbarButton onClick={() => navigator.clipboard.writeText(editor.getText())} title="Copy Text">
                        <Copy size={15} strokeWidth={2.5} />
                    </ToolbarButton>
                </div>
            </div>

            {/* Editor Area - Scrollable */}
            <div className="flex-1 w-full p-3 flex flex-col gap-4 overflow-y-auto">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => onChangeTitle(e.target.value)}
                    placeholder="Note Title"
                    className="w-full bg-transparent text-xl font-serif font-bold text-foreground placeholder:text-muted-foreground/40 focus:outline-none transition-all"
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