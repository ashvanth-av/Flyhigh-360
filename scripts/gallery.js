// Gallery filtering functionality
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-large');

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get filter value
            const filterValue = button.getAttribute('data-filter');
            
            // Filter gallery items
            filterGalleryItems(filterValue);
        });
    });

    function filterGalleryItems(filter) {
        galleryItems.forEach((item, index) => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                // Show item with staggered animation
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('visible');
                    item.style.display = 'block';
                }, index * 50);
            } else {
                // Hide item
                item.classList.add('hidden');
                item.classList.remove('visible');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    }

    // Initialize gallery items as visible
    galleryItems.forEach(item => {
        item.classList.add('visible');
    });

    // Lazy loading for gallery images
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '50px'
    };

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                item.classList.add('loaded');
                imageObserver.unobserve(item);
            }
        });
    }, observerOptions);

    galleryItems.forEach(item => {
        imageObserver.observe(item);
    });

    // Enhanced hover effects
    galleryItems.forEach(item => {
        const image = item.querySelector('.placeholder-image');
        const overlay = item.querySelector('.gallery-overlay-large');

        item.addEventListener('mouseenter', () => {
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
            if (overlay) {
                overlay.style.transform = 'translateY(0)';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (image) {
                image.style.transform = 'scale(1)';
            }
            if (overlay) {
                overlay.style.transform = 'translateY(50%)';
            }
        });
    });

    // Keyboard navigation for filters
    filterButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            let targetIndex;
            
            switch(e.key) {
                case 'ArrowLeft':
                    e.preventDefault();
                    targetIndex = index > 0 ? index - 1 : filterButtons.length - 1;
                    filterButtons[targetIndex].focus();
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    targetIndex = index < filterButtons.length - 1 ? index + 1 : 0;
                    filterButtons[targetIndex].focus();
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    button.click();
                    break;
            }
        });
    });

    // Search functionality (if needed in future)
    const addSearchFunctionality = () => {
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Search projects...';
        searchInput.className = 'gallery-search';
        
        const filtersContainer = document.querySelector('.gallery-filters');
        if (filtersContainer) {
            filtersContainer.parentNode.insertBefore(searchInput, filtersContainer);
            
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                
                galleryItems.forEach(item => {
                    const title = item.querySelector('h3').textContent.toLowerCase();
                    const description = item.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        item.style.display = 'block';
                        item.classList.add('visible');
                    } else {
                        item.style.display = 'none';
                        item.classList.remove('visible');
                    }
                });
            });
        }
    };

    // Modal functionality for enlarged view
    const createModal = () => {
        const modal = document.createElement('div');
        modal.className = 'gallery-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-image"></div>
                    <div class="modal-info">
                        <h3 class="modal-title"></h3>
                        <p class="modal-description"></p>
                        <div class="modal-details"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Modal styles
        const modalStyles = `
            .gallery-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }
            
            .gallery-modal.active {
                display: flex;
            }
            
            .modal-overlay {
                position: relative;
                max-width: 90%;
                max-height: 90%;
                background: white;
                border-radius: 15px;
                overflow: hidden;
                display: grid;
                grid-template-columns: 1fr 1fr;
                min-height: 500px;
            }
            
            .modal-close {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 1.5rem;
                cursor: pointer;
                z-index: 10001;
            }
            
            .modal-image {
                background-size: cover;
                background-position: center;
            }
            
            .modal-info {
                padding: 2rem;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            
            .modal-title {
                color: #1f2937;
                margin-bottom: 1rem;
                font-size: 1.8rem;
            }
            
            .modal-description {
                color: #6b7280;
                line-height: 1.6;
                margin-bottom: 2rem;
            }
            
            .modal-details {
                display: flex;
                gap: 1rem;
                color: #2563eb;
                font-weight: 500;
            }
            
            @media (max-width: 768px) {
                .modal-overlay {
                    grid-template-columns: 1fr;
                    max-width: 95%;
                    max-height: 95%;
                }
                
                .modal-info {
                    padding: 1.5rem;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
        
        return modal;
    };

    // Initialize modal
    const modal = createModal();
    const modalClose = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay');

    // Add click handlers to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').textContent;
            const description = item.querySelector('p').textContent;
            const details = item.querySelector('.project-details').innerHTML;
            const imageStyle = item.querySelector('.placeholder-image').style.background || 
                             getComputedStyle(item.querySelector('.placeholder-image')).background;
            
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-description').textContent = description;
            modal.querySelector('.modal-details').innerHTML = details;
            modal.querySelector('.modal-image').style.background = imageStyle;
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        // Add cursor pointer
        item.style.cursor = 'pointer';
    });

    // Close modal handlers
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Prevent modal content click from closing modal
    modalOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active') && e.key === 'Escape') {
            closeModal();
        }
    });

    // Counter animation for stats
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-card h3');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                    const suffix = counter.textContent.replace(/[\d]/g, '');
                    
                    animateCounter(counter, target, suffix, 2000);
                    observer.unobserve(counter);
                }
            });
        });

        counters.forEach(counter => observer.observe(counter));
    };

    function animateCounter(element, target, suffix, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            const current = Math.floor(start);
            element.textContent = current + suffix;
            
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            }
        }, 16);
    }

    // Initialize counter animation
    animateCounters();
});