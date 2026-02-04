# Nord (with Dark+ syntax)

This fork keeps the **Nord workbench/UI** experience while overlaying the **VS Code Dark+ (default dark)** token colors so keywords, strings, functions, classes, etc. match the VS Code default look & feel.

## Features

- **Nord UI colors** remain untouched (`themes/nord-color-theme.json` → `colors`).
- **Syntax colors** (`tokenColors`, `semanticTokenColors`) are now identical to Dark+.
- Scripts for regenerating the Dark+ snapshot and reapplying it are included under `tools/`.

## Installation

1. Build the extension: `npm ci && npm run build`.
2. Install the generated `.vsix` via **Extensions: Install from VSIX...** or:

   ```sh
   code --install-extension ./nord-visual-studio-code-with-dark-editor-*.vsix
   ```

3. After installation, confirm syntax tokens match Dark+ by toggling between the two themes and optionally running **Developer: Inspect Editor Tokens and Scopes**.

## Build / Update instructions

- Update the Dark+ snapshot (resolves `include` chains) and reapply it:

  ```sh
  node tools/extract-vscode-theme.mjs \
    --in /usr/share/code/resources/app/extensions/theme-defaults/themes/dark_plus.json \
    --out reference/dark-plus.effective.json

  node tools/apply-darkplus-syntax.mjs \
    --nord themes/nord-color-theme.json \
    --darkplus reference/dark-plus.effective.json
  ```

- Rebuild: `npm run build`.
  - `npm run clean` removes existing `.vsix`.
  - `vsce package` produces `nord-visual-studio-code-with-dark-editor-*.vsix`.

## Repository & support

- Source: `https://github.com/Glaysia/mynordtheme4code`
- Issues: `https://github.com/Glaysia/mynordtheme4code/issues`
- Marketplace ID: `willbecat27.nord-visual-studio-code-with-dark-editor`

## License

MIT (same as the original Nord project).
