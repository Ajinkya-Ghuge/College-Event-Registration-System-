"use strict";
class GalleryManager {
    constructor() {
        this.images = [
            { src: '../gallary image 1.jpg', category: 'team', alt: 'IGNITE Team Photo 1' },
            { src: '../gallery image 2.jpg', category: 'team', alt: 'IGNITE Team Photo 2' },
            { src: '../gallery image 3.jpg', category: 'team', alt: 'IGNITE Team Photo 3' },
            { src: '../gallery image 4.jpg', category: 'events', alt: 'IGNITE Event Photo 1' },
            { src: '../gallery image 5.jpg', category: 'events', alt: 'IGNITE Event Photo 2' },
        ];
        this.featuredImages = [
            '../gallary image 1.jpg',
            '../gallery image 2.jpg',
            '../gallery image 3.jpg',
            '../gallery image 4.jpg',
        ];
        this.currentFilter = 'all';
        this.currentFeaturedIndex = 0;
        this.currentLightboxIndex = 0;
        this.filteredImages = [];
        this.init();
    }
    init() {
        this.renderGallery();
        this.setupFilters();
        this.setupFeaturedSlider();
        this.setupLightbox();
    }
    renderGallery() {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid)
            return;
        galleryGrid.innerHTML = '';
        this.filteredImages = this.currentFilter === 'all'
            ? this.images
            : this.images.filter(img => img.category === this.currentFilter);
        this.filteredImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = `<img src="${image.src}" alt="${image.alt}">`;
            item.addEventListener('click', () => this.openLightbox(index));
            galleryGrid.appendChild(item);
        });
    }
    setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                if (!filter)
                    return;
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                // Update filter and re-render
                this.currentFilter = filter;
                this.renderGallery();
            });
        });
    }
    setupFeaturedSlider() {
        const dots = document.querySelectorAll('.dot');
        const featuredImage = document.getElementById('featuredImage');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.currentFeaturedIndex = index;
                this.updateFeaturedImage();
            });
        });
        // Auto-slide every 5 seconds
        setInterval(() => {
            this.currentFeaturedIndex = (this.currentFeaturedIndex + 1) % this.featuredImages.length;
            this.updateFeaturedImage();
        }, 5000);
    }
    updateFeaturedImage() {
        const featuredImage = document.getElementById('featuredImage');
        const dots = document.querySelectorAll('.dot');
        if (featuredImage) {
            featuredImage.src = this.featuredImages[this.currentFeaturedIndex];
        }
        dots.forEach((dot, index) => {
            if (index === this.currentFeaturedIndex) {
                dot.classList.add('active');
            }
            else {
                dot.classList.remove('active');
            }
        });
    }
    setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const closeLightbox = document.querySelector('.close-lightbox');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (closeLightbox) {
            closeLightbox.addEventListener('click', () => this.closeLightbox());
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.navigateLightbox(-1));
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.navigateLightbox(1));
        }
        // Close on background click
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    this.closeLightbox();
                }
            });
        }
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!(lightbox === null || lightbox === void 0 ? void 0 : lightbox.classList.contains('show')))
                return;
            if (e.key === 'Escape') {
                this.closeLightbox();
            }
            else if (e.key === 'ArrowLeft') {
                this.navigateLightbox(-1);
            }
            else if (e.key === 'ArrowRight') {
                this.navigateLightbox(1);
            }
        });
    }
    openLightbox(index) {
        this.currentLightboxIndex = index;
        const lightbox = document.getElementById('lightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightbox && lightboxImage) {
            lightboxImage.src = this.filteredImages[index].src;
            lightbox.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    }
    closeLightbox() {
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    }
    navigateLightbox(direction) {
        this.currentLightboxIndex += direction;
        if (this.currentLightboxIndex < 0) {
            this.currentLightboxIndex = this.filteredImages.length - 1;
        }
        else if (this.currentLightboxIndex >= this.filteredImages.length) {
            this.currentLightboxIndex = 0;
        }
        const lightboxImage = document.getElementById('lightboxImage');
        if (lightboxImage) {
            lightboxImage.src = this.filteredImages[this.currentLightboxIndex].src;
        }
    }
}
// Initialize the gallery manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GalleryManager();
});
