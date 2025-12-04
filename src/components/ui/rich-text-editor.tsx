"use client";

import * as React from "react";
import { useEffect, useCallback, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Separator } from "./separator";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Highlighter,
  Code,
  Minus,
  Loader2,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

// Dynamic imports for Tiptap to avoid SSR issues
import type { Editor } from "@tiptap/react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  className?: string;
  editorClassName?: string;
}

interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  tooltip: string;
  children: React.ReactNode;
}

function ToolbarButton({
  onClick,
  isActive,
  disabled,
  tooltip,
  children,
}: ToolbarButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClick}
          disabled={disabled}
          className={cn(
            "h-8 w-8 p-0",
            isActive && "bg-muted text-foreground"
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface EditorToolbarProps {
  editor: Editor | null;
}

function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center gap-0.5 p-2 border-b bg-muted/20 flex-wrap">
        {/* Undo/Redo */}
        <ToolbarButton
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().undo()}
          tooltip="Undo (Ctrl+Z)"
        >
          <Undo className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().redo()}
          tooltip="Redo (Ctrl+Y)"
        >
          <Redo className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Headings */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive("heading", { level: 1 })}
          tooltip="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive("heading", { level: 2 })}
          tooltip="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive("heading", { level: 3 })}
          tooltip="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text formatting */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive("bold")}
          tooltip="Bold (Ctrl+B)"
        >
          <Bold className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive("italic")}
          tooltip="Italic (Ctrl+I)"
        >
          <Italic className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          isActive={editor.isActive("underline")}
          tooltip="Underline (Ctrl+U)"
        >
          <UnderlineIcon className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive("strike")}
          tooltip="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          isActive={editor.isActive("highlight")}
          tooltip="Highlight"
        >
          <Highlighter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCode().run()}
          isActive={editor.isActive("code")}
          tooltip="Inline Code"
        >
          <Code className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Lists */}
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive("bulletList")}
          tooltip="Bullet List"
        >
          <List className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive("orderedList")}
          tooltip="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          isActive={editor.isActive("blockquote")}
          tooltip="Quote"
        >
          <Quote className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Text alignment */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          isActive={editor.isActive({ textAlign: "left" })}
          tooltip="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          isActive={editor.isActive({ textAlign: "center" })}
          tooltip="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          isActive={editor.isActive({ textAlign: "right" })}
          tooltip="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          isActive={editor.isActive({ textAlign: "justify" })}
          tooltip="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </ToolbarButton>

        <Separator orientation="vertical" className="h-6 mx-1" />

        {/* Horizontal Rule */}
        <ToolbarButton
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          tooltip="Horizontal Rule"
        >
          <Minus className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </TooltipProvider>
  );
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "Start writing...",
  className,
  editorClassName,
}: RichTextEditorProps) {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const initEditor = async () => {
      const { useEditor } = await import("@tiptap/react");
      const { default: StarterKit } = await import("@tiptap/starter-kit");
      const { default: Underline } = await import("@tiptap/extension-underline");
      const { default: TextAlign } = await import("@tiptap/extension-text-align");
      const { default: Placeholder } = await import("@tiptap/extension-placeholder");
      const { default: Highlight } = await import("@tiptap/extension-highlight");

      if (!isMounted) return;

      // We need to create the editor instance manually since we can't use hooks dynamically
      const { Editor } = await import("@tiptap/react");
      
      const editorInstance = new Editor({
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3],
            },
          }),
          Underline,
          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
          Placeholder.configure({
            placeholder,
            emptyEditorClass: "is-editor-empty",
          }),
          Highlight.configure({
            multicolor: false,
          }),
        ],
        content,
        editorProps: {
          attributes: {
            class: cn(
              "prose prose-sm max-w-none dark:prose-invert focus:outline-none min-h-[200px] p-6",
              "prose-headings:font-semibold prose-headings:tracking-tight",
              "prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg",
              "prose-p:text-base prose-p:leading-relaxed",
              "prose-ul:list-disc prose-ol:list-decimal",
              "prose-blockquote:border-l-4 prose-blockquote:border-muted-foreground prose-blockquote:pl-4 prose-blockquote:italic",
              "prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
              "[&_.is-editor-empty:first-child::before]:text-muted-foreground [&_.is-editor-empty:first-child::before]:content-[attr(data-placeholder)] [&_.is-editor-empty:first-child::before]:float-left [&_.is-editor-empty:first-child::before]:pointer-events-none [&_.is-editor-empty:first-child::before]:h-0",
              editorClassName
            ),
          },
        },
        onUpdate: ({ editor }) => {
          onChange(editor.getHTML());
        },
      });

      if (isMounted) {
        setEditor(editorInstance);
        setIsLoading(false);
      }
    };

    initEditor();

    return () => {
      isMounted = false;
      if (editor) {
        editor.destroy();
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Update editor content when prop changes externally
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  const getCharacterCount = useCallback(() => {
    if (!editor) return 0;
    return editor.storage.characterCount?.characters() ?? editor.getText().length;
  }, [editor]);

  const getWordCount = useCallback(() => {
    if (!editor) return 0;
    const text = editor.getText();
    return text.split(/\s+/).filter((word) => word.length > 0).length;
  }, [editor]);

  // Dynamically import EditorContent
  const [EditorContent, setEditorContent] = useState<React.ComponentType<{ editor: Editor | null; className?: string }> | null>(null);

  useEffect(() => {
    import("@tiptap/react").then((mod) => {
      setEditorContent(() => mod.EditorContent);
    });
  }, []);

  if (isLoading || !EditorContent) {
    return (
      <div className={cn("flex flex-col h-full border rounded-md bg-background", className)}>
        <div className="flex items-center justify-center h-full min-h-[300px]">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full border rounded-md bg-background", className)}>
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-auto">
        <EditorContent editor={editor} className="h-full" />
      </div>
      <div className="p-2 border-t bg-muted/10 flex justify-between items-center text-xs text-muted-foreground">
        <span>{getWordCount()} words</span>
        <span>{getCharacterCount()} characters</span>
      </div>
    </div>
  );
}

export type { Editor };
