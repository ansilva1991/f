function GameLoop(loop_actions){

  this.loop_actions = loop_actions;
  this.last_loop = 0;
  this.stop = false;
  this.speed = 1;

  this.Start = function(){
    this.repeat();
  }
  this.Stop = function(){
    this.stop = true;
  }
  this.repeat = function(){
    var d = new Date();
    var dif = d.getTime() - main.gameview.loop.last_loop;

    if(dif >= (1000/(30 * main.gameview.loop.speed))-1){
      main.gameview.loop.last_loop = d.getTime();
      main.gameview.loop.loop_actions();
    }
    if(!main.gameview.loop.stop){
      requestAnimationFrame(main.gameview.loop.repeat);
    }
  }
}