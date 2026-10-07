import test from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const root = process.env.QUIZ_TEXT_NODE_ROOT ?? fileURLToPath(new URL('../..', import.meta.url));

// React Native Web reports even an empty string returned by `value && <Component>`
// as an invalid child of View. Check actual inferred types, including nullable
// strings and chained expressions, rather than matching variable names.
test('テキスト以外のJSXの子へ空文字や0が漏れる条件式を作らない', () => {
  const config = ts.readConfigFile(path.join(root, 'tsconfig.json'), ts.sys.readFile);
  assert.equal(config.error, undefined);
  const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, root);
  const program = ts.createProgram(parsed.fileNames, parsed.options);
  const checker = program.getTypeChecker();
  const issues = [];
  function canLeak(type) {
    if (type.isUnion()) return type.types.some(canLeak);
    if (type.flags & ts.TypeFlags.StringLiteral) return type.value === '';
    if (type.flags & ts.TypeFlags.NumberLiteral) return type.value === 0;
    return !!(type.flags & (ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.BigInt));
  }
  for (const source of program.getSourceFiles()) {
    if (!source.fileName.startsWith(path.join(root, 'src') + path.sep) || !source.fileName.endsWith('.tsx')) continue;
    function visit(node) {
      if (ts.isJsxExpression(node) && node.expression && !ts.isJsxAttribute(node.parent)) {
        const parent = node.parent;
        const tag = ts.isJsxElement(parent) ? parent.openingElement.tagName.getText(source) : '';
        if (!['Text', 'DText', 'FeedbackText', 'ThemedText', 'text', 'tspan'].includes(tag)) {
          function check(expression) {
            if (ts.isParenthesizedExpression(expression)) return check(expression.expression);
            if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken) {
              if (canLeak(checker.getTypeAtLocation(expression.left))) {
                const line = source.getLineAndCharacterOfPosition(expression.left.getStart(source)).line + 1;
                issues.push(`${path.relative(root, source.fileName)}:${line} ${expression.left.getText(source)}`);
              }
              check(expression.left);
              check(expression.right);
            }
          }
          check(node.expression);
        }
      }
      ts.forEachChild(node, visit);
    }
    visit(source);
  }
  assert.deepEqual(issues, [], `Boolean条件または三項演算子が必要です:\n${issues.join('\n')}`);
});
