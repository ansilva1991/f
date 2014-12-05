function EtapaLoading(){

  this.monigote_loading = new Monigote({});
  this.text = new Text({ font : 'freepixel', align : 'center' });

  this.total_resources_load = 0;
  this.total_loaded_resources = 0;

  this.Start = function(){
    var resources = [
      { name : 'ans',
        type : 'images',
        type_file : 'png' }
    ];
    this.total_resources_load = resources.length;

    var scale = Math.floor(main.canvas.height * 0.01);
    if(scale > 6){ scale = 6; }

    this.text.setSize(scale);
    this.text.setText("100.00%");

    this.monigote_loading.total_scale = scale;
    this.monigote_loading.setAnim("walk");

    for(var i = 0; i < resources.length; i++){
      main.resources.load_resource({
        name : resources[i].name,
        type : resources[i].type,
        type_file : resources[i].type_file,
        callback : function(){
          main.gameview.etapa.total_loaded_resources ++;
          var perc = main.gameview.etapa.total_loaded_resources * 100 / main.gameview.etapa.total_resources_load;
          main.gameview.etapa.text.setText(perc.toFixed(2) + "%");
          if(perc == 100){
            setTimeout(function(){
              main.gameview.changeEtapa('game');
            },100);
          }
        }
      });
    }
  };
  this.Update = function(){

  };
  this.Draw = function(ctx){
    var center_x = main.canvas.width * 0.5;
    var center_y = main.canvas.height * 0.5;

    this.monigote_loading.Draw(ctx,center_x,center_y);
    this.text.Draw(ctx,center_x,center_y + 12);
  }
}