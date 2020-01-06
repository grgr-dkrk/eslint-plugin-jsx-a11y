/**
 * Returns true if it can positively determine that the element lacks an
 * accessible label. If no determination is possible, it returns false. Treat
 * false as an unknown value. The element might still have an accessible label,
 * but this module cannot determine it positively.
 *
 * @flow
 */

import { elementType } from 'jsx-ast-utils';
import type { Node } from 'ast-types-flow';

const estraverse = require('estraverse-fb');

export default function mayContainChildComponent(
  root: Node,
  componentName: string,
): boolean {
  let flag = false;
  estraverse.traverse(root, {
    enter(node) {
      if (
        node.type === 'JSXElement'
        && node.openingElement

        && elementType(node.openingElement) === componentName
      ) {
        flag = true;
        return estraverse.VisitorOption.Break;
      }
      return undefined;
    },
  });
  return flag;
}
