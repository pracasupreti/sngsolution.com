// index page 

// tab switching in home page 
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab-link');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function(event) {
        event.preventDefault();
        
        // Remove active class from all tabs
        tabs.forEach(item => item.classList.remove('text-indigo-500', 'border-indigo-500'));
        tabs.forEach(item => item.classList.add('border-gray-300'));
        
        // Add active class to the clicked tab
        tab.classList.add('text-indigo-500', 'border-indigo-500');
        
        // Hide all content
        contents.forEach(content => content.classList.add('hidden'));
        
        // Show the corresponding content
        const target = document.querySelector(tab.getAttribute('href'));
        target.classList.remove('hidden');
      });
    });
  });

  // for sliding effect 
  document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('scroll-section');
  const image = section.querySelector('.slide-in-right');

  function checkScroll() {
    const sectionRect = section.getBoundingClientRect();
    if (sectionRect.top < window.innerHeight && sectionRect.bottom >= 0) {
      image.classList.add('visible');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Initial check
});

// for changing image 
document.addEventListener('DOMContentLoaded', function () {
  const section = document.getElementById('scroll-section');
  const image = section.querySelector('.slide-in-right');
  const mainImage = document.getElementById('main-image');
  const descriptionTab = document.getElementById('description-tab');
  const reviewsTab = document.getElementById('reviews-tab');
  const detailsTab = document.getElementById('details-tab');
  const descriptionContent = document.getElementById('description');
  const reviewsContent = document.getElementById('reviews');
  const detailsContent = document.getElementById('details');

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function checkVisibility() {
    if (isInViewport(image)) {
      image.classList.add('is-visible');
    }
  }

  function showContent(tab, content, newSrc) {
    // Hide all content
    descriptionContent.classList.add('hidden');
    reviewsContent.classList.add('hidden');
    detailsContent.classList.add('hidden');
    // Show selected content
    content.classList.remove('hidden');
    // Update image source
    mainImage.src = newSrc;
    // Update tab styles
    descriptionTab.classList.remove('text-indigo-500', 'border-indigo-500');
    reviewsTab.classList.remove('text-indigo-500', 'border-indigo-500');
    detailsTab.classList.remove('text-indigo-500', 'border-indigo-500');
    tab.classList.add('text-indigo-500', 'border-indigo-500');
  }

  descriptionTab.addEventListener('click', function () {
    showContent(descriptionTab, descriptionContent, 'images/home/dream.jpg');
  });

  reviewsTab.addEventListener('click', function () {
    showContent(reviewsTab, reviewsContent, 'images/home/learn.jpg');
  });

  detailsTab.addEventListener('click', function () {
    showContent(detailsTab, detailsContent, 'images/home/achieve.jpg');
  });

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial check
});

// why SNG Solution image 
document.addEventListener("DOMContentLoaded", function () {
    const observerOptions = {
      root: null, // relative to the viewport
      rootMargin: "0px",
      threshold: 0.1 // trigger when 10% of the target is visible
    };

    const fadeInElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once the animation is done
        }
      });
    }, observerOptions);

    fadeInElements.forEach(element => {
      observer.observe(element);
    });
  });