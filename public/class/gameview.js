function GameView()
{
  this.etapa;
  this.fillStyle = "#fff";

  this.inputs_enabled = false;

  this.loop = new GameLoop(function(){
    main.gameview.Update();
  });

  this.Start = function(){
    this.changeEtapa('loading');
    this.loop.Start();
  };
  this.Update = function(){
    this.etapa.Update();
    this.Draw();
  };
  this.Draw = function(){
    main.ctx.fillStyle = this.fillStyle;
    main.ctx.fillRect( 0, 0, main.canvas.width, main.canvas.height );
    this.etapa.Draw(main.ctx);
  };
  this.changeEtapa = function(n){
    this.fillStyle = "#fff";
    this.inputs_enabled = false;
    switch(n){
      case 'loading':
        this.etapa = new EtapaLoading();
      break;
      case 'game':
        this.etapa = new EtapaGame();
      break;
    }
    this.etapa.Start();
  };
  this.Mouseclick = function(identifier,x,y){
    if(!this.inputs_enabled){ return; }
    if(main.gameview.etapa.constructor.name == 'EtapaGame'){
      this.etapa.Mouseclick(identifier, x, y);
    }
  };
  this.Mousemove = function(identifier,x,y){
    if(!this.inputs_enabled){ return; }
    if(main.gameview.etapa.constructor.name == 'EtapaGame'){
      this.etapa.Mousemove(identifier, x, y);
    }
  };
  this.Mousecancel = function(identifier){
    if(!this.inputs_enabled){ return; }
    if(main.gameview.etapa.constructor.name == 'EtapaGame'){
      this.etapa.Mousecancel(identifier);
    }
  };
}