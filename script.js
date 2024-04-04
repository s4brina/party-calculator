let displayValue = '';

function appendChar(char) {
  displayValue += char;
  document.getElementById('display').value = displayValue;
  playClickSound();
}

function clearDisplay() {
  displayValue = '';
  document.getElementById('display').value = '';
}

function calculate() {
  try {
    const result = eval(displayValue);
    addToHistory(displayValue + ' = ' + result);
    displayValue = result.toString();
    document.getElementById('display').value = displayValue;
  } catch (error) {
    alert('Invalid expression!');
  }
}

function addToHistory(expression) {
  const historyList = document.getElementById('historyList');
  const listItem = document.createElement('li');
  listItem.textContent = expression;
  historyList.appendChild(listItem);
}

function createConfetti() {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']; // Add more colors as needed
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Randomly select a color
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '0'; // Start from the top
    document.getElementById('confetti-wrapper').appendChild(confetti);
  
    const animationDuration = 2; // Duration in seconds
    const screenHeight = window.innerHeight;
    const rotation = Math.random() * 360; // Random rotation angle
  
    const keyframes = [
      { transform: `translateY(0) rotate(${rotation}deg)` },
      { transform: `translateY(${screenHeight}px) rotate(${rotation + 720}deg)` } // Spin twice while falling
    ];
  
    const confettiAnimation = confetti.animate(keyframes, {
      duration: animationDuration * 800,
      fill: 'forwards'
    });
  
    confettiAnimation.onfinish = () => {
      confetti.remove(); // Remove the confetti element after animation finishes
    };
  }
  
  
  // Attach event listeners to buttons
  const buttons = document.querySelectorAll('.buttons button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      createConfetti(); // Add confetti effect when any button is clicked
    });
  });

  let hue = 0; // Initial hue value

  function appendChar(char) {
    displayValue += char;
    const displayElements = document.querySelectorAll('.display');
    displayElements.forEach(display => {
      display.value = displayValue;
      // Update the hue value and apply it to the text color
      hue = (hue + 30) % 360; // Increase hue by 30 degrees (you can adjust this value)
      display.style.color = `hsl(${hue}, 100%, 50%)`;
      playClickSound();
    });
  }
  
const clickSound = new Audio('boop.mp3'); // Replace 'click.mp3' with the path to your MP3 file

function playClickSound() {
  clickSound.play();
}

// Rest of the code remains the same

  
// Array of image URLs
const imageUrls = ['circle-8.png', 'circle-6.png', 'circle-2.png', 'circle-4.png', 'circle-5.png'];

// Function to create a falling image with a random image from the array
function createFallingImage() {
    const randomIndex = Math.floor(Math.random() * imageUrls.length);
    const imageUrl = imageUrls[randomIndex];

    const image = document.createElement('img');
    image.src = imageUrl;
    image.classList.add('falling-image');

    // Set random position
    const x = Math.random() * window.innerWidth;
    const y = -100; // Start above the viewport
    image.style.left = x + 'px';
    image.style.top = y + 'px';

    // Append to the document
    document.getElementById('falling-images').appendChild(image);

    // Remove the image after falling animation finishes
    image.addEventListener('animationend', () => {
        image.remove();
    });
}



document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (key.match(/[0-9\/\*\-\+%\.]/)) {
      appendChar(key);
    } else if (key === 'Enter' || key === '=') {
      calculate();
    } else if (key === 'Backspace') {
      clearDisplay();
    }
  });


  let isFrenzyModeOn = false;
let audio;
const button = document.querySelector('.lit');

let starInterval;

function toggleFrenzy() {
    if (!isFrenzyModeOn) {
      startFrenzy();
    } else {
      stopFrenzy();
    }
  }
  
  function createStars() {
    if (!document.body.classList.contains('frenzy-mode')) {
      return; // Exit function if frenzy mode is not active
    }
  
    // Create a star span element
    const star = document.createElement('span');
    star.textContent = '⭐️'; // Star emoji
    star.classList.add('star');
  
    // Randomly position the star within the visible window
    const x = Math.random() * window.innerWidth;
    const y = -50; // Start above the viewport
    star.style.left = x + 'px';
    star.style.top = y + 'px';
  
    // Append star to the body
    document.body.appendChild(star);
  
    // Animate star falling
    star.animate([
      { transform: `translateY(-50px)` },
      { transform: `translateY(${window.innerHeight}px)` }
    ], {
      duration: Math.random() * 5000 + 2000, // Random duration between 2 and 7 seconds
      easing: 'linear',
      fill: 'forwards'
    }).onfinish = () => {
      star.remove(); // Remove the star element after animation finishes
    };
  }
  
  // Call createStars() periodically to continuously generate falling stars
  setInterval(createStars, 300); // Adjust the interval as needed
  
  function removeStars() {
    const stars = document.querySelectorAll('.star');
    stars.forEach(star => star.remove());
  }
  
  function stopFrenzy() {
    // Remove frenzy mode class from the body
    document.body.classList.remove('frenzy-mode');
  
    // Hide the minion image
    const minionImage = document.querySelector('.minion');
    minionImage.classList.add('frenzy-hidden');
  
    // Stop the song
    if (audio) {
      audio.pause();
      audio.currentTime = 0; // Reset the song to the beginning
    }
  
    isFrenzyModeOn = false;
    button.innerHTML = 'Party<br>Mode'; // Change button text back to 'Get Lit'
  }
  
  function startFrenzy() {
    // Add frenzy mode class to the body
    document.body.classList.add('frenzy-mode');
  
    // Show the minion image
    const minionImage = document.querySelector('.minion');
    minionImage.classList.remove('frenzy-hidden');
  
    // Start playing the song
    audio = new Audio('getlit.mp3'); // Replace 'song.mp3' with the path to your song file
    audio.loop = true; // Loop the song
    audio.play();
  
    isFrenzyModeOn = true;
    button.innerHTML = 'Stop<br>Party'; // Change button text to 'Stop'
  }
  


  