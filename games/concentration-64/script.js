document.addEventListener("DOMContentLoaded", () => {
  // ===== Game State =====
  const gameState = {
    category: '',
    wordsUsed: new Set(),
    playerScore: 0,
    aiScore: 0,
    turn: 'player',
    wordBank: [],
    timer: 5,
    interval: null
  };

  // ===== DOM Elements =====
  const categoryInput = document.getElementById('category-input');
  const randomCategoryBtn = document.getElementById('random-category');
  const startGameBtn = document.getElementById('start-game');
  const gameScreen = document.getElementById('game-screen');
  const setupScreen = document.getElementById('setup-screen');
  const wordListUI = document.getElementById('word-list');
  const playerInput = document.getElementById('player-input');
  const submitBtn = document.getElementById('submit-word');
  const playerScoreUI = document.getElementById('player-score');
  const aiScoreUI = document.getElementById('computer-score');
  const timerUI = document.getElementById('timer');
  const turnDisplay = document.getElementById('turn-display');
  const gameOverScreen = document.getElementById('game-over');
  const winnerMsg = document.getElementById('winner-msg');
  const restartBtn = document.getElementById('restart');

  // ===== Events =====
  randomCategoryBtn.onclick = () => {
    const mockCategories = ['furniture', 'countries', 'insects'];
    const randomKey = mockCategories[Math.floor(Math.random() * mockCategories.length)];
    categoryInput.value = randomKey;
  };

  startGameBtn.onclick = async () => {
    const cat = categoryInput.value.toLowerCase().trim();
    if (!cat || cat.length < 2) {
      alert('Please enter a valid category.');
      return;
    }

    setupScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');

    gameState.category = cat;
    gameState.wordBank = await generateWordBank(cat);
    startGame();
  };

  categoryInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      startGameBtn.click();
    }
  });

  submitBtn.onclick = () => {
    const word = playerInput.value.toLowerCase().trim();
    playerInput.value = '';

    if (!word || word.length < 2 || gameState.wordsUsed.has(word)) {
      endGame('Computer wins! You repeated or gave an invalid word.');
      return;
    }

    gameState.wordsUsed.add(word);
    addWordToList(word);
    gameState.playerScore++;
    updateScores();
    nextTurn();
  };

  playerInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !submitBtn.disabled) {
      submitBtn.click();
    }
  });

  restartBtn.onclick = () => {
    gameOverScreen.classList.add('hidden');
    setupScreen.classList.remove('hidden');
  };

  // ===== Game Functions =====
  function startGame() {
    resetGameState();
    showTurn();
    startTimer();
  }

  function resetGameState() {
    gameState.wordsUsed.clear();
    gameState.playerScore = 0;
    gameState.aiScore = 0;
    gameState.turn = 'player';
    updateScores();
    wordListUI.innerHTML = '';
  }

  async function generateWordBank(category) {
    const mockBanks = {
      furniture: ['chair', 'table', 'sofa', 'desk', 'lamp', 'shelf', 'stool', 'bed', 'drawer', 'cabinet', 'couch', 'bench', 'mirror'],
      countries: ['brazil', 'india', 'canada', 'egypt', 'japan', 'germany', 'france', 'italy', 'kenya', 'norway'],
      insects: ['ant', 'bee', 'fly', 'moth', 'wasp', 'beetle', 'mosquito', 'dragonfly', 'termite']
    };

    if (mockBanks[category]) {
      return [...mockBanks[category]];
    }

    return Array.from({ length: 100 }, (_, i) => `${category}-${i + 1}`);
  }

  function showTurn() {
    turnDisplay.textContent = gameState.turn === 'player' ? "Player's Turn" : "Computer's Turn";
    if (gameState.turn === 'player') {
      playerInput.disabled = false;
      submitBtn.disabled = false;
      playerInput.focus();
    } else {
      playerInput.disabled = true;
      submitBtn.disabled = true;
      setTimeout(aiTurn, 1500);
    }
  }

  function aiTurn() {
    const options = gameState.wordBank.filter(w => !gameState.wordsUsed.has(w));
    if (options.length === 0) {
      endGame('Player wins! Computer ran out of words.');
      return;
    }
    const word = options[Math.floor(Math.random() * options.length)];
    gameState.wordsUsed.add(word);
    addWordToList(word);
    gameState.aiScore++;
    updateScores();
    nextTurn();
  }

  function addWordToList(word) {
    const li = document.createElement('li');
    li.textContent = word;
    wordListUI.prepend(li);
  }

  function updateScores() {
    playerScoreUI.textContent = gameState.playerScore;
    aiScoreUI.textContent = gameState.aiScore;
  }

  function nextTurn() {
    clearInterval(gameState.interval);
    gameState.turn = gameState.turn === 'player' ? 'computer' : 'player';
    showTurn();
    startTimer();
  }

  function startTimer() {
    gameState.timer = 5;
    timerUI.textContent = gameState.timer;
    gameState.interval = setInterval(() => {
      gameState.timer--;
      timerUI.textContent = gameState.timer;
      if (gameState.timer === 0) {
        clearInterval(gameState.interval);
        if (gameState.turn === 'player') {
          endGame('Computer wins! You took too long.');
        } else {
          endGame('Player wins! Computer timed out.');
        }
      }
    }, 1000);
  }

  function endGame(message) {
    clearInterval(gameState.interval);
    gameScreen.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    winnerMsg.textContent = message;
  }
});
