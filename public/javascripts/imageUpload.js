// Listen for changes on the file input and start the upload process
(() => {
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
    xhr.onreadystatechange = () => {
        console.log('xhr.readyState:', xhr.readyState);
        if (xhr.readyState === 4) {
            console.log('xhr.status:', xhr.status);
            if (xhr.status === 200) {
              console.log('upload ok');
            } else {
                alert('Could not upload file.');
            }
        }
    };
    xhr.send(file);
}
