!(function(t) {
    "use strict";

    t(".navbar .navbar-nav li a, .navbar .appointment-btn").on("click", function(o) {
            var n = t(this);
            t("html, body")
                .stop()
                .animate({
                    scrollTop: t(n.attr("href")).offset().top - 50
                }, 50),
                o.preventDefault();
        }),
        t(document).on("click", ".navbar-collapse.in", function(o) {
            t(o.target).is("a") && "dropdown-toggle" != t(o.target).attr("class") && t(this).collapse("hide");
        }),
        t(".navbar .navbar-nav li a").on("click", function() {
            t(".navbar-collapse").collapse("hide");
        }),
        t(window).on("scroll", function() {
            t(this).scrollTop() > 120 ? t(".navbar-light, .navbar-two").addClass("is-sticky") : t(".navbar-light, .navbar-two").removeClass("is-sticky");
        }),
        t(".hero-slides").owlCarousel({
            items: 1,
            nav: !1,
            dots: !0,
            touchDrag: !1,
            mouseDrag: !1,
            autoplay: !0,
            smartSpeed: 700,
            loop: !0,
            navText: ["<i class='icofont-rounded-left'></i>", "<i class='icofont-rounded-right'></i>"]
        }),
        t(".doctor-carousel").owlCarousel({
            items: 1,
            nav: !1,
            dots: !0,
            touchDrag: !0,
            mouseDrag: !0,
            autoplay: !0,
            autoplayTimeout: 5000,
            autoplayHoverPause: !0,
            smartSpeed: 800,
            loop: !0
        }),
        (function(t) {
            t(".tab ul.tabs").addClass("active").find("> li:eq(0)").addClass("current"),
                t(".tab ul.tabs li a").on("click", function(o) {
                    var n = t(this).closest(".tab"),
                        a = t(this).closest("li").index();
                    n.find("ul.tabs > li").removeClass("current"),
                        t(this).closest("li").addClass("current"),
                        n
                        .find(".tab_content")
                        .find("div.tabs_item")
                        .not("div.tabs_item:eq(" + a + ")")
                        .slideUp(400),
                        n
                        .find(".tab_content")
                        .find("div.tabs_item:eq(" + a + ")")
                        .slideDown(400),
                        o.preventDefault();
                    
                    if (n.data('autoRotateInterval')) {
                        clearInterval(n.data('autoRotateInterval'));
                        n.removeData('autoRotateInterval');
                        startAutoRotate(n);
                    }
                });
            
            function switchTab(tabContainer, index) {
                var totalTabs = tabContainer.find("ul.tabs > li").length;
                var currentIndex = tabContainer.find("ul.tabs > li.current").index();
                var nextIndex = (currentIndex + 1) % totalTabs;
                
                if (index !== undefined) {
                    nextIndex = index;
                }
                
                var nextTab = tabContainer.find("ul.tabs > li").eq(nextIndex);
                var nextTabLink = nextTab.find("a");
                
                tabContainer.find("ul.tabs > li").removeClass("current");
                nextTab.addClass("current");
                
                tabContainer.find(".tab_content div.tabs_item")
                    .not("div.tabs_item:eq(" + nextIndex + ")")
                    .slideUp(400);
                
                tabContainer.find(".tab_content div.tabs_item:eq(" + nextIndex + ")")
                    .slideDown(400);
            }
            
            function startAutoRotate(tabContainer) {
                var interval = setInterval(function() {
                    if (!tabContainer.is(':hover')) {
                        switchTab(tabContainer);
                    }
                }, 5000);
                
                tabContainer.data('autoRotateInterval', interval);
            }
            
            t(".tab").each(function() {
                var tabContainer = t(this);
                startAutoRotate(tabContainer);
                
                tabContainer.on('mouseenter', function() {
                    if (tabContainer.data('autoRotateInterval')) {
                        clearInterval(tabContainer.data('autoRotateInterval'));
                    }
                }).on('mouseleave', function() {
                    startAutoRotate(tabContainer);
                });
            });
        })(jQuery),
        t(function() {
            t(".accordion")
                .find(".accordion-title")
                .on("click", function() {
                    t(this).toggleClass("active"), t(this).next().slideToggle("fast"), t(".accordion-content").not(t(this).next()).slideUp("fast"), t(".accordion-title").not(t(this)).removeClass("active");
                });
        }),
        t(function() {
            t("#datepicker").datepicker();
        }),
        t(function() {
            try {
                var a = mixitup(".shorting", {
                    controls: {
                        toggleDefault: "none"
                    }
                })
            } catch (b) {}
        }),
        t(".popup-btn").magnificPopup({
            type: "image",
            gallery: {
                enabled: !0
            }
        }),
        t(".popup-video").magnificPopup({
            disableOn: 320,
            type: "iframe",
            mainClass: "mfp-fade",
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1
        }),
        t(function() {
            t(window).on("scroll", function() {
                    var o = t(window).scrollTop();
                    o > 300 && (t(".go-top").fadeIn("slow"), t(".back-to-top").fadeIn("slow")), o < 300 && (t(".go-top").fadeOut("slow"), t(".back-to-top").fadeOut("slow"));
                }),
                t(".go-top, .back-to-top").on("click", function() {
                    t("html, body").animate({
                        scrollTop: "0"
                    }, 0);
                });
        });

    jQuery(window).on("load", function() {
        t(".preloader-area").fadeOut();
    });

})(jQuery);

try {
    // function to set a given theme/color-scheme
    function setTheme(themeName) {
        localStorage.setItem('goldmedi_theme', themeName);
        document.documentElement.className = themeName;
    }
    // function to toggle between light and dark theme
    function toggleTheme() {
        if (localStorage.getItem('goldmedi_theme') === 'theme-dark') {
            setTheme('theme-light');
        } else {
            setTheme('theme-dark');
        }
    }
    // Immediately invoked function to set the theme on initial load
    (function() {
        if (localStorage.getItem('goldmedi_theme') === 'theme-dark') {
            setTheme('theme-dark');
            document.getElementById('slider').checked = false;
        } else {
            setTheme('theme-light');
            document.getElementById('slider').checked = true;
        }
    })();
} catch (err) {}