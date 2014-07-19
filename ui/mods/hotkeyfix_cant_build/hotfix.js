(function() {
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
