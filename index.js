'use strict';

const pluginName = '@mfranzke/plugin-node-uiextension';

// Remove the forward-slash, which can accidentally result in directories being written in the output
const safePluginName = pluginName.replaceAll('/', '-');

const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const _ = require('lodash');

function writeConfigToOutput(patternlab, pluginConfig) {
  var pluginConfigPathName = path.resolve(patternlab.config.paths.public.root, 'patternlab-components', 'packages');
  try {
    fs.outputFileSync(pluginConfigPathName + '/' + safePluginName + '.json', JSON.stringify(pluginConfig, null, 2));
  } catch (ex) {
    console.trace(pluginName + ': Error occurred while writing pluginFile configuration');
    console.log(ex);
  }
}

/**
 * Define what events you wish to listen to here
 * For a full list of events - check out https://github.com/pattern-lab/patternlab-node/wiki/Creating-Plugins#events
 * @param patternlab - global data store which has the handle to the event emitter
   */
function registerEvents(patternlab) {
  //register our handler at the appropriate time of execution
}

/**
* A single place to define the frontend configuration
* This configuration is outputted to the frontend explicitly as well as included in the plugins object.
*
*/
function getPluginFrontendConfig() {
  var defaults = {
    "name": pluginName,
    "templates":[],
    "stylesheets":[],
    "javascripts":[
      "patternlab-components\/pattern-lab\/" + safePluginName + "\/js\/" + safePluginName + ".js"
    ],
    "onready":"PluginUIExtension.init()",
    "callback":""
  };

  var pluginConfig = require('./config.json');
  return _.extend({}, defaults, pluginConfig);
}

/**
* Creates a link from the passed in data
*/
function createLink(link, template) {
  const icon = link.icon ? '<pl-icon name="' + link.icon + '" slot="after"></pl-icon>' : '';
  return template.replace('<<class>>', link.class).replace('<<url>>', link.url).replace('<<text>>', link.text).replace('<<icon>>', icon);
}

/**
 * Replaces the snippet placeholder with actual content
 */
function fillPlaceholder(file, placeholder, snippet) {
  return file.replace(placeholder, snippet.replace(/,\s*$/, ''));
}

/**
* The entry point for the plugin. You should not have to alter this code much under many circumstances.
* Instead, alter getPluginFrontendConfig() and registerEvents() methods
  */
function pluginInit(patternlab) {

  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  //write the plugin json to public/patternlab-components
  var pluginConfig = getPluginFrontendConfig();
  pluginConfig.stylesheets = patternlab.config.plugins[pluginName].options.stylesheets.map(stylesheet => { return (stylesheet.substr(0, 4).toLowerCase() === 'http') ? stylesheet : path.join("../../../", stylesheet); });
  pluginConfig.navLinks = patternlab.config.plugins[pluginName].options.navLinks;
  pluginConfig.toolLinks = patternlab.config.plugins[pluginName].options.toolLinks;
  writeConfigToOutput(patternlab, pluginConfig);

  //add the plugin config to the patternlab-object for later export
  if (!patternlab.plugins) {
    patternlab.plugins = [];
  }
  patternlab.plugins.push(pluginConfig);

  //write the plugin dist folder to public/pattern-lab
  var pluginFiles = glob.sync(__dirname + '/dist/**/*');

  if (pluginFiles && pluginFiles.length > 0) {

    const link_frontend_snippet = {
      nav: fs.readFileSync(path.resolve(__dirname + '/src/snippet-nav.js'), 'utf8'),
      tool: fs.readFileSync(path.resolve(__dirname + '/src/snippet-tool.js'), 'utf8')
    };

    for (var i = 0; i < pluginFiles.length; i++) {
      try {
        var fileStat = fs.statSync(pluginFiles[i]);
        if (fileStat.isFile()) {
          var relativePath = path.relative(__dirname, pluginFiles[i]).replace('dist', ''); //dist is dropped
          var writePath = path.join(patternlab.config.paths.public.root, 'patternlab-components', 'pattern-lab', safePluginName, relativePath);

          //we need to alter the dist file to add links for us
          //we are also being a bit lazy here, since we only expect one file
          let uiextensionJSFileContents = fs.readFileSync(pluginFiles[i], 'utf8');
          let snippetString = '';

          //construct our links from the snippets
          if (pluginConfig.navLinks) {
            if (pluginConfig.navLinks.before && pluginConfig.navLinks.before.length > 0) {
              for (var n = 0; n < pluginConfig.navLinks.before.length; n++) {
                snippetString += createLink(pluginConfig.navLinks.before[n], link_frontend_snippet.nav);
              }
              uiextensionJSFileContents = fillPlaceholder(uiextensionJSFileContents, '/*NAVLINKS-BEFORE-SNIPPET*/', snippetString);
            }

            snippetString = '';
            if (pluginConfig.navLinks.after && pluginConfig.navLinks.after.length > 0) {
              for (var j = 0; j < pluginConfig.navLinks.after.length; j++) {
                snippetString += createLink(pluginConfig.navLinks.after[j], link_frontend_snippet.nav);
              }
              uiextensionJSFileContents = fillPlaceholder(uiextensionJSFileContents, '/*NAVLINKS-AFTER-SNIPPET*/', snippetString);
            }
          }

          if (pluginConfig.toolLinks) {
            snippetString = '';
            if (pluginConfig.toolLinks.before && pluginConfig.toolLinks.before.length > 0) {
              for (var k = 0; k < pluginConfig.toolLinks.before.length; k++) {
                snippetString += createLink(pluginConfig.toolLinks.before[k], link_frontend_snippet.tool);
              }
              uiextensionJSFileContents = fillPlaceholder(uiextensionJSFileContents, '/*TOOLLINKS-BEFORE-SNIPPET*/', snippetString);
            }

            snippetString = '';
            if (pluginConfig.toolLinks.after && pluginConfig.toolLinks.after.length > 0) {
              for (var m = 0; m < pluginConfig.toolLinks.after.length; m++) {
                snippetString += createLink(pluginConfig.toolLinks.after[m], link_frontend_snippet.tool);
              }
              uiextensionJSFileContents = fillPlaceholder(uiextensionJSFileContents, '/*TOOLLINKS-AFTER-SNIPPET*/', snippetString);
            }
          }

          fs.outputFileSync(writePath, uiextensionJSFileContents);
        }
      } catch (ex) {
        console.trace(pluginName + ': Error occurred while copying pluginFile', pluginFiles[i]);
        console.log(ex);
      }
    }
  }

  //setup listeners if not already active
  if (patternlab.config[pluginName] !== undefined && !patternlab.config[pluginName]) {

    //register events
    registerEvents(patternlab);

    //set the plugin key to true to indicate it is installed and ready
    patternlab.config[pluginName] = true;
  }

}

module.exports = pluginInit;
