function ObjectsList(){
  this.objects = {};
  this.objects_x_class = {};

  this.Start_all = function(){
    for(var i in this.objects){
      this.objects[i].Start();
    }
  };
  this.Update_all = function(){
    for(var i in this.objects){
      this.objects[i].Update();
    }
  }
  this.Draw_all = function(ctx){
    var depths = {};

    for(var i in this.objects){
      if(depths[this.objects[i].y] == undefined){
        depths[this.objects[i].y] = [];
      }
      depths[this.objects[i].y].push(this.objects[i])
    }
    var depths_keys = Object.keys(depths).sort();
    for(var index in depths_keys){
      for(var i = 0; i < depths[depths_keys[index]].length; i++){
        depths[depths_keys[index]][i].Draw(ctx);
      }
    }
  };
  this.add = function(o){
    var id = Object.keys(this.objects).length;
    this.objects[id] = o;
    if(this.objects_x_class[o.constructor.name] == undefined){
      this.objects_x_class[o.constructor.name] = {};
      this.defineSortForm(o.constructor.name);
    }
    this.objects_x_class[o.constructor.name][id] = this.objects[id];
    o.id = id;
  }
  this.get = function(id){
    return this.objects[id];
  };
  this.remove = function(o){
    delete this.objects_x_class[o.constructor.name][o.id];
    delete this.objects[o.id];
  };
  this.remove_by_id = function(id){
    delete this.objects_x_class[this.objects[id].constructor.name][id];
    delete this.objects[id];
  };
  this.distanceTo = function(o,d){
    return Math.sqrt(Math.pow(d.x - o.x,2) + Math.pow(d.y - o.y,2));
  };
  this.defineSortForm = function(klass){
    this[klass.toLowerCase() + 's'] = this.objects_x_class[klass];
  };
  this.setInMask = function(mask,options){
    var tmp_mask = [];
    for(var i = 0; i < mask.length; i++){
      tmp_mask.push(mask[i].slice(0));
    }
    for(var i in this.objects){
      if(options.except != undefined){
        if(this.objects[i].id == options.except){ continue; }
      }

      if(!this.objects[i].solid){ continue; }

      var x = Math.floor(this.objects[i].x / main.gameview.etapa.map.grid);
      var y = Math.floor(this.objects[i].y / main.gameview.etapa.map.grid);

      tmp_mask[y][x] = 1;
    };
    return tmp_mask;
  };
  this.getCollision = function(x,y,options){

    for(var i in this.objects){
      if(options.except != undefined){
        if(this.objects[i].id == options.except){ continue; }
      }
      if(!this.objects[i].solid){ continue; }

      var x1 = this.objects[i].x - this.objects[i].h_mask;
      var y1 = this.objects[i].y - this.objects[i].v_mask;
      var x2 = this.objects[i].x + this.objects[i].h_mask;
      var y2 = this.objects[i].y + this.objects[i].v_mask;

      var x3 = x - options.h_mask;
      var y3 = y - options.v_mask;
      var x4 = x + options.h_mask;
      var y4 = y + options.v_mask;

      if((x2 > x3) && (x1 < x4) && (y1 < y4) && (y2 > y3)){
        return true;
      }
    };
    return false;
  };
  this.inArea = function(x,y,size){
    var list = { types : {}, objects : []};

    for(var i in this.objects){
      if((x - size <= this.objects[i].x) && (x + size >= this.objects[i].x) && (y - size <= this.objects[i].y) && (y + size >= this.objects[i].y)){
        list.objects.push(this.objects[i]);
        if(list.types[this.objects[i].constructor.name] == undefined){
          list.types[this.objects[i].constructor.name] = [];
        }
        list.types[this.objects[i].constructor.name].push(this.objects[i]);
      }
    };
    return list;
  };
  this.clearAll = function(options){
    for(var i in this.objects){
      if(options.except != undefined){
        if(options.except == i){ continue; }
      }
      this.remove(this.objects[i]);
    }
  }
}