function Main()
{
  this.canvas;
  this.ctx;

  this.gameview = new GameView();
  this.resources = new Resources();

  this.Start = function(){
    Cocoon.Utils.setAntialias(false);

    this.canvas = document.createElement("canvas");
    this.canvas.imageSmoothingEnabled = false;
    this.canvas.style.cssText="idtkscale:Absolute;";  // CocoonJS extension

    document.body.appendChild(this.canvas);

    this.canvas.addEventListener('touchstart',this.processInput,false);
    this.canvas.addEventListener('touchmove',this.processInput,false);
    this.canvas.addEventListener('touchend',this.processInput,false);
    this.canvas.addEventListener('touchcancel',this.processInput,false);

    this.ctx = this.canvas.getContext('2d',true);
    this.resize();
    this.ctx.fillStyle = "#fff";
    this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

    this.gameview.Start();
  };
  this.processInput = function(e){
    e.preventDefault();
    var identifier = e.changedTouches[0].identifier;
    var type = e.type;
    var x = e.changedTouches[0].clientX;
    var y = e.changedTouches[0].clientY;
    console.log(type);
    if(type == 'touchstart')
    {
      main.gameview.Mouseclick(identifier, x, y);
    }
    if(type == 'touchmove')
    {
      main.gameview.Mousemove(identifier, x, y);
    }
    if(type == 'touchend')
    {
      main.gameview.Mousecancel(identifier);
    }
  };
  this.resize = function(){
    this.canvas.width = Math.round(window.innerWidth/12)*12;
    this.canvas.height = Math.round(window.innerHeight/12)*12;
    this.ctx.imageSmoothingEnabled = false;
  };
}