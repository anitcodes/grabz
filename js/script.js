// Slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.hero-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    const intervalTime = 5000;

    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Update dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, intervalTime);
    }

    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
        dotsContainer.appendChild(dot);
    });

    // Event listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetInterval();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetInterval();
    });

    // Touch events for mobile swipe
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
            resetInterval();
        }
    }

    // Pause auto-slide on hover
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    });

    // Start auto-slide
    slideInterval = setInterval(nextSlide, intervalTime);
});

// Add to cart functionality
function addToCart(productId) {
    // Implementation for adding items to cart
    console.log(`Added product ${productId} to cart`);
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-bar input');
    const searchResults = document.querySelector('.search-results');
    let searchTimeout;

    // Extended product data with smartphones and other items
    const products = [
        {
            id: 1,
            name: 'Galaxy S22 Ultra',
            category: 'Smartphones',
            price: '₹49,999',
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf'
        },
        {
            id: 2,
            name: 'iPhone 13',
            category: 'Smartphones',
            price: '₹69,999',
            image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a'
        },
        {
            id: 3,
            name: 'OnePlus 9 Pro',
            category: 'Smartphones',
            price: '₹54,999',
            image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179'
        },
        {
            id: 4,
            name: 'Pixel 6 Pro',
            category: 'Smartphones',
            price: '₹59,999',
            image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97'
        },
        {
            id: 5,
            name: 'Cargo Van - Daily Rental',
            category: 'Vans',
            price: '₹2,499/day',
            image: 'https://images.unsplash.com/photo-1624814448264-f2273a961d33'
        },
        {
            id: 6,
            name: '12-Seater Passenger Van',
            category: 'Vans',
            price: '₹3,999/day',
            image: 'https://images.unsplash.com/photo-1600661653561-629509216228'
        },
        {
            id: 7,
            name: 'Moving Van - Long Distance',
            category: 'Vans',
            price: '₹4,499/day',
            image: 'https://images.unsplash.com/photo-1616455579100-2ceaa4eb2d37'
        },
    ];

    function debounceSearch(func, delay) {
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    function performSearch(searchTerm) {
        if (!searchTerm) {
            searchResults.classList.remove('active');
            return;
        }

        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase())
        );

        displayResults(filteredProducts);
    }

    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px; color: #ccc;"></i>
                    <p>No products found</p>
                </div>
            `;
        } else {
            results.forEach(product => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="result-details">
                        <h4>${product.name}</h4>
                        <p>${product.category}</p>
                        <span class="search-price">${product.price}</span>
                    </div>
                `;
                resultItem.addEventListener('click', () => {
                    // Handle product click
                    console.log(`Selected product: ${product.name}`);
                    searchResults.classList.remove('active');
                    searchInput.value = '';
                });
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('active');
    }

    // Event listeners
    searchInput.addEventListener('input', debounceSearch(function(e) {
        performSearch(e.target.value.trim());
    }, 300));

    // Show results when focusing on search input
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            performSearch(this.value.trim());
        }
    });

    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });

    // Prevent search results from closing when clicking inside
    searchResults.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Navigation scroll buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav ul');
    const leftBtn = document.querySelector('.nav-scroll-btn.left');
    const rightBtn = document.querySelector('.nav-scroll-btn.right');
    
    // Show/hide scroll buttons based on scroll position
    function toggleScrollButtons() {
        leftBtn.style.display = nav.scrollLeft > 0 ? 'flex' : 'none';
        rightBtn.style.display = 
            nav.scrollLeft < nav.scrollWidth - nav.clientWidth ? 'flex' : 'none';
    }

    // Scroll navigation
    function scrollNav(direction) {
        const scrollAmount = 200;
        nav.scrollBy({
            left: direction === 'left' ? -scrollAmount : scrollAmount,
            behavior: 'smooth'
        });
    }

    // Event listeners
    leftBtn.addEventListener('click', () => scrollNav('left'));
    rightBtn.addEventListener('click', () => scrollNav('right'));
    nav.addEventListener('scroll', toggleScrollButtons);
    window.addEventListener('resize', toggleScrollButtons);

    // Initial check for scroll buttons
    toggleScrollButtons();
});

