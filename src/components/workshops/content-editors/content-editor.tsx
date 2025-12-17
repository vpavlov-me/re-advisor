"use client";

import { ContentType, ScreenContent } from "@/types/workshop-constructor";
import { IntroductionEditor } from "./introduction-editor";
import { SwotEditor } from "./swot-editor";
import { RaciMatrixEditor } from "./raci-matrix-editor";
import { ValuesSelectionEditor } from "./values-selection-editor";
import { ActionPlanEditor } from "./action-plan-editor";
import { BrainstormEditor } from "./brainstorm-editor";
import { GenericTextEditor } from "./generic-text-editor";

interface ContentEditorProps {
  contentType: ContentType | null;
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function ContentEditor({ contentType, content, onChange }: ContentEditorProps) {
  // Route to appropriate editor based on content type
  switch (contentType) {
    case 'introduction':
    case 'rules':
    case 'objectives':
      return <IntroductionEditor content={content} onChange={onChange} />;

    case 'swot':
      return <SwotEditor content={content} onChange={onChange} />;

    case 'raci-matrix':
      return <RaciMatrixEditor content={content} onChange={onChange} />;

    case 'values-selection':
      return <ValuesSelectionEditor content={content} onChange={onChange} />;

    case 'action-plan':
    case 'next-steps':
      return <ActionPlanEditor content={content} onChange={onChange} />;

    case 'brainstorm':
      return <BrainstormEditor content={content} onChange={onChange} />;

    // For all other types, use generic editor
    default:
      return <GenericTextEditor content={content} onChange={onChange} />;
  }
}
