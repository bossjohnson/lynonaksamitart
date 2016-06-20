$(function() {
    $('.delete, .edit').hide();

    $('.edit').on('click', function() {
        var image_id = $(this).data().imageId;
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/edit/' + image_id);
        xhr.send();
    });

    $('.delete').on('click', function() {
        var image_id = $(this).data().imageId;
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/delete/' + image_id);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                document.location.reload();
            }
        };
        xhr.send();
    });

    $('.imageContainer').on('mouseenter', function() {
        $(this).find('.delete, .edit').show();
        $(this).css('box-shadow', '2px 2px 15px black');
    });
    $('.imageContainer').on('mouseleave', function() {
        $(this).find('.delete, .edit').hide();
        $(this).css('box-shadow', 'none');
    });

    // Click animation
    $('.delete, .edit').on('mousedown', function() {
        $(this).animate({
            'top': '+=1px',
            'left': '+=1px'
        }, 100);
    });
    $('.delete, .edit').on('mouseup', function() {
        $(this).animate({
            'top': '-=1px',
            'left': '-=1px'
        }, 100);
    });



});
