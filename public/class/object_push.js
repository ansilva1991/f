function ObjectPush(options){
  this.x = options.x == undefined ? 0 : options.x;
  this.y = options.y == undefined ? 0 : options.y;

  this.h_mask = 6;
  this.v_mask = 6;

  this.bitmap = main.resources.load_resource({
    name : 'object_push_' + options.type,
    type : 'sprites',
    type_file : 'png'
  });

  this.move_to;

  this.solid = true;

  this.status = "idle";

  this.Start = function(){

  };
  this.Update = function(){
    if(this.status == "idle"){
      this.x = Math.floor(this.x / main.gameview.etapa.map.grid) * main.gameview.etapa.map.grid + main.gameview.etapa.map.grid * 0.5;
      this.y = Math.floor(this.y / main.gameview.etapa.map.grid) * main.gameview.etapa.map.grid + main.gameview.etapa.map.grid * 0.5;
    }
    if(this.status == "pushing"){
      var end = true;
      if(this.move_to == 0){
        if(this.x < this.x_start + 12){
          this.x += 1;
          end = false;
        }
      }
      if(this.move_to == 1){
        if(this.y > this.y_start - 12){
          this.y -= 1;
          end = false;
        }
      }
      if(this.move_to == 2){
        if(this.x > this.x_start - 12){
          this.x -= 1;
          end = false;
        }
      }
      if(this.move_to == 3){
        if(this.y < this.y_start + 12){
          this.y += 1;
          end = false;
        }
      }

      if(end){ this.status = "idle"; }
    }
  };
  this.Draw = function(ctx){
    ctx.drawImage(this.bitmap,this.x - 6,this.y - 18);
  };
  this.Push = function(n){
    if(this.status != "idle"){ return; }
    this.move_to = n;
    this.x_start = this.x;
    this.y_start = this.y;

    if(n == 0){
      if(main.gameview.etapa.getCollision(this.x + 12, this.y,{
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        return;
      }
    }
    if(n == 1){
      if(main.gameview.etapa.getCollision(this.x, this.y - 12,{
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        return;
      }
    }
    if(n == 2){
      if(main.gameview.etapa.getCollision(this.x - 12, this.y,{
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        return;
      }
    }
    if(n == 3){
      if(main.gameview.etapa.getCollision(this.x, this.y + 12,{
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        return;
      }
    }
    this.status = "pushing";
  }
}