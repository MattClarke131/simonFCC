console.log("controller.js loaded successfully");

Simon.Controller = function(node) {
  return {
    simonGame: node,
    model: Simon.Model(),
    currentPhase: "",
    introLength: 3000,
    colorDisplayLength: 1000,


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
    setPowerDisplayOn: function() {
      var element = this.simonGame.getElementsByClassName("powerDisplay")[0];
      this._changeDisplayLight(element, true);
    },
    setPowerDisplayOff: function() {
      var element = this.simonGame.getElementsByClassName("powerDisplay")[0];
      this._changeDisplayLight(element, false);
    },
    setStrictDisplayOn: function() {
      var element = this.simonGame.getElementsByClassName("strictDisplay")[0];
      this._changeDisplayLight(element, true);
    },
    setStrictDisplayOff: function() {
      var element = this.simonGame.getElementsByClassName("strictDisplay")[0];
      this._changeDisplayLight(element, false);
    },
    setGameCountDisplayOn: function() {
      var element = this.simonGame.getElementsByClassName("gameCount")[0];
      this._changeDisplayLight(element, true);
    },
    setGameCountDisplayOff: function() {
      var element = this.simonGame.getElementsByClassName("gameCount")[0];
      this._changeDisplayLight(element, false);
    },
    setGameCountAmount: function(value) {
      var element = this.simonGame.getElementsByClassName("gameCount")[0];
      element.setAttribute("data-gameCount", value);
      element.innerHTML = value;
    },
    resetGameCount: function() {
      var element = this.simonGame.getElementsByClassName("gameCount")[0];
      element.setAttribute("data-gameCount", 0);
      element.innerHTML = "--";
    },
    setGameButtonLightOn: function(color) {
        this._changeButtonLight(color, true);
    },
    setGameButtonLightOff: function(color) {
        this._changeButtonLight(color, false);
    },


    // Display Timing Functions
    flashButton: function(color, delay, length) {
      /// Accepts a string and a number in milleseconds
      var controller = this;
      setTimeout(function() {controller.setGameButtonLightOn(color)},delay);
      setTimeout(function() {controller.setGameButtonLightOff(color)},delay+length);
    },
    playIntro: function() {
      var controller = this;
      var colors = controller.model.getGameColors();
      var introTick = this.introLength/6;
      for(color in colors) {
        controller.flashButton(colors[color],0*introTick,1*introTick);
        controller.flashButton(colors[color],2*introTick,3*introTick);
        controller.flashButton(colors[color],4*introTick,5*introTick);
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


    // Set data-activity Functions
    _setElementActivity: function(element, activity) {
      element.setAttribute("data-activity", activity);
    },

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //QUESTION: Which is better?
    //          A: Two functions: one for on, andone for off.
    //          B: One function with a true/false argument

    setStartButtonActive: function() {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("startButton")[0], "active"
      );
    },
    setStartButtonInactive: function() {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("startButton")[0], "inactive"
      );
    },
    setStrictButtonActive: function() {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("strictButton")[0], "active"
      );
    },
    setStrictButtonInactive: function() {
      this._setElementActivity(
        this.simonGame.getElementsByClassName("strictButton")[0], "inactive"
      );
    },
    setGameButtonsActive: function(color) {
      var gameButtons = this.simonGame.getElementsByClassName("gameButton");
      for(var button in gameButtons) {
        this._setElementActivity(gameButtons[button], "active");
      };
    },
    setGameButtonsInactive: function(color) {
      var gameButtons = this.simonGame.getElementsByClassName("gameButton");
      for(var button in gameButtons) {
        this._setElementActivity(gameButtons[button], "inactive");
      };
    },

    // Set Phase Functions

    setInitPhase: function() {
      this.currentPhase = "initPhase";
      //Displays
      this.setPowerDisplayOff();
      this.setStrictDisplayOff();
      this.resetGameCount();
      this.setGameCountDisplayOff();
      //Buttons
      this.setStartButtonInactive();
      this.setStrictButtonInactive();
      this.setGameButtonsInactive();
      //Model
      this.model.resetGame();
    },
    setOnPhase: function() {
      this.currentPhase = "onPhase";
      //Displays
      this.setPowerDisplayOn();
      this.setStrictDisplayOff();
      this.resetGameCount();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //Model
      this.model.resetGame();
    },
    setStartingPhase: function() {
      this.currentPhase = "startingPhase";
      //Displays
      this.setPowerDisplayOn();
      this.resetGameCount();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //Transition
      this.playIntro();
    },
    setDisplayPhase: function() {
      this.currentPhase = "displayPhase";
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //DisplaySequence
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      //QUESTION: Which is better?
      //          A: Defining sequence here
      //          B: Defining sequence in this.displaySequence();
      var sequence = this.model.getSequence();
      this.displaySequence(sequence);
    },
    setGuessPhase: function() {
      this.currentPhase = "guessPhase";
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsActive();
    },
    setWrongPhase: function() {
      this.currentPhase = "wrongPhase";
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
    },
    setWinPhase: function() {
      this.curentPhase = "winPhase";
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
    },
    setLosePhase: function() {
      this.currentPhase = "losePhase";
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
    },
    // Button binds
    bindpowerButton: function() {
      var controller = this;
      simonGame.getElementsByClassName("powerButton").onclick = function() {
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
    bindStrictButton: function() {
      var controller = this;
      simonGame.getElementsByClassName("strictButton")[0].onclick = function() {
        if(simonGame.getElementsByClassName("strictButton")[0].getAttribute("data-activity") == "inactive") {
          return;
        } else {
          controller.model.toggleStrict();
          controller.updateHTML();
        }
      }
    },

    updateHTML: function() {
      var currentRound = this.model.getSequence().length;
      this.setGameCountAmount(currentRound);
      if(this.model.getStrictStatus && this.currentPhase !== "initPhase") {
        this.setStrictDisplayOn();
      } else {
        this.setStrictDisplayOff();
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
