## Getting Started

Visit the [official website][nord-home] to learn all about the [syntax highlighting][nord-home#syntax] features, details and elements of the [UI and editor elements][nord-home#editor-details] and the [one-click setup][nord-home#setup].

Learn about the [installation and activation][nord-docs-home-install], how to [customize][nord-docs-home-custom] and [develop][nord-docs-home-develop] the theme from the [official documentations][nord-docs-home].

### Quick Start

Thanks to the official [VS Code Extension Marketplace][vscode-extmarket-home], _Nord Visual Studio Code_ can be installed with one click.

Open the [extension marketplace][vscode-docs-extmarket] by clicking on the _Extensions_ icon in the [_Activity Bar_][vscode-docs-ui-actbar]. Search for `Nord` and click on the <kbd>Install</kbd> button.

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/ports/visual-studio-code/ui-extension-marketplace.png"/></p>

See Nord Visual Studio Code's documentation for details about more installation options like a [manual import through a local VSIX extension file][nord-docs-home-install#local].

#### Activation

To activate the theme click on the gear icon in the _Activity Bar_ and select _Color Theme_. Search for `Nord` and confirm the color theme change with <kbd>Enter</kbd>.

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/ports/visual-studio-code/ui-color-theme-select.png"/></p>

See Nord Visual Studio Code's documentation for details about [more activation options][nord-docs-home-install#activation].

## Features

<div align="center"><p><strong>Your IDE. Your style.</strong></p><p>A unified UI and editor syntax element design provides a clutter-free and fluidly merging appearance.</p></div>

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/ports/visual-studio-code/ui-overview-go.png"/></p>

<div align="center"><p><strong>Beautiful code to keep focused.</strong></p><p>The editor color scheme supports a wide range of programming languages — From bundled definitions up to many popular third-party syntax extensions.</p></div>

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/ports/visual-studio-code/editor-syntax-go.png"/></p>

<div align="center"><p><strong>Small details with unobtrusive styles.</strong></p><p>Popular and common code editor features like search result marker and brace matching are designed to get out of your way with a visually attractive appearance.</p></div>

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/ports/visual-studio-code/editor-syntax-go-comments.png"/></p>

## Fork note: Nord UI + Dark+ syntax

This repository is a fork that keeps Nord's **workbench/UI colors** (`themes/nord-color-theme.json` → `colors`) but switches the **editor syntax highlighting colors** to match VS Code's built-in **Dark+ (default dark)**:

- `themes/nord-color-theme.json` → `tokenColors` replaced with Dark+'s effective `tokenColors`
- `themes/nord-color-theme.json` → `semanticTokenColors` added from Dark+ (helps languages relying on semantic tokens)

### Update Dark+ snapshot (optional)

Extract the _effective_ Dark+ theme (resolves `include`):

```sh
node tools/extract-vscode-theme.mjs \
  --in /usr/share/code/resources/app/extensions/theme-defaults/themes/dark_plus.json \
  --out reference/dark-plus.effective.json
```

Apply Dark+ syntax colors to the Nord theme file (does not change `colors`):

```sh
node tools/apply-darkplus-syntax.mjs \
  --nord themes/nord-color-theme.json \
  --darkplus reference/dark-plus.effective.json
```

### Build & install locally

```sh
npm ci
npm run build
```

Install the generated `*.vsix` via VS Code UI (**Extensions: Install from VSIX...**) or CLI:

```sh
code --install-extension ./nord-visual-studio-code-*.vsix
```

### Quick verification

- Switch between **Dark+ (default dark)** and this theme and confirm syntax tokens (keywords/strings/numbers/functions/classes) match.
- Use **Developer: Inspect Editor Tokens and Scopes** to confirm token scopes/semantic tokens are colored as expected.

## Contributing

Nord is an open source project and we love to receive contributions from the [community][nord-comm]!

There are many ways to contribute, from [writing- and improving documentation and tutorials][nord-contrib-guide-docs], [reporting bugs][nord-contrib-guide-bugs], [submitting enhancement suggestions][nord-contrib-guide-enhance] that can be added to Nord by [submitting pull requests][nord-contrib-guide-pr].

Please take a moment to read Nord's full [contributing guide][nord-contrib-guide] to learn about the development process, the project's used [styleguides][nord-contrib-guide-styles], [branch organization][nord-contrib-guide-branching] and [versioning][nord-contrib-guide-versioning] model.

The guide also includes information about [minimal, complete, and verifiable examples][nord-contrib-guide-mcve] and other ways to contribute to the project like [improving existing issues][nord-contrib-guide-impr-issues] and [giving feedback on issues and pull requests][nord-contrib-guide-feedback].

<p align="center"><img src="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/nord/repository-footer-separator.png" srcset="https://raw.githubusercontent.com/arcticicestudio/nord-docs/develop/assets/images/nord/repository-footer-separator-2x.png 2x" /></p>

<p align="center">Copyright &copy; 2017-present <a href="https://www.arcticicestudio.com" target="_blank">Arctic Ice Studio</a> and <a href="https://www.svengreb.de" target="_blank">Sven Greb</a></p>

<p align="center"><a href="https://github.com/arcticicestudio/nord-visual-studio-code/blob/develop/LICENSE"><img src="https://img.shields.io/static/v1.svg?style=flat-square&label=License&message=MIT&logoColor=eceff4&logo=github&colorA=4c566a&colorB=88c0d0"/></a></p>

[nord-comm]: https://www.nordtheme.com/community
[nord-contrib-guide-branching]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#branch-organization
[nord-contrib-guide-bugs]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#bug-reports
[nord-contrib-guide-docs]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#documentations
[nord-contrib-guide-enhance]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#enhancement-suggestions
[nord-contrib-guide-feedback]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#give-feedback-on-issues-and-pull-requests
[nord-contrib-guide-impr-issues]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#improve-issues
[nord-contrib-guide-mcve]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#mcve
[nord-contrib-guide-pr]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#pull-requests
[nord-contrib-guide-styles]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#styleguides
[nord-contrib-guide-versioning]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md#versioning
[nord-contrib-guide]: https://github.com/arcticicestudio/nord/blob/develop/CONTRIBUTING.md
[nord-docs-home-custom]: https://www.nordtheme.com/docs/ports/visual-studio-code/customization
[nord-docs-home-develop]: https://www.nordtheme.com/docs/ports/visual-studio-code/development
[nord-docs-home-install]: https://www.nordtheme.com/docs/ports/visual-studio-code/installation
[nord-docs-home-install#activation]: https://www.nordtheme.com/docs/ports/visual-studio-code/installation#activation
[nord-docs-home-install#local]: https://www.nordtheme.com/docs/ports/visual-studio-code/installation#local-installation
[nord-docs-home]: https://www.nordtheme.com/docs/ports/visual-studio-code
[nord-home]: https://www.nordtheme.com/ports/visual-studio-code
[nord-home#editor-details]: https://www.nordtheme.com/ports/visual-studio-code#editor-details
[nord-home#setup]: https://www.nordtheme.com/ports/visual-studio-code#setup
[nord-home#syntax]: https://www.nordtheme.com/ports/visual-studio-code#syntax
[vscode-docs-extmarket]: https://code.visualstudio.com/docs/editor/extension-gallery
[vscode-docs-ui-actbar]: https://code.visualstudio.com/docs/getstarted/userinterface#_activity-bar
[vscode-extmarket-home]: https://marketplace.visualstudio.com/items?itemName=arcticicestudio.nord-visual-studio-code
