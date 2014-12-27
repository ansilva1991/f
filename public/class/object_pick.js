function ObjectPick(options){
  this.x = options.x == undefined ? 0 : options.x;
  this.y = options.y == undefined ? 0 : options.y;

  this.h_mask = 6;
  this.v_mask = 6;

  this.bitmap = main.resources.load_resource({
    name : 'object_pick_' + options.type,
    type : 'sprites',
    type_file : 'png'
  });

  this.offset_y = 0;

  this.max_offset_y = 20;
  this.max_max_offset_y = 20;
  this.throw_dir = 0;
  this.throw_vel = 5;
  this.throw_v_vel = 0;
  this.throw_gravity = 0.5;

  this.solid = true;

  this.status = "idle";

  this.Start = function(){

  };
  this.Update = function(){
    if(this.status == "idle"){
      this.x = Math.floor(this.x / main.gameview.etapa.map.grid) * main.gameview.etapa.map.grid + main.gameview.etapa.map.grid * 0.5;
      this.y = Math.floor(this.y / main.gameview.etapa.map.grid) * main.gameview.etapa.map.grid + main.gameview.etapa.map.grid * 0.5;

      if(this.offset_y > 0){
        this.offset_y -= 4;
      }
      if(this.offset_y < 0){
        this.offset_y = 0;
      }
    }
    if(this.status == "init_pick"){

      if(this.offset_y < this.max_offset_y * 1.25 ){
        this.offset_y += 4;
      }
      else{
        this.status = "init_pick_b";
      }
    }
    if(this.status == "init_pick_b"){
      this.x -= (this.x - main.gameview.etapa.objects.players[0].x) * 0.5;
      this.y -= (this.y - main.gameview.etapa.objects.players[0].y) * 0.5;

      if(this.offset_y > this.max_max_offset_y){
        this.offset_y -= 2;
      }
      else{
        if(Math.pow(this.x - main.gameview.etapa.objects.players[0].x,2) < 1){
          this.status = "pick";
        }
      }
    }
    if(this.status == "pick"){
      this.x = main.gameview.etapa.objects.players[0].x;
      this.y = main.gameview.etapa.objects.players[0].y;
      this.offset_y = this.max_max_offset_y;
    }
    if(this.status == "throw"){
      if(this.throw_dir == 0){
        this.x += this.throw_vel;
      }
      if(this.throw_dir == 1){
        this.y -= this.throw_vel;
      }
      if(this.throw_dir == 2){
        this.x -= this.throw_vel;
      }
      if(this.throw_dir == 3){
        this.y += this.throw_vel;
      }

      this.offset_y += this.throw_v_vel;
      this.throw_v_vel -= this.throw_gravity;

      if(this.offset_y < 0){
        this.offset_y = 0;
        this.status = "idle";
        this.solid = true;
      }
    }
  };
  this.Draw = function(ctx){
    ctx.drawImage(this.bitmap,this.x - 6,this.y - 18 - this.offset_y);
  };
  this.Pick = function(){
    this.max_offset_y = this.max_max_offset_y;
    if(main.gameview.etapa.objects.players[0].y > this.y){
      this.max_offset_y = this.max_max_offset_y * 0.5;
    }
    this.solid = false;
    this.status = "init_pick";
  };
  this.Drop = function(dir){
    if(dir == 0){
      this.x = main.gameview.etapa.objects.players[0].x + 12;
    }
    if(dir == 1){
      this.y = main.gameview.etapa.objects.players[0].y - 12;
    }
    if(dir == 2){
      this.x = main.gameview.etapa.objects.players[0].x - 12;
    }
    if(dir == 3){
      this.y = main.gameview.etapa.objects.players[0].y + 12;
    }

    this.status = "idle";
    this.solid = true;
  };
  this.Throw = function(dir){
    this.throw_dir = dir;
    this.throw_v_vel = 2;
    this.status = "throw";
  };
}