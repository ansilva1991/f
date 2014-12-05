function NPC(options){
  if(options == undefined){ options = {}; }
  this.x = options.x == undefined ? 0 : options.x;
  this.y = options.y == undefined ? 0 : options.y;;
  this.h_mask = options.h_mask == undefined ? 3 : options.h_mask;
  this.v_mask = options.v_mask == undefined ? 3 : options.v_mask;
  this.monigote = new Monigote({});

  this.name = options.name == undefined ? "" : options.name;
  this.msj = options.msj == undefined ? "" : options.msj;

  this.status = "idle";
  this.behavior = options.behavior == undefined ? "idle" : options.behavior;
  this.behavior_opts = { time : 0, max_time : 50};
  this.vel = 1;
  this.path;
  this.start_point;

  this.Start = function(){

  };
  this.Update = function(){
    if( this.status == "idle" ){
      this.monigote.setAnim("idle");

      if(this.behavior == "random_walk"){
        this.behavior_opts.time += 1;
        if(this.behavior_opts.time > this.behavior_opts.max_time){
          this.behavior_opts.time = 0;
          this.walkToRandom();
        }
      }
    }
    if( this.status == "walk" ){
      this.monigote.setAnim("walk");
      if(this.path[0] != undefined){
        if(this.start_point == undefined){
          this.path[0] = [this.path[0][0] + 6, this.path[0][1] + 6];
          this.start_point = [this.x,this.y];
        }

        if(this.start_point[0] < this.path[0][0]){
          if(this.path[0][0] > this.x){ this.x += this.vel; this.monigote.left = 1; }
          if(this.x > this.path[0][0]){ this.x = this.path[0][0]; }
        }
        if(this.start_point[0] > this.path[0][0]){
          if(this.path[0][0] < this.x){ this.x -= this.vel; this.monigote.left = -1; }
          if(this.x < this.path[0][0]){ this.x = this.path[0][0]; }
        }
        if(this.start_point[1] < this.path[0][1]){
          if(this.path[0][1] > this.y){ this.y += this.vel; this.monigote.up = 0; }
          if(this.y > this.path[0][1]){ this.y = this.path[0][1]; }
        }
        if(this.start_point[1] > this.path[0][1]){
          if(this.path[0][1] < this.y){ this.y -= this.vel; this.monigote.up = 1; }
          if(this.y < this.path[0][1]){ this.y = this.path[0][1]; }
        }

        if((this.x == this.path[0][0]) && (this.y == this.path[0][1])){
          this.start_point = undefined;
          this.path.splice(0,1);
        }
      }else{
        this.status = "idle";
      }
    }
    if(this.status == "talk_box_text"){
      if((main.gameview.etapa.gui.box_text.status == "view_first_line")||(main.gameview.etapa.gui.box_text.status == "view_second_line")){
        this.monigote.setAnim("talk");
      }else{
        this.monigote.setAnim("idle");
      }
      if(!main.gameview.etapa.gui.box_text.show){
        this.status = "idle";
      }
    }
  };
  this.Draw = function(ctx){
    this.monigote.Draw(ctx,this.x,this.y);
  };
  this.walkTo = function(x,y){
    this.path = main.gameview.etapa.getPath(this,{ x : x , y : y },{ in_coords : true, except : this.id });
    this.status = "walk";
  };
  this.walkToRandom = function(){
    this.walkTo(this.x + 12 - Math.random() * 24,this.y + 12 - Math.random() * 24);
  };
  this.Active = function(){
    this.status = "talk_box_text";
    this.monigote.up = 0;
    main.gameview.etapa.gui.cancelAllClicks();
    main.gameview.etapa.gui.box_text.Open(this.name,this.msj);
  };
}