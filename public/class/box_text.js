function BoxText(){
  this.show = false;

  this.lines = [];
  this.scale = 1;

  this.width = 0;

  this.line_height = 0;
  this.new_scale = 0;

  this.config_text = { font : 'freepixel_white', align : 'left' };
  this.who = new Text(this.config_text);

  this.cont = 0;
  this.time = 0;

  this.current_line = -1;
  this.first_line;
  this.second_line;

  this.status = "";
  this.trigger_next = false;

  this.past_lines = 0;
  this.vel_text = 0.1;

  this.left_margin = 2;

  this.Start = function(){
  };
  this.Open = function(who,text){
    this.lines = [];
    this.current_line = -1;
    this.first_line = undefined;
    this.second_line = undefined;

    this.who.setText(" " + who + ":");
    var t = new Text(this.config_text);
    t.setText(text);

    this.width = main.canvas.width / this.scale;
    var max_per_line = this.width / this.who.x_space;
    var line = "";
    for(var i = 0; i < t.words.length; i++){
      if(line.length + t.words[i].length <= max_per_line){
        line += t.words[i];
      }else{
        var tmp = new Text(this.config_text);
        tmp.setText(line);
        this.lines.push(tmp);
        line = t.words[i];
      }
    }
    if(line != ""){
      var tmp = new Text(this.config_text);
      tmp.setText(line);
      this.lines.push(tmp);
    }
    this.new_scale = Math.round(this.scale - 1)/this.scale;

    this.show = true;
    this.nextLine(false);
  }
  this.Update = function(){
    this.line_height = this.who.font.height;
    if(this.status == "view_first_line"){
      this.time += 1; if(this.time > this.vel_text){ this.cont += 1; this.time = 0; }
      if(this.cont > this.first_line.text.length){
        this.nextLine(false);
      }
    }
    if(this.status == "view_second_line"){
      this.time += 1; if(this.time > this.vel_text){ this.cont += 1; this.time = 0; }
      if(this.cont > this.second_line.text.length){
        this.nextLine(false);
      }
    }
    if(this.status == "stand_by"){
      if(this.trigger_next){
        this.nextLine(true);
        this.trigger_next = false;
      }
    }
     if(this.status == "end"){
      if(this.trigger_next){
        this.show = false;
        this.trigger_next = false;
      }
    }
  };
  this.nextLine = function(cl_trigger){
    this.status = "stand_by";
    this.cont = 0;
    this.current_line += 1;

    if(this.lines[this.current_line] == undefined){
      this.trigger_next = false;
      this.status = "end";
      return;
    }
    if(this.first_line == undefined){
      this.first_line = this.lines[this.current_line];
      this.status = "view_first_line";
    }else{
      if(this.second_line == undefined){
        this.second_line = this.lines[this.current_line];
        this.status = "view_second_line";
      }else{
        if(this.past_lines == 0){
          if(cl_trigger){
            this.past_lines += 1;
            this.first_line = this.second_line;
            this.second_line = this.lines[this.current_line];
            this.status = "view_second_line";
          }else{
            this.current_line -= 1;
          }
        }else{
          this.past_lines = 0;
          this.first_line = this.second_line;
          this.second_line = this.lines[this.current_line];
          this.status = "view_second_line";
        }
      }
    }
  }
  this.Draw = function(ctx){
    if(!this.show){ return false; }

    var top_a = (main.canvas.height / this.scale) - this.line_height * 3 * this.new_scale;
    var top_b = top_a / this.new_scale;

    ctx.fillStyle = "rgba(0,0,0,0.75)";
    ctx.fillRect(0,top_a,this.width,this.line_height * 3 * this.new_scale);

    ctx.save();
      ctx.scale(this.new_scale, this.new_scale);

      this.who.Draw(ctx,0,top_b);

      if(this.status == "view_first_line"){
        this.first_line.DrawEsp(ctx,this.left_margin,top_b + this.line_height,this.cont);
      }

      if(this.status == "view_second_line"){
        this.first_line.Draw(ctx,this.left_margin,top_b + this.line_height);
        this.second_line.DrawEsp(ctx,this.left_margin,top_b + this.line_height * 2 ,this.cont);
      }

      if((this.status == "stand_by")||(this.status == "end")){
        this.first_line.Draw(ctx,this.left_margin,top_b + this.line_height);
        if(this.second_line != undefined){
          this.second_line.Draw(ctx,this.left_margin,top_b + this.line_height * 2);
        }
      }

    ctx.restore();
  };
  this.Click = function(){
    if(this.show){
      if((this.status == "stand_by") || (this.status == "end")){
        this.trigger_next = true;
        return true;
      }
    }
    return false;
  };
}