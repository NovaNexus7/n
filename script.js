document.addEventListener('DOMContentLoaded', () => {
    const themeButton = document.querySelector('.theme-button');
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const headings = document.querySelectorAll('.footer-heading');

    // Set the current theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle theme on button click
    themeButton.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Toggle menu on hamburger click
    hamburgerMenu.addEventListener('click', () => {
        navUl.classList.toggle('show-menu');
        hamburgerMenu.classList.toggle('nav-open');
    });

    // Scroll to top button functionality
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");

    // Show or hide the button based on scroll position
    window.onscroll = () => {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    };

    // Smooth scroll to top when the button is clicked
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check to hide menus on smaller screens
    const handleInitialMenuDisplay = () => {
        if (window.innerWidth <= 768) {
            headings.forEach(heading => {
                const targetId = heading.getAttribute('data-target');
                const targetMenu = document.getElementById(targetId);
                const arrowIcon = heading.querySelector('.arrow-icon');

                // Hide the menu and reset arrow icon on smaller screens
                targetMenu.style.display = 'none';
                arrowIcon.classList.remove('rotate');
            });
        }
    };

    // Toggle footer menu on heading click
    headings.forEach(heading => {
        heading.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                const targetId = heading.getAttribute('data-target');
                const targetMenu = document.getElementById(targetId);
                const arrowIcon = heading.querySelector('.arrow-icon');

                // Toggle display of the menu
                if (targetMenu.style.display === 'none' || targetMenu.style.display === '') {
                    targetMenu.style.display = 'block';
                    arrowIcon.classList.add('rotate');
                } else {
                    targetMenu.style.display = 'none';
                    arrowIcon.classList.remove('rotate');
                }
            }
        });
    });

    // Handle resizing to reset display property of menus
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            headings.forEach(heading => {
                const targetId = heading.getAttribute('data-target');
                const targetMenu = document.getElementById(targetId);
                const arrowIcon = heading.querySelector('.arrow-icon');

                // Reset menu display and arrow icon rotation on larger screens
                targetMenu.style.display = 'block';
                arrowIcon.classList.remove('rotate');
            });
        } else {
            handleInitialMenuDisplay();
        }
    });

    // Initial call to handle menu display
    handleInitialMenuDisplay();
});

