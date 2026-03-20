/**
 * PhysicsHub - Kandivali Classes Website
 * Interactive JavaScript for Educational Platform
 * Classes: 8th to 12th Standard
 * Faculty: Kavita Tiwari (Physics), Sonu Jha (Biology), 
 *          Gaurav Prajapati (Maths), Shubham (Chemistry)
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    PhysicsHub.init();
});

const PhysicsHub = {
    init() {
        this.initNavigation();
        this.initFacultyProfiles();
        this.initCourseFilter();
        this.initContactForm();
        this.initAnimations();
        this.initTestimonials();
        this.initRegistrationModal();
        this.initScrollProgress();
        this.initCounterAnimation();
        this.initTimetableToggle();
    },

    // Mobile Navigation Toggle
    initNavigation() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.classList.toggle('menu-open');
            });

            // Close menu on link click
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });

            // Smooth scroll for anchor links
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    const href = link.getAttribute('href');
                    if (href.startsWith('#')) {
                        e.preventDefault();
                        const target = document.querySelector(href);
                        if (target) {
                            const offsetTop = target.offsetTop - 80;
                            window.scrollTo({
                                top: offsetTop,
                                behavior: 'smooth'
                            });
                        }
                    }
                });
            });
        }

        // Sticky header on scroll
        const header = document.getElementById('header');
        if (header) {
            let lastScroll = 0;
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    header.classList.add('sticky');
                    if (currentScroll > lastScroll && currentScroll > 200) {
                        header.style.transform = 'translateY(-100%)';
                    } else {
                        header.style.transform = 'translateY(0)';
                    }
                } else {
                    header.classList.remove('sticky');
                }
                lastScroll = currentScroll;
            });
        }
    },

    // Faculty Profiles Data and Interaction
    initFacultyProfiles() {
        const facultyData = [
            {
                id: 1,
                name: 'Kavita Tiwari',
                subject: 'Physics',
                qualification: 'M.Sc Physics, B.Ed',
                experience: '15+ Years',
                specialty: 'NEET & JEE Physics',
                image: 'assets/images/faculty/kavita-tiwari.jpg',
                description: 'Expert in Mechanics and Electrodynamics with proven track record of producing top rankers.',
                classes: ['11th', '12th', 'JEE', 'NEET']
            },
            {
                id: 2,
                name: 'Sonu Jha',
                subject: 'Biology',
                qualification: 'M.Sc Biotechnology, B.Ed',
                experience: '10+ Years',
                specialty: 'NEET Biology & Botany',
                image: 'assets/images/faculty/sonu-jha.jpg',
                description: 'Specialized in Zoology and Botany with unique diagram-based teaching methodology.',
                classes: ['11th', '12th', 'NEET']
            },
            {
                id: 3,
                name: 'Gaurav Prajapati',
                subject: 'Mathematics',
                qualification: 'M.Sc Mathematics, B.Ed',
                experience: '12+ Years',
                specialty: 'JEE Advanced Mathematics',
                image: 'assets/images/faculty/gaurav-prajapati.jpg',
                description: 'Known for shortcut tricks and problem-solving techniques for competitive exams.',
                classes: ['8th', '9th', '10th', '11th', '12th', 'JEE']
            },
            {
                id: 4,
                name: 'Shubham',
                subject: 'Chemistry',
                qualification: 'M.Sc Organic Chemistry, B.Ed',
                experience: '8+ Years',
                specialty: 'Organic Chemistry & NEET',
                image: 'assets/images/faculty/shubham.jpg',
                description: 'Makes Organic Chemistry easy with reaction mechanism visualization techniques.',
                classes: ['11th', '12th', 'JEE', 'NEET']
            }
        ];

        const facultyContainer = document.getElementById('faculty-grid');
        
        if (facultyContainer) {
            facultyContainer.innerHTML = facultyData.map(teacher => `
                <div class="faculty-card" data-subject="${teacher.subject.toLowerCase()}">
                    <div class="faculty-image">
                        <div class="faculty-placeholder" style="background: ${this.getSubjectColor(teacher.subject)}">
                            ${teacher.name.charAt(0)}${teacher.name.split(' ')[1]?.charAt(0) || ''}
                        </div>
                        <div class="faculty-overlay">
                            <button class="btn-view-profile" data-id="${teacher.id}">View Profile</button>
                        </div>
                    </div>
                    <div class="faculty-info">
                        <h3>${teacher.name}</h3>
                        <span class="subject-badge ${teacher.subject.toLowerCase()}">${teacher.subject}</span>
                        <p class="qualification">${teacher.qualification}</p>
                        <div class="faculty-meta">
                            <span><i class="icon-experience"></i> ${teacher.experience}</span>
                            <span><i class="icon-batch"></i> ${teacher.classes.join(', ')}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            // Add click handlers for faculty cards
            document.querySelectorAll('.btn-view-profile').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const id = parseInt(e.target.dataset.id);
                    const teacher = facultyData.find(t => t.id === id);
                    this.openFacultyModal(teacher);
                });
            });
        }
    },

    getSubjectColor(subject) {
        const colors = {
            'Physics': '#4A90E2',
            'Chemistry': '#7ED321',
            'Mathematics': '#F5A623',
            'Biology': '#BD10E0'
        };
        return colors[subject] || '#9013FE';
    },

    openFacultyModal(teacher) {
        const modal = document.createElement('div');
        modal.className = 'modal faculty-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <div class="faculty-detail">
                    <div class="faculty-header" style="background: ${this.getSubjectColor(teacher.subject)}20">
                        <h2>${teacher.name}</h2>
                        <span class="subject-tag">${teacher.subject} Expert</span>
                    </div>
                    <div class="faculty-body">
                        <p><strong>Qualification:</strong> ${teacher.qualification}</p>
                        <p><strong>Experience:</strong> ${teacher.experience}</p>
                        <p><strong>Specialty:</strong> ${teacher.specialty}</p>
                        <p><strong>Classes:</strong> ${teacher.classes.join(', ')}</p>
                        <div class="faculty-description">
                            <h4>About</h4>
                            <p>${teacher.description}</p>
                        </div>
                        <button class="btn-book-demo" data-teacher="${teacher.name}">Book Free Demo Class</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }
        });

        modal.querySelector('.btn-book-demo').addEventListener('click', () => {
            this.openRegistrationModal(teacher.name, teacher.subject);
            modal.remove();
        });
    },

    // Course Filter Functionality
    initCourseFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const courseCards = document.querySelectorAll('.course-card');

        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;

                courseCards.forEach(card => {
                    if (filter === 'all' || card.dataset.class === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });

        // Course Details Expansion
        document.querySelectorAll('.course-card').forEach(card => {
            const syllabusBtn = card.querySelector('.btn-syllabus');
            if (syllabusBtn) {
                syllabusBtn.addEventListener('click', () => {
                    const syllabus = card.querySelector('.syllabus-content');
                    syllabus.classList.toggle('expanded');
                    syllabusBtn.textContent = syllabus.classList.contains('expanded') ? 'Hide Syllabus' : 'View Syllabus';
                });
            }
        });
    },

    // Contact Form Handling
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        const admissionForm = document.getElementById('admission-form');

        const handleFormSubmit = async (form, endpoint) => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                const formData = new FormData(form);
                const data = Object.fromEntries(formData);

                // Validation
                if (!data.name || !data.phone || !data.email) {
                    this.showNotification('Please fill all required fields', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }

                // Phone validation for Indian numbers
                const phoneRegex = /^[6-9]\d{9}$/;
                if (!phoneRegex.test(data.phone)) {
                    this.showNotification('Please enter valid 10-digit mobile number', 'error');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    return;
                }

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    this.showNotification('Thank you! We will contact you shortly.', 'success');
                    form.reset();
                    
                    // Track conversion
                    if (window.gtag) {
                        gtag('event', 'form_submit', {
                            'event_category': 'Admission',
                            'event_label': data.class || 'General'
                        });
                    }
                } catch (error) {
                    this.showNotification('Something went wrong. Please try again.', 'error');
                } finally {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }
            });
        };

        if (contactForm) handleFormSubmit(contactForm, '/api/contact');
        if (admissionForm) handleFormSubmit(admissionForm, '/api/admission');
    },

    // Notification System
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    },

    // Scroll Animations
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
            });
        }
    },

    // Testimonials Slider
    initTestimonials() {
        const testimonials = [
            {
                name: 'Rahul Sharma',
                class: '12th Science',
                text: 'Kavita ma\'am made Physics so easy. Scored 95% in boards and cleared JEE Mains!',
                rating: 5
            },
            {
                name: 'Priya Patel',
                class: 'NEET Aspirant',
                text: 'Sonu sir\'s Biology classes are amazing. His diagrams helped me remember complex concepts.',
                rating: 5
            },
            {
                name: 'Aryan Gupta',
                class: '11th Commerce',
                text: 'Gaurav sir\'s Maths tricks are incredible. Solved complex problems in seconds.',
                rating: 5
            },
            {
                name: 'Neha Kumar',
                class: '12th Science',
                text: 'Shubham sir\'s Organic Chemistry methodology is unique and easy to understand.',
                rating: 5
            }
        ];

        const container = document.getElementById('testimonials-container');
        if (container) {
            let currentSlide = 0;

            const renderTestimonial = (index) => {
                const t = testimonials[index];
                container.innerHTML = `
                    <div class="testimonial-card fade-in">
                        <div class="stars">${'★'.repeat(t.rating)}</div>
                        <p class="testimonial-text">"${t.text}"</p>
                        <div class="testimonial-author">
                            <strong>${t.name}</strong>
                            <span>${t.class}</span>
                        </div>
                    </div>
                `;
            };

            renderTestimonial(currentSlide);

            // Auto slide
            setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                renderTestimonial(currentSlide);
            }, 5000);

            // Manual navigation
            const prevBtn = document.getElementById('prev-testimonial');
            const nextBtn = document.getElementById('next-testimonial');

            if (prevBtn && nextBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                    renderTestimonial(currentSlide);
                });

                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    renderTestimonial(currentSlide);
                });
            }
        }
    },

    // Registration Modal
    initRegistrationModal() {
        document.querySelectorAll('.btn-admission, .btn-enroll').forEach(btn => {
            btn.addEventListener('click', () => {
                this.openRegistrationModal();
            });
        });
    },

    openRegistrationModal(preferredTeacher = '', preferredSubject = '') {
        const modal = document.createElement('div');
        modal.className = 'modal registration-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Enroll Now - Free Demo Class</h2>
                <form id="quick-registration-form">
                    <div class="form-group">
                        <input type="text" name="studentName" placeholder="Student Name" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" name="parentPhone" placeholder="Parent's Mobile Number" pattern="[6-9]{1}[0-9]{9}" required>
                    </div>
                    <div class="form-group">
                        <select name="studentClass" required>
                            <option value="">Select Class</option>
                            <option value="8">Class 8th</option>
                            <option value="9">Class 9th</option>
                            <option value="10">Class 10th</option>
                            <option value="11">Class 11th</option>
                            <option value="12">Class 12th</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <select name="subject">
                            <option value="">Preferred Subject (Optional)</option>
                            <option value="Physics" ${preferredSubject === 'Physics' ? 'selected' : ''}>Physics (Kavita Tiwari)</option>
                            <option value="Chemistry" ${preferredSubject === 'Chemistry' ? 'selected' : ''}>Chemistry (Shubham)</option>
                            <option value="Mathematics" ${preferredSubject === 'Mathematics' ? 'selected' : ''}>Mathematics (Gaurav Prajapati)</option>
                            <option value="Biology" ${preferredSubject === 'Biology' ? 'selected' : ''}>Biology (Sonu Jha)</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-submit">Book Free Demo</button>
                    <p class="form-note">*Free demo class available for new students</p>
                </form>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        const closeModal = () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        };

        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData);
            
            // Simulate submission
            const btn = e.target.querySelector('button[type="submit"]');
            btn.textContent = 'Booking...';
            btn.disabled = true;

            setTimeout(() => {
                this.showNotification(`Demo class booked successfully! We will contact you on ${data.parentPhone}`, 'success');
                closeModal();
            }, 1500);
        });
    },

    // Scroll Progress Indicator
    initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    },

    // Counter Animation for Stats
    initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        
        const animateCounter = (counter) => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            };

            updateCounter();
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    },

    // Timetable Toggle
    initTimetableToggle() {
        const toggleBtns = document.querySelectorAll('.timetable-toggle');
        const timetableViews = document.querySelectorAll('.timetable-view');

        toggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.dataset.target;
                
                toggleBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                timetableViews.forEach(view => {
                    if (view.id === target) {
                        view.classList.add('active');
                    } else {
                        view.classList.remove('active');
                    }
                });
            });
        });
    }
};

// Utility Functions
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// Export for module usage if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhysicsHub;
}