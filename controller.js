console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),
    makeButtonActive: function(color) {
      /// Accepts strings
      var controller = this;
      if(controller.model.getGameColors().indexOf(color) == -1) {
        console.log("ERROR: wrong input makeButtonActive()");
      } else {
        controller.simonGame.getElementsByClassName(color+"Button")[0].classList.remove("inactive")
        controller.simonGame.getElementsByClassName(color+"Button")[0].classList.add("active");
      };
    },
    makeButtonInactive: function(color) {
      /// Accepts strings
      var controller = this;
      if(controller.model.getGameColors().indexOf(color) == -1) {
        console.log("ERROR: wrong input makeButtonActive()");
      } else {
        controller.simonGame.getElementsByClassName(color+"Button")[0].classList.remove("active")
        controller.simonGame.getElementsByClassName(color+"Button")[0].classList.add("inactive");
      };
    },
  };
};

// Temporary for debugging
var simonGame = document.getElementsByClassName("simonGame")[0];
var controller = Simon.Controller(simonGame);

/*
var simonGameNodes = document.getElementsByClassName("simonGame");
for (var i = 0; i < simonGameNodes.length; ++i) {
  var node = simonGameNodes[i];
  var controller = Simon.Controller(node);
  controller.initialize();
}
*/
