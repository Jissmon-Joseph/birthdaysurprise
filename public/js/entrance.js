const heroSection = document.querySelector('.hero-section');

// 3 background images
const backgrounds = [
  'https://images.unsplash.com/photo-1503264116251-35a269479413', // image 1
  'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e', // image 2
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde'  // image 3
];

let currentIndex = 0;

// Function to change background
function changeBackground() {
  heroSection.style.backgroundImage = `url(${backgrounds[currentIndex]})`;
  currentIndex = (currentIndex + 1) % backgrounds.length;
}

// Initial image
changeBackground();

// Change every 5 seconds
setInterval(changeBackground, 5000);


