console.log("model.js loaded successfully");

var Simon = {};
Simon.Model = function() {
  //private
  var sequence = [];
  var currentElement = 0;
  var roundsToWin = 20;
  var strict = false;
  var gameColors = ["yellow","blue","green","red",];

  //public
  var simon = {
    getGameColors: function() {
      return gameColors;
    },
    getSequence: function() {
      return sequence;
    },
    toggleStrict: function() {
      strict = !strict;
    },
    resetGame: function() {
      sequence = [];
      currentElement = 0;
    },
    makeGuess: function(guess) {
      if (sequence[currentElement] === guess && curentElement === roundsToWin - 1) {
        return "winGame";
      } else if (sequence[currentElement] === guess && currentElement === sequence.length - 1) {
        return "winRound";
      } else if (sequence[currentElement] === guess && currentElement < sequence.length - 1) {
        return "winGuess";
      } else if (sequence[currentElement] !== guess && strict) {
        return "loseGame";
      } else if (sequence[currentElement] !== guess && !strict) {
        return "loseRound";
      };
    },
    incrementCurrentElement: function() {
      currentElement++;
    },
    beginNextRound: function() {
      this.incrementSequence();
      currentElement = 0;
    },
    incrementSequence: function() {
      sequence.push(Math.floor(Math.random() * gameColors.length));
    },
    resetRound: function() {
      currentElement = 0;
    },
    winGame: function() {
      console.log("YOU WIN");
    },
    loseGame: function() {
      console.log("YOU LOSE");
    },
  };
  return simon;
};
