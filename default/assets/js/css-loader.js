/* Async CSS Loader - Loads non-critical CSS after page load */
(function() {
    'use strict';
    
    // CSS files to load asynchronously
    var cssFiles = [
        'assets/css/bootstrap.min.css',
        'assets/css/icofont.min.css',
        'assets/css/owl.carousel.css',
        'assets/css/owl.theme.default.min.css',
        'assets/css/magnific-popup.css',
        'assets/css/animate.css',
        'assets/css/style.css',
        'assets/css/responsive.css',
        'assets/css/dark-style.css'
    ];
    
    // Load CSS files
    function loadCSS(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }
    
    // Load all CSS files after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            cssFiles.forEach(function(file) {
                loadCSS(file);
            });
        });
    } else {
        cssFiles.forEach(function(file) {
            loadCSS(file);
        });
    }
})();
