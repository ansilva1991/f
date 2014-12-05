function Resources(){
  this.images = new Object();
  this.sprites = new Object();
  this.fonts = new Object();
  this.tiles = new Object();
  this.gui = new Object();
  this.total_resources = 0;
  this.loaded_resources = 0;

  this.load_resource = function(info){
    if(info.callback == undefined){
      info.callback = function(){};
    }
    if(this[info.type][info.name] == undefined){
      if(info.type_file == 'png'){
        var tmp = new Image();
        tmp.onload = function(a){
          var name = tmp.src.split('/').reverse()[0].split('.')[0];
          var type_file =tmp.src.split('/').reverse()[0].split('.')[1].split('?')[0];
          info.callback(name,type_file);
        }
      }
      tmp.src = 'files/' + info.type + '/' + info.name + "." + info.type_file + "?" + assets_version;

      this[info.type][info.name] = tmp;
      this.total_resources++;
      this.loaded_resources++;
    }

    return this[info.type][info.name];
  };
}