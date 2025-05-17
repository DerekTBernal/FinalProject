// Variables
var quesNo = 1;
var rightAnswer;
var score = 0;
var answered = false;
var finished = false;
var currentQues = 1;
var choice = 0;

// For selecting choices
function choose(chc) {
	if(!answered) {
		reset();
		choice = chc;
		var selected = document.getElementById("ch" + chc);
		selected.style.backgroundColor = "white";
		selected.style.color = "black";
	}
}

// Resets applied colors to choices
function reset() {
	for(let i = 1; i < 5; ++i) {
		let chc = document.getElementById("ch" + i);
		chc.style.backgroundColor = "#1f1f1f";
		chc.style.color = "white";
	}
}

// Set question and choices
function setQuesAndChc(i) {
	reset();
	switch(i) {
		case 1:
			question.innerHTML = "Which of the following is not a common characteristic of poverty?";
			ch1.innerHTML = "Lack of access to basic needs";
			ch2.innerHTML = "High levels of unemployment";
			ch3.innerHTML = "Low income and wealth";
			ch4.innerHTML = "High levels of education";
			rightAnswer = 4;
			break;
		case 2:
			question.innerHTML = "Why do we need to learn about poverty?";
			ch1.innerHTML = "To know what to write in school essays, of course.";
			ch2.innerHTML = "Simply for curiosity.";
			ch3.innerHTML = "To know how to be not poor.";
			ch4.innerHTML = "Because we, as students, must learn societal issues in order to provide solutions for them.";
			rightAnswer = 4;
			break;
		case 3:
			question.innerHTML = "Which region has the highest percentage of people living in extreme poverty?"
			ch1.innerHTML = "North America";
			ch2.innerHTML = "Africa";
			ch3.innerHTML = "Europe";
			ch4.innerHTML = "Australia";
			rightAnswer = 2;
			break;
		case 4:
			question.innerHTML = "According to World Bank, living on less than ??? a day per person is considered extreme poverty.";
			ch1.innerHTML = "$1.9";
			ch2.innerHTML = "$2.1";
			ch3.innerHTML = "$1.8";
			ch4.innerHTML = "$2.2";
			rightAnswer = 1;
			break;
		case 5:
			question.innerHTML = "Which of the following is a direct effect of poverty on children?";
			ch1.innerHTML = "Higher access to education";
			ch2.innerHTML = "Better nutrition and healthcare";
			ch3.innerHTML = "Increased likelihood of child labor";
			ch4.innerHTML = "Increased access to technology";
			rightAnswer = 3;
			break;
	}
}

// Submitting the answer, and validating it
function submit() {
	// Goes through if an answer hasn't been submitted to that question
	// Choice being 0 means user hasn't selected yet
	if (!answered && choice !== 0) {
		currentQues++;
		if (currentQues > 5) {
			finished = true;
			currentQues = 5;
		}

		// tag question as answered, to disable any further submission
		answered = true;

		// color correct answer
		var rightChc = document.getElementById("ch" + rightAnswer);
		rightChc.style.backgroundColor = "green";
		rightChc.style.color = "black";

		// if choice isnt the correct answer, color it as red
		if(choice != rightAnswer) {
			var wrongChc = document.getElementById("ch" + choice);
			wrongChc.style.backgroundColor = "red";
			wrongChc.style.color = "black";
		}
		else {
			score++;
		}

		// reset selection
		choice = 0;
	}

	// set score and feedback when finished
	if (finished) {
		score_display.innerHTML = score;
		if(score < 3) {
			feedback.innerHTML = "<i>Learn more and try again next time...</i>";
		} else if (score < 5) {
			feedback.innerHTML = "<i>Good job. A bit more of learning and you'll ace this in no time!</i>";
		} else {
			feedback.innerHTML = "<i>Congratulations! Keep Learning!</i>";
		}
	}
}

// goes to the next question if current question had been answered
function next() {
	console.log(quesNo);
	if(answered && (quesNo + 1) <= 5) {
		setQuesAndChc(++quesNo);
		if(quesNo < currentQues || finished) {
			var rightChc = document.getElementById("ch" + rightAnswer);
			rightChc.style.backgroundColor = "green";
			rightChc.style.color = "black";
		} else {
			answered = false;
		}
	}
}

// goes to the previous question and shows the correct answer (previous answers of user isn't shown)
function prev() {
	if(quesNo !== 1) {
		setQuesAndChc(--quesNo);
		var rightChc = document.getElementById("ch" + rightAnswer);
		rightChc.style.backgroundColor = "green";
		rightChc.style.color = "black";

		// since this is a previous question, it has already been answered
		answered = true;
	}
}

// initialize
setQuesAndChc(1);