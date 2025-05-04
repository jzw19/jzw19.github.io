import "./index.scss";

import { Button, TextField } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { parseMarkdownToAST, renderASTtoHTML } from "./utils";

import { MarkdownASTNode } from "./types";
import PageView from "../../../components/PageView";

const Markdown: FC = () => {
  const rootASTNode: MarkdownASTNode = {
    type: "root",
    children: [],
  };
  const defaultInput =
    "# h1\n## h2\n### h3\n#### h4\n##### h5\n###### h6\n\n**bold**\n*italic*\n~~strikethrough~~\n\n[link](https://example.com)\n\n- list item 1\n- list item 2\n- list item 3\n\n1. numbered item 1\n2. numbered item 2\n3. numbered item 3\n\n```console.log('Hello, world!');```\n";

  const resultsPageRef = useRef<HTMLDivElement | null>(null);

  const [userInput, setUserInput] = useState<string>(defaultInput);
  const [markdown, setMarkdown] = useState<string>("");
  const [currentAst, setCurrentAst] = useState<MarkdownASTNode>(rootASTNode);
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    parseMarkdownToAST(markdown, setCurrentAst);
  }, [markdown]);

  useEffect(() => {
    const htmlString = renderASTtoHTML(currentAst);
    setHtml(htmlString);
  }, [currentAst]);

  const onClickGenerateHTML = () => {
    setMarkdown(userInput);
    resultsPageRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <>
      <PageView>
        <h1>Markdown Parser</h1>
        <TextField
          multiline
          minRows={25}
          maxRows={25}
          fullWidth
          sx={{ margin: "2rem", width: "90%" }}
          onChange={(e) => setUserInput(e.target.value)}
          defaultValue={defaultInput}
        />
        <Button
          onClick={onClickGenerateHTML}
          variant="contained"
          color="primary"
          sx={{ margin: "1rem" }}
        >
          Generate HTML
        </Button>
        <p>Currently supports the following markdown features:</p>
        <div className="markdown-description">
          <ul>
            <li>Headings (h1 to h6)</li>
            <li>Bold text</li>
            <li>Italic text</li>
            <li>Strikethrough text</li>
          </ul>
          <ul>
            <li>Links</li>
            <li>Lists (unordered and ordered)</li>
            <li>Code blocks</li>
          </ul>
        </div>
      </PageView>
      <PageView ref={resultsPageRef}>
        <h3>
          <u>Preview</u>
        </h3>
        <div
          className="markdown-preview"
          dangerouslySetInnerHTML={{ __html: html }}
        ></div>
      </PageView>
    </>
  );
};

export default Markdown;
