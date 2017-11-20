console.log("model.js loaded successfully");

var Simon = {};
Simon.Model = function() {
  //private
  var sequence = [];
  var currentElement = 0;
  var strict = true;
  var gameColors = ["yellow","blue","green","red",];

  //public
  var simon = {
    //set methods
    resetSequence: function() {
      sequence = [];
    },
    addElement: function(newElement) {
      sequence.push(newElement);
    },
    incrementCurrentElement: function() {
      currentElement++;
    },
    resetCurrentElement: function() {
      currentElement = 0;
    },
    toggleStrict: function() {
      strict = !strict;
    },
    //get methods
    getSequence: function() {
      return sequence;
    },
    getCurrentElement: function() {
      return currentElement;
    },
    getGameColors: function() {
      return gameColors;
    },
    //game play methods
    startGame: function() {
      this.resetSequence();
      this.resetCurrentElement();
    },
    checkCurrentElement: function(guess) {
      return (sequence[currentElement] == guess);
    },
    pickRandomElement: function() {
      return gameColors[Math.floor(4*Math.random())]
    },
    successSequence: function() {
      if(sequence.length >= 20) {
        this.winGame();
      } else {
        this.incrementCurrentElement();
        newElement = this.pickRandomElement();
        this.addElement(newElement);
      };
    },
    failSequence: function() {
      if(strict) {
        this.loseGame();
      };
    },
    winGame: function() {
    },
    loseGame: function() {
    },
  };
  return simon;
};
