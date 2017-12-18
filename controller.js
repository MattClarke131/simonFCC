console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    model: Simon.Model(),
    //Constants
    introLength: 3000,
    colorDisplayLength: 1000,
    //State
    currentPhase: "",
    //HTML
    simonGame: node,
    powerDisplay: simonGame.getElementsByClassName("powerDisplay")[0],
    strictDisplay: simonGame.getElementsByClassName("strictDisplay")[0],
    gameCount: simonGame.getElementsByClassName("gameCount")[0],
    gameButtons: simonGame.getElementsByClassName("gameButton"),

    // DISPLAY FUNCTIONS
    _changeDisplayLight: function(element, newLightStatus) {
      if(newLightStatus) {
        element.classList.remove("lightOff");
        element.classList.add("lightOn");
      } else {
        element.classList.remove("lightOn");
        element.classList.add("lightOff");
      };
    },
    setPowerDisplay: function(newValue) {
      this._changeDisplayLight(this.powerDisplay,newValue);
    },
    setStrictDisplay: function(newValue) {
      this._changeDisplayLight(this.strictDisplay, newValue);
    },
    updateStrictDisplay: function() {
      if(this.model.getStrictStatus()) {
        controller.setStrictDisplay(true);;
      } else {
        controller.setStrictDisplay(false);;
      }
    },
    setGameCountDisplay: function(newValue) {
      this._changeDisplayLight(this.gameCount, newValue);
    },
    setGameCountAmount: function(value) {
      this.gameCount.setAttribute("data-gameCount", value);
      this.gameCount.innerHTML = value;
    },
    resetGameCount: function() {
      this.gameCount.setAttribute("data-gameCount", 0);
      this.gameCount.innerHTML = "--";
    },
    setGameButtonLight: function(color, newLightStatus) {
      var colorElement = this.simonGame.querySelector('[data-color=' + color + ']');
      if(newLightStatus) {
        colorElement.classList.remove("lightOff");
        colorElement.classList.add("lightOn");
      } else {
        colorElement.classList.remove("lightOn");
        colorElement.classList.add("lightOff");
      }
    },

    // DISPLAY TIMING FUNCTIONS
    flashButton: function(color, delay, length) {
      /// Accepts a string and a number in milleseconds
      var controller = this;
      setTimeout(function() {controller.setGameButtonLight(color, true)},delay);
      setTimeout(function() {controller.setGameButtonLight(color, false)},delay+length);
    },
    playIntro: function() {
      var colors = this.model.getGameColors();
      var introTick = this.introLength/6;
      for(var color in colors) {
        controller.flashButton(colors[color],0*introTick,introTick);
        controller.flashButton(colors[color],2*introTick,introTick);
        controller.flashButton(colors[color],4*introTick,introTick);
      };
    },
    playWrongFlash: function() {
      var colors = this.model.getGameColors();
      for(var color in colors) {
        controller.flashButton(colors[color],0,500);
      };
    },
    displaySequence: function(sequence) {
      /// Accepts an array of strings
      var controller = this;
      var displayTick = this.colorDisplayLength;
      for(var el in sequence) {
        controller.flashButton(sequence[el], displayTick*el, displayTick/2);
      };
    },


    // SET DATA-ACTIVITY FUNCTIONS
    _setElementActivity: function(element, activity) {
      element.setAttribute("data-activity", activity);
    },
    setStartButtonActivity: function(newActivity) {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("startButton")[0], newActivity
      );
    },
    setStrictButtonActivity: function(newActivity) {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("strictButton")[0], newActivity
      );
    },
    setGameButtonsActivity: function(newActivity) {
      for(var i = 0;i<this.gameButtons.length;i++) {
        this._setElementActivity(this.gameButtons[i], newActivity);
      };
    },

    // SET PHASE FUNCTIONS
    setInitPhase: function() {
      this.currentPhase = "initPhase";
      console.log("initPhase");
      //Displays
      this.setPowerDisplay(false);
      this.setStrictDisplay(false);;
      this.resetGameCount();
      this.setGameCountDisplay(false);
      //Buttons
      this.setStartButtonActivity("inactive");
      this.setStrictButtonActivity("inactive");
      this.setGameButtonsActivity("inactive");
      //Model
      this.model.initGame();
    },
    setOnPhase: function() {
      this.currentPhase = "onPhase";
      console.log("onPhase");
      //Displays
      this.setPowerDisplay(true);
      this.resetGameCount();
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //Model
      this.model.resetGame();
    },
    setStartingPhase: function() {
      this.currentPhase = "startingPhase";
      console.log("startingPhase");
      //Displays
      this.setPowerDisplay(true);
      this.resetGameCount();
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //Model
      this.model.resetGame();
      this.model.incrementSequence();
      //Transition
      this.playIntro();
      setTimeout(function() {controller.setDisplayPhase()},this.introLength)
    },
    setDisplayPhase: function() {
      this.currentPhase = "displayPhase";
      console.log("displayPhase");
      //Displays
      this.setPowerDisplay(true);
      this.setGameCountDisplay(true);
      this.setGameCountAmount(this.model.getSequence().length);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //Model
      this.model.resetRound();
      //Transition
      var sequence = this.model.getSequence();
      var controller = this;
      setTimeout(function(){controller.displaySequence(sequence);},750)
      var displayPhaseLength = sequence * this.colorDisplayLength;
      setTimeout(function(){controller.setGuessPhase()},750+displayPhaseLength);

    },
    setGuessPhase: function() {
      this.currentPhase = "guessPhase";
      console.log("guessPhase");
      //Displays
      this.setPowerDisplay(true);
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("active");
    },
    setWrongPhase: function() {
      this.currentPhase = "wrongPhase";
      console.log("wrongPhase");
      //Displays
      this.setPowerDisplay(true);
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //Transition
      this.playWrongFlash();
      var controller = this;
      setTimeout(function() {controller.setDisplayPhase()},1000);
    },
    setWinPhase: function() {
      this.curentPhase = "winPhase";
      console.log("winPhase");
      //Displays
      this.setPowerDisplay(true);
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //
      alert("YOU WIN!");
      this.setOnPhase();
    },
    setLosePhase: function() {
      this.currentPhase = "losePhase";
      console.log("losePhase");
      //Displays
      this.setPowerDisplay(true);
      this.setGameCountDisplay(true);
      //Buttons
      this.setStartButtonActivity("active");
      this.setStrictButtonActivity("active");
      this.setGameButtonsActivity("inactive");
      //
      alert("YOU LOSE!");
      this.setOnPhase();
    },

    // BUTTON BINDS
    bindPowerButton: function() {
      var controller = this;
      controller.simonGame.getElementsByClassName("powerButton")[0].onclick = function() {
        if(controller.currentPhase == "initPhase") {
          controller.setOnPhase();
        } else {
          controller.setInitPhase();
        };
      };
    },
    bindStartButton: function() {
      var controller = this;
      controller.simonGame.getElementsByClassName("startButton")[0].onclick = function() {
        if(controller.simonGame.getElementsByClassName("startButton")[0].getAttribute("data-activity") == "inactive") {
          return;
        } else {
          controller.setStartingPhase();
        };
      };
    },
    bindStrictButton: function() {
      var controller = this;
      controller.simonGame.getElementsByClassName("strictButton")[0].onclick = function() {
        if(controller.simonGame.getElementsByClassName("strictButton")[0].getAttribute("data-activity") == "inactive") {
          return;
        } else {
          controller.model.toggleStrict();
          controller.updateStrictDisplay();
        };
      };
    },
    bindGameButtons: function() {
      //Game buttons should be active ONLY during the guessPhase
      for(var button in this.gameButtons) {
        controller._bindIndividualGameButton(this.gameButtons[button]);
      };
    },
    _bindIndividualGameButton: function(button) {
      var controller = this;
      button.onclick = function() {
        if(this.getAttribute("data-activity") === "active") {
          var buttonColor = this.getAttribute("data-color");
          controller.flashButton(buttonColor,0,250);

          var correctGuess = controller.model.getSequence()[controller.model.getCurrentElement()];
          var seqLength = controller.model.getSequence().length
          var currentEl = controller.model.getCurrentElement();
          var maxSeq = controller.model.getRoundsToWin();
          var strict = controller.model.getStrictStatus();
          if (buttonColor !== correctGuess && strict) {
            controller.setLosePhase();
            controller.setOnPhase();
          } else if(buttonColor !== correctGuess && !strict) {
            controller.setWrongPhase();
          } else if(buttonColor === correctGuess && currentEl === maxSeq -1) {
            controller.setWinPhase();
          } else if(buttonColor === correctGuess && currentEl < seqLength -1) {
            controller.model.incrementCurrentElement();
          } else if(buttonColor === correctGuess &&
            currentEl === seqLength -1 &&
            currentEl !== maxSeq) {
              controller.model.incrementSequence();
              controller.setDisplayPhase();
          };
        };
      };
    },

    // INITIALIZE
    initialize: function() {
      this.bindPowerButton();
      this.bindStartButton();
      this.bindStrictButton();
      this.bindGameButtons();
      this.setInitPhase();
    },
  };
};

// Temporary for debugging
var simonGame = document.getElementsByClassName("simonGame")[0];
var controller = Simon.Controller(simonGame);
controller.initialize();
/*
var simonGameNodes = document.getElementsByClassName("simonGame");
for (var i = 0; i < simonGameNodes.length; ++i) {
  var node = simonGameNodes[i];
  var controller = Simon.Controller(node);
  controller.initialize();
}
*/
