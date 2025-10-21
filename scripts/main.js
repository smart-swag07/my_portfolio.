// Main JavaScript for Enhanced Portfolio
// Add this function for image fallback
function usePlaceholder(img) {
    console.log('Image failed to load, using placeholder');
    img.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80';
    img.alt = 'Prajwal M - Profile Picture';
}
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initNavigation();
  initSmoothScrolling();
  initSkillsSection();
  initProjectsSection();
  initContactForm();
  initAnimations();
  initModal();
  initCounterAnimation();
  initThemeToggle();
  initBackgroundAnimation();
});

// Navigation
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.querySelector('.navbar');

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close mobile menu when clicking on links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Navbar background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// Smooth Scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        this.classList.add('active');
      }
    });
  });

  // Update active link on scroll
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    
    document.querySelectorAll('section').forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

// Skills Section
function initSkillsSection() {
  const categoryTabs = document.querySelectorAll('.category-tab');
  const skillCategories = document.querySelectorAll('.skill-category');
  const skillProgresses = document.querySelectorAll('.skill-progress');

  // Category switching
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const categoryId = tab.getAttribute('data-category');
      
      // Update active tab
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Show corresponding skills
      skillCategories.forEach(skillCat => {
        skillCat.classList.remove('active');
        if (skillCat.id === categoryId) {
          skillCat.classList.add('active');
        }
      });
    });
  });

  // Animate skill progress bars when in view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillProgresses.forEach(progress => {
          const width = progress.getAttribute('data-width');
          setTimeout(() => {
            progress.style.width = `${width}%`;
          }, 200);
        });
      }
    });
  }, { threshold: 0.3 });

  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    observer.observe(skillsSection);
  }
}

// Projects Section
function initProjectsSection() {
  // Project details modal
  const projectLinks = document.querySelectorAll('.project-link[data-project]');
  projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = link.getAttribute('data-project');
      showProjectDetails(projectId);
    });
  });
}

// Project Details Modal
function initModal() {
  const modal = document.getElementById('projectModal');
  const closeBtn = document.querySelector('.close-modal');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      modal.style.display = 'none';
    }
  });
}

