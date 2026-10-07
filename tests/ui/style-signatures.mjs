import ts from "typescript";
export function styleSignatures(source) {
  const ast = ts.createSourceFile(
    "screen.tsx",
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const printer = ts.createPrinter({ removeComments: true });
  const result = {};
  function visit(node) {
    if (
      ts.isVariableDeclaration(node) &&
      node.initializer &&
      ts.isCallExpression(node.initializer) &&
      node.initializer.expression.getText(ast) === "StyleSheet.create"
    ) {
      const transformed = ts.transform(node.initializer.arguments[0], [
        (context) => (root) => {
          function normalize(n) {
            return ts.isStringLiteral(n)
              ? ts.factory.createStringLiteral(n.text)
              : ts.visitEachChild(n, normalize, context);
          }
          return ts.visitNode(root, normalize);
        },
      ]);
      result[node.name.getText(ast)] = printer.printNode(
        ts.EmitHint.Unspecified,
        transformed.transformed[0],
        ast,
      );
      transformed.dispose();
    }
    ts.forEachChild(node, visit);
  }
  visit(ast);
  return result;
}
