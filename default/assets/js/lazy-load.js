/* Lazy Loading for Images and Video */
(function() {
    'use strict';
    
    // Lazy load images
    function lazyLoadImages() {
        var lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            var imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        var img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            lazyImages.forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }
    
    // Lazy load background video
    function lazyLoadVideo() {
        var video = document.querySelector('.background-video');
        if (video) {
            var source = video.querySelector('source');
            if (source && source.dataset.src) {
                source.src = source.dataset.src;
                video.load();
                video.play().catch(function(e) {
                    console.log('Video autoplay prevented:', e);
                });
            }
        }
    }
    
    // Initialize lazy loading
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            lazyLoadImages();
            // Load video after a short delay to prioritize content
            setTimeout(lazyLoadVideo, 2000);
        });
    } else {
        lazyLoadImages();
        setTimeout(lazyLoadVideo, 2000);
    }
})();
