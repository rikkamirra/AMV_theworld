const paintMap = {
  restrict: 'E',
  template: require('./paintMap.html'),
  controller: PaintMapController
}


function PaintMapController() {
  this.$onInit = () => {
      this.height = 480;
      this.width = 640;

    this.canvas = document.getElementById("myCanvas");
    this.context = this.canvas.getContext('2d');

    this.start = { x: 0, y: 0 };
    this.current = { x: 0, y: 0 };

    this.canvas.onmousedown = this.onPenDown;
    this.canvas.onmouseup = this.onPenUp;
    this.canvas.onmousemove = this.onPenMove;

    this.isTouch = false;

    this.MODES = {
      'brush': 1,
      'pen': 2,
      'color': 3
    }
    this.PEN_SIZE_RANGE = [];
    for (let i = 1; i < 50; i++) {
      this.PEN_SIZE_RANGE.push(i);
    }

    this.COLORS = ["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];


    this.mode = this.MODES['brush'];
    this.interval = 2;

    this.brush = document.getElementById('mount-img');

    this.settings = {
      interval: 20,
      random: 0,
      color: 'green',
      penSize: 10
    }
  }

  this.saveImgData = () => {
    this.savedImgData = this.context.getImageData(0, 0, this.width, this.height);
  }

  this.onPenDown = (e) => {
    this.isTouch = true;
    this.start.x = this.current.x = e.offsetX;
    this.start.y = this.current.y = e.offsetY;

    this.saveImgData();

    this.context.beginPath();
  }

  this.onPenUp = (e) => {
    this.isTouch = false;
    this.current.x = e.offsetX;
    this.current.y = e.offsetY;
  }

  this.onPenMove = (e) => {
    if (this.isTouch) {
      if (this.mode == this.MODES['brush']) {
        drawBrush(e);
      } else if (this.mode == this.MODES['pen']) {
        drawPen(e);
      }
    }
  }

  this.selectBrush = (id) => {
    this.brush = document.getElementById(id);
  }

  this.fill = () => {
    this.saveImgData();
    this.context.fillStyle = this.settings.color;
    this.context.fillRect(0, 0, this.width, this.height);
  }

  this.back = () => {
    this.context.putImageData(this.savedImgData, 0, 0);
  }

  var drawBrush = (e) => {
    if (this.brush && Math.abs(this.current.x - e.offsetX) > this.settings.interval || Math.abs(this.current.y - e.offsetY) > this.settings.interval) {
      this.context.drawImage(this.brush, e.offsetX + getRandom(this.settings.random), e.offsetY + getRandom(this.settings.random));
      this.current.x = e.offsetX;
      this.current.y = e.offsetY;
    }
  }

  var drawPen = (e) => {
    if (Math.abs(e.offsetX - this.current.x) < this.settings.random && Math.abs(e.offsetY - this.current.y) < this.settings.random) {
      return;
    }

    this.context.strokeStyle = this.settings.color;

    var x = e.offsetX + getRandom(this.settings.random);
    var y = e.offsetY + getRandom(this.settings.random);

    this.context.lineWidth = this.settings.penSize;
    this.context.moveTo(this.current.x, this.current.y);
    this.context.lineTo(x, y);
    this.context.stroke();

    this.current.x = x;
    this.current.y = y;
  }

  var getRandom = (value) => {
    var max = value;
    var min = -value;
    min = Math.ceil(min);
    max = Math.floor(max);
    var r = Math.floor(Math.random() * (max - min)) + min;
    return r;
  }
}

PaintMapController.$inject = []

export default paintMap;
