const ranks = ['2','3','4','5','6','7','8','9', '10', 'jack', 'queen', 'king', 'ace'];
const value = [2,3,4,5,6,7,8,9,10,10,10,10,11];
const suits = ['♥', '♣', '♦', '♠'];
let p2 = [];
const cardValues = [];
let cardCount = 0;
let PLAYER_CARDS_COUNT = 2;
cardDeck()
const DECK_SIZE = cardValues.length;
const score = document.querySelector('.score');
const p2Board = document.querySelector('#player-2');
const btnEnd = document.querySelector('#endGame');
const btnGame = document.querySelector('#newGame');
const btnAdd = document.querySelector('#add');
btnAdd.disabled = true;
const state = {
  score: +score.innerHTML
  //   get score() {
  //   return +scoreElement.dataset.score;
  // },
}

function cardDeck() {
  for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex++) {
  for (let ranksIndex = 0; ranksIndex < ranks.length; ranksIndex++) {
    cardValues.push({
      id: cardCount, 
      rank: ranks[ranksIndex],
      value: value[ranksIndex],
      suit: suits[suitsIndex],
    })
    cardCount++
  }
}
}


function deckShuffle() {
  for (let i = 0; i < DECK_SIZE; i++) {
  let card = cardValues[i];
  let randomId = Math.floor(Math.random() * DECK_SIZE)
  cardValues[i] = cardValues[randomId];
  cardValues[randomId] = card;
}
}

function resetGame() {
  btnGame.disabled = false;
  btnAdd.disabled = true;
  p2.splice(0, p2.length);
  cardValues.splice(0, cardValues.length);
  p2Board.innerHTML = '';
  state.score = 0;
  score.innerHTML = 0;
  cardDeck()
}

btnGame.addEventListener('click', () => {
  deckShuffle();
  btnGame.disabled = true;
  btnAdd.disabled = false;
  p2 = cardValues.splice(0, PLAYER_CARDS_COUNT)
  p2.sort((a, b) => a.rank - b.rank)

  // assert that elements count === PLAYER_CARDS_COUNT
  for (let cardValue of p2) {
    const div = document.createElement("div")
    div.id = cardValue.id;
    div.className = `card ${cardValue.rank} ${cardValue.suit}`;
    div.innerText = `${cardValue.rank} ${cardValue.suit}`
    p2Board.append(div)
    state.score += cardValue.value
  }
 score.innerHTML = state.score;
})

btnAdd.addEventListener('click', () => {
  let addCard = cardValues.shift();
  console.log(addCard)
  p2.push(addCard);
  const div = document.createElement("div")
    div.id = addCard.id;
    div.className = `card ${addCard.rank} ${addCard.suit}`;
    div.innerText = `${addCard.rank} ${addCard.suit}`;
    p2Board.append(div)
  state.score += addCard.value
  score.innerHTML = state.score;
  
  
  if (state.score > 21) {
    alert(`Your score is ${state.score}. You loose`);
  }
})

btnEnd.addEventListener('click', () => {
    alert(`Your score is ${state.score}`);
    resetGame()
})