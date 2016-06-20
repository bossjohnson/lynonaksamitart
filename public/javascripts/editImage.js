$(function() {
    $('.delete, .edit').hide();

    $('.title').on('click', function() {
        var xhr = new XMLHttpRequest();
        xhr.open('post', '/admin/edit');
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
    });
    $('.imageContainer').on('mouseleave', function() {
        $(this).find('.delete, .edit').hide();
    });

});
