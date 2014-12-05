function EtapaGame(){

  this.map = new Map();
  this.gui = new GUI();
  this.objects = new ObjectsList();

  this.change_map_peding = -1;

  this.Start = function(){
    main.gameview.fillStyle = "#000";
    this.total_scale = Math.round(main.canvas.height * 0.01);


    this.objects.add( new Player());
    this.objects.Start_all();

    this.map.scale = this.total_scale;
    this.map.center_object = this.objects.players[0];
    this.map.changeMap(0);

    this.gui.scale = this.total_scale;
    this.gui.Start();

    main.gameview.inputs_enabled = true;
  };
  this.Update = function(){
    this.objects.Update_all();
    this.map.Update();
    this.gui.Update();
    if(this.change_map_peding != -1){
      this.map.changeMap(this.change_map_peding);
      this.change_map_peding = -1;
      this.Update();
    }
  };
  this.Draw = function(ctx){
    this.map.Draw(ctx);
    this.gui.Draw(ctx);
  };
  this.Mouseclick = function(identifier,x,y){
    if(!this.gui.Mouseclick(identifier, x, y)){

    }
  };
  this.Mousemove = function(identifier,x,y){
    if(!this.gui.Mousemove(identifier, x, y)){

    }
  };
  this.Mousecancel = function(identifier){
    this.gui.Mousecancel(identifier);
  };
  this.getCollision = function(x,y,options){
    options = options == undefined ? {} : options;
    if(!this.map.getCollision(x,y,options)){
      if(!this.objects.getCollision(x,y,options)){
        return false;
      }
    }
    return true;
  };
  this.getPath = function(o,d,options){
    if(options == undefined){ options = {}; }
    var finder = new PF.AStarFinder({
      allowDiagonal: options.allowDiagonal == undefined ? true : options.allowDiagonal,
      dontCrossCorners: options.dontCrossCorners == undefined ? true : options.dontCrossCorners
    });

    var from = [ Math.floor(o.x/this.map.grid), Math.floor(o.y/this.map.grid) ];
    var to = [ Math.floor(d.x/this.map.grid), Math.floor(d.y/this.map.grid) ];

    if(from[0] < 0){ from[0] = 0; }
    if(from[1] < 0){ from[1] = 0; }
    if(from[0] > this.map.width - 1){ from[0] = this.map.width -1; }
    if(from[1] > this.map.height - 1){ from[1] = this.map.height -1; }

    if(to[0] < 0){ to[0] = 0; }
    if(to[1] < 0){ to[1] = 0; }
    if(to[0] > this.map.width - 1){ to[0] = this.map.width -1; }
    if(to[1] > this.map.height - 1){ to[1] = this.map.height -1; }

    var grid = new PF.Grid(this.map.width,this.map.height, this.objects.setInMask(this.map.static_mask,options));

    var path = finder.findPath(from[0], from[1],to[0] ,to[1], grid);

    if(options.in_coords){
      for(var i = 0; i < path.length; i++){
        path[i] = [ path[i][0] * this.map.grid, path[i][1] * this.map.grid ];
      };
    }

    if(options.get_first == undefined){
      path.splice(0,1);
    }
    return path;
  }
};