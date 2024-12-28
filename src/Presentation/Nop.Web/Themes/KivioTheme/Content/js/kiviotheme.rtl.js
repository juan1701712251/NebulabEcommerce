/*!
 * nopAccelerate Furnish Theme v1.1.0 (http://themes.nopaccelerate.com/themes/furnish-theme/)
 * Copyright 2024 Xcellence-IT.
 * Licensed under LICENSETYPE (http://www.nopaccelerate.com/terms/)
 */
$(function () {
    if ($(window).width() >= 992) {
        //Header user icon hover js
        $(".user-link").on('mouseenter', function (e) {
            if (e !== undefined && e.target !== undefined) {
                if ($(".user-link").hasClass("active")) {
                    $(".user-link").removeClass("active");
                }
                else {
                    $(".user-link").addClass("active");
                }
            }
        });
    }
    //Add to cart btn click for wishlist page
    $('.remove-from-cart-button.add-to-cart-button').on('click', function (e) {
        var productId = $(this).attr("data-productid");
        $(":checkbox").filter(function () {
            return this.value == productId;
        }).prop("checked", "true");
        $(".wishlist-add-to-cart-button").trigger("click");
    });

    var menuOption = $(".mobile-option > span");
    var menuOverlay = $(".mobile-overlay");
    var userOverlay = $(".user-wrapper");
    menuOption.on("click", function (event) {
        var find_active = $(this).siblings('.active:visible');
        if (find_active.length) {
            $(this).siblings('.mobile-overlay').removeClass('active');
            $("body").removeClass('active-body');
        }
        else {
            menuOverlay.removeClass('active');
            $(this).siblings('.mobile-overlay').addClass('active');
            $("body").addClass('active-body');
        }
        closemenu();
    });
    $(document).on('click', 'header .close', function () {
        $(".overlay-event").removeClass('active');
        $(".mobile-overlay").removeClass('active');
        $("body").removeClass('active-body');
    });
    function closemenu() {
        $(".overlay-event.active").on("click", function (event) {
            if (!$(event.target).closest(".cd-cart").length) {
                $(".overlay-event").removeClass('active');
                $("body").removeClass('active-body');
            }
        });
    }
    //my account outside click
    var myAccount = $(".ico-user");
    $(document).on("click", function (event) {
        if (userOverlay.hasClass("active") && !userOverlay.is(event.target) && userOverlay.has(event.target).length === 0 && !myAccount.is(event.target) && myAccount.has(event.target).length === 0) {
            userOverlay.removeClass("active");
            $("body").removeClass('active-body');
        }
    });

    //Common Slider
    $('.common-section-slider').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: true,
        autoplay: false,
        arrows: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        rtl: true,
        responsive: [
            {
                breakpoint: 376,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 1400,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //News slider
    $('.news-section-slider').slick({
        lazyLoad: 'ondemand',
        dots: false,
        infinite: true,
        autoplay: false,
        arrows: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        rtl: true,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ]
    });

    //Picture slider
    $('.picture .slider-content').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: true,
        speed: 1000,
        asNavFor: '.picture .slider-thumb',
        arrows: true,
        infinite: true,
        rtl: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: true,
                    arrows: false,
                },
            }
        ]
    });
    var slideCount = $('.picture .slider-thumb').children().length;
    var slidesToShows = (slideCount <= 3) ? 2 : 3;
    $('.picture .slider-thumb').slick({
        slidesToShow: slidesToShows,
        slidesToScroll: 1,
        asNavFor: '.picture .slider-content',
        dots: false,
        arrows: true,
        vertical: true,
        infinite: true,
        //rtl: true
    });

    //Header currency and language selectors
    $(".header-selectors-wrapper .select-option").on('click', function () {
        $(this).next().toggleClass("active");
    });
});
var initialLeftHeight;
var initialHeaderHeight
function divShow() {
    var header = $("header");
    var topHeader = $(".header-upper");
    var bottomHeader = $(".header-lower");
    var container = $("section");
    var left = $(".picture-overview");
    var right = $(".details-overview");
    var productDetail = $(".html-product-details-page");
    // This empty variable declaration is necessary because if the slider div is not present on the page, there will be no error in the console like this https://prnt.sc/g7FXknUmE8dx
    var headerTop;
    if (topHeader.length > 0) {
        headerTop = topHeader.offset().top;
        headerHeight = topHeader.outerHeight();
    } else {
        headerTop = 0;
        headerHeight = 0;
    }

    var windowHeight = $(window).height();
    var scrollTop = $(window).scrollTop();
    var visibleTopHeader = Math.max(0, Math.min(headerTop + headerHeight, scrollTop + windowHeight) - Math.max(headerTop, scrollTop));

    if (visibleTopHeader === 0) {
        bottomHeader.addClass('fixed');
        // this is necessary for section not move up side when position fixed add
        container.css("padding-top", `${bottomHeader.outerHeight()}px`);
    }
    else {
        bottomHeader.removeClass('fixed');
        // remove css which is added on page scroll time
        container.css("padding-top", 0);
    }
    if (productDetail.length > 0) {
        /*if (initialLeftHeight === undefined) {
            initialLeftHeight = left.outerHeight();
        }*/
        if (initialHeaderHeight === undefined) {
            initialHeaderHeight = header.outerHeight();
        }
        var viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        var divOffset = right.offset().top;
        var divHeight = right.outerHeight();
        var remainingHeight = (divOffset + divHeight) - (scrollTop + windowHeight) + viewportHeight - bottomHeader.outerHeight();
        var leftFainalHeight = initialLeftHeight;
        if ((right.outerHeight() > initialLeftHeight) && (visibleTopHeader > 0)) {
            left.removeClass("active");
            left.removeClass("active");
            left.css("top", `0`);
            left.css("height", `calc(100vh - ${initialHeaderHeight}px)`);
        }
        else if ((right.outerHeight() > initialLeftHeight) && (remainingHeight > leftFainalHeight) && (visibleTopHeader === 0)) {
            left.addClass("active");
            left.removeClass("bottomactive");
            left.css("top", `${bottomHeader.outerHeight() + $(".breadcrumb-nav").outerHeight() + 40}px`);
            left.css("height", `calc(100vh - ${bottomHeader.outerHeight()}px)`);
        }
        else if ((right.outerHeight() > initialLeftHeight) && (remainingHeight <= leftFainalHeight) && (visibleTopHeader === 0)) {
            left.removeClass("active");
            left.addClass("bottomactive");
            left.css("height", `inherit`);
        }
        else {
            left.removeClass("active");
            left.removeClass("bottomactive");
            left.removeAttr('style');
        }
    }
    // product image sticky
    function updatePictureOverviewPosition() {
        const headerHeight = $('.header-lower').outerHeight();
        const breadcrumbHeight = $('.breadcrumb-nav').outerHeight();
        const combinedHeight = headerHeight + breadcrumbHeight;

        $('.picture-overview').css('top', combinedHeight + 'px');
    }
    function handleScroll() {
        if ($(window).width() >= 992) {
            updatePictureOverviewPosition();
        }
    }
    function handleResize() {
        $(window).on('resize', function () {
            if ($(window).width() >= 992) {
                updatePictureOverviewPosition();
            } else {
                $('.picture-overview').css('top', '0');
            }
        });
    }
    // Attach the scroll event handler
    if ($(window).width() >= 992) {
        $(window).on('scroll', handleScroll);
    }
    // Attach the resize event handler
    handleResize();

};
$(function () {
    divShow();
    $(window).on('scroll', divShow);
});
//  Accordion and mobile mega menu 
$(function () {
    let isSmallScreen = false;
    let footerScreen = false;
    function handleToggle() {
        const currentIsSmallScreen = $(window).width() <= 991;
        const currentFooterScreen = $(window).width() <= 767;
        // Check if screen size has changed
        if (currentIsSmallScreen !== isSmallScreen) {
            isSmallScreen = currentIsSmallScreen;

            if (isSmallScreen) {
                // Bind the click event for small screens
                $(".master-wrapper-content .block .title").on('click', function () {
                    $(this).next(".listbox").slideToggle("slow");
                });
                // Mobile mega menu Sublist 
                $(".sublist-toggle").on("click", function (event) {
                    $(this).parent(".has-sublist").addClass("active");
                });
                $(".back-btn").on("click", function (event) {
                    $(this).parent().parent(".has-sublist").removeClass("active");
                });
            }
            else {
                // Unbind the click event for larger screens
                $(".master-wrapper-content .block .title").off('click');
                $(".master-wrapper-content .block .listbox").show();  // Ensure the listbox is visible for larger screens
            }
        }
        if (currentFooterScreen !== footerScreen) {
            footerScreen = currentFooterScreen

            if (footerScreen) {
                $(".footer .block .title").on('click', function () {
                    $(this).next(".listbox").slideToggle("slow");
                });
            }
            else {
                $(".footer .block .title").off('click');
                $(".footer .block .listbox").show();
            }
        }
    }

    // Initial setup
    handleToggle();

    // Update on window resize
    $(window).on('resize', function () {
        handleToggle();
    });
});