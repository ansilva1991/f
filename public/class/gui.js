function GUI(){

  this.scale = 1;
  this.box_text = new BoxText();
  this.elements = [];

  this.gamePad;
  this.buttonA;
  this.buttonB;

  this.Start = function(){
    this.elements.push(new GUI_GamePad());
    this.gamePad = this.elements[this.elements.length - 1];

    this.elements.push(new GUI_GameButtonA());
    this.buttonA = this.elements[this.elements.length - 1];

    this.elements.push(new GUI_GameButtonB());
    this.buttonB = this.elements[this.elements.length - 1];

    for(var index in this.elements){
      this.elements[index].Start();
    }
    this.box_text.scale = this.scale;
    this.box_text.Start();

  };

  this.Update = function(){
    for(var index in this.elements){
      this.elements[index].Update();
    }
    this.box_text.Update();
  };

  this.Draw = function(ctx){
    ctx.save();
      ctx.scale(this.scale,this.scale);
      if(!this.box_text.show){
        for(var index in this.elements){
          this.elements[index].Draw(ctx);
        }
      }
      this.box_text.Draw(ctx);
    ctx.restore();
  };

  this.convertClick = function(x,y){
    var x = x / this.scale;
    var y = y / this.scale;

    return { x : x , y : y };
  };
  this.ifIn = function(c,e,offset){
    if((c.x > e.x - offset)&&(c.x < e.x + e.width + offset)&&(c.y > e.y - offset)&&(c.y < e.y + e.height + offset)){
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  };
  this.Mouseclick = function(identifier,x,y){
    if(this.box_text.Click()){
      return true;
    }
    if(this.box_text.show){ return false; }
    var c = this.convertClick(x,y);
    for(var index in this.elements){
      if(this.ifIn( c , this.elements[index] , 0 )){
        this.elements[index].Click(identifier,c.x,c.y);
        return true;
      }
    };
    return false;
  };
  this.Mousemove = function(identifier,x,y){
    if(this.box_text.show){ return false; }
    for(var index in this.elements){
      var c = this.convertClick(x,y);
      this.elements[index].ClickMove(identifier,c.x,c.y);
    }
    return false;
  };
  this.Mousecancel = function(identifier){
    for(var index in this.elements){
      this.elements[index].ClickCancel(identifier);
    }
  };
  this.cancelAllClicks = function(){
    for(var index in this.elements){
      this.elements[index].forceCancelClick();
    }
  };
}
function GUI_GamePad(){
  this.x = 0;
  this.y = 0;
  this.origin_x = -1;
  this.origin_y = -1;
  this.width = -1;
  this.height = -1;

  this.x_offset = 0;
  this.y_offset = 0;

  this.bitmap = main.resources.load_resource({
    name : 'game_pad',
    type : 'gui',
    type_file : 'png',
  });
  this.bitmap_back = main.resources.load_resource({
    name : 'game_pad_back',
    type : 'gui',
    type_file : 'png',
  });
  this.x_start_click = -1;
  this.y_start_click = -1;
  this.identifier_click = -1;

  this.Start = function(){
    this.y = (main.canvas.height / main.gameview.etapa.gui.scale) * 0.7;
  };
  this.Update = function(){
    if((this.width == -1) && (this.bitmap.width > 0)){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;
      this.x = (main.canvas.height / main.gameview.etapa.gui.scale) - this.y - this.height;
    }
  };
  this.Draw = function(ctx){
    ctx.drawImage(this.bitmap_back,this.x + 2.5,this.y + 2.5);
    ctx.drawImage(this.bitmap,this.x + this.x_offset,this.y + this.y_offset);
  };
  this.Click = function(identifier,x,y){
    if(this.identifier_click == -1){
      this.identifier_click = identifier;
      this.x_start_click = x;
      this.y_start_click = y;
    }
  };
  this.ClickMove = function(identifier,x,y){
    var offset = 4;
    var offset_b = 7;
    if(this.identifier_click == identifier){
      var x_axis = x - this.x_start_click;
      var y_axis = y - this.y_start_click;

      this.x_offset = 0;
      if(x_axis > offset_b){ this.x_offset = offset; }
      if(x_axis < -offset_b){ this.x_offset = -offset; }

      this.y_offset = 0;
      if(y_axis > offset_b){ this.y_offset = offset; }
      if(y_axis < -offset_b){ this.y_offset = -offset; }

      main.gameview.etapa.objects.players[0].gamePad(Math.sign(this.x_offset),Math.sign(this.y_offset));
    }
  };
  this.ClickCancel = function(identifier){
    if(this.identifier_click == identifier){
      this.identifier_click = -1;
      this.x_offset = 0;
      this.y_offset = 0;

      main.gameview.etapa.objects.players[0].gamePad(0,0);
    }
  };
  this.forceCancelClick = function(){
    this.identifier_click = -1;
    this.x_offset = 0;
    this.y_offset = 0;

    main.gameview.etapa.objects.players[0].gamePad(0,0);
  }
}
function GUI_GameButtonA(){
  this.x = 0;
  this.y = 0;
  this.width = -1;
  this.height = -1;

  this.bitmap = main.resources.load_resource({
    name : 'button_a',
    type : 'gui',
    type_file : 'png',
  });
  this.bitmap_actions = main.resources.load_resource({
    name : 'button_a_actions',
    type : 'gui',
    type_file : 'png',
  });
  this.x_start_click = -1;
  this.y_start_click = -1;
  this.identifier_click = -1;
  this.time_click = 0;

  this.current_action = 0;

  this.Start = function(){
  };
  this.Update = function(){
    if((this.width == -1) && (this.bitmap.width > 0)){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;

      this.x = (main.canvas.width / main.gameview.etapa.gui.scale) - this.width * 2.5;
      this.y = (main.canvas.height / main.gameview.etapa.gui.scale) - this.height * 1.5;
    }
  };
  this.Draw = function(ctx){
    ctx.drawImage(this.bitmap,this.x, this.y);
    ctx.drawImage(this.bitmap_actions,15 * this.current_action,0,15,15,this.x, this.y,15,15);
  };
  this.Click = function(identifier,x,y){
    if(this.identifier_click == -1){
      this.identifier_click = identifier;
      this.x_start_click = x;
      this.y_start_click = y;
      this.time_click = (new Date()).getTime();
    }
  };
  this.ClickMove = function(identifier,x,y){
    if(this.identifier_click == identifier){
    }
  };
  this.ClickCancel = function(identifier){
    if(this.identifier_click == identifier){
      this.identifier_click = -1;
      if(this.time_click + 200 > (new Date()).getTime()){
        main.gameview.etapa.objects.players[0].gameButtonA();
      }
    }
  };
  this.forceCancelClick = function(){
    this.identifier_click = -1;
  }
}
function GUI_GameButtonB(){
  this.x = 0;
  this.y = 0;
  this.width = -1;
  this.height = -1;

  this.bitmap = main.resources.load_resource({
    name : 'button_a',
    type : 'gui',
    type_file : 'png',
  });
  this.bitmap_actions = main.resources.load_resource({
    name : 'button_b_actions',
    type : 'gui',
    type_file : 'png',
  });
  this.x_start_click = -1;
  this.y_start_click = -1;
  this.identifier_click = -1;
  this.time_click = 0;

  this.current_action = 0;
  this.active = false;

  this.Start = function(){
  };
  this.Update = function(){
    if((this.width == -1) && (this.bitmap.width > 0)){
      this.width = this.bitmap.width;
      this.height = this.bitmap.height;

      this.x = (main.canvas.width / main.gameview.etapa.gui.scale) - this.width * 1.25;
      this.y = (main.canvas.height / main.gameview.etapa.gui.scale) - this.height * 2.5;
    }
  };
  this.Draw = function(ctx){
    ctx.drawImage(this.bitmap,this.x, this.y);
    if(this.active){
      ctx.globalAlpha = 1;
    }else{
      ctx.globalAlpha = 0.5;
    }
    ctx.drawImage(this.bitmap_actions,15 * this.current_action,0,15,15,this.x, this.y,15,15);
    ctx.globalAlpha = 1;
  };
  this.Click = function(identifier,x,y){
    if(this.identifier_click == -1){
      this.identifier_click = identifier;
      this.x_start_click = x;
      this.y_start_click = y;
      this.time_click = (new Date()).getTime();
    }
  };
  this.ClickMove = function(identifier,x,y){
    if(this.identifier_click == identifier){
    }
  };
  this.ClickCancel = function(identifier){
    if(this.identifier_click == identifier){
      this.identifier_click = -1;
      if(this.time_click + 200 > (new Date()).getTime()){
        main.gameview.etapa.objects.players[0].gameButtonB('defense');
      }
    }
  };
  this.forceCancelClick = function(){
    this.identifier_click = -1;
  }
}