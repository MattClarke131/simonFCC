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
    //Get Functions
    getGameColors: function() {
      return gameColors;
    },
    getSequence: function() {
      return sequence;
    },
    getStrictStatus: function() {
      return strict;
    },

    //Set Functions
    toggleStrict: function() {
      strict = !strict;
    },

    //Game State Functions
    resetGame: function() {
      sequence = [];
      currentElement = 0;
      strict = false;
    },
    resetRound: function() {
      currentElement = 0;

    incrementCurrentElement: function() {
      currentElement++;
    },
    incrementSequence: function() {
      sequence.push(Math.floor(Math.random() * gameColors.length));
    },
  };
  return simon;
};
