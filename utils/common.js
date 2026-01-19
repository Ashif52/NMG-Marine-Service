

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const headerLogo = document.querySelector('.logo img');
    if (headerLogo) {
        const splash = document.createElement('div');
        splash.className = 'page-splash';
        splash.innerHTML = '<div class="page-splash-inner"><img src="' + headerLogo.src + '" alt="NMG Marine Logo"></div>';
        document.body.appendChild(splash);

        setTimeout(function() {
            splash.classList.add('page-splash-hide');
        }, 1000);

        setTimeout(function() {
            if (splash && splash.parentNode) {
                splash.parentNode.removeChild(splash);
            }
        }, 1500);
    }

    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenuToggle.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }

    // Dropdown toggle for mobile/tablet
    const dropdownItems = document.querySelectorAll('.nav-item-dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('a');
        const dropdown = item.querySelector('.nav-dropdown');
        
        if (link && dropdown) {
            link.addEventListener('click', function(e) {
                // On mobile/tablet (max 768px), toggle dropdown
                if (window.innerWidth <= 768) {
                    // Check if dropdown is already open
                    const isOpen = item.classList.contains('active');
                    
                    if (isOpen) {
                        // If already open, allow navigation
                        return;
                    } else {
                        // If closed, open it
                        e.preventDefault();
                        e.stopPropagation();
                        
                        // Close other dropdowns
                        dropdownItems.forEach(otherItem => {
                            if (otherItem !== item) {
                                otherItem.classList.remove('active');
                            }
                        });
                        
                        // Open current dropdown
                        item.classList.add('active');
                    }
                }
            });
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item-dropdown')) {
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });

    // Close menu when a non-dropdown link is clicked
    const navLinks = document.querySelectorAll('.nav-list > li > a:not(.nav-item-dropdown a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
            }
        });
    });

    // Close menu when dropdown link is clicked
    const dropdownLinks = document.querySelectorAll('.nav-dropdown a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                nav.classList.remove('active');
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            dropdownItems.forEach(item => {
                item.classList.remove('active');
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});



// ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('show')
      }else{
        entry.target.classList.remove('show')
      }
    })
  })
  const hiddenElements = document.querySelectorAll('.hidden')
  hiddenElements.forEach((el) => observer.observe(el))

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('lshow')
      }else{
        entry.target.classList.remove('lshow')
      }
    })
  })
  const hiddenElements2 = document.querySelectorAll('.lhidden')
  hiddenElements2.forEach((el) => observer2.observe(el))

const observer3 = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('rshow')
      }else{
        entry.target.classList.remove('rshow')
      }
    })
  })
  const hiddenElements3 = document.querySelectorAll('.rhidden')
  hiddenElements3.forEach((el) => observer3.observe(el))


const observer4 = new IntersectionObserver((entries) => {
    entries.forEach((entry)=> {
      console.log(entry)
      if(entry.isIntersecting){
        entry.target.classList.add('shipshow')
      }else{
        entry.target.classList.remove('shipshow')
      }
    })
  })
  const hiddenElements4 = document.querySelectorAll('.shiphidden')
  hiddenElements4.forEach((el) => observer4.observe(el))


