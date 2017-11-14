console.log("model.js loaded successfully");

var Simon = {};
Simon.Model = function() {
  //private
  var sequence = [];
  var currentElement = 0;
  var strict = true;

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
    //game play methods
    startGame: function() {
      this.resetSequence();
      this.resetCurrentElement();
    },
    checkCurrentElement: function(guess) {
      return (sequence[currentElement] == guess)
    },
  };
  return simon;
};
