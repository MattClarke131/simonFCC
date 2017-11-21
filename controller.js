console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),

    // DISPLAY FUNCTIONS
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
    simonButtonGuess: function(color) {
      controller.bindSimonButton(
        function() {
          controller.flashButton(color,0,500);
          // SOME GUESS FUNCTION?
        },
        color+"Button")
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
