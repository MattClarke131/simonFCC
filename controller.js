console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),
    currentPhase: "",
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
    _changeDisplayLight: function(element, isLit) {
      if(isLit) {
        element.classList.remove("lightOff");
        element.classList.add("lightOn");
      } else {
        element.classList.remove("lightOn");
        element.classList.add("lightOff");
      }
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

    // SET PHASE FUNCTIONS
    setElementActivity: function(element, activity) {
      element.setAttribute("data-activity", activity);
    },
    setInitPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        }
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "inactive");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "inactive");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], false);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], false);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], false);
      this.simonGame.getElementsByClassName("gameCount")[0].setAttribute("data-gameCount", "00");
      this.currentPhase = "initPhase";
    },
    setOnPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        }
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], false);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.simonGame.getElementsByClassName("gameCount")[0].setAttribute("data-gameCount", "00");
      this.currentPhase = "onPhase"
    },
    setStartingPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.simonGame.getElementsByClassName("gameCount")[0].setAttribute("data-gameCount", "00");
      this.currentPhase = "startingPhase";
    },
    setDisplayPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.currentPhase = "displayPhase";
    },
    setGuessPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "active");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.currentPhase = "guessPhase";
    },
    setWrongPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.currentPhase = "wrongPhase";
    },
    setWinPhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.currentPhase = "winPhase";
    },
    setLosePhase: function() {
      var colorButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in colorButtons) {
        if(colorButtons.hasOwnProperty(button)) {
          this.setElementActivity(colorButtons[button], "inactive");
        };
      };
      this.setElementActivity(this.simonGame.getElementsByClassName("startButton")[0], "active");
      this.setElementActivity(this.simonGame.getElementsByClassName("strictButton")[0], "active");
      this._changeDisplayLight(this.simonGame.getElementsByClassName("onOffDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("strictDisplay")[0], true);
      this._changeDisplayLight(this.simonGame.getElementsByClassName("gameCount")[0], true);
      this.currentPhase = "losePhase";
    },
    // Button binds
    bindOnOffButton: function() {
      var controller = this;
      simonGame.getElementsByClassName("onOffButton").onclick = function() {
        if(controller.currentPhase == "initPhase") {
          controller.setOnPhase();
        } else {
          controller.setInitPhase();
        }
      }
    },
    bindStartButton: function() {
      var controller = this;
      simonGame.getElementsByClassName("startButton")[0].onclick = function() {
        if(simonGame.getElementsByClassName("startButton")[0].getAttribute("data-activity") == "inactive") {
          return;
        } else {
          controller.setStartingPhase();
          controller.playIntro();
          setTimeout(function() {
            controller.setDisplayPhase();
          }, 4000)
        }
      }
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
