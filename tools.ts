import { Pixel } from "./types";

const imageData = (() => {
  let document = window.document;
  let canvas = <HTMLCanvasElement>document.getElementById("canvas");
  let editedCanvas = <HTMLCanvasElement>document.getElementById("canvasEdited");
  let originalCanvasContext = canvas.getContext("2d");
  let editedCanvasContext = editedCanvas.getContext("2d");

  //Generate image feauture
  let colorPalette = [];

  let img: any = new Image();
  let file;

  const onChange = (event) => {
    file = event.target.files[0];
    getBase64(file).then((data) => {
      img.src = data;
      originalCanvasContext?.drawImage(img, 0, 0);
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  img.onload = () => {
    if (originalCanvasContext) {
      originalCanvasContext.canvas.width = img.width;
      originalCanvasContext.canvas.height = img.height;
      originalCanvasContext.drawImage(img, 0, 0);
    }
  };

  const onZoomOut = (e, rate) => {
    if (!file || !originalCanvasContext) {
      console.info("ERROR: missing image");
      return;
    }

    let imageData = originalCanvasContext.getImageData(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );
    let currentImageData = imageData.data;

    for (let i = 0; i < currentImageData.length; i += 4) {
      currentImageData[i] = currentImageData[i] - 100;
      currentImageData[i + 1] = currentImageData[i + 1] - 100;
      currentImageData[i + 2] = currentImageData[i + 2] - 100;
    }
  };

  const onGenerate = (event, width, height) => {
    if (!originalCanvasContext || !editedCanvasContext) return;
    /* Initiate data*/
    //Origin image
    const imageWidth = originalCanvasContext.canvas.width;
    const imageHeight = originalCanvasContext.canvas.height;
    const cellWidth = imageWidth / width;
    const cellHeight = imageHeight / height;

    //Generated image

    /* Process data*/
    const imageData = originalCanvasContext.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
    const data = imageData.data;
    const canvasData = originalCanvasContext.canvas;

    for (let i = 0; i < data.length; i += 4) {
      // Get the RGBA values
      const r = data[i]; // Red
      const g = data[i + 1]; // Green
      const b = data[i + 2]; // Blue
      const a = data[i + 3]; // Alpha

      data[i] = 255 - r; // Invert red
      data[i + 1] = 255 - g; // Invert green
      data[i + 2] = 255 - b; // Invert blue
    }

    editedCanvas.width = imageWidth;
    editedCanvas.height = imageHeight;
    editedCanvasContext.putImageData(imageData, 0, 0);
  };

  const saveImageToLocalStorage = () => {
    localStorage.setItem("imageData", "");
  };

  const setTileWidth = (e) => {};
  const setTileHeight = (e) => {};

  return { onChange, onZoomOut, onGenerate, setTileWidth, setTileHeight };
})();
