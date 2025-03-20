// Select Elements for Navigation Menu
const bars = document.querySelector(".bar"),
    close = document.querySelector(".close"),
    menu = document.querySelector(".menu");

// Event Listener to Open Navigation Menu
bars.addEventListener("click", () => {
    menu.classList.add("active");
    
    // Animate the menu opening using GSAP
    gsap.from(".menu", {
        opacity: 0,
        duration: 0.3
    });

    gsap.from(".menu ul", {
        opacity: 0,
        x: -300,
        duration: 0.5
    });
});

// Event Listener to Close Navigation Menu
close.addEventListener("click", () => {
    menu.classList.remove("active");
});

// Function to Animate Content Elements
function animateContent(selectors) {
    selectors.forEach((selector) => {
        gsap.to(selector, {
            y: 30,
            duration: 0.1,
            opacity: 1,
            delay: 0.2,
            stagger: 0.2,
            ease: "power2.out",
        });
    });
}

// Function to Trigger Animations on Scroll
function scrollTriggerAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 80%",
            scrub: 1,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            y: 0,
            duration: 1,
            opacity: 1,
        });
    });
}

// Function for Swipe Animations on Scroll
function swipeAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 50%",
            end: "top 100%",
            scrub: 3,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            x: 0,
            duration: 1,
            opacity: 1,
        });
    });
}

// Function for Gallery Animations on Scroll
function galleryAnimation(triggerSelector, boxSelectors) {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: triggerSelector,
            start: "top 100%",
            end: "bottom 100%",
            scrub: 1,
        },
    });

    boxSelectors.forEach((boxSelector) => {
        timeline.to(boxSelector, {
            y: 0,
            opacity: 1,
            duration: 1,
        });
    });
}

// Initialize Animations for Various Sections
animateContent([".home .content h5", ".home .content h1", ".home .content p", ".home .content .search"]);

scrollTriggerAnimation(".travel", [".travel .box1", ".travel .box2", ".travel .box3"]);

scrollTriggerAnimation(".feedback .container", [".feedback .label", ".feedback .heading", ".feedback .paragraph"]);

scrollTriggerAnimation(".article", [".article .label", ".article .heading"]);

swipeAnimation(".destinations", [".destinations .heading", ".destinations .content"]);

swipeAnimation(".article", [".article .latest-article", ".article .box1", ".article .box2", ".article .box3", ".article .box4"]);

galleryAnimation(".destinations .gallery", [".destinations .gallery .box1", ".destinations .gallery .box2", ".destinations .gallery .box3", ".destinations .gallery .box4", ".destinations .gallery .box5"]);

galleryAnimation(".featured .gallery", [".featured .gallery .box1", ".featured .gallery .box2", ".featured .gallery .box3", ".featured .gallery .box4"]);

galleryAnimation(".feedback .voices", [".feedback .voices .voice1", ".feedback .voices .voice2", ".feedback .voices .voice3", ".feedback .voices .voice4", ".feedback .voices .voice5", ".feedback .voices .voice6"]);

// Highlight Active Navigation Link Based on Current URL
const currentLocation = location.href;
const menuLinks = document.querySelectorAll('.menu ul li a');

menuLinks.forEach(link => {
    if(link.href === currentLocation){
        link.classList.add('active');
    }
});

// GSAP Animations for Smooth Scrolling (Optional)
// Uncomment if you have in-page links that require smooth scrolling
/*
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.utils.toArray('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target){
            gsap.to(window, {duration: 1, scrollTo: target});
        }
    });
});
*/

// Handle Booking Page Functionality
if (document.getElementById('booking-form')) {
    // Define Destination Details
    const destinations = {
        "Bali of Liwa": {
            image: "Images/bali_of_liwa.jpg", // Ensure the image path is correct
            description: "Experience the tranquility and beauty of Bali of Liwa, a perfect escape for nature lovers."
        },
        "Potipot": {
            image: "Images/POTIPOT.jpg",
            description: "Discover the vibrant culture and stunning landscapes of Potipot."
        },
        "Coto Mines Kidz Pool": {
            image: "Images/cotomines.jpg",
            description: "Fun and relaxation await at Coto Mines Kidz Pool, a family-friendly destination."
        },
        "Hidden Villa": {
            image: "Images/hidden_villa.jpg",
            description: "Luxury and comfort meet at Hidden Villa, your perfect getaway spot."
        },
        "Limliwa": {
            image: "Images/limliwa.webp",
            description: "Enjoy the serene beaches and exquisite cuisine at Limliwa."
        }
        // Add more destinations as needed
    };

    // Function to get query parameters
    function getQueryParams() {
        const params = {};
        window.location.search.substring(1).split("&").forEach(function(pair) {
            const [key, value] = pair.split("=");
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
        return params;
    }

    const params = getQueryParams();
    const destinationInput = document.getElementById('destination');
    const destinationName = document.getElementById('destination-name');
    const destinationDescription = document.getElementById('destination-description');
    const destinationImage = document.getElementById('destination-image');

    if(params.destination && destinations[params.destination]){
        destinationInput.value = params.destination;
        destinationName.textContent = params.destination;
        destinationDescription.textContent = destinations[params.destination].description;
        destinationImage.src = destinations[params.destination].image;
        destinationImage.alt = params.destination;
    } else {
        destinationName.textContent = "Unknown Destination";
        destinationDescription.textContent = "Sorry, we couldn't find details for the selected destination.";
        destinationImage.src = "Images/default_destination.jpg"; // Provide a default image
        destinationImage.alt = "Default Destination";
    }

    const bookingForm = document.getElementById('booking-form');
    const confirmation = document.getElementById('confirmation');
    const userNameSpan = document.getElementById('user-name');
    const userEmailSpan = document.getElementById('user-email');

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Get form values
        const fullName = document.getElementById('full-name').value.trim();
        const email = document.getElementById('email').value.trim();
        const destination = document.getElementById('destination').value;
        const checkin = document.getElementById('checkin').value;
        const checkout = document.getElementById('checkout').value;
        const guests = document.getElementById('guests').value;
        const specialRequests = document.getElementById('special-requests').value.trim();

        // Simple validation
        if(fullName === '' || email === '' || destination === '' || checkin === '' || checkout === '' || guests === ''){
            alert('Please fill in all required fields.');
            return;
        }

        // Display confirmation
        userNameSpan.textContent = fullName;
        userEmailSpan.textContent = email;
        bookingForm.classList.add('hidden');
        confirmation.classList.remove('hidden');

        // Optionally, send booking details to server or store in localStorage
        console.log('Booking Details:', {
            fullName,
            email,
            destination,
            checkin,
            checkout,
            guests,
            specialRequests
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const addDestinationForm = document.getElementById('add-destination-form');

    addDestinationForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('destination-name').value.trim();
        const type = document.getElementById('destination-type').value;
        const description = document.getElementById('destination-description').value.trim();
        const imageFile = document.getElementById('destination-image').files[0]; // Get the file
        const location = document.getElementById('destination-location').value.trim();

        // Simple validation
        if (!name || !type || !description || !imageFile || !location) {
            alert('Please fill in all required fields.');
            return;
        }

        // Log the data (in a real application, you would send the image to the server)
        console.log('New Destination Submitted:', {
            name,
            type,
            description,
            location,
            imageFile // This is a File object
        });

        // Reset the form
        addDestinationForm.reset();

        // Show a success message
        alert('Thank you! Your destination has been submitted.');

        // Optionally, redirect to discover.html
        window.location.href = 'discover.html';
    });
});
