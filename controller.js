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
    updateStrictDisplay: function() {
      if(this.model.getStrictStatus()) {
        controller.setStrictDisplayOn();
      } else {
        controller.setStrictDisplayOff();
      }
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
    _changeButtonLight: function(color, newLightStatus) {
      var colorElement = this.simonGame.querySelector('[data-color=' + color + ']');
      if(newLightStatus) {
        colorElement.classList.remove("lightOff");
        colorElement.classList.add("lightOn");
      } else {
        colorElement.classList.remove("lightOn");
        colorElement.classList.add("lightOff");
      }
    },
    setGameButtonLightOn: function(color) {
        this._changeButtonLight(color, true);
    },
    setGameButtonLightOff: function(color) {
        this._changeButtonLight(color, false);
    },

    // DISPLAY TIMING FUNCTIONS
    flashButton: function(color, delay, length) {
      /// Accepts a string and a number in milleseconds
      var controller = this;
      setTimeout(function() {controller.setGameButtonLightOn(color)},delay);
      setTimeout(function() {controller.setGameButtonLightOff(color)},delay+length);
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
      for(var i = 0;i<gameButtons.length;i++) {
        this._setElementActivity(gameButtons[i], "active");
      };
    },

    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // QUESTION: Why does this not work?
    //setGameButtonsInactive: function(color) {
    //  var gameButtons = this.simonGame.getElementsByClassName("gameButton");
    //  for(var button in gameButtons) {
    //    if(gameButtons.hasOwnProperty(gameButtons[button])) {
    //      this._setElementActivity(gameButtons[button], "inactive");
    //    };
    //  };
    //},
    setGameButtonsInactive: function(color) {
      var gameButtons = this.simonGame.getElementsByClassName("gameButton");
      for(var i = 0; i < gameButtons.length; i++) {
          this._setElementActivity(gameButtons[i], "inactive");
        };
    },

    // SET PHASE FUNCTIONS
    setInitPhase: function() {
      this.currentPhase = "initPhase";
      console.log("initPhase");
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
      this.model.initGame();
    },
    setOnPhase: function() {
      this.currentPhase = "onPhase";
      console.log("onPhase");
      //Displays
      this.setPowerDisplayOn();
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
      console.log("startingPhase");
      //Displays
      this.setPowerDisplayOn();
      this.resetGameCount();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //Model
      this.model.incrementSequence();
      //Transition
      this.playIntro();
      setTimeout(function() {controller.setDisplayPhase()},this.introLength)
    },
    setDisplayPhase: function() {
      this.currentPhase = "displayPhase";
      console.log("displayPhase");
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      this.setGameCountAmount(this.model.getSequence().length);
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //Model
      this.model.resetRound();

      //Transition
      var sequence = this.model.getSequence();
      this.displaySequence(sequence);
      var displayPhaseLength = sequence * this.colorDisplayLength;
      setTimeout(function() {controller.setGuessPhase()},displayPhaseLength);

    },
    setGuessPhase: function() {
      this.currentPhase = "guessPhase";
      console.log("guessPhase");
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
      console.log("wrongPhase");
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
      console.log("winPhase");
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
      //
      alert("YOU WIN!");
      this.setOnPhase();
    },
    setLosePhase: function() {
      this.currentPhase = "losePhase";
      console.log("losePhase");
      //Displays
      this.setPowerDisplayOn();
      this.setGameCountDisplayOn();
      //Buttons
      this.setStartButtonActive();
      this.setStrictButtonActive();
      this.setGameButtonsInactive();
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
          controller.playIntro();
          setTimeout(function() {
            controller.setDisplayPhase();
          }, 4000)
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
      var gameButtons = simonGame.getElementsByClassName("gameButton");
      for(var button in gameButtons) {
        controller._bindIndividualGameButton(gameButtons[button]);
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
            setTimeout(function() {controller.setDisplayPhase()},1000);
          } else if(buttonColor === correctGuess && currentEl === maxSeq -1) {
            controller.setWinPhase();
          } else if(buttonColor === correctGuess && currentEl < seqLength -1) {
            controller.model.incrementCurrentElement();
          } else if(buttonColor === correctGuess &&
            currentEl === seqLength -1 &&
            currentEl !== maxSeq) {
              controller.model.incrementSequence();
              setTimeout(function() {controller.setDisplayPhase()},1000);
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

/*
var simonGameNodes = document.getElementsByClassName("simonGame");
for (var i = 0; i < simonGameNodes.length; ++i) {
  var node = simonGameNodes[i];
  var controller = Simon.Controller(node);
  controller.initialize();
}
*/
