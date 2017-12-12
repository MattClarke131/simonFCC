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
    getStrictStatus: function() {
      return strict;
    },
    toggleStrict: function() {
      strict = !strict;
    },
    resetGame: function() {
      sequence = [];
      currentElement = 0;
      strict = false;
    },
    incrementCurrentElement: function() {
      currentElement++;
    },
    incrementSequence: function() {
      sequence.push(Math.floor(Math.random() * gameColors.length));
    },
    resetRound: function() {
      currentElement = 0;
    },
  };
  return simon;
};
