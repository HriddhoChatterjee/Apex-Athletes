// Common JavaScript for all pages

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage === 'index.html' && linkHref === '')) {
            link.classList.add('active');
        }
    });
    
    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Observe all cards
    document.querySelectorAll('.guidance-card, .quote-card, .diet-card, .sport-card').forEach(card => {
        observer.observe(card);
    });
});

// Add hover effect to sport cards on guide.html
if (window.location.pathname.includes('guide.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const sportCards = document.querySelectorAll('.sport-card');
        
        sportCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(229, 9, 20, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
            });
        });
    });
}

// Form validation for physical.html
if (window.location.pathname.includes('physical.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('fitnessForm');
        
        form.addEventListener('submit', function(e) {
            const age = document.getElementById('age').value;
            const weight = document.getElementById('weight').value;
            const height = document.getElementById('height').value;
            const gender = document.getElementById('gender').value;
            const sport = document.getElementById('sport').value;
            
            if (!age || !weight || !height || !gender || !sport) {
                e.preventDefault();
                alert('Please fill in all fields');
                return false;
            }
            
            if (age < 13 || age > 100) {
                e.preventDefault();
                alert('Age must be between 13 and 100');
                return false;
            }
            
            if (weight < 30 || weight > 200) {
                e.preventDefault();
                alert('Weight must be between 30kg and 200kg');
                return false;
            }
            
            if (height < 100 || height > 250) {
                e.preventDefault();
                alert('Height must be between 100cm and 250cm');
                return false;
            }
        });
    });
}

// Add loading animation
function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    loadingDiv.innerHTML = `
        <div style="text-align: center;">
            <div class="spinner" style="
                width: 60px;
                height: 60px;
                border: 5px solid #333;
                border-top: 5px solid #E50914;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 20px;
            "></div>
            <p style="color: white; font-size: 1.2rem;">Loading...</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Remove loading after 1 second
    setTimeout(() => {
        if (document.getElementById('loading')) {
            document.getElementById('loading').remove();
        }
    }, 1000);
}

// Show loading when page loads
window.addEventListener('load', function() {
    showLoading();
});