(function() {
  var setupDialog = function() {
    $(".hotkeyfix_cant_build_dialog").dialog({
      dialogClass: "no-close",
      draggable: false,
      resizable: false,
      height: 400,
      width: 600,
      modal: true,
      autoOpen: model.buildVersion() != '67342',
      buttons: {
          "EXIT": function () {
              model.exit();
          },
          "LATER": function () {
              $(this).dialog("close");
          }
      }
    });
  }

  //load html dynamically
  var loadTemplate = function (element, url, model) {
    element.load(url, function () {
      console.log("Loading html " + url);
      ko.applyBindings(model, element.get(0));
      setupDialog()
    });
  };

  var enableCanery = function() {
    var container = $('<div id="insertion_point"></div>')
    container.appendTo('body')
    loadTemplate(container, 'coui://ui/mods/hotkeyfix_cant_build/hotkeyfix_cant_build.html', model);
  }

  //enableCanery()

  model.buildItemFromList = function (index) {
      // Reset any fab build selections we may have had.
      model.currentBuildStructureId('');
      
      api.panels.build_bar.query('build_item', index).then(function(id) {
          if (!id) 
              return;
          
          model.resetClearBuildSequence();

          model.buildItemBySpec(id);
      });
  };

})()
