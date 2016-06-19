// Listen for changes on the file input and start the upload process
(() => {
    document.getElementById('progressBar').style.display = 'none';
    document.getElementById('upload').addEventListener('click', (e) => {
        e.preventDefault();

        var files = document.getElementById('file-input').files;
        var file = files[0];
        if (file == null) {
            return alert('No file selected.');
        }
        getSignedRequest(file);
    });
})();

// Retrieve a signed request
function getSignedRequest(file) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `/admin/sign-s3?fileName=${file.name}&fileType=${file.type}`);
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                uploadFile(file, response.signedRequest, response.url);
            } else {
                alert('Could not get signed URL.');
            }
        }
    };
    xhr.send();
}

// Upload the file
function uploadFile(file, signedRequest, url) {
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', signedRequest);
    xhr.upload.addEventListener('progress', (prog) => {
        var uploadProgress = Math.floor(prog.loaded / prog.total * 100) + '%';
        document.getElementById('progressBar').children[0].style.width = uploadProgress;
        document.getElementById('progressBar').children[1].innerText = uploadProgress;

    });
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('upload complete');
                document.getElementById('progressBar').style.display = 'none';
                var saveToDB = new XMLHttpRequest();
                var title = 'Bob';
                var category = 1;
                saveToDB.open('post', `/admin/upload?title=${title}&filename=${file.name}&category=${category}`);
                saveToDB.send();
                document.location.reload();
            } else {
                alert('Could not upload file.');
            }
        }
    };
    document.getElementById('progressBar').style.display = 'initial';
    xhr.send(file);
}
