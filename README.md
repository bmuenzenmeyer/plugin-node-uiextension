![license](https://img.shields.io/github/license/bmuenzenmeyer/plugin-node-uiextension.svg)
[![npm](https://img.shields.io/npm/v/plugin-node-uiextension.svg)](https://www.npmjs.com/package/plugin-node-uiextension)
[![Gitter](https://img.shields.io/gitter/room/pattern-lab/node.svg)](https://gitter.im/pattern-lab/node)

# UI Extension Plugin for Pattern Lab Node

### Goals

Provide a simple PL chrome customization path versus forking [styleguide-assets-default](https://github.com/pattern-lab/styleguidekit-assets-default)

- [x]  Add custom CSS
 - [x] Including New Pattern States

 ##### Pattern Lab UI Themer on CodePen

 This plugin ships defaulted to include `pattern-scaffolding.css` into the Pattern Lab frontend. This is a useful CSS file for altering both the Pattern Lab UI inside the ish iframe as well as the main frontend.  You can use a [mockup of Pattern Lab on Codepen](http://codepen.io/bmuenzenmeyer/pen/791da488b2a73909a58eacf801af83d4) to alter the look and feel, and then export or append the **compiled css** back into `pattern-scaffolding.css`.

 This is also a good way to build [custom pattern states](http://patternlab.io/docs/pattern-states.html#node) and have their colors represented on the UI.
