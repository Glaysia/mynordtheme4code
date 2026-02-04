import fs from "node:fs";
import path from "node:path";

function stripJsonc(text) {
  const out = [];
  let i = 0;
  let inString = false;
  let escaped = false;

  while (i < text.length) {
    const c = text[i];

    if (inString) {
      out.push(c);
      if (escaped) escaped = false;
      else if (c === "\\\\") escaped = true;
      else if (c === '"') inString = false;
      i += 1;
      continue;
    }

    if (c === '"') {
      inString = true;
      out.push(c);
      i += 1;
      continue;
    }

    if (c === "/" && text[i + 1] === "/") {
      i += 2;
      while (i < text.length && text[i] !== "\n") i += 1;
      continue;
    }

    if (c === "/" && text[i + 1] === "*") {
      i += 2;
      while (i + 1 < text.length && !(text[i] === "*" && text[i + 1] === "/")) i += 1;
      i += i + 1 < text.length ? 2 : 0;
      continue;
    }

    out.push(c);
    i += 1;
  }

  return out.join("");
}

function findJsonArrayRange(text, key) {
  const keyIdx = text.indexOf(`"${key}"`);
  if (keyIdx === -1) throw new Error(`Key not found: ${key}`);

  const colonIdx = text.indexOf(":", keyIdx);
  if (colonIdx === -1) throw new Error(`Malformed key (no colon): ${key}`);

  let i = colonIdx + 1;
  while (i < text.length && /\s/.test(text[i])) i += 1;
  if (text[i] !== "[") throw new Error(`Expected array for key: ${key}`);

  const start = i; // points at '['
  let depth = 0;
  let inString = false;
  let escaped = false;

  while (i < text.length) {
    const c = text[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (c === "\\\\") escaped = true;
      else if (c === '"') inString = false;
      i += 1;
      continue;
    }

    if (c === '"') {
      inString = true;
      i += 1;
      continue;
    }

    if (c === "/" && text[i + 1] === "/") {
      i += 2;
      while (i < text.length && text[i] !== "\n") i += 1;
      continue;
    }

    if (c === "/" && text[i + 1] === "*") {
      i += 2;
      while (i + 1 < text.length && !(text[i] === "*" && text[i + 1] === "/")) i += 1;
      i += i + 1 < text.length ? 2 : 0;
      continue;
    }

    if (c === "[") depth += 1;
    if (c === "]") {
      depth -= 1;
      if (depth === 0) {
        const end = i; // points at matching ']'
        return { start, end };
      }
    }

    i += 1;
  }

  throw new Error(`Unterminated array for key: ${key}`);
}

function hasTopLevelKeyJsonc(text, key) {
  const clean = stripJsonc(text);
  const obj = JSON.parse(clean);
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function insertAfterLine(text, match, insertion) {
  const idx = text.indexOf(match);
  if (idx === -1) throw new Error(`Match not found for insertion: ${match}`);
  const lineEnd = text.indexOf("\n", idx);
  if (lineEnd === -1) throw new Error("Unexpected EOF while inserting");
  return `${text.slice(0, lineEnd + 1)}${insertion}${text.slice(lineEnd + 1)}`;
}

function indentBlock(jsonText, indent) {
  return jsonText
    .split("\n")
    .map((line) => (line.length ? `${indent}${line}` : line))
    .join("\n");
}

function parseArgs(argv) {
  const args = { nord: null, darkPlus: null };
  for (let i = 0; i < argv.length; i += 1) {
    const a = argv[i];
    if (a === "--nord") args.nord = argv[i + 1];
    if (a === "--darkplus") args.darkPlus = argv[i + 1];
  }
  if (!args.nord || !args.darkPlus) {
    throw new Error(
      "Usage: node tools/apply-darkplus-syntax.mjs --nord themes/nord-color-theme.json --darkplus reference/dark-plus.effective.json"
    );
  }
  return args;
}

const { nord: nordPath, darkPlus: darkPlusPath } = parseArgs(process.argv.slice(2));
const nordAbs = path.resolve(nordPath);
const darkAbs = path.resolve(darkPlusPath);

const nordText = fs.readFileSync(nordAbs, "utf8");
const dark = JSON.parse(fs.readFileSync(darkAbs, "utf8"));

if (!Array.isArray(dark.tokenColors)) {
  throw new Error("dark-plus snapshot missing tokenColors array");
}

let updated = nordText;

// 1) Ensure semanticTokenColors exists (to better match Dark+ in semantic-token-heavy languages).
if (!hasTopLevelKeyJsonc(updated, "semanticTokenColors")) {
  const semanticInsertionObj = { semanticTokenColors: dark.semanticTokenColors ?? {} };
  const insertionJson = JSON.stringify(semanticInsertionObj, null, 2)
    .split("\n")
    .slice(1, -1) // remove enclosing { }
    .join("\n");
  const insertion = `${indentBlock(insertionJson, "  ")},\n`;
  updated = insertAfterLine(updated, `"semanticHighlighting": true,`, insertion);
}

// 2) Replace tokenColors array in-place, preserving the rest of the file (incl. colors + comments).
const { start, end } = findJsonArrayRange(updated, "tokenColors");
const tokenColorsJson = JSON.stringify(dark.tokenColors, null, 2);
const tokenColorsIndented = indentBlock(tokenColorsJson, "  ");
updated = `${updated.slice(0, start)}${tokenColorsIndented}${updated.slice(end + 1)}`;

fs.writeFileSync(nordAbs, updated, "utf8");

process.stdout.write(
  [
    `Updated: ${nordPath}`,
    `tokenColors => Dark+ (${dark.tokenColors.length})`,
    `semanticTokenColors keys => ${dark.semanticTokenColors ? Object.keys(dark.semanticTokenColors).length : 0}`,
  ].join("\n") + "\n"
);
