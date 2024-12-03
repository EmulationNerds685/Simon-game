var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
$('.btn').click(function () {
	var userChosenColour = this.id
	userClickedPattern.push(userChosenColour)
	playSound(userChosenColour)
	animatePress(userChosenColour)
	checkAnswer(userClickedPattern.length - 1)
})
var started = false
var level = 0
$(document).bind('keypress', function () {
	if (!started) {
		nextSequence()
		started = true
	}
})
function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log('success')
		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence()
			}, 1000)
		}
	} else {
		playSound('wrong')
		$('body').addClass('game-over')
		setTimeout(function () {
			$('body').removeClass('game-over'), 200
		})
		$('h1').html('Game Over, Press Any Key to Restart')
		startOver()
	}
}
function startOver() {
	level = 0
	gamePattern = []
	started = false
}
function nextSequence() {
	var randomNumber = Math.floor(Math.random() * 4)
	var randomChosenColour = buttonColours[randomNumber]
	gamePattern.push(randomChosenColour)
	$('#' + randomChosenColour)
		.fadeOut(100)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100)
	playSound(randomChosenColour)
	userClickedPattern = []
	level++
	$('h1').text('level ' + level)
}
function playSound(name) {
	var audio = new Audio('sounds/' + name + '.mp3')
	audio.play()
}
function animatePress(currentColor) {
	$('#' + currentColor).addClass('pressed')
	setTimeout(function () {
		$('#' + currentColor).removeClass('pressed')
	}, 100)
}
