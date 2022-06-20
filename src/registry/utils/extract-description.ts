import { visit } from 'unist-util-visit';
import { HtmlNode } from './interfaces';

const getTextContent = (node) => {
  let textContent = '';
  const children = node.children || [];

  for (let i = 0; i < children.length; i++) {
    const childNode = children[i];
    const { value, children: nodeChildren } = childNode;
    if (value) {
      textContent += value;
    } else if (nodeChildren) {
      textContent += getTextContent(childNode);
    }
  }

  return textContent;
};

const extractDescription = (ast) => {
  let description = '';

  visit(
    ast,
    (node: HtmlNode) => {
      return !description && node.tagName === 'p';
    },
    (node) => {
      const nodeText = getTextContent(node);
      if (!nodeText.startsWith('{{')) {
        // Omit macros
        description = nodeText;
      }
    },
  );

  return description;
};

export default extractDescription;