// Cart functionality
const cart = {
    items: [],
    total: 0,

    // Add item to cart
    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.replace(/[^0-9.-]+/g, "")),
                image: product.image,
                quantity: 1
            });
        }
        
        this.calculateTotal();
        this.saveToLocalStorage();
        this.updateUI();
    },

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.calculateTotal();
        this.saveToLocalStorage();
        this.updateUI();
    },

    // Update item quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = quantity;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.calculateTotal();
                this.saveToLocalStorage();
                this.updateUI();
            }
        }
    },

    // Calculate total
    calculateTotal() {
        this.total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    },

    // Save cart to localStorage
    saveToLocalStorage() {
        localStorage.setItem('cart', JSON.stringify({
            items: this.items,
            total: this.total
        }));
    },

    // Load cart from localStorage
    loadFromLocalStorage() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const { items, total } = JSON.parse(savedCart);
            this.items = items;
            this.total = total;
        }
    },

    // Update cart UI
    updateUI() {
        const cartCount = document.querySelectorAll('.cart-count');
        const cartItems = document.querySelector('.cart-items');
        const cartEmpty = document.querySelector('.cart-empty');
        const totalAmount = document.querySelector('.total-amount');
        const itemCount = this.items.reduce((sum, item) => sum + item.quantity, 0);

        // Update cart count
        cartCount.forEach(count => {
            count.textContent = itemCount;
        });

        // Update cart items
        if (this.items.length === 0) {
            cartEmpty.style.display = 'block';
            cartItems.style.display = 'none';
        } else {
            cartEmpty.style.display = 'none';
            cartItems.style.display = 'block';
            
            cartItems.innerHTML = this.items.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-details">
                        <div class="cart-item-title">${item.name}</div>
                        <div class="cart-item-price">₹${item.price}</div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn plus">+</button>
                        </div>
                    </div>
                    <div class="cart-item-remove">
                        <i class="fas fa-times"></i>
                    </div>
                </div>
            `).join('');
        }

        // Update total
        totalAmount.textContent = `₹${this.total.toFixed(2)}`;
    }
};

// Initialize cart and add event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load cart from localStorage
    cart.loadFromLocalStorage();
    cart.updateUI();

    // Add to cart buttons - Updated event listener
    document.body.addEventListener('click', function(e) {
        const addToCartBtn = e.target.closest('.add-to-cart-btn');
        if (addToCartBtn) {
            e.preventDefault();
            e.stopPropagation();
            
            const productCard = addToCartBtn.closest('.product-card');
            if (!productCard) return;

            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.current-price').textContent,
                image: productCard.querySelector('.product-image img').src
            };
            
            cart.addItem(product);

            // Show feedback
            const originalText = addToCartBtn.innerHTML;
            addToCartBtn.innerHTML = '<i class="fas fa-check"></i> Added';
            addToCartBtn.style.backgroundColor = '#00a650';
            
            setTimeout(() => {
                addToCartBtn.innerHTML = originalText;
                addToCartBtn.style.backgroundColor = '';
            }, 2000);
        }
    });

    // Cart dropdown toggle
    const cartBtn = document.querySelector('.cart');
    const cartDropdown = document.querySelector('.cart-dropdown');
    
    if (cartBtn && cartDropdown) {
        cartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            cartDropdown.classList.toggle('active');
        });

        // Close cart dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
                cartDropdown.classList.remove('active');
            }
        });
    }

    // Handle quantity changes and remove items
    const cartItemsContainer = document.querySelector('.cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', function(e) {
            const cartItem = e.target.closest('.cart-item');
            if (!cartItem) return;

            const productId = cartItem.dataset.id;
            const quantitySpan = cartItem.querySelector('.cart-item-quantity span');
            if (!quantitySpan) return;

            const currentQuantity = parseInt(quantitySpan.textContent);

            if (e.target.classList.contains('plus')) {
                cart.updateQuantity(productId, currentQuantity + 1);
            } else if (e.target.classList.contains('minus')) {
                cart.updateQuantity(productId, currentQuantity - 1);
            } else if (e.target.closest('.cart-item-remove')) {
                cart.removeItem(productId);
            }
        });
    }
});

// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
    const authModal = document.getElementById('authModal');
    const signInBtn = document.querySelector('.sign-in');
    const closeModal = document.querySelector('.close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    // Show modal
    signInBtn.addEventListener('click', function(e) {
        e.preventDefault();
        authModal.classList.add('active');
    });

    // Close modal
    closeModal.addEventListener('click', () => authModal.classList.remove('active'));
    window.addEventListener('click', e => {
        if (e.target === authModal) authModal.classList.remove('active');
    });

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetForm = this.dataset.tab;
            
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            this.classList.add('active');
            document.querySelector(`.${targetForm}-form`).classList.add('active');
        });
    });

    // Form submission
    signinForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your sign in logic here
        alert('Sign in successful!');
        authModal.classList.remove('active');
    });

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your sign up logic here
        alert('Account created successfully!');
        authModal.classList.remove('active');
    });
});

// Smooth scrolling for navbar links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Remove active class from all links
            document.querySelectorAll('nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100; // Offset for sticky header

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}); 