/* global PluginUIExtension */
var PluginUIExtension = {

  /**
   * The function defined as the onready callback within the plugin configuration.
   */
  init: function () {
    var nav = document.querySelector('#pl-pattern-nav-target');
    nav.prepend(/*NAVLINKS-BEFORE-SNIPPET*/);
    nav.append(/*NAVLINKS-AFTER-SNIPPET*/);

    var rightList = document.querySelector('.sg-checklist');
    rightList.prepend(/*GEARLINKS-BEFORE-SNIPPET*/);
    rightList.querySelector('#sg-find').before(/*GEARLINKS-BEFORESEARCH-SNIPPET*/);
  }
};
