// Contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const messageDiv = document.getElementById('form-message');

    // Form validation
    const validateForm = (formData) => {
        const errors = [];
        
        // Required fields validation
        if (!formData.get('firstName')?.trim()) {
            errors.push('First name is required');
        }
        
        if (!formData.get('lastName')?.trim()) {
            errors.push('Last name is required');
        }
        
        if (!formData.get('email')?.trim()) {
            errors.push('Email address is required');
        } else if (!isValidEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.get('service')) {
            errors.push('Please select a service');
        }
        
        if (!formData.get('message')?.trim()) {
            errors.push('Project details are required');
        }
        
        if (!formData.get('terms')) {
            errors.push('You must agree to the terms and conditions');
        }
        
        return errors;
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const showMessage = (message, type) => {
        messageDiv.textContent = message;
        messageDiv.className = `message ${type} show`;
        messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    };

    const setLoadingState = (loading) => {
        if (loading) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        } else {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
        }
    };

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showMessage(errors.join('. '), 'error');
            return;
        }
        
        setLoadingState(true);
        
        try {
            // Simulate form submission (replace with actual API call)
            await simulateFormSubmission(formData);
            
            showMessage('Thank you for your message! We will get back to you within 24 hours.', 'success');
            contactForm.reset();
            
            // Track form submission (analytics)
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submit', {
                    event_category: 'Contact',
                    event_label: formData.get('service')
                });
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
        } finally {
            setLoadingState(false);
        }
    });

    // Simulate form submission (replace with actual implementation)
    const simulateFormSubmission = (formData) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) { // 90% success rate
                    resolve();
                } else {
                    reject(new Error('Simulated network error'));
                }
            }, 2000);
        });
    };

    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateField(input);
        });
        
        input.addEventListener('input', () => {
            clearFieldError(input);
        });
    });

    const validateField = (field) => {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Validate based on field type
        switch (field.name) {
            case 'firstName':
            case 'lastName':
                if (!value) {
                    isValid = false;
                }
                break;
            case 'email':
                if (!value || !isValidEmail(value)) {
                    isValid = false;
                }
                break;
            case 'service':
                if (!value) {
                    isValid = false;
                }
                break;
            case 'message':
                if (!value) {
                    isValid = false;
                }
                break;
        }
        
        if (!isValid) {
            field.classList.add('error');
        }
        
        return isValid;
    };

    const clearFieldError = (field) => {
        field.classList.remove('error');
    };

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            e.target.value = value;
        });
    }

    // Auto-resize textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', () => {
            messageTextarea.style.height = 'auto';
            messageTextarea.style.height = messageTextarea.scrollHeight + 'px';
        });
    }

    // Service selection handler
    const serviceSelect = document.getElementById('service');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', (e) => {
            const selectedService = e.target.value;
            
            // Update message placeholder based on service
            const placeholders = {
                'aerial-survey': 'Please describe the area to be surveyed, required accuracy, deliverables needed (orthomosaics, 3D models, etc.), and project timeline...',
                'agriculture': 'Please specify the crop type, farm size, specific requirements (spraying, monitoring, analysis), and preferred schedule...',
                'inspection': 'Please describe the infrastructure to be inspected, type of inspection needed (visual, thermal), access requirements, and safety considerations...',
                'photography': 'Please describe the property/event, required shots, video requirements, usage rights needed, and preferred timing...',
                'surveillance': 'Please specify the area to be monitored, duration, security requirements, and any special considerations...',
                'other': 'Please describe your specific drone service requirements, project scope, and any technical specifications...'
            };
            
            if (messageTextarea && placeholders[selectedService]) {
                messageTextarea.placeholder = placeholders[selectedService];
            }
        });
    }

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        
        // Initially hide answers
        answer.style.maxHeight = '0';
        answer.style.overflow = 'hidden';
        answer.style.transition = 'max-height 0.3s ease';
        
        question.style.cursor = 'pointer';
        question.style.position = 'relative';
        
        // Add expand/collapse icon
        const icon = document.createElement('i');
        icon.className = 'fas fa-chevron-down';
        icon.style.position = 'absolute';
        icon.style.right = '0';
        icon.style.top = '50%';
        icon.style.transform = 'translateY(-50%)';
        icon.style.transition = 'transform 0.3s ease';
        question.appendChild(icon);
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== '0px';
            
            if (isOpen) {
                answer.style.maxHeight = '0';
                icon.style.transform = 'translateY(-50%) rotate(0deg)';
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                icon.style.transform = 'translateY(-50%) rotate(180deg)';
                item.classList.add('active');
            }
        });
    });

    // Click-to-call functionality
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track phone call clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'phone_call', {
                    event_category: 'Contact',
                    event_label: link.href
                });
            }
        });
    });

    // Email links tracking
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Track email clicks
            if (typeof gtag !== 'undefined') {
                gtag('event', 'email_click', {
                    event_category: 'Contact',
                    event_label: link.href
                });
            }
        });
    });

    // Form field focus tracking
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            // Track which fields users interact with most
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_field_focus', {
                    event_category: 'Contact Form',
                    event_label: input.name
                });
            }
        });
    });

    // Scroll-based form completion tracking
    let formViewed = false;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !formViewed) {
                formViewed = true;
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_view', {
                        event_category: 'Contact Form',
                        event_label: 'Form Viewed'
                    });
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(contactForm);

    // Auto-save form data to localStorage
    const saveFormData = () => {
        const formData = new FormData(contactForm);
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (key !== 'terms' && key !== 'newsletter') { // Don't save checkboxes
                data[key] = value;
            }
        }
        localStorage.setItem('contactFormData', JSON.stringify(data));
    };

    const loadFormData = () => {
        const savedData = localStorage.getItem('contactFormData');
        if (savedData) {
            const data = JSON.parse(savedData);
            Object.keys(data).forEach(key => {
                const field = contactForm.querySelector(`[name="${key}"]`);
                if (field && data[key]) {
                    field.value = data[key];
                }
            });
        }
    };

    // Load saved data on page load
    loadFormData();

    // Save data on input
    inputs.forEach(input => {
        if (input.type !== 'checkbox') {
            input.addEventListener('input', saveFormData);
        }
    });

    // Clear saved data on successful submission
    contactForm.addEventListener('submit', () => {
        setTimeout(() => {
            localStorage.removeItem('contactFormData');
        }, 3000); // Clear after success message
    });
});