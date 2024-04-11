document.addEventListener("DOMContentLoaded", function() {
    const canvas = document.getElementById("main");
    const context = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let direction = true;
    let brushSize = 10;
    let isErasing = false;
    let selectedColor = "black";
  
    function draw(e) {
      if (!isDrawing) return; 
      if (isErasing) {
        context.strokeStyle = "white";
      } else {
        context.strokeStyle = selectedColor;
      }
      context.lineWidth = brushSize;
      context.lineJoin = "round";
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(lastX, lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];
      if (!isErasing) {
        hue++;
        if (hue >= 360) {
          hue = 0;
        }
        if (context.lineWidth >= 100 || context.lineWidth <= 1) {
          direction = !direction;
        }
        if (direction) {
          context.lineWidth++;
        } else {
          context.lineWidth--;
        }
      }
    }
  
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });
  
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", () => (isDrawing = false));
    canvas.addEventListener("mouseout", () => (isDrawing = false));
  
    const newButton = document.getElementById("new");
    const eraseButton = document.getElementById("erase");
    const blackButton = document.getElementById("black");
    const pinkButton = document.getElementById("pink");
    const blueButton = document.getElementById("blue");
    const yellowButton = document.getElementById("yellow");
    const slider = document.getElementById("slider");
    const brushSizeDisplay = document.getElementById("brushSize");
  
    function setBrushColor(color) {
      isErasing = false;
      selectedColor = color;
    }
  
    function clearCanvas() {
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    function erase() {
      isErasing = true;
    }
  
    function changeBrushSize() {
      brushSize = this.value;
      brushSizeDisplay.textContent = brushSize;
    }
  
    newButton.addEventListener("click", clearCanvas);
    eraseButton.addEventListener("click", erase);
    blackButton.addEventListener("click", () => setBrushColor("black"));
    pinkButton.addEventListener("click", () => setBrushColor("#F50057"));
    blueButton.addEventListener("click", () => setBrushColor("#2979FF"));
    yellowButton.addEventListener("click", () => setBrushColor("#FFD600"));
    slider.addEventListener("change", changeBrushSize);
  });
  