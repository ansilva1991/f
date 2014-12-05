function Text(options){
  var index_chars = 'QWERTYUIOPASDFGHJKLÑZXCVBNMqwertyuiopasdfghjklñzxcvbnmáéíóú¡!¿?()[]{}<>@|0123456789/*-+:.,;"#$%&= !¿?()[]{}<>@|0123456789/*-+:.,;';

  this.font = main.resources.load_resource({
    name : options.font,
    type : 'fonts',
    type_file : 'png'
  });
  this.x_space = 8;
  this.chars = [];
  this.words = [];
  this.text = "";
  this.size = options.size == undefined ? 1 : options.size;
  this.align = options.align == undefined ? 'left' : options.align;
  this.x_offset = 0;

  this.setText = function(txt){
    this.text = txt;
    this.chars = [];
    this.words = [];
    var word = "";
    for(var i = 0; i < txt.length; i++){
      var c = txt.charAt(i);
      word += c;
      this.chars.push( index_chars.indexOf(c) );
      if(c == " "){
        this.words.push(word);
        word = ""
      }
    }
    if(word != ""){ this.words.push(word); }
    this.setAlign(this.align);
  };

  this.setAlign = function(align){
    this.align = align;
    this.x_offset = 0;
    if(this.align == 'center'){
      this.x_offset = this.chars.length * this.x_space * this.size * 0.5;
    }
    if(this.align == 'right'){
      this.x_offset = this.chars.length * this.x_space * this.size;
    }
  };

  this.setSize = function(n){
    this.size = n;
    this.setAlign(this.align);
  };

  this.Draw = function(ctx,x,y){
    for(var i = 0; i < this.chars.length; i++){
      ctx.drawImage( this.font,this.x_space * this.chars[i], 0, this.x_space, 17, x + this.x_space * i * this.size - this.x_offset, y, this.x_space * this.size, 17 * this.size );
    }
  };
  this.DrawEsp = function(ctx,x,y,n){
    for(var i = 0; i < n; i++){
      ctx.drawImage( this.font,this.x_space * this.chars[i], 0, this.x_space, 17, x + this.x_space * i * this.size - this.x_offset, y, this.x_space * this.size, 17 * this.size );
    }
  };
}