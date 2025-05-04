import { MarkdownASTNode } from "./types";

/***************************************/
/* Helpers for parsing markdown to AST */
/***************************************/
const parseHeadingToAST = (ast: MarkdownASTNode, line: string, hashes: RegExpMatchArray): void => {  
  const level = hashes[0].length;
  const content = line.replace(/^#{1,6}\s+/, '');

  const node = {
    type: "heading",
    depth: level,
    children: [{ type: "text", value: content }]
  };
  if (ast.children) {
    ast.children.push(node);
  } else {
    ast.children = [node];
  }
}

const MarkdownExpressions = {
  BOLD: /\*\*(.+?)\*\*/,
  ITALIC: /\*(.+?)\*/,
  STRIKETHROUGH: /~~(.+?)~~/,
  LINK: /\[(.+?)\]\((.+?)\)/,
  LIST_ITEM: /^- (.+)/,
  NUMBERED_ITEM: /^\d+\. (.+)/,
  CODE_INLINE: /`(.*?)`/,
}

const OrderedMarkdownSources = [
  MarkdownExpressions.BOLD.source,
  MarkdownExpressions.ITALIC.source,
  MarkdownExpressions.STRIKETHROUGH.source,
  MarkdownExpressions.LINK.source,
  MarkdownExpressions.LIST_ITEM.source,
  MarkdownExpressions.NUMBERED_ITEM.source,
  MarkdownExpressions.CODE_INLINE.source,
];

const parseLineToList = (ast: MarkdownASTNode, matchedString: string, isOrdered: boolean): void => {
  const expressionType = isOrdered ? "numberedItem" : "unorderedList";
  // skip operations on lineChildren and operate directly on ast.children instead
  const lastChild = ast.children ? ast.children[ast.children.length - 1] : null;
  if (lastChild && lastChild.type !== expressionType) {
    if (ast.children) {
      ast.children.push({
        type: expressionType,
        children: [{ type: "listItem", children: [{ type: "text", value: matchedString }] }]
      });
    } else {
      ast.children = [{
        type: expressionType,
        children: [{ type: "listItem", children: [{ type: "text", value: matchedString }] }]
      }];
    }
  } else if (lastChild && lastChild.type === expressionType) {
    lastChild.children?.push({
      type: "listItem",
      children: [{ type: "text", value: matchedString }]
    });
  }
}

const parseLineToAST = (ast: MarkdownASTNode, line: string): void => {
  const lineChildren: MarkdownASTNode[] = [];

  const pattern = new RegExp(`${OrderedMarkdownSources.join("|")}`, 'g');
  let match: RegExpExecArray | null;
  let lastIndex = 0;

  // match follows the order defined by OrderedMarkdownSources
  // 0. matched string
  // 1. bold text
  // 2. italic text
  // 3. strikethrough text
  // 4. link text
  // 5. link url
  // 6. list item
  // 7. numbered item
  // 8. inline code
  while (((match = pattern.exec(line)) !== null)) {
    if (match.index > lastIndex) {
      lineChildren.push({
        type: "text",
        value: line.slice(lastIndex, match.index)
      });
    }

    if (match[1]) {
      lineChildren.push({
        type: "strong",
        children: [{ type: "text", value: match[1] }]
      });
    } else if (match[2]) {
      lineChildren.push({
        type: "emphasis",
        children: [{ type: "text", value: match[2] }]
      });
    } else if (match[3]) {
      lineChildren.push({
        type: "strikethrough",
        children: [{ type: "text", value: match[3] }]
      })
    } else if (match[4]) {
      lineChildren.push({
        type: "link",
        url: match[5],
        children: [{ type: "text", value: match[4] }]
      });
    } else if (match[6]) {
      // skip operations on lineChildren and operate directly on ast.children instead
      parseLineToList(ast, match[6], false);
      lastIndex = pattern.lastIndex;
      continue;
    } else if (match[7]) {
      parseLineToList(ast, match[7], true);
      lastIndex = pattern.lastIndex;
      continue;
    } else if (match[8]) {
      lineChildren.push({
        type: "codeInline",
        children: [{ type: "text", value: match[8] }]
      });
    }

    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < line.length) {
    lineChildren.push({
      type: "text",
      value: line.slice(lastIndex)
    });
  }
  
  if (ast.children) {
    ast.children = ast.children.concat(lineChildren);
  } else {
    ast.children = lineChildren;
  }
}

export const parseMarkdownToAST = (markdown: string, setCurrentAst: React.Dispatch<MarkdownASTNode>) => {
  // This function should parse the markdown string to an AST
  const lines = markdown.trim().split('\n');
  const ast: MarkdownASTNode = {
    type: "root",
    children: []
  };
  let isPrevLineEmpty = false;
  let isNewLine = false;

  for (let line of lines) {
    line = line.trim();

    // Handle blank lines
    if (isNewLine && line.length) {
      if (ast.children) {
        ast.children.push({
          type: "newLine",
        });
      } else {
        ast.children = [{
          type: "newLine",
        }];
      }
      isNewLine = false;
      isPrevLineEmpty = false;
    } else if (isPrevLineEmpty && !line.length) {
      isNewLine = true;
      continue;
    } else if (!line.length) {
      isPrevLineEmpty = true;
      continue;
    }

    // Heading - 1 to 6 # characters
    if (/^#{1,6}\s/.test(line)) {
      const hashes: RegExpMatchArray | null = line.match(/^#+/);
      if (!hashes) {
        // If we get here, then something is wrong.
        // Skip this line for now
        console.error(`Invalid heading: ${line}`);
        continue;
      }
      
      parseHeadingToAST(ast, line, hashes);
    } else if (line) {
      parseLineToAST(ast, line);
    }
  }

  setCurrentAst(ast);
};

/********************************************/
/* Helpers for intermediate transformations */
/********************************************/
// sample function to transform specific AST nodes. Not used right now.
export const transformBoldToUppercase = (currentAst: MarkdownASTNode) => {
  if (!currentAst || !currentAst.children) {
    return;
  }

  for (const node of currentAst.children) {
    if (node.type === "paragraph" || node.type === "heading") {
      for (const child of node.children || []) {
        if (child.type === "strong") {
          if (!child.children) {
            continue;
          }

          for (const grandchild of child.children) {
            if (grandchild.value && grandchild.type === "text") {
              grandchild.value = grandchild.value.toUpperCase();
            }
          }
        }
      }
    }
  }
};

/*******************************************/
/* Helpers for converting from AST to HTML */
/*******************************************/
const renderListToHTML = (node: MarkdownASTNode, isOrdered: boolean): string => {
  if (!node.children) {
    return '';
  }

  const listItems = node.children.map((node: MarkdownASTNode) => {
    if (node.type === "listItem") {
      return `<li>${node.children?.map(renderASTtoHTML).join('')}</li>`;
    }
    return '';
  }).join('');

  return isOrdered ? `<ol>${listItems}</ol` : `<ul>${listItems}</ul>`;
};

export const renderASTtoHTML = (currentAst: MarkdownASTNode): string => {
  const renderNode = (node: MarkdownASTNode): string => {
    switch (node.type) {
      case "root":
        return node.children ? node.children.map(renderNode).join('\n') : '';
      case "heading":
        return `<h${node.depth}>${node.children?.map(renderNode).join('')}</h${node.depth}>`;
      case "paragraph":
        return `<p>${node.children?.map(renderNode).join('')}</p>`;
      case "strong":
        return `<strong>${node.children?.map(renderNode).join('')}</strong>`;
      case "emphasis":
        return `<em>${node.children?.map(renderNode).join('')}</em>`;
      case "strikethrough":
        return `<del>${node.children?.map(renderNode).join('')}</del>`;
      case "link":
        return `<a href="${node.url}">${node.children?.map(renderNode).join('')}</a>`;
      case "text":
        return node.value || '';
      case "unorderedList":
        return renderListToHTML(node, false);
      case "numberedItem":
        return renderListToHTML(node, true);
      case "codeInline":
        return `<pre><code>${node.children?.map(renderNode).join('')}</code></pre>`;
      case "newLine":
        return '<br />';
      default:
        return '';
    }
  };

  return currentAst ? renderNode(currentAst) : "";
}