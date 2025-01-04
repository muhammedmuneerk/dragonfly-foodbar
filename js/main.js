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

