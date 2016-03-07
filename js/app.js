/*--- Inizializing Variables ---*/
'use strict'
var secretNumber,
userGuess,
feedback,
gapNumber, // extra
pastGuesses = [],
newButton,
input,
countElement,
count,
guessList,
alreadyGuessed,
guessHtml,
userFeedback,
form;

$(document).ready(pageLoad);

function pageLoad(){
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});


  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});
	  
	/*--- Declare variable with Jquery values to fetch html elements ---*/
	
	feedback = $('#feedback');
	form = $('form');
	input = form.find('#userGuess');
	newButton = $('a.new');
	countElement = $('#count');
	guessList = $('#guessList');

	/*New Game load with page*/
	newGame();

	/*Event handlers */

	form.submit(function(event){
      event.preventDefault();
      getUserGuess();
    }); // understand this!?
	/*Function to Start the Game by clicking New Game button*/

	newButton.click(newGame);

}
		
	/*new game Function*/

	function newGame(){
		form.find('input[type=submit]').css('opacity','1');
		resetVariables();
		render();
		generateNumber();
	}



	/*Function to get User Guess*/

	function getUserGuess(){
		//get the input value
		userGuess = input.val(); 
		// Clean input area:
		input.val('');
		//focus on input for the next guess
		input.focus();
		// is a valid input? :
		if(checkGuess()){
			return ; //if they UserInput does not meet the validity criteria, then is true and the getUserInput function finish here, until the input is valid
		}
		//get the feedback
		generateFeedback();
		//track the past user guesses
		trackGuess();
		//increment the count
		guessCount();
		//render changes to the page
		render();
	}


	/*Function to Validate User Input*/

	function checkGuess(){
		if(userGuess % 1 !== 0) { //includes blank spaces, non Integers, and other type of characters
 			alert("Please input a Number");
 			return true;
		} 
		else if(userGuess < 0 || userGuess > 101) { 
			alert("Please input a number between Zero and 100");
			return true;
		}

		if(pastGuesses.length > 0){
			$.each(pastGuesses,function(guess,value){
				if(userGuess == value){
					alreadyGuessed = true;
				}
			}); //understand this block
		}
		if(alreadyGuessed){
			alreadyGuessed = false;
			alert('You guessed this number already');
			return true;
		}
    return false;
	}
	
	/*Function to provide Feedback to guess Numbers*/

	
	function generateFeedback(){

		gapNumber = Math.abs(secretNumber - userGuess);

		if(userGuess == secretNumber) {
			userFeedback = "You WON!! click 'new Game' and play again!";
		} else if(gapNumber <= 10 && gapNumber >= 1) {
			userFeedback ="Very HOT!";
		} else if(gapNumber <= 20 && gapNumber >= 11) {
			userFeedback ='Hot';
		} else if(gapNumber <= 30 && gapNumber >= 21) {
			userFeedback = 'warm...';
		} else if(gapNumber <= 49 && gapNumber >= 31) {
			userFeedback ='cold';
		} else if(gapNumber >=50) {
			userFeedback ='ice cold!';
		} 

	}


	/*Function to create an array of the Guesses input by User. and append to the list*/

		function trackGuess(){
			pastGuesses.push(userGuess);
			guessHtml='';
			if(pastGuesses[0].length){
				$.each(pastGuesses,function(guess,value){
				guessHtml += '<li>' + value + '</li>';
				}); //understand this!?!?!
			}
		}

		/*Function to get the guess count */

		function guessCount(){
			count++;
		}

		/*Function to Generate Secret Number*/

		function generateNumber(){
			secretNumber = Math.floor(Math.random() * 100) + 1;
			console.log('SecretNumber for this Game: ' + secretNumber);
		}

		/*Appending(rendering) functions to the webpage*/

		function render(){
			guessList.html(guessHtml); //render list of Guess 
			countElement.html(count);
			feedback.html(userFeedback);
		}

		/*Reset variables for each new guess*/
		function resetVariables(){
		count = 0;
		pastGuesses = [];
		guessHtml='';
		userGuess = '';
		userFeedback = 'Make your Guess!';
	}
	