function showProjectDetails(projectId) {
  const modal = document.getElementById('projectModal');
  const modalBody = document.querySelector('.modal-body');
  
  // Project data
  const projects = {
    project1: {
      title: "AI-Powered Prompt Review & Enhancement System",
      description: "Developed an AI-driven platform for prompt refinement with grammar correction, multi-model testing, and workflow management. Implemented secure login, dashboards, and prompt tracking, achieving 30% clearer prompts and 25% faster AI responses.",
      features: [
        "30% clearer prompts generation",
        "25% faster AI responses",
        "Multi-model testing capabilities",
        "Secure user authentication",
        "Real-time prompt tracking",
        "Grammar correction integration",
        "Workflow management system"
      ],
      tech: ["Python", "Flask", "SQLite", "LLM APIs", "HTML/CSS", "JavaScript", "REST APIs"],
      github: "https://github.com/smart-swag07",
      image: "assets/images/project1.webp",
      demo: "#"
    },
    project2: {
      title: "Raitha – AI-Powered Smart Farming Assistant",
      description: "Built an AI-powered assistant integrating machine learning models for crop disease prediction (95% accuracy), weather-based crop recommendations, and market-driven pricing insights, enhancing decision-making for farmers.",
      features: [
        "95% accuracy in crop disease prediction",
        "Real-time weather integration",
        "Market price analytics",
        "Multi-language support",
        "Mobile-responsive design",
        "SMS notifications via Twilio",
        "Data visualization dashboard"
      ],
      tech: ["Python", "Flask", "React.js", "MongoDB", "Twilio API", "OpenWeather API", "Scikit-learn"],
      github: "https://github.com/smart-swag07",
      image: "assets/images/project2.webp",
      demo: "#"
    },
    project3: {
      title: "Real-Time Disaster Management System",
      description: "Developed a system delivering real-time alerts with vibration (under 5 sec latency), mapped 10+ nearby rescue centers and hospitals, and applied AI-driven hazard predictions with 90%+ accuracy, improving disaster response readiness by 50%.",
      features: [
        "Under 5 second alert latency",
        "90%+ prediction accuracy",
        "Real-time mapping integration",
        "Multi-channel notifications",
        "Emergency contact management",
        "Hazard prediction models",
        "Rescue center mapping"
      ],
      tech: ["Python", "Firebase", "Google Maps API", "Twilio API", "Streamlit", "React.js", "Node.js"],
      github: "https://github.com/smart-swag07",
      image: "assets/images/project3.webp",
      demo: "#"
    }
  };

  const project = projects[projectId];
  if (project) {
    modalBody.innerHTML = `
      <div class="project-modal">
        <div class="project-modal-header">
          <h2>${project.title}</h2>
        </div>
        <div class="project-modal-content">
          <div class="project-image">
            <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
          </div>
          <div class="project-details">
            <div class="project-description">
              <h3>Description</h3>
              <p>${project.description}</p>
            </div>
            <div class="project-features">
              <h3>Key Features</h3>
              <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
              </ul>
            </div>
            <div class="project-tech">
              <h3>Technologies Used</h3>
              <div class="tech-tags">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
              </div>
            </div>
            <div class="project-links">
              <a href="${project.github}" target="_blank" class="btn btn-primary">
                <i class="fab fa-github"></i>
                View on GitHub
              </a>
              ${project.demo !== '#' ? `<a href="${project.demo}" target="_blank" class="btn btn-secondary">
                <i class="fas fa-external-link-alt"></i>
                Live Demo
              </a>` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
    
    modal.style.display = 'block';
  }
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<div class="loading"></div> Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }
}

// Counter Animation
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        
        let current = 0;
        
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + '+';
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + '+';
          }
        }, 16);
        
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
}

// Animations
function initAnimations() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.stat-card, .skill-item, .project-card, .cert-card, .highlight-item, .contact-item, .publication-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });

  // Add stagger animation for skills and projects
  const skillItems = document.querySelectorAll('.skill-item');
  const projectCards = document.querySelectorAll('.project-card');
  
  skillItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
  });
  
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
  });
}

// Theme Toggle
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('i');
  
  // Check for saved theme preference or default to light
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);
  
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-sun';
    } else {
      themeIcon.className = 'fas fa-moon';
    }
  }
}

// Background Animation
function initBackgroundAnimation() {
  const shapes = document.querySelectorAll('.bg-shape');
  shapes.forEach((shape, index) => {
    shape.style.animationDelay = `${index * 5}s`;
  });
}

// Notification System
function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll('.notification');
  existingNotifications.forEach(notification => notification.remove());
  
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'}"></i>
      <span>${message}</span>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Add styles if not already added
  if (!document.querySelector('#notification-styles')) {
    const styles = document.createElement('style');
    styles.id = 'notification-styles';
    styles.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        border-left: 4px solid #6366f1;
        max-width: 400px;
      }
      .notification-success {
        border-left-color: #10b981;
      }
      .notification-error {
        border-left-color: #ef4444;
      }
      .notification.show {
        transform: translateX(0);
      }
      .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
      .notification-content i {
        font-size: 1.25rem;
      }
      .notification-success .notification-content i {
        color: #10b981;
      }
      .notification-error .notification-content i {
        color: #ef4444;
      }
      .notification-content span {
        color: var(--text);
        font-weight: 500;
      }
    `;
    document.head.appendChild(styles);
  }
  
  // Show notification
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Hide after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Add CSS for project modal
const modalStyles = document.createElement('style');
modalStyles.textContent = `
  .project-modal-header {
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border);
  }
  
  .project-modal-header h2 {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text);
    margin: 0;
  }
  
  .project-modal-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  
  .project-modal-content .project-image {
    border-radius: 8px;
    overflow: hidden;
    box-shadow: var(--shadow);
  }
  
  .project-modal-content .project-image img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .project-details h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: var(--text);
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--border);
  }
  
  .project-features ul {
    list-style: none;
    padding: 0;
  }
  
  .project-features li {
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--bg-light);
    position: relative;
    padding-left: 1.5rem;
    color: var(--text-light);
  }
  
  .project-features li:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #10b981;
    font-weight: bold;
  }
  
  .project-features li:last-child {
    border-bottom: none;
  }
  
  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  
  .project-links {
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  
  @media (max-width: 768px) {
    .project-modal-content {
      grid-template-columns: 1fr;
    }
    
    .project-modal-header h2 {
      font-size: 1.5rem;
    }
    
    .project-links {
      flex-direction: column;
    }
    
    .project-links .btn {
      width: 100%;
      justify-content: center;
    }
  }
`;
document.head.appendChild(modalStyles);

// Add smooth loading for images
function initImageLoading() {
  const images = document.querySelectorAll('img');
  
  images.forEach(img => {
    // Add loading state
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    // If image fails to load, use fallback
    img.addEventListener('error', function() {
      this.style.opacity = '1';
    });
  });
}

// Initialize image loading
initImageLoading();