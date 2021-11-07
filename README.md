![license](https://img.shields.io/github/license/mfranzke/plugin-node-uiextension.svg)
[![npm](https://img.shields.io/npm/v/@mfranzke/plugin-node-uiextension.svg)](https://www.npmjs.com/package/@mfranzke/plugin-node-uiextension)
[![Gitter](https://img.shields.io/gitter/room/pattern-lab/node.svg)](https://gitter.im/pattern-lab/node)

This is a fork from the previous development by [Brian Muenzenmeyer](https://github.com/bmuenzenmeyer/plugin-node-uiextension/), so a lot of kudos should go to Brian for that ! I mainly wanted to optimize the code further and bring it to pattern lab 5 compatibility.

# UI Extension Plugin for Pattern Lab Node

The UI Extension plugin allows users to customize the Pattern Lab frontend style guide without having to fork [UIKit Workshop](https://github.com/pattern-lab/patternlab-node/tree/master/packages/uikit-workshop). It is intended for styling overrides and navigation additions. If you need anything further, it's suggested that you fork the [`UIKit Bare`](https://github.com/pattern-lab/uikit-bare) repo and consume your own custom frontend.

![](https://cloud.githubusercontent.com/assets/298435/23539989/2fa47a5c-ffa4-11e6-9eee-ffb43d24dede.png)

## Installation

To add the UI Extension Plugin to your project using [npm](https://www.npmjs.com/) type:

    npm install @mfranzke/plugin-node-uiextension --save

Or add it directly to your project's `package.json` file and run `npm install`

During installation, the plugin is added as a key to the `plugins` object in your main Pattern Lab project's `patternlab-config.json` file

> If you don't see this object, try running `npm run postinstall` within the root of your project.

## Configuration

Post-installation, you will see the following in your `patternlab-config.json`:

Example:

``` json
"plugins": {
  "@mfranzke/plugin-node-uiextension": {
    "enabled": true,
    "initialized": false,
    "options": {
      "stylesheets": [
        "css/pattern-scaffolding.css"
      ],
      "navLinks": {
        "before": [],
        "after": []
      },
      "toolLinks": {
        "before": [],
        "after": []
      }
    }
  }
}
```

### CSS

Note the defaulted `pattern-scaffolding.css` file, which is relative to the installation location within the `/public/` output.

> At this time, loading external CSS is not supported.

This file is already responsible for meta-styling of your patterns, and is usually only scoped to the viewer `<iframe/>`. With this default, you now have a useful CSS file for altering both the Pattern Lab UI inside the ish `<iframe/>` as well as the main frontend.  You can use a [mockup of Pattern Lab on Codepen](https://codepen.io/bmuenzenmeyer/pen/zNmmez) to alter the look and feel, and then export or append the **compiled css** back into `pattern-scaffolding.css`.

Here's a [Pattern Lab light theme](https://codepen.io/bmuenzenmeyer/pen/RKqBqX) quickly created using the CodePen above.

This is also a good way to build [custom pattern states](https://patternlab.io/docs/using-pattern-states/#heading-adding-customized-states) and have their colors represented on the UI.

#### Adding Links

A `navLinks` and `toolLinks` object are also initialized post-installation, and allow you to add arbitrary anchor tags to the front end in various locations.

For example, adding the following snippet:

``` json
...
"navLinks": {
  "before": [
    { "text": "Voice and Tone", "url": "https://example.com/writing-guide", "class": ""}
  ],
  "after": [
    { "text": "Contribute", "url": "https://example.com/contribute", "class": ""},
    { "text": "Downloads", "url": "https://example.com/resources", "class": ""}
  ]
},
...
```

would add a link to the `Voice and Tone` before the main navigation, with a `Contribute` and `Downloads` link to follow.

Within the `toolLinks` you do have an additional property called `icon` that you could choose from - just use the filename without the `.svg` ending for this property: https://github.com/pattern-lab/patternlab-node/tree/master/packages/uikit-workshop/src/icons

``` json
...
"toolLinks": {
  "before": [
    { "text": "Voice and Tone", "url": "http://example.com/writing-guide", "class": "", "icon": "help"}
  ],
  "after": []
},
...
```

## Enabling / Disabling the Plugin

After install, you may manually enable or disable the plugin by finding the `@mfranzke/plugin-node-uiextension` key within your main Pattern Lab project's `patternlab-config.json` file and setting the `enabled` flag. In the future this will be possible via CLI.
