const menuIcon = document.querySelector ('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// scroll section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('header');

window.onscroll = () => {
    const top = window.scrollY;

    sections.forEach(sec => {
        const offset = sec.offsetTop - 100;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // Active navbar links
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            document.querySelector('header nav a[href*="' + id + '"]').classList.add('active');

            // Active section for animation on scroll
            sec.classList.add('show-animate');
        } else {
            sec.classList.remove('show-animate');
        }
    });

    // Sticky header
    header.classList.toggle('sticky', top > 100);

    // Remove toggle icon and navbar when clicking navbar links (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // Animation for footer on scroll
    const footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', window.innerHeight + top >= document.scrollingElement.scrollHeight);
};




function submitForm() {
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Prepare data for sending
    const formData = {
      name: name,
      email: email,
      message: message
    };

    // Send data to the server using XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/submit-form', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Handle successful response from the server
        const response = JSON.parse(xhr.responseText);
        console.log('Success:', response);
        // You can update the UI or show a success message here
      } else if (xhr.readyState === 4) {
        // Handle errors during the request
        console.error('Error:', xhr.status, xhr.statusText);
        // You can update the UI or show an error message here
      }
    };

    // Convert formData to JSON and send the request
    xhr.send(JSON.stringify(formData));
  }