/* global document, Dispatcher */
var PluginUIExtension = {

  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: function () {
    console.log('hello world from plugin-node-uiextension');
    // var head = document.head || document.getElementsByTagName('head')[0],
    //   newStyle = document.createElement('style');
    //
    // newStyle.type = 'text/css';
    // if (newStyle.styleSheet) {
    //   newStyle.styleSheet.cssText = css;
    // } else {
    //   newStyle.appendChild(document.createTextNode(css));
    // }
    // head.appendChild(newStyle);

    // Dispatcher.addListener('checkPanels', PluginClipboard.injectTargets);
  }
};
