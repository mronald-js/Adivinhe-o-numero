let humanScore = 0;
let computerScore = 0;
let currentRoundNumber = 1;

let target;

const humanGuessInput = document.getElementById('human-guess');

const roundNumberDisplay = document.getElementById('round-number');

const computerGuessDisplay = document.getElementById('computer-guess');
const humanScoreDisplay = document.getElementById('human-score');
const computerScoreDisplay = document.getElementById('computer-score');
const targetNumberDisplay = document.getElementById('target-number');
const computerWinsDisplay = document.getElementById('computer-wins');

const guessButton = document.getElementById('guess');
const nextRoundButton = document.getElementById('next-round')


// Meu código

guessButton.addEventListener('click', () => {
  
    // Gera o valor alvo;
    target = generateTarget();

    //atribui o 'valor' do input da variavel do humanGuessInput
    const currentHumanGuess = humanGuessInput.value;
    const computerGuess = Math.floor(Math.random() * 10);
  
    //mostra na tela os valores 'adivinhados'
    computerGuessDisplay.innerText = computerGuess;
    targetNumberDisplay.innerText = target;
    
    // Determinar quem ganhou
    const humanIsWinner = compareGuesses(currentHumanGuess, computerGuess, target)
    const winner = humanIsWinner ? 'human' : 'computer'
  
    // Atualizar o score:
    updateScore(winner);
  
    // mostrar o vencedor
    if (humanIsWinner) {
      guessButton.innerText = 'Você Ganhou!!!!!';
      guessButton.classList.toggle('winning-text');
      if(guessButton.classList.contains('winning-text'))
            guessButton.style.color = 'green';
    } else {
      computerWinsDisplay.innerText = 'O Computador Ganhou!!!';
    }
  
  
    // Mostra a pontuação atual:
    humanScoreDisplay.innerText = humanScore;
    computerScoreDisplay.innerText = computerScore;
    
    // Set the correct disabled state for the buttons
    guessButton.setAttribute('disabled', true)
    nextRoundButton.removeAttribute('disabled');
});

nextRoundButton.addEventListener('click', () => {
    // Increase the round number
    advanceRound();
    // Display the new round number
    roundNumberDisplay.innerText = currentRoundNumber;

    // Set the correct disabled state for the buttons
    nextRoundButton.setAttribute('disabled', true);
    guessButton.removeAttribute('disabled');

    // Reset the guess input box and the target number display:
    targetNumberDisplay.innerText = '?';
    guessButton.innerText = 'Tente adivinhar';
    humanGuessInput.value = '';
    computerGuessDisplay.innerText = '?';
    computerWinsDisplay.innerText = '';
    guessButton.classList.remove('winning-text');
    guessButton.style.color = 'white';
});

const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');

addButton.addEventListener('click', () => {
    humanGuessInput.value = +humanGuessInput.value + 1;
    handleValueChange(humanGuessInput.value);
});

subtractButton.addEventListener('click', () => {
    humanGuessInput.value = +humanGuessInput.value - 1;
    handleValueChange(humanGuessInput.value);
});

const handleValueChange = value => {
    if (value > 0 && value <= 9) {
      subtractButton.removeAttribute('disabled');
      addButton.removeAttribute('disabled');
    } else if (value > 9) {
      addButton.setAttribute('disabled', true);
    } else if (value <= 0) {
      subtractButton.setAttribute('disabled', true);
    }
  }

function generateTarget() {
    return Math.floor(Math.random() * 10);
}

function getAbsoluteDistance(target, nForComparison){
    let range = target - nForComparison;
    return (range < 0) ? range *(-1) : range;
}

function compareGuesses(userGuess, computerGuess, secretTarget) {
    
    let rangeUser = getAbsoluteDistance(secretTarget, userGuess);
    let rangeComputer = getAbsoluteDistance(secretTarget, computerGuess);
    
    console.log(rangeUser, rangeComputer, secretTarget)
    if(rangeUser === rangeComputer) return true;

    if(rangeUser <= 0 && rangeComputer <= 0){
        rangeUser *= (-1);
        rangeComputer *= (-1);
    }
    if(rangeUser - rangeComputer < 0) return true
    else return false;
}

function isTheRangeValid(input){
    if (input < 0 || input > 9) alert('Numero invalido!');
}

function updateScore(whoWon){
    if(whoWon === 'human') humanScore++;
    else if(whoWon === 'computer') computerScore++;
}

function advanceRound() {
    currentRoundNumber++;
}

humanGuessInput.addEventListener('input', function(e) {
    handleValueChange(e.target.value);
});
  