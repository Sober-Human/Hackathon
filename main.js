// Main JavaScript file - contains all consolidated functionality

document.addEventListener('DOMContentLoaded', function() {
    // ======== Navigation and Scroll Functionality ========
    
    // Scroll Progress Indicator
    const scrollProgressBar = document.getElementById('scroll-progress-bar');
    
    if (scrollProgressBar) {
        window.addEventListener('scroll', function() {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgressBar.style.width = scrolled + '%';
            
            // Highlight the current section in quick links based on scroll position
            highlightCurrentSection();
        });
    }
    
    // Function to highlight current section in navigation
    function highlightCurrentSection() {
        const sections = [
            document.getElementById('gallery-section'),
            document.getElementById('info-details-section'),
            document.getElementById('reviews-section')
        ];
        
        const quickLinks = document.querySelectorAll('.quick-links a');
        const scrollPosition = window.scrollY + 100; // Account for header
        
        // Find which section is currently in view
        let currentSectionIndex = -1;
        sections.forEach((section, index) => {
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionBottom = sectionTop + section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    currentSectionIndex = index;
                }
            }
        });
        
        // Update active class on quick links
        quickLinks.forEach((link, index) => {
            if (index === currentSectionIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    
    // Toggle Expanded Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navCollapse = document.getElementById('nav-collapse');
    const expandedNav = document.getElementById('expanded-nav');
    const compactNav = document.querySelector('.compact-nav');
    const searchToggle = document.getElementById('search-toggle');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const quickLinks = document.getElementById('quick-links');
    
    // Search toggle functionality
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            expandedNav.classList.add('expanded');
            expandedNav.style.display = 'block';
            compactNav.classList.add('hidden');
            
            // Focus the search input after expanding
            setTimeout(() => {
                const searchInput = document.querySelector('.search-input');
                if (searchInput) {
                    searchInput.focus();
                }
            }, 100);
        });
    }
    
    // Mobile menu toggle
    if (mobileMenuToggle && quickLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            quickLinks.classList.toggle('visible');
        });
        
        // Close quick links when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('#mobile-menu-toggle') && 
                !e.target.closest('#quick-links') && 
                quickLinks.classList.contains('visible')) {
                quickLinks.classList.remove('visible');
            }
        });
    }
    
    // Toggle navigation dropdown
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            expandedNav.classList.toggle('expanded');
            
            // If nav is now expanded, show expanded view and hide compact nav
            if (expandedNav.classList.contains('expanded')) {
                expandedNav.style.display = 'block';
                compactNav.classList.add('hidden');
            } else {
                // Hide expanded nav after animation completes and show compact nav
                setTimeout(() => {
                    expandedNav.style.display = 'none';
                    compactNav.classList.remove('hidden');
                }, 300);
            }
        });
    }
    
    // Collapse navigation (dropup functionality)
    if (navCollapse) {
        navCollapse.addEventListener('click', function() {
            expandedNav.classList.remove('expanded');
            // Apply slide up animation
            expandedNav.style.animation = 'slideUp 0.3s ease-in-out';
            
            // Hide expanded nav after animation completes and show compact nav
            setTimeout(() => {
                expandedNav.style.display = 'none';
                compactNav.classList.remove('hidden');
                // Reset animation for next time
                expandedNav.style.animation = '';
            }, 300);
        });
    }
    
    // Smooth scrolling for anchor links
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calculate header height for offset
                const headerHeight = document.querySelector('header').offsetHeight;
                
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 20, // Extra padding
                    behavior: 'smooth'
                });
                
                // Close the expanded navigation if open
                if (expandedNav.classList.contains('expanded')) {
                    expandedNav.classList.remove('expanded');
                    setTimeout(() => {
                        expandedNav.style.display = 'none';
                        compactNav.classList.remove('hidden');
                    }, 300);
                }
            }
        });
    });
    
    // ======== Product Image Functionality ========
    
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    const mainImageContainer = document.getElementById('main-image');
    const zoomLens = document.getElementById('zoom-lens');
    const zoomResult = document.getElementById('zoom-result');
    const fullscreenView = document.getElementById('fullscreen-view');
    const fullscreenClose = document.getElementById('fullscreen-close');
    const fullscreenImageContainer = document.getElementById('fullscreen-image-container');
    const fullscreenThumbnails = document.getElementById('fullscreen-thumbnails');
    
    // Thumbnail click and hover functionality
    // Image Zoom Functionality
    let zoomActive = false;
    
    function initZoom() {
        if (mainImageContainer && zoomLens && zoomResult && mainImage) {
            // Show zoom elements
            zoomLens.style.display = 'block';
            zoomResult.style.display = 'block';
            
            // Set zoom result background image
            zoomResult.style.backgroundImage = `url(${mainImage.src})`;
            
            // Calculate zoom ratio based on image dimensions
            const ratio = 2.5; // Zoom magnification
            zoomResult.style.backgroundSize = `${mainImage.width * ratio}px ${mainImage.height * ratio}px`;
            
            zoomActive = true;
        }
    }
    
    function moveZoom(e) {
        if (!zoomActive) return;
        
        // Get cursor position
        const bounds = mainImageContainer.getBoundingClientRect();
        let x = e.clientX - bounds.left;
        let y = e.clientY - bounds.top;
        
        // Constrain cursor position within image bounds
        x = Math.max(0, Math.min(x, mainImageContainer.offsetWidth));
        y = Math.max(0, Math.min(y, mainImageContainer.offsetHeight));
        
        // Calculate position percentages
        const xPercent = x / mainImageContainer.offsetWidth * 100;
        const yPercent = y / mainImageContainer.offsetHeight * 100;
        
        // Position lens
        const lensSize = 100; // The lens size in pixels
        zoomLens.style.left = `${x - lensSize/2}px`;
        zoomLens.style.top = `${y - lensSize/2}px`;
        
        // Position background image in result
        zoomResult.style.backgroundPosition = `${-xPercent * 2.5 + 50}% ${-yPercent * 2.5 + 50}%`;
    }
    
    function endZoom() {
        if (zoomLens && zoomResult) {
            zoomLens.style.display = 'none';
            zoomResult.style.display = 'none';
            zoomActive = false;
        }
    }
    
    // Initialize Fullscreen View functionality
    function openFullscreenView(imgSrc) {
        if (fullscreenView && fullscreenImageContainer) {
            // Create and append main image
            fullscreenImageContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = 'Fullscreen Image';
            img.className = 'fullscreen-main-image';
            fullscreenImageContainer.appendChild(img);
            
            // Create and append thumbnails
            fullscreenThumbnails.innerHTML = '';
            thumbnails.forEach(thumb => {
                const thumbImg = document.createElement('div');
                thumbImg.className = 'fullscreen-thumbnail';
                if (thumb.classList.contains('active')) {
                    thumbImg.classList.add('active');
                }
                
                const imgSrc = thumb.getAttribute('data-image');
                thumbImg.style.backgroundImage = `url(${imgSrc})`;
                
                // Add click event to thumbnails
                thumbImg.addEventListener('click', function() {
                    // Update active class
                    const allThumbs = fullscreenThumbnails.querySelectorAll('.fullscreen-thumbnail');
                    allThumbs.forEach(t => t.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Update main image
                    const fullImg = fullscreenImageContainer.querySelector('.fullscreen-main-image');
                    if (fullImg) {
                        fullImg.src = imgSrc;
                    }
                });
                
                fullscreenThumbnails.appendChild(thumbImg);
            });
            
            // Show fullscreen view
            fullscreenView.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    }
    
    // Close fullscreen view
    if (fullscreenClose) {
        fullscreenClose.addEventListener('click', function() {
            fullscreenView.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
        });
    }
    
    // Close fullscreen view when clicking outside the image container
    if (fullscreenView) {
        fullscreenView.addEventListener('click', function(e) {
            if (e.target === fullscreenView) {
                fullscreenView.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
            }
        });
    }
    
    // Add event listeners to main image container for zoom functionality
    if (mainImageContainer) {
        mainImageContainer.addEventListener('mouseenter', initZoom);
        mainImageContainer.addEventListener('mousemove', moveZoom);
        mainImageContainer.addEventListener('mouseleave', endZoom);
        mainImageContainer.addEventListener('click', function() {
            // When clicking the main image, open fullscreen view
            if (mainImage) {
                openFullscreenView(mainImage.src);
            }
        });
    }
    
    thumbnails.forEach(thumbnail => {
        // Click functionality
        thumbnail.addEventListener('click', function() {
            // Only process image thumbnails, not video
            if (!this.classList.contains('video-thumbnail')) {
                // Update active class
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Update main image src
                const imgSrc = this.getAttribute('data-image');
                if (mainImage && imgSrc) {
                    mainImage.src = imgSrc;
                    
                    // Update zoom result if active
                    if (zoomActive && zoomResult) {
                        zoomResult.style.backgroundImage = `url(${imgSrc})`;
                    }
                }
            }
        });
        
        // Hover functionality
        thumbnail.addEventListener('mouseenter', function() {
            // Only process image thumbnails, not video
            if (!this.classList.contains('video-thumbnail')) {
                const imgSrc = this.getAttribute('data-image');
                if (mainImage && imgSrc) {
                    mainImage.src = imgSrc;
                    
                    // Update zoom result if active
                    if (zoomActive && zoomResult) {
                        zoomResult.style.backgroundImage = `url(${imgSrc})`;
                    }
                }
            }
        });
        
        // Mouseleave functionality - return to active image
        thumbnail.addEventListener('mouseleave', function() {
            const activeThumb = document.querySelector('.thumbnail.active');
            if (activeThumb && mainImage) {
                const activeImgSrc = activeThumb.getAttribute('data-image');
                if (activeImgSrc) {
                    mainImage.src = activeImgSrc;
                }
            }
        });
    });
    
    // ======== Middle Column Expandable Sections ========
    
    // View Full Details functionality
    const viewFullDetailsBtn = document.getElementById('view-full-details');
    const expandableSections = document.querySelector('.expandable-sections');
    const sectionHeaders = document.querySelectorAll('.section-header');
    const sectionContents = document.querySelectorAll('.section-content');
    
    if (viewFullDetailsBtn && expandableSections) {
        viewFullDetailsBtn.addEventListener('click', function() {
            const isExpanded = expandableSections.classList.toggle('expanded');
            
            if (isExpanded) {
                this.innerHTML = '<i class="fa fa-chevron-up"></i> Hide Full Details';
                sectionHeaders.forEach(header => header.classList.add('active'));
                sectionContents.forEach(content => content.classList.add('active'));
            } else {
                this.innerHTML = '<i class="fa fa-chevron-down"></i> View Full Details';
                sectionHeaders.forEach(header => header.classList.remove('active'));
                sectionContents.forEach(content => content.classList.remove('active'));
            }
            
            // Fix arrow positions after expanding/collapsing
            setTimeout(fixArrowPositions, 50);
        });
    }
    
    // Individual section toggle functionality
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Get the target content ID from the data attribute
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            
            // Toggle active class on header and content
            this.classList.toggle('active');
            if (targetContent) {
                targetContent.classList.toggle('active');
            }
        });
    });
    
    // ======== Right Column Card Slider ========
    
    const cardsWrapper = document.getElementById('cards-wrapper');
    const cards = cardsWrapper ? cardsWrapper.querySelectorAll('.summary-card') : []; // Get all card elements
    const prevBtn = document.getElementById('prev-card-btn');
    const nextBtn = document.getElementById('next-card-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentCardIndex = 0;
    const totalCards = cards.length; // Use the actual number of cards found

    // Function to update the card slider - NOW FOR STACKED LAYOUT
    function updateCardSlider(newIndex) { // Removed direction parameter
        // Validate the new index
        if (newIndex < 0) {
            newIndex = totalCards - 1;
        } else if (newIndex >= totalCards) {
            newIndex = 0;
        }

        if (newIndex === currentCardIndex || totalCards === 0) {
            return; // No change needed or no cards
        }

        // Remove active class from the current card
        if (cards[currentCardIndex]) {
             cards[currentCardIndex].classList.remove('active');
        }
       
        // Update current index
        currentCardIndex = newIndex;

        // Add active class to the new card
        if (cards[currentCardIndex]) {
            cards[currentCardIndex].classList.add('active');
        }
        
        // Update active indicator
        updateActiveIndicator();
    }

    // Function to update active indicator
    function updateActiveIndicator() {
        indicators.forEach((indicator, index) => {
            if (index === currentCardIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // --- INITIALIZE SLIDER --- 
    if (totalCards > 0) {
        // Activate the first card
        cards[0].classList.add('active');
        // Update the indicators
        updateActiveIndicator(); 
    }
    // -------------------------

    // Initialize previous button functionality
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            updateCardSlider(currentCardIndex - 1); // Simplified call
        });
    }

    // Initialize next button functionality
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            updateCardSlider(currentCardIndex + 1); // Simplified call
        });
    }

    // Initialize indicator functionality
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            updateCardSlider(index); // Simplified call
            // No need for direction logic here
        });
    });
    
    // Function to fix arrow positions (important for layout bug fix)
    function fixArrowPositions() {
        if (prevBtn && nextBtn) {
            // Force a reflow/repaint to ensure arrows are positioned correctly
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
            
            // Trigger reflow
            void document.documentElement.offsetHeight;
            
            // Restore display
            prevBtn.style.display = '';
            nextBtn.style.display = '';
        }
    }

    // --- END Right Column Card Slider ---
    
    // ======== Express Checkout Functionality ========
    
    const expressCheckoutBtn = document.querySelector('.btn-express-checkout');
    const expressCheckoutModal = document.getElementById('express-checkout-modal');
    const expressCheckoutClose = document.getElementById('express-checkout-close');
    const confirmPaymentBtns = document.querySelectorAll('.confirm-payment-btn');
    const paymentSuccessModal = document.getElementById('payment-success-modal');
    const closeSuccessBtn = document.getElementById('close-success-btn');
    const paymentMethods = document.querySelectorAll('.payment-method input');
    const paymentDetails = document.querySelectorAll('.payment-details');

    // Open Express Checkout modal
    if (expressCheckoutBtn && expressCheckoutModal) {
        expressCheckoutBtn.addEventListener('click', function() {
            expressCheckoutModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close Express Checkout modal
    if (expressCheckoutClose) {
        expressCheckoutClose.addEventListener('click', function() {
            expressCheckoutModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Toggle payment methods
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            // Hide all payment details
            paymentDetails.forEach(detail => detail.classList.remove('active'));
            
            // Show selected payment details
            const methodId = this.id;
            if (methodId === 'upi') {
                document.querySelector('.upi-details').classList.add('active');
            } else if (methodId === 'card') {
                document.querySelector('.card-details').classList.add('active');
            }
        });
    });

    // Confirm payment buttons
    confirmPaymentBtns.forEach(button => {
        button.addEventListener('click', function() {
            // Hide checkout modal
            expressCheckoutModal.classList.remove('active');
            
            // Show success modal
            paymentSuccessModal.classList.add('active');
        });
    });

    // Close success modal
    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', function() {
            paymentSuccessModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }

    // Close modals on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (expressCheckoutModal && expressCheckoutModal.classList.contains('active')) {
                expressCheckoutModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            if (paymentSuccessModal && paymentSuccessModal.classList.contains('active')) {
                paymentSuccessModal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }
    });
    
    // Run initial highlighting on page load
    highlightCurrentSection();
    
    // Fix arrow positions immediately after page load
    fixArrowPositions();
});
