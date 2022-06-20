import { visit } from 'unist-util-visit';
import { HtmlNode } from './interfaces';

const findFragments = (ast) => {
  const fragments = new Set();

  visit(
    ast,
    (node: HtmlNode) => !!(node.properties && node.properties.id),
    (node) => {
      fragments.add(node.properties.id);
    },
  );

  return fragments;
};

export default findFragments;
