document.addEventListener('DOMContentLoaded', () => {
    emailjs.init("kC8z4K0Lf6-jmZuB1");

    const sendEmail = (from_name, reply_to, message_html) => {
        emailjs.send("service_djruqlp", "template_4o5qs2c", {
            from_name: from_name,
            reply_to: reply_to,
            message_html: message_html,
            sender_email: reply_to // Added sender's email
        })
        .then(function(response) {
            // Clear form fields after successful submission
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";

            const successMessage = document.getElementById("success-message");
            successMessage.innerText = "Email sent successfully!";
            successMessage.style.display = "block";
            // Hide success message after 3 seconds
            setTimeout(function() {
                successMessage.style.display = "none";
            }, 3000);
        }, function(error) {
            alert("Error sending email: " + JSON.stringify(error));
            // Re-enable the button if an error occurs
            submitButton.disabled = false;
        })
        .finally(() => {
            // Always re-enable the button after the promise resolves
            submitButton.disabled = false;
        });
    };

    const contactForm = document.querySelector('.contact__form');
    const submitButton = contactForm.querySelector('button[type="submit"]');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const from_name = document.getElementById("name").value;
        const reply_to = document.getElementById("email").value;
        const message_html = document.getElementById("message").value;

        // Validation
        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        const messageError = document.getElementById("message-error");

        nameError.innerText = '';
        emailError.innerText = '';
        messageError.innerText = '';

        let isValid = true;

        if (!from_name.trim()) {
            nameError.innerText = 'Please enter your name.';
            isValid = false;
        }

        if (!reply_to.trim()) {
            emailError.innerText = 'Please enter your email.';
            isValid = false;
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(reply_to)) {
                emailError.innerText = 'Please enter a valid email address.';
                isValid = false;
            }
        }

        if (!message_html.trim()) {
            messageError.innerText = 'Please enter your message.';
            isValid = false;
        }

        if (isValid) {
            // Disable the submit button to prevent multiple submissions
            submitButton.disabled = true;
            sendEmail(from_name, reply_to, message_html);
        }
    });



    
    const headerContent = document.querySelector('.header__content');
    const headerTitle = document.querySelector('.header__title');
    const contactSection = document.querySelector('#contact');
    const certificatePopup = document.getElementById('certificatePopup');
    const closeBtn = document.querySelector('.close-btn');
    const body = document.querySelector('body');

    const textArray = ["Ralfs Valters Zāmuelis", "Full Stack Web Developer"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeText = () => {
        if (charIndex < textArray[textIndex].length) {
            if (!isDeleting) {
                headerTitle.textContent += textArray[textIndex].charAt(charIndex);
                charIndex++;
            } else {
                headerTitle.textContent = textArray[textIndex].substring(0, charIndex - 1);
                charIndex--;
            }
            setTimeout(typeText, 200);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeText, 500);
        }
    };

    typeText();

    headerContent.style.backgroundColor = '#121212';
    headerContent.style.backgroundImage = 'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 800 600%22%3E%3Cdefs%3E%3ClinearGradient id=%22grad1%22 x1=%220%22 y1=%220%22 x2=%220%22 y2=%221%22%3E%3Cstop offset=%220%22 style=%22stop-color:rgb(255,255,255);stop-opacity:1%22 /%3E%3Cstop offset=%221%22 style=%22stop-color:rgb(0,0,0);stop-opacity:1%22 /%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill-opacity=%220.3%22%3E%3Cpath fill=%22url(%23grad1)%22 d=%22M683 463c0 8-6 14-14 14s-14-6-14-14c0-185-150-335-335-335s-335 150-335 335c0 8-6 14-14 14s-14-6-14-14c0-202 164-366 366-366s366 164 366 366z%22/%3E%3C/g%3E%3C/svg%3E")';
    headerContent.style.backgroundSize = 'cover';
    headerContent.style.backgroundPosition = 'center';
    headerContent.style.backgroundAttachment = 'fixed';

    const numStars = 500;
    const stars = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    stars.setAttribute('class', 'stars');
    stars.setAttribute('width', '100%');
    stars.setAttribute('height', '100%');
    stars.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

    for (let i = 0; i < numStars; i++) {
        const star = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        star.setAttribute('class', 'star');
        star.setAttribute('cx', Math.random() * 800);
        star.setAttribute('cy', Math.random() * 600);
        star.setAttribute('r', Math.random() * 2);
        star.setAttribute('fill', 'white');
        star.style.animationDelay = `${Math.random() * 5}s`;
        stars.appendChild(star);
    }

    headerContent.appendChild(stars);

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('class', 'circle');
    circle.setAttribute('cx', '50%');
    circle.setAttribute('cy', '50%');
    circle.setAttribute('r', '200');
    circle.setAttribute('fill', 'rgba(255, 255, 255, 0.5)');
    circle.setAttribute('stroke', 'white');
    circle.setAttribute('stroke-width', '2');
    headerContent.appendChild(circle);

    const toggleStarsAnimation = () => {
        const starElements = document.querySelectorAll('.star');
        starElements.forEach(star => {
            const animation = star.style.animation;
            star.style.animation = animation ? '' : 'falling-stars 10s linear infinite';
        });
    };

    contactSection.addEventListener('click', () => {
        toggleStarsAnimation();
        setTimeout(() => toggleStarsAnimation(), 2000); 
    });

    const hideCertificatePopup = () => {
        certificatePopup.style.display = 'none';
        body.style.overflow = 'auto'; // Enable scrolling
    };

    const showCertificatePopup = (certificateTitle) => {
        const popupContent = certificatePopup.querySelector('.popup-content');
        const certificateImageSrc = certificateImages[certificateTitle];
        if (certificateImageSrc) {
            const certificateImage = document.createElement('img');
            certificateImage.setAttribute('src', certificateImageSrc);
            certificateImage.setAttribute('alt', certificateTitle);
            certificateImage.classList.add('certificate-img');
            popupContent.innerHTML = ''; 
            popupContent.appendChild(certificateImage);
            certificatePopup.style.display = 'flex';
            body.style.overflow = 'hidden'; 
        }
    };

    const certificateImages = {
        "M3S1": "img/helloit.png",
        "EUROPEAN DIGITAL BOOTCAMP": "img/edibo.png"
    };

    const certificateTitles = document.querySelectorAll('.certificates .timeline__title');
    certificateTitles.forEach(title => {
        title.addEventListener('click', () => {
            showCertificatePopup(title.textContent);
        });
    });

    const hideCertificatePopupOnClickOutside = (event) => {
        if (event.target === certificatePopup) {
            hideCertificatePopup();
        }
    };

    certificatePopup.addEventListener('click', hideCertificatePopupOnClickOutside);

    closeBtn.addEventListener('click', hideCertificatePopup);

    const handleCertificateClick = (event) => {
        const certificateDescription = event.target;
        const certificateTitle = certificateDescription.previousElementSibling.textContent;
        showCertificatePopup(certificateTitle);
    };

    const certificateDescriptions = document.querySelectorAll('.certificates .timeline__description');
    certificateDescriptions.forEach(description => {
        description.addEventListener('click', handleCertificateClick);
    });
});
