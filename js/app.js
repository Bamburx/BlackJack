let playersHand = [];
let cardCount = 0;
const PLAYER_CARDS_COUNT = 2;
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


function getCardDeck() {
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
  const suits = ['♥', '♣', '♦', '♠'];
  const cardDeck = [];

  for (let suitsIndex = 0; suitsIndex < suits.length; suitsIndex++) {
    for (let ranksIndex = 0; ranksIndex < ranks.length; ranksIndex++) {
      cardDeck.push({
        rank: ranks[ranksIndex],
        value: values[ranksIndex],
        suit: suits[suitsIndex],
      })
    }
  }
  return cardDeck;
}


function shuffleDeck(cardDeck) {
  console.log(cardDeck)
  const DECK_SIZE = cardDeck.length;
  const result = [...cardDeck];


  for (let i = 0; i < DECK_SIZE; i++) {
    let card = result[i];
    let randomId = Math.floor(Math.random() * DECK_SIZE)
    result[i] = result[randomId];
    result[randomId] = card;
  }
  return result;
}

let cardValues = [];


function resetGame() {
  btnGame.disabled = false;
  btnAdd.disabled = true;
  playersHand.splice(0, playersHand.length);
  cardValues.splice(0, cardValues.length);
  p2Board.innerHTML = '';
  state.score = 0;
  score.innerHTML = 0;
  cardValues = shuffleDeck(getCardDeck());
}

btnGame.addEventListener('click', () => {
  cardValues = shuffleDeck(getCardDeck());
  btnGame.disabled = true;
  btnAdd.disabled = false;
  playersHand = cardValues.splice(0, PLAYER_CARDS_COUNT)
  playersHand.sort((a, b) => a.rank - b.rank)

  // assert that elements count === PLAYER_CARDS_COUNT
  for (let cardValue of playersHand) {
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
  playersHand.push(addCard);
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