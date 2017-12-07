console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),
    _changeButtonActivity: function(color, isActive) {
      /// Accepts strings
      var controller = this;
      if(controller.model.getGameColors().indexOf(color) == -1) {
        console.error("invalid color: " + color);
      } else {
        var buttonNode = controller.simonGame.getElementsByClassName(color+"Button")[0];
        if (isActive) {
          buttonNode.classList.remove("inactive")
          buttonNode.classList.add("active");
        } else {
          buttonNode.classList.remove("active")
          buttonNode.classList.add("inactive");
        }
      };
    },
    makeButtonActive: function(color) {
        this._changeButtonActivity(color, true);
    },
    makeButtonInactive: function(color) {
        this._changeButtonActivity(color, false);
    },
    flashButton: function(color, delay, length) {
      /// Accepts a string and a number in milleseconds
      var controller = this;
      setTimeout(function() {controller.makeButtonActive(color)},delay);
      setTimeout(function() {controller.makeButtonInactive(color)},delay+length);
    },
    playIntro: function() {
      var controller = this;
      for(color in controller.model.getGameColors()) {
        controller.flashButton(controller.model.getGameColors()[color],0,500);
      };
      for(color in controller.model.getGameColors()) {
        controller.flashButton(controller.model.getGameColors()[color],1000,500);
      };
      for(color in controller.model.getGameColors()) {
        controller.flashButton(controller.model.getGameColors()[color],2000,500);
      };
    },
    displaySequence: function(sequence) {
      /// Accepts an array of strings
      var controller = this;
      for(var el in sequence) {
        controller.flashButton(sequence[el], 1000*el, 500);
      };
    },

     // BINDING FUNCTIONS
     bindSimonButton: function(func, buttonName) {
       var button = this.simonGame.getElementsByClassName(buttonName)[0]
       button.onclick = func;
     },
     unbindSimonButton: function(buttonName) {
       var button = this.simonGame.getElementsByClassName(buttonName)[0];
       button.removeAttribute("onclick");
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
