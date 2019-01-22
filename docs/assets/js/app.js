// Initialise FlexSlider for Carousels
$(window).load(function() {
    $('.flexslider').flexslider({
        animation: "slide",
        directionNav: true,
        slideshowSpeed: 5000,
        animationSpeed: 600,
        touch: true,
        itemHeight: 200,
        prevText: "",
        nextText: "",
    });
});
