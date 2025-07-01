const heroSection = document.querySelector(".hero-section");

// 3 background images
const backgrounds = [
  "/asset/entranceimages/IMG_20250630_164102-Picsart-AiImageEnhancer.jpg", // image 1
  "/asset/entranceimages/IMG_20250630_164341-Picsart-AiImageEnhancer.jpg", // image 2
  "/asset/entranceimages/IMG_20250630_173945-Picsart-AiImageEnhancer.jpg", // image 3
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

// Video js
// Handle video loading and fallback
document.addEventListener("DOMContentLoaded", function () {
  const video = document.querySelector(".background-video");

  // Ensure video plays on mobile devices
  video.addEventListener("loadeddata", function () {
    video.play().catch(function (error) {
      console.log("Video autoplay failed:", error);
      // You can add a fallback image here if needed
    });
  });

  // Handle window resize to maintain aspect ratio
  function handleResize() {
    const container = document.querySelector(".video-container");
    const video = document.querySelector(".background-video");

    if (video && container) {
      const containerAspect = container.offsetWidth / container.offsetHeight;
      const videoAspect = video.videoWidth / video.videoHeight;

      if (containerAspect > videoAspect) {
        video.style.width = "100%";
        video.style.height = "auto";
      } else {
        video.style.width = "auto";
        video.style.height = "100%";
      }
    }
  }

  window.addEventListener("resize", handleResize);
  video.addEventListener("loadedmetadata", handleResize);
});

// Handle CTA button click
function handleBookNow() {
  alert("Book Now clicked! Add your booking logic here.");
  // Add your booking logic here
}

// Smooth scrolling for better UX
document.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".background-video");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = translateY(`${speed}px`);
  }
});



// Letter
const music = document.getElementById('backgroundMusic');
    music.volume = 0.4;

    function playMusic() {
        music.play().catch(e => console.log('Music play failed:', e));
    }

    // Auto-play music on first interaction
    document.addEventListener('click', playMusic, { once: true });

    // Create floating music notes
    function createMusicNote() {
        const note = document.createElement('div');
        note.className = 'music-note';
        note.innerHTML = ['♪', '♫', '♬', '♩'][Math.floor(Math.random() * 4)];
        note.style.left = Math.random() * 100 + '%';
        note.style.animationDuration = (Math.random() * 4 + 6) + 's';
        note.style.animationDelay = Math.random() * 3 + 's';

    document.body.appendChild(note);

        setTimeout(() => {
            note.remove();
        }, 10000);
    }

    // Generate music notes periodically
    setInterval(createMusicNote, 2000);

    // Create more sparkles around the letter
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.fontSize = (Math.random() * 10 + 10) + 'px';
        sparkle.style.color = '#ffd700';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.animation = 'sparkleFloat 2s ease-out forwards';
        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }

    setInterval(createSparkle, 1500);