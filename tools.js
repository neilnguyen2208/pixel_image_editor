const imageData = (() => {
    var document = window.document;
    var canvas = document.getElementById('canvas');
    var canvasEdited = document.getElementById('canvasEdited');
    var ctx = canvas.getContext('2d');

    var img = new Image();
    var file;

    onChange = (event) => {
        this.file = event.target.files[0]
        getBase64(this.file).then(
            data => {
                img.src = data;
                ctx.drawImage(img, 0, 0)
            })
    }

    getBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    img.onload = () => {
        ctx.canvas.width = img.width;
        ctx.canvas.height = img.height;
        ctx.drawImage(img, 0, 0)
    }

    onZoomOut = (e, rate) => {
        if (!this.file) {
            console.info('ERROR: missing image');
            return;
        }

        var imageData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
        var currentImageData = imageData.data;

        for (var i = 0; i < currentImageData.length; i += 4) {
            currentImageData[i] = currentImageData[i] - 100;
            currentImageData[i + 1] = currentImageData[i + 1] - 100;
            currentImageData[i + 2] = currentImageData[i + 2] - 100;
        }

        console.info('INFO: currentImageData', currentImageData);
    }

    // var imageData = ctx.getImageData(0, 0, window.innerWidth, window.innerHeight);
    // var currentImageData = imageData.data;

    // console.info('INFO: image', image);

    // for (var i = 0; i < currentImageData.length; i += 4) {
    //     currentImageData[i] = currentImageData[i] - 100;
    //     currentImageData[i + 1] = currentImageData[i + 1] - 100;
    //     currentImageData[i + 2] = currentImageData[i + 2] - 100;
    // }

    // var ctxEdited = canvasEdited.getContext('2d');
    // ctxEdited.putImageData(imageData, 0, 0);
    // }

    // 
    // var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    // var currentImageData = imageData.data;
    // for (var i = 0; i < currentImageData.length; i += 4) {
    //     currentImageData[i] = currentImageData[i] - 100;
    //     currentImageData[i + 1] = currentImageData[i + 1] - 100;
    //     currentImageData[i + 2] = currentImageData[i + 2] - 100;
    // }

    // var ctxEdited = canvasEdited.getContext('2d');
    // ctxEdited.putImageData(imageData, 0, 0);

    // function getPixel(imgData, index) {
    //     var i = index * 4, d = imgData.data;
    //     return [d[i], d[i + 1], d[i + 2], d[i + 3]] // [R,G,B,A]
    // }

    // function getPixelXY(imgData, x, y) {
    //     return getPixel(imgData, y * imgData.width + x);
    // }

    // function setPixel(imgData, index, r, g, b, a) {
    //     var i = index * 4, d = imgData.data;
    //     d[i] = r;
    //     d[i + 1] = g;
    //     d[i + 2] = b;
    //     d[i + 3] = a;
    // }

    // function setPixelXY(imgData, x, y, r, g, b, a) {
    //     return setPixel(imgData, y * imgData.width + x, r, g, b, a);
    // }

    onGenerate = (event, width, height) => {

    }

    return { onChange, onZoomOut, onGenerate }
})()
