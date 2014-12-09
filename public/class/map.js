function Map(){
  this.tile_set = main.resources.load_resource({
    name : 'tiles_1',
    type : 'tiles',
    type_file : 'png'
  });
  this.floor_tiles;
  this.static_mask;
  this.width = 0;
  this.height = 0;

  this.center_x = 0;
  this.center_y = 0;
  this.center_object = undefined;

  this.render_ratio_h = 25;
  this.render_ratio_v = 13;
  this.light_ratio = 600;
  this.grid = 12;
  this.scale = 4;
  this.Update = function(){
    if(this.center_object != undefined){
      if(this.distanceTo([this.center_x,this.center_y],[this.center_object.x,this.center_object.y]) > 2){
        this.center_x -= (this.center_x - this.center_object.x) * 0.1;
        this.center_y -= (this.center_y - this.center_object.y) * 0.1;
      }else{
        this.center_x = this.center_object.x;
        this.center_y = this.center_object.y;
      }
    }
    this.center_x = Math.round(this.center_x);
    this.center_y = Math.round(this.center_y);
  };
  this.Draw = function(ctx){
    var init_h = this.center_x/this.grid - (this.render_ratio_h * 0.5);
    var init_v = this.center_y/this.grid - (this.render_ratio_v * 0.5);
    if(init_h < 0){ init_h = 0; }
    if(init_v < 0){ init_v = 0; }

    var end_h =  init_h + this.render_ratio_h;
    var end_v = init_v + this.render_ratio_v;

    if(end_h > this.width - 1){
      end_h = this.width - 1;
      init_h = end_h - this.render_ratio_h;
    }
    if(end_v > this.height - 1){
      end_v = this.height - 1;
      init_v = end_v - this.render_ratio_v;
    }

    if(init_h < 0){ init_h = 0; }
    if(init_v < 0){ init_v = 0; }

    var center_x_ctx = main.canvas.width * (0.5/this.scale);
    var center_y_ctx = main.canvas.height * (0.5/this.scale);

    ctx.save();
      ctx.scale(this.scale,this.scale);
      ctx.translate( center_x_ctx - this.center_x, center_y_ctx - this.center_y );
      /**Floor Tiles**/
      for(var i = Math.floor(init_h); i <= Math.ceil(end_h); i++){
        for(var j = Math.floor(init_v); j <= Math.ceil(end_v);j++){
          var x = i*this.grid;
          var y = j*this.grid;
          var distance = main.gameview.etapa.objects.distanceTo( { x : x, y : y }, main.gameview.etapa.objects.players[0] )/16;
          if(distance <= this.light_ratio){
            var x_tile = this.floor_tiles[i][j] - Math.floor(this.floor_tiles[i][j] / 10) * 10;
            var y_tile = Math.floor(this.floor_tiles[i][j] / 10);

            ctx.drawImage(this.tile_set,x_tile * this.grid,y_tile * this.grid,this.grid,this.grid,x,y,this.grid,this.grid);
          }
        }
      }
      /**Objects**/
      main.gameview.etapa.objects.Draw_all(ctx);
      /**Light View**/
      for(var i = Math.floor(init_h); i <= Math.ceil(end_h); i++){
        for(var j = Math.floor(init_v); j <= Math.ceil(end_v);j++){
          var x = i*this.grid;
          var y = j*this.grid;
          var distance = main.gameview.etapa.objects.distanceTo( { x : x, y : y }, main.gameview.etapa.objects.players[0] )/16;
          if(distance > this.light_ratio * 0.75){
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(x,y,this.grid,this.grid);
          }
          if(distance > this.light_ratio){
            ctx.fillStyle = "#000";
            ctx.fillRect(x,y,this.grid,this.grid);
          }
        }
      }
      ctx.fillStyle = "#ff0000";
      //ctx.fillRect(this.center_x-2,this.center_y-2,4,4);
    ctx.restore();
    //main.loop.Stop();
  };
  this.leftClick = function(x,y){

  };
  this.rightClick = function(x,y){
    var xx = x/this.scale - this.getTranslated()[0];
    var yy = y/this.scale - this.getTranslated()[1];

    main.gamemotor.survivor_selected.walkTo(xx,yy);
  };
  this.distanceTo = function(o,d){
    return Math.sqrt(Math.pow(d[0] - o[0],2) + Math.pow(d[1] - o[1],2));
  };
  this.getCollision = function(x,y,options){
    var xx = Math.floor(x/this.grid);
    var yy = Math.floor(y/this.grid);

    if(xx < 0) return true;
    if(yy < 0) return true;
    if(xx > this.static_mask[0].length - 1) return true;
    if(yy > this.static_mask.length - 1) return true;

    return this.static_mask[yy][xx] == 1 ? true : false;
  };
  this.getPathGrid = function(opt){
    var tmp = main.gamemotor.objects.setInMask(this.static_mask,['Survivor'],opt);
    return new PF.Grid(this.width * 3,this.height * 3, tmp);
  };
  this.changeMap = function(n){
    this.floor_tiles = data_maps[n].floor_tiles;
    this.static_mask = data_maps[n].static_mask;

    main.gameview.etapa.objects.clearAll({ except : 0 });
    for(var i = 0; i < data_maps[n].objects.length; i++){
      main.gameview.etapa.objects.add(new data_maps[n].objects[i].type(data_maps[n].objects[i].options));
    }

    this.width = this.floor_tiles.length;
    this.height = this.floor_tiles[0].length;
  }
}