import fs from "node:fs";
import path from "node:path";

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function mergeTheme(baseTheme, overrideTheme) {
  const result = { ...baseTheme, ...overrideTheme };

  if (baseTheme.colors || overrideTheme.colors) {
    result.colors = { ...(baseTheme.colors ?? {}), ...(overrideTheme.colors ?? {}) };
  }

  if (baseTheme.semanticTokenColors || overrideTheme.semanticTokenColors) {
    result.semanticTokenColors = {
      ...(baseTheme.semanticTokenColors ?? {}),
      ...(overrideTheme.semanticTokenColors ?? {}),
    };
  }

  if (baseTheme.tokenColors || overrideTheme.tokenColors) {
    result.tokenColors = [...(baseTheme.tokenColors ?? []), ...(overrideTheme.tokenColors ?? [])];
  }

  delete result.include;
  return result;
}

function loadThemeRecursive(themePath, visited = new Set()) {
  const realPath = fs.realpathSync(themePath);
  if (visited.has(realPath)) {
    throw new Error(`Circular theme include detected: ${realPath}`);
  }
  visited.add(realPath);

  const theme = readJson(realPath);
  const includePath = theme.include ? path.resolve(path.dirname(realPath), theme.include) : null;

  if (!includePath) return theme;

  const baseTheme = loadThemeRecursive(includePath, visited);
  return mergeTheme(baseTheme, theme);
}

function parseArgs(argv) {
  const args = { in: null, out: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--in") args.in = argv[i + 1];
    if (a === "--out") args.out = argv[i + 1];
  }
  if (!args.in || !args.out) {
    throw new Error("Usage: node tools/extract-vscode-theme.mjs --in <theme.json> --out <out.json>");
  }
  return args;
}

const { in: inPath, out: outPath } = parseArgs(process.argv.slice(2));
const effectiveTheme = loadThemeRecursive(inPath);

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, `${JSON.stringify(effectiveTheme, null, 2)}\n`, "utf8");

const colorsCount = effectiveTheme.colors ? Object.keys(effectiveTheme.colors).length : 0;
const tokenColorsCount = effectiveTheme.tokenColors ? effectiveTheme.tokenColors.length : 0;
const semanticTokenColorsCount = effectiveTheme.semanticTokenColors
  ? Object.keys(effectiveTheme.semanticTokenColors).length
  : 0;

process.stdout.write(
  [
    `Wrote: ${outPath}`,
    `colors: ${colorsCount}`,
    `tokenColors: ${tokenColorsCount}`,
    `semanticTokenColors: ${semanticTokenColorsCount}`,
  ].join("\n") + "\n"
);
