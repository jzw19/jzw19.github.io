import React, { FC, useEffect, useState } from 'react';
import { parseMarkdownToAST, renderASTtoHTML } from './utils';

import { Button } from '@mui/material';
import { MarkdownASTNode } from './types';
import PageView from '../../../components/PageView';

const Markdown: FC = () => {
  const rootASTNode: MarkdownASTNode = {
    type: "root",
    children: []
  };
  const testMarkdown = "# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n\n**bold**\n*italic*\n~~strikethrough~~\n\n[link](https://example.com)\n\n- list item 1\n- list item 2\n- list item 3\n\n1. numbered item 1\n2. numbered item 2\n3. numbered item 3\n\n```console.log('Hello, world!');```\n";
  
  const [markdown, setMarkdown] = useState<string>("");
  const [currentAst, setCurrentAst] = useState<MarkdownASTNode>(rootASTNode);
  const [html, setHtml] = useState<string>("");
  
  useEffect(() => {
    parseMarkdownToAST(markdown, setCurrentAst);
  }, [markdown]);

  useEffect(() => {
    // transformBoldToUppercase(currentAst);
    const htmlString = renderASTtoHTML(currentAst);
    setHtml(htmlString);
  }, [currentAst]);

  return (
    <PageView>
      <h1>Markdown Parser</h1>
      <Button onClick={() => setMarkdown(testMarkdown)} variant="contained" color="primary">Generate HTML</Button>
      <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: html }}></div>
    </PageView>
  );
}

export default Markdown;
