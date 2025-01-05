$(function(){

	$(".portfolio-item").fadeTo("normal", 1);

	$('.portfolio-item').hover(
		function(){
			$(this).find('.text-wrap').css('opacity', '1');
			$(this).siblings().stop().fadeTo(300, 0.6);
  			$(this).parent().siblings().stop().fadeTo(300, 0.3);
		},
		function(){
			$(this).find('.text-wrap').css('opacity', '0');
			$(this).siblings().stop().fadeTo(300, 1);
  			$(this).parent().siblings().stop().fadeTo(300, 1);
		}
	);//Fading home page images while hovering

	$("#iframe").fancybox({
	    'width'         : '85%',
	    'height'        : '95%',
	    'autoScale'     : false,
	    'transitionIn'  : 'none',
	    'transitionOut' : 'none',
	    'type'          : 'iframe',
	    padding: 0
	});

});



// contact section
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const newsletterForm = document.getElementById('newsletter-form');

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm(contactForm)) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message. We will get back to you soon!');
            contactForm.reset();
        }
    });

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletter-email').value;
        if (validateEmail(email)) {
            // Here you would typically send the email to a server for newsletter subscription
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });

    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return isValid;
    }

    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});

// home section
document.getElementById('current-year').textContent = new Date().getFullYear();

// Enhanced Reviews Slider
document.addEventListener('DOMContentLoaded', function() {
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviews = document.querySelectorAll('.review-card');
    const prevButton = document.querySelector('.prev-review');
    const nextButton = document.querySelector('.next-review');
    const dotsContainer = document.querySelector('.review-dots');
    
    let currentSlide = 0;
    const totalSlides = reviews.length;

    // Create dots
    reviews.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function updateSlider(smooth = true) {
        const translateValue = -currentSlide * 100 + '%';
        reviewsTrack.style.transition = smooth ? 'transform 0.5s ease-in-out' : 'none';
        reviewsTrack.style.transform = `translateX(${translateValue})`;
        updateDots();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    }

    // Event Listeners
    prevButton?.addEventListener('click', prevSlide);
    nextButton?.addEventListener('click', nextSlide);

    // Touch Events
    let touchStartX = 0;
    let touchEndX = 0;

    reviewsTrack.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    reviewsTrack.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Auto advance slides every 5 seconds
    let slideInterval = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    reviewsTrack.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });

    reviewsTrack.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
    });

    // Handle visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(slideInterval);
        } else {
            slideInterval = setInterval(nextSlide, 5000);
        }
    });

    // Initial setup
    updateSlider(false);
});

// Smooth scroll for navigation
$('a[href^="#"]').on('click', function(e) {
    e.preventDefault();
    const target = $(this.hash);
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top - 70
        }, 1000);
    }
});

// Newsletter form submission
$('#newsletter-form').on('submit', function(e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();
    
    // Here you would typically send this to your server
    alert('Thank you for subscribing! We\'ll keep you updated with our latest news.');
    this.reset();
});

// Animate on scroll initialization
$(window).on('scroll', function() {
    $('.specialty-item, .service-card, .review-card').each(function() {
        const elementTop = $(this).offset().top;
        const elementVisible = 150;
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        if (elementTop < (windowHeight + scrollTop - elementVisible)) {
            $(this).addClass('animate');
        }
    });
});

// Mobile menu toggle
$('.navbar-toggle').on('click', function() {
    $('.navbar-collapse').toggleClass('show');
});

// Handle specialty item click
$('.specialty-item').on('click', function() {
    const title = $(this).find('h3').text();
    window.location.href = 'menu.html#' + title.toLowerCase().replace(/\s+/g, '-');
});

// Initialize map when available
function initMap() {
    if (typeof google !== 'undefined') {
        const location = { lat: 30.524020, lng: -87.903565 };
        const map = new google.maps.Map(document.querySelector('.map-container'), {
            zoom: 15,
            center: location
        });
        const marker = new google.maps.Marker({
            position: location,
            map: map
        });
    }
}

// Lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageOptions = {
        threshold: 0,
        rootMargin: '0px 0px 50px 0px'
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('fade-in');
                observer.unobserve(img);
            }
        });
    }, imageOptions);

    images.forEach(img => imageObserver.observe(img));
});