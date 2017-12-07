console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),
    _changeButtonLight: function(color, isLit) {
      /// Accepts strings
      var controller = this;
      if(controller.model.getGameColors().indexOf(color) == -1) {
        console.error("invalid color: " + color);
      } else {
        var buttonNode = controller.simonGame.querySelector('[data-color='+color+']')
        if (isLit) {
          buttonNode.classList.remove("lightOff")
          buttonNode.classList.add("lightOn");
        } else {
          buttonNode.classList.remove("lightOn")
          buttonNode.classList.add("lightOff");
        }
      };
    },
    setButtonLightOn: function(color) {
        this._changeButtonLight(color, true);
    },
    setButtonLightOff: function(color) {
        this._changeButtonLight(color, false);
    },
    setStrictDisplayOn: function() {
      simonGame.getElementsByClassName("strictDisplay")
        .setAttribute("data-status", "strictOn");
    },
    setStrictDisplayOff: function() {
      simonGame.getElementsByClassName("strictDisplay")
        .setAttribute("data-status", "strictOff");
    },


    flashButton: function(color, delay, length) {
      /// Accepts a string and a number in milleseconds
      var controller = this;
      setTimeout(function() {controller.setButtonLightOn(color)},delay);
      setTimeout(function() {controller.setButtonLightOff(color)},delay+length);
    },
    playIntro: function() {
      var controller = this;
      var colors = controller.model.getGameColors();
      for(color in colors) {
        controller.flashButton(colors[color],0,500);
        controller.flashButton(colors[color],1000,500);
        controller.flashButton(colors[color],2000,500);
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
