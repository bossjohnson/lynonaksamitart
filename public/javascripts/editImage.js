$(function() {
    $('.delete, .edit, .save, .showImageInfo').hide();

    $('.edit').on('click', function() {
        $(this).hide();
        $(this).siblings('.save').show();
        $(this).parent().parent().find('.showImageInfo').show();
        // var image_id = $(this).data().imageId;
        // var xhr = new XMLHttpRequest();
        // xhr.open('post', '/admin/edit/' + image_id);
        // xhr.send();
    });

    $('.save').on('click', function() {
        $(this).hide();
        $(this).siblings('.edit').show();

        $(this).parent().parent().find('.showImageInfo').hide();
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

    // Show edit and delete on mouseover
    $('.imageContainer').on('mouseenter', function() {
        $(this).find('.delete, .edit').show();
        $(this).css('box-shadow', '2px 2px 15px black');
    });
    $('.imageContainer').on('mouseleave', function() {
        $(this).find('.delete, .edit, .save').hide();
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
