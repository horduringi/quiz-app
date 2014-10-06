function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(document).ready(function() {
	var newQuiz = function() {
		shuffle(countries);
		score = 0;
		total = 5;

		askQuestion(0);
	}
	var showScore = function(){
		$('h2').text("You got " + score + " out of " + total + " correct.");
		$('ul').empty();
	}
	var askQuestion = function(questionNum){
		$('#country').text(countries[questionNum].name);
		var answer = countries[questionNum].capital;
		var options = $('ul');
		options.empty();
		var tempOptions = ['<li class="option answer">' + answer + '</li>'];
		
		while(tempOptions.length < 4){
			tempOptions.push('<li class="option">' + countries[Math.floor(Math.random()*countries.length)].capital + '</li>');
		}
		shuffle(tempOptions);
		for(var o in tempOptions){
			options.append(tempOptions[o])
		}

		$('.option').on('click', function(){
			if($(this).hasClass("answer"))
			{
				score ++;
				$('.answer').addClass("correct");
			}
			else
			{	
				$(this).addClass("incorrect");
				$('.answer').addClass("correct");
			}
			questionNum ++;
			if(questionNum < total)
			{
				window.setTimeout(function () { askQuestion(questionNum); }, 2000);
			}
			else
			{
				window.setTimeout(function () { showScore(); }, 2000);
			}
		})
		
	}
	
	var score;
	var total;
	
	newQuiz();
})