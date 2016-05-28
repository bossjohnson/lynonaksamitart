$(function() {

    randomImage();
    $('#imgPlacement').hide();

    $('.thumbnail').on('mouseenter', function() {
        $(this).animate({
            top: '-=10px',
            height: '+=20px',
            width: '+=20px'
        }, 100);
    });

    $('.thumbnail').on('mouseleave', function() {
        $(this).animate({
            top: '+=10px',
            height: '-=20px',
            width: '-=20px'
        }, 100);
    });

    $('.thumbnail').on('click', function() {
        $('header, footer, main').css('opacity', '.2');
        $('.current').attr('src', $(this).attr('src'));
        $('#imgPlacement').show();

    });

    $('.current').on('click', function() {
        $('#imgPlacement').hide();
        $('header, footer, main').css('opacity', '1');
    });

    window.setInterval(randomImage, 7000);
});

// ================
// Helper Functions
// ================

function randomImage() {
    var randNum = Math.floor(Math.random() * $('.thumbnail').length);
    var url = $('.thumbnail')[randNum].src;
    console.log(url);
    $('main').css('background-image', 'url(' + url + ')');
}
