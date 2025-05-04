export interface MarkdownASTNode {
  type: string;
  children?: MarkdownASTNode[];
  depth?: number;
  value?: string;
  url?: string;
}
