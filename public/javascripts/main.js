$(function() {
    var images = JSON.parse($('#images').val());
    var currentImageIndex = 0;
    var catShow = false;

    $('#categories').hide();
    $('.thumbnails').hide();
    $('#prev, #next').css('opacity', 0);

    // Previous and next button functionality
    $('#next').on('click', function() {
        currentImageIndex =
            currentImageIndex < images.length - 1 ?
            ++currentImageIndex :
            0;
        $('main').css('background-image', 'url(' +
            encodeUrl(images[currentImageIndex].url) +
            ')');
    });
    $('#prev').on('click', function() {
        currentImageIndex =
            currentImageIndex > 0 ?
            --currentImageIndex :
            images.length - 1;
        $('main').css('background-image', 'url(' +
            encodeUrl(images[currentImageIndex].url) +
            ')');
    });

    // Show and hide previous and next buttons on mouseover
    $('.changeImg').on('mouseenter', function() {
        $('#prev, #next').css('opacity', 1);
    });
    $('.changeImg').on('mouseleave', function() {
        $('#prev, #next').css('opacity', 0);
    });

    // Gallery functionality
    $('#gallery').on('click', function() {
        !catShow ? $('#categories').show() : $('#categories').hide();
        catShow = !catShow;
    });
    $('.category').on('click', function() {
        var imagesToShow = [];
        if ($(this).hasClass('showAll')) {
            imagesToShow = images;
        } else {
            for (var i = 0; i < images.length; i++) {
                if ($(this).text() === images[i].category_name) {
                    imagesToShow.push(images[i]);
                }
            }
        }
        $('.thumbnails').children().remove();
        $('.thumbnails').show();

        var imagesInPane = 0;
        var numPanes = 1;
        $('.thumbnails').append('<div class="pane"></div>');

        for (var i = 0; i < imagesToShow.length; i++) {
            ++imagesInPane;
            if (imagesInPane > 4) {
                imagesInPane = 0;
                numPanes++;
                $('.thumbnails').append('<div class="pane"></div>');
            }
            var image = '<img src=' + encodeUrl(imagesToShow[i].url) + '>';
            $('.thumbnails').find('.pane').last().append(image);
        }

        for (var i = 0; i < $('.pane').length; i++) {
            $('.pane').eq(i).prepend('<span class="prevPane fa fa-chevron-left fa-2x"></span>');
            $('.pane').eq(i).append('<span class="nextPane fa fa-chevron-right fa-2x"></span>');
        }
        if (numPanes === 1) {
            $('.prevPane, .nextPane').css({
                'color': 'lightgray',
                'opacity': .1
            });
        }

        $('.thumbnails').find('.pane').hide();
        $('.thumbnails').find('.pane').first().show();
        var previews = $('.thumbnails').find('img');

        $('main').addClass('faded');

        previews.on('mouseenter', function() {

            $(this).prop('oldHeight', $(this).css('height'));
            $(this).prop('oldWidth', $(this).css('width'));
            var newMaxHeight = Number($(this).css('height').split('px')[0]) + 10 + 'px';
            $(this).css({
                'max-height': newMaxHeight,
                height: '+=10px',
                width: '+=10px'
            });
        });
        previews.on('mouseleave', function() {
            $(this).css({
                'max-height': '100%',
                height: $(this).prop('oldHeight'),
                width: $(this).prop('oldWidth')
            });
        });
        previews.on('click', function() {
            $('main').removeClass('faded');
            $('main').css('background-image', 'url(' + $(this).attr('src') + ')');
            $('.thumbnails').hide();
        });
    });


});

function encodeUrl(url) {
    return url.split(' ').join('%20');
}
