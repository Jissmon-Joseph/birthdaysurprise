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


// Video js
// Handle video loading and fallback
        document.addEventListener('DOMContentLoaded', function() {
            const video = document.querySelector('.background-video');
            
            // Ensure video plays on mobile devices
            video.addEventListener('loadeddata', function() {
                video.play().catch(function(error) {
                    console.log('Video autoplay failed:', error);
                    // You can add a fallback image here if needed
                });
            });
            
            // Handle window resize to maintain aspect ratio
            function handleResize() {
                const container = docum

ent.querySelector('.video-container');
                const video = document.querySelector('.background-video');
                
                if (video && container) {
                    const containerAspect = container.offsetWidth / container.offsetHeight;
                    const videoAspect = video.videoWidth / video.videoHeight;
                    
                    if (containerAspect > videoAspect) {
                        video.style.width = '100%';
                        video.style.height = 'auto';
                    } else {
                        video.style.width = 'auto';
                        video.style.height = '100%';
                    }
                }
            }
            
            window.addEventListener('resize', handleResize);
            video.addEventListener('loadedmetadata', handleResize);
        });
        
        // Handle CTA button click
        function handleBookNow() {
            alert('Book Now clicked! Add your booking logic here.');
            // Add your booking logic here
        }
        
        // Smooth scrolling for better UX
        document.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.background-video');
            const speed = scrolled * 0.5;
            
            if (parallax) {
                parallax.style.transform = translateY(${speed}px);
            }
        });
