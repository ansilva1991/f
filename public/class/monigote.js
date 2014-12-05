function Monigote(options){
  this.bitmap_body;
  this.bitmap_arm_left;
  this.bitmap_arm_right;
  this.bitmap_helmet;
  this.bitmap_torax;
  this.bitmap_pants;
  this.bitmap_hair;

  this.bitmap_shadow;

  this.alpha = 100;

  this.anim = "-1";
  this.frame = 0;
  this.max_frame = 3;
  this.step = 0;
  this.max_step = 2;

  this.up = 0;
  this.left = 1;
  this.sex = options.sex == undefined ? 0 : options.sex;
  this.boca = 0;
  this.ojos = 0;
  this.tez = options.tez == undefined ? 0 : options.tez;
  this.hair = options.hair == undefined ? 0 : options.hair;
  this.raza = options.raza == undefined ? 0 : options.raza;

  this.helmet = options.helmet == undefined ? -1 : options.helmet;
  this.torax = options.torax == undefined ? -1 : options.torax;
  this.pants = options.pants == undefined ? -1 : options.pants;

  this.der_item_type = options.der_item_type == undefined ? 'none' : options.der_item_type;
  this.der_item = options.der_item == undefined ? 0 : options.der_item;
  this.izq_item_type = options.izq_item_type == undefined ? 'none' : options.izq_item_type;
  this.izq_item = options.izq_item == undefined ? 0 : options.izq_item;

  this.proyectile = 0;
  this.visible_proyectile = true;

  this.type_weapon = -1;

  this.rot_body = 0;
  this.rot_leg_der = 0;
  this.rot_leg_izq = 0;
  this.rot_head = 0;
  this.rot_arm_der = 0;
  this.rot_arm_izq = 0;
  this.x_offset_arm_der = 0;
  this.y_offset_arm_der = 0;
  this.x_offset_arm_izq = 0;
  this.y_offset_arm_izq = 0;
  this.left_der_arm = -1;
  this.left_izq_arm = 1;

  this.unique_anim = false;
  this.end_anim = false;

  this.y_offset;

  this.total_scale = 1;
  this.total_x_scale = 1;
  this.total_y_scale = 1;
  this.global_alpha = 1;

  this.gameview;

  this.setAnim = function(anim){
    if(anim != this.anim){
      this.rot_body = 0;
      this.rot_arm_der = 0;
      this.rot_arm_izq = 0;
      this.x_offset_arm_der = 0;
      this.y_offset_arm_der = 0;
      this.x_offset_arm_izq = 0;
      this.y_offset_arm_izq = 0;
      this.left_der_arm = 0;
      this.left_izq_arm = 0;

      if(this.type_weapon == 0){
        this.rot_arm_der = -20;
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 1){
        this.rot_arm_der = 10;
        this.x_offset_arm_der = -2;
        this.left_der_arm = -1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 2){
        this.rot_arm_der = -40;
        this.rot_arm_izq = -40;
        this.x_offset_arm_izq = -2;
        this.left_der_arm = 1;
        this.left_izq_arm = -1;
      }
      if(this.type_weapon == 3){
        this.x_offset_arm_der = 1;
        this.y_offset_arm_der = -2;
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 4){
        this.x_offset_arm_der = 1;
        this.y_offset_arm_der = -2;
        this.x_offset_arm_izq = -3;
        this.y_offset_arm_izq = -1;
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 5){
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 6){
        this.visible_proyectile = true;
        this.rot_arm_der = 135;
        this.rot_arm_izq = -45;
        this.x_offset_arm_izq = 5;
        this.y_offset_arm_izq = 3;
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 7){
        this.x_offset_arm_der = -5;
        this.y_offset_arm_der = -4;
        this.left_der_arm = 1;
        this.left_izq_arm = 1;
      }
      this.rot_head = 0;
      this.rot_leg_der = 0;
      this.rot_leg_izq = 0;
      this.ojos = 0;
      this.boca = 0;
      this.y_offset = 0;
      this.unique_anim = false;
      this.end_anim = false;

      this.anim = anim;

      if(this.anim == "idle"){
        this.max_frame = 3;
      }
      if(this.anim == "walk"){
        this.max_frame = 3;
      }
      if(this.anim == "talk"){
        this.max_frame = 3;
      }
      if(this.anim == "attack"){
        this.unique_anim = true;
        if(this.type_weapon == 0){
          this.max_frame = 3;
        }
        if(this.type_weapon == 1){
          this.max_frame = 4;
        }
        if(this.type_weapon == 2){
          this.max_frame = 3;
        }
        if(this.type_weapon == 3){
          this.max_frame = 2;
        }
        if(this.type_weapon == 4){
          this.max_frame = 3;
        }
        if(this.type_weapon == 5){
          this.max_frame = 3;
        }
        if(this.type_weapon == 6){
          this.max_frame = 3;
        }
        if(this.type_weapon == 7){
          this.max_frame = 3;
        }
      }
      if(this.anim == "pain"){
        this.unique_anim = true;
      }
      if(this.anim == "program"){
        this.max_frame = 3;
      }
      if(this.anim == "dead_0"){
        this.max_frame = 3;
        this.unique_anim = true;
      }
      if(this.anim == "dead_0_end"){
        this.max_frame = 1;
        this.unique_anim = true;
      }
      this.frame = 0;
      this.step = 0;
    }
  }
  this.lowDraw = function(canvas,x,y){
    //SOMBRA
    canvas.save();
    canvas.translate( x - this.left, y );
    canvas.scale( this.total_scale * this.left, this.total_scale );
      canvas.drawImage( this.bitmap_shadow, 0, 0, 12, 12, -5, -6, 12, 12 );
    canvas.restore();
    //BODY
    canvas.save();
    canvas.globalAlpha = this.global_alpha;
    canvas.translate( x - this.left , y - ( this.y_offset * this.total_scale ) );
    canvas.scale( this.total_scale * this.left * this.total_x_scale, this.total_scale * this.total_y_scale );
    canvas.rotate( (Math.PI/180) * this.rot_body );
      if(this.up == 1){
        if((this.type_weapon == 0)||(this.type_weapon == 3)){
          if(this.izq_item_type == "shield"){
            this.drawShield(canvas);
          }
        }
        if(this.type_weapon == 1){
          this.drawBigSword(canvas);
        }
        if(this.type_weapon == 2){
          this.drawSwordLeft(canvas);
        }
        if(this.type_weapon == 4){
          this.drawGunLeft(canvas);
        }
        if(this.type_weapon == 5){
          this.drawBigGun(canvas);
        }
        if(this.type_weapon == 6){
          this.drawBow(canvas);
          if(this.visible_proyectile){
            this.drawProyectile(canvas);
          }
        }
        if(this.type_weapon == 7){
          this.drawCane(canvas);
        }
      }
      if(this.up == 0){
        if(this.hair > -1){
          this.drawHairOverflow(canvas);
        }
      }
      if(this.type_weapon == 0){
        this.drawSwordRight(canvas);
      }
      if(this.type_weapon == 2){
        his.drawSwordRight(canvas);
      }
      if(this.type_weapon == 3){
        this.drawGunRight(canvas);
      }
      if(this.type_weapon == 4){
        this.drawGunRight(canvas);
      }
      //Cuerpo
      canvas.drawImage( this.bitmap_body, this.sex * 24, 11 + (this.tez * 24), 24, 6, -11, -7, 24, 6 );
      if(this.pants > -1){
        canvas.drawImage( this.bitmap_pants, 48, (this.up * 24), 16, 16, -8, -17, 16, 16 );
      }
      if(this.torax > -1){
        canvas.drawImage( this.bitmap_torax, 24, (this.up*24), 24, 24, -12, -17, 24, 24 );
      }
      //Pierna Izquierda
      canvas.save();
        canvas.translate( -1, -1 );
        canvas.rotate( (Math.PI/180) * this.rot_leg_izq );
        canvas.drawImage( this.bitmap_body, this.sex * 24,17 + (this.tez * 24), 12, 7, -10, 0, 12, 7 );
        if(this.pants > -1){
          canvas.drawImage( this.bitmap_pants, 48,13 + (this.up * 24), 9, 11, -7, 0, 9, 11 );
        }
      canvas.restore();
      //Pierna Derecha
      canvas.save();
        canvas.translate( 3, -1 );
        canvas.rotate( (Math.PI/180) * this.rot_leg_der );
        canvas.drawImage( this.bitmap_body, 12 + (this.sex * 24), 17 + (this.tez * 24), 12, 7, -2, 0, 12, 7 );
        if(this.pants > -1){
          canvas.drawImage( this.bitmap_pants, 57,13 + (this.up*24), 7, 11, -2, 0, 7, 11 );
        }
      canvas.restore();
      //Cabeza
      canvas.save();
        canvas.translate( 0, -7 );
        canvas.rotate( (Math.PI/180) * this.rot_head );
        if(this.raza == 2){
          canvas.drawImage( this.bitmap_body, 52, 12, 4, 3, 1, -9, 4, 3 );
        }
        canvas.drawImage( this.bitmap_body, this.sex * 24, this.tez * 24, 24, 11, -11, -11, 24, 11 );
        if(this.hair > -1){
          canvas.drawImage( this.bitmap_hair, this.up * 24, 0, 24, 15, -10, -15, 24, 15 );
        }
        if(this.helmet > -1)
        {
          canvas.drawImage( this.bitmap_helmet, 0, (this.up * 24), 24, 24, -11, -17, 24, 24 );
        }
      canvas.restore();
      if(this.up == 0){
        if((this.type_weapon == 0)||(this.type_weapon == 3)){
          if(this.izq_item_type == "shield"){
            this.drawShield(canvas);
          }
        }
        if(this.type_weapon == 1){
          this.drawBigSword(canvas);
        }
        if(this.type_weapon == 2){
          this.drawSwordLeft(canvas);
        }
        if(this.type_weapon == 4){
          this.drawGunLeft(canvas);
        }
        if(this.type_weapon == 5){
          this.drawBigGun(canvas);
        }
        if(this.type_weapon == 6){
          this.drawBow(canvas);
          if(this.visible_proyectile){
            this.drawProyectile(canvas);
          }
        }
        if(this.type_weapon == 7){
          this.drawCane(canvas);
        }
      }
      if(this.up == 1){
        if(this.hair > -1){
          this.drawHairOverflow(canvas);
        }
      }

      //Ojos Boca Cabeza
      if(this.up == 0){
        if((this.raza == 0)||(this.raza == 3)||(this.raza == 4)){
          canvas.save();
            canvas.translate( 0, -7 );
            canvas.rotate( (Math.PI/180) * this.rot_head );

            var x_ojos = parseInt (((Math.floor(this.ojos * 0.5) - (this.ojos * 0.5)) * 2) * 8);
            var y_ojos = parseInt (Math.floor(this.ojos*0.5) * 3);

            canvas.drawImage( this.bitmap_body, 48 + x_ojos, y_ojos + (this.tez * 24), 8, 3, -2, -4, 8, 3 );
            canvas.drawImage( this.bitmap_body, 48 + (this.sex * 8), 21 - (this.boca * 3) + (this.tez * 24), 8, 3, -3, -2, 8, 3 );
          canvas.restore();
        }
        if(this.raza == 1){
          canvas.save();
            canvas.translate( 0, -7 );
            canvas.rotate( (Math.PI/180) * this.rot_head );

            var x_ojos = parseInt (((Math.floor(this.ojos * 0.5) - (this.ojos * 0.5)) * 2) * 8);
            var y_ojos = parseInt (Math.floor(this.ojos*0.5) * 3);

            canvas.drawImage( this.bitmap_body, 48 + x_ojos, y_ojos + (this.tez * 24), 8 , 3, -2, -4, 8, 3 );
            if(this.boca == 0){
              canvas.drawImage( this.bitmap_body, 48 + (this.up * 8),21 + (this.tez * 24), 8, 3, 3, -3, 8, 3 );
            }
            if(this.boca > 0){
              canvas.drawImage( this.bitmap_body, 48 + (this.up * 8), 21 + (this.tez * 24), 8, 3, 3, -2, 8, 3 );
            }
          canvas.restore();
        }
        if(this.raza == 2){
          canvas.save();
            canvas.translate( 0, -7 );
            canvas.rotate( (Math.PI/180) * this.rot_head );

            var x_ojos = parseInt (((Math.floor(this.ojos * 0.5) - (this.ojos * 0.5)) * 2) * 8);
            var y_ojos = parseInt (Math.floor(this.ojos*0.5) * 3);

            canvas.drawImage( this.bitmap_body, 48 + x_ojos, y_ojos + (this.tez * 24), 8, 3, -2, -4, 8, 3 );
            canvas.drawImage( this.bitmap_body, 48 + (this.sex * 8), 21 - (this.boca * 3) + (this.tez * 24), 8, 3, -3, -2, 8, 3 );
            canvas.drawImage( this.bitmap_body, 48, 12, 4, 3, -2, -9, 4, 3 );
          canvas.restore();
        }
      }
    canvas.restore();
  }
  this.Draw = function(canvas,x,y){
    if(this.step>this.max_step){
      this.step = 0;
      this.frame+=1;
      this.sound_play = true;
      if(this.frame>this.max_frame){
        if(!this.unique_anim){
          this.frame = 0;
        }
        else{
          this.step = -99;
          this.end_anim = true;
        }
      }
    }
    if(this.anim == "idle"){
      this.step += 0.25;

      if(this.frame == 0){
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
      if(this.frame == 1){
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 2){
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 3){
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
    }
    if(this.anim == "walk"){
      this.step += 0.75;
      if(this.type_weapon == 0){
        this.rot_arm_der = -30;
      }

      if(this.frame == 0){
        this.y_offset += 0.5;
        this.rot_body -=1;
        this.rot_leg_der -=8;
        this.rot_leg_izq +=8;
      }
      if(this.frame == 1){
        this.y_offset -= 0.5;
        this.rot_body +=1;
        this.rot_leg_der +=8;
        this.rot_leg_izq -=8;
      }
      if(this.frame == 2){
        this.y_offset += 0.5;
        this.rot_body +=1;
        this.rot_leg_der +=8;
        this.rot_leg_izq -=8;
      }
      if(this.frame == 3){
        this.y_offset -= 0.5;
        this.rot_body -=1;
        this.rot_leg_der -=8;
        this.rot_leg_izq +=8;
      }
    }
    if(this.anim == "talk"){
      this.step += 0.75;
      this.ojos = 0;

      if(this.frame == 0){
        this.boca = 0;
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
      if(this.frame == 1){
        this.boca = 1;
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 2){
        this.boca = 2;
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 3){
        this.boca = 1;
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
    }
    if(this.anim == "attack"){
      this.step += 0.75;
      this.ojos = 0;
      if(this.type_weapon == 0){
        if(this.frame == 0){
          this.boca = 2;
          this.y_offset +=1;
          this.rot_body -=1;
          this.x_offset_arm_izq+=2;
          this.rot_arm_der -=18;
        }
        if(this.frame == 1){
          this.boca = 1;
          this.y_offset -=1;
          this.rot_body +=1;
          this.x_offset_arm_izq-=2;
          this.rot_arm_der +=40;
        }
        if(this.frame == 2){
          this.boca = 0;
          this.rot_arm_der -=22;
        }
      }
      if(this.type_weapon == 1){
        if(this.frame == 0){
          this.boca = 2;
          this.y_offset +=4;
          this.rot_body -=2;
          this.rot_arm_der -=4;
        }
        if(this.frame == 1){
          this.left_der_arm = 1;
          this.rot_arm_der = 180;
          this.frame = 2;
        }
        if(this.frame == 2){
          this.y_offset -=4;
          this.rot_body +=4;
          this.rot_arm_der +=60;
        }
        if(this.frame == 3){
          if(this.left_der_arm > -1)
          {
            this.left_der_arm -= 0.3;
          }
          this.rot_body -=2;
        }
        if(this.frame == 4){
          this.step = 0;
          if(this.left_der_arm > -1){
            this.left_der_arm -= 0.3;
          }
          else{
            this.left_der_arm = -1;
            this.rot_arm_der = 10;
            this.step = this.max_step + 1;
          }
        }
      }
      if(this.type_weapon == 2){
        if(this.frame == 0){
          this.boca = 2;
          this.y_offset +=1;
          this.rot_body -=2;
          this.rot_arm_der -=30;
          this.rot_arm_izq -=30;
          this.left_izq_arm = 1;
        }
        if(this.frame == 1){
          this.boca = 1;
          this.y_offset -=1;
          this.rot_body +=3;
          this.rot_arm_der +=50;
          this.rot_arm_izq +=50;
        }
        if(this.frame == 2){
          this.boca = 0;
          this.rot_body-=1;
          this.rot_arm_der -=20;
          this.rot_arm_izq -=60;
        }
        if(this.frame == 3){
          this.left_izq_arm = -1;
          this.rot_arm_izq = -40;
        }
      }
      if(this.type_weapon == 3){
        if(this.frame == 0){
          this.rot_body -= 2;
          this.rot_arm_der -= 4;
        }
        if(this.frame == 1){
          this.rot_body += 1;
          this.rot_arm_der += 2;
        }
        if(this.frame == 2){
          this.rot_body += 1;
          this.rot_arm_der += 2;
        }
      }
      if(this.type_weapon == 4){
        if(this.frame == 0){
          this.rot_body -= 2;
          this.rot_arm_der -= 4;
        }
        if(this.frame == 1){
          this.rot_body += 1;
          this.rot_arm_der += 2;

          this.rot_body -= 2;
          this.rot_arm_izq -= 4;
        }
        if(this.frame == 2){
          this.rot_body += 1;
          this.rot_arm_der += 2;

          this.rot_body += 1;
          this.rot_arm_izq += 2;
        }
        if(this.frame == 3){
          this.rot_body += 1;
          this.rot_arm_izq += 2;
        }
      }
      if(this.type_weapon == 5){
        if(this.frame == 0){
          this.rot_body -= 3;
          this.rot_arm_der -= 6;
        }
        if(this.frame == 1){
          this.rot_body += 1;
          this.rot_arm_der += 2;
        }
        if(this.frame == 2){
          this.rot_body += 1;
          this.rot_arm_der += 2;
        }
        if(this.frame == 3){
          this.rot_body += 1;
          this.rot_arm_der += 2;
        }
      }
      if(this.type_weapon == 6){
        this.step -= 0.25;
        if(this.frame == 0){
          this.visible_proyectile = true;
          this.rot_arm_der -=8;
          this.rot_arm_izq -=8;
          this.x_offset_arm_der+=1;
          this.y_offset_arm_izq-=0.5;
          this.x_offset_arm_izq+=2;
          this.rot_body -=0.5;
        }
        if(this.frame == 1){
          this.rot_body -=0.5;
          this.x_offset_arm_izq-=3;
        }
        if(this.frame == 3){
          this.visible_proyectile = false;
          this.rot_arm_der +=8;
          this.rot_arm_izq +=8;
          this.y_offset_arm_izq+=1;
          this.x_offset_arm_izq+=1;
          this.x_offset_arm_der-=1;
          this.rot_body +=1;
        }
      }
      if(this.type_weapon == 7){
        this.step -= 0.25;
        if(this.frame == 0){
          this.rot_arm_der +=20;
          this.y_offset_arm_der+=1;
          this.x_offset_arm_der+=1;
          this.rot_body+=1;
        }
        if(this.frame == 1){
          this.rot_body-=2;
          this.rot_arm_der-=2;
        }
        if(this.frame == 2){
          this.rot_body+=1;
          this.y_offset_arm_der-=1;
          this.x_offset_arm_der-=1;
          this.rot_arm_der-=18;
        }
      }
    }
    if(this.anim == "defense"){
      this.step += 0.75;
      this.ojos = 0;
      this.boca = 0;
      if(this.type_weapon == 0){
        this.rot_arm_der = -60;
        this.x_offset_arm_der = -4;
        this.x_offset_arm_izq = 6;
      }
      if(this.type_weapon == 1){
        this.left_der_arm = -1;
        this.rot_arm_der = 45;
        this.x_offset_arm_der = 6;
        this.y_offset_arm_der = -10;
      }
      if(this.type_weapon == 2){
        this.rot_arm_der = -80;
        this.rot_arm_izq = -50;
        this.x_offset_arm_der = 2;
        this.left_izq_arm = 1;
      }
      if(this.type_weapon == 3){
        this.rot_arm_der = -20;
        this.x_offset_arm_der = -4;
        this.x_offset_arm_izq = 6;
      }
      if(this.type_weapon == 7){
        this.rot_arm_der = 60;
        this.x_offset_arm_der = -1;
        this.y_offset_arm_der = -1;
      }
      if(this.frame == 0){
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
      if(this.frame == 1){
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 2){
        this.rot_body -= 0.25;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 3){
        this.rot_body += 0.25;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
    }
    if(this.anim == "walk_defense"){
      this.step += 0.5;

      if(this.type_weapon == 0){
        this.rot_arm_der = -60;
        this.x_offset_arm_der = -4;
        this.x_offset_arm_izq = 6;
      }
      if(this.type_weapon == 1){
        this.left_der_arm = -1;
        this.rot_arm_der = 45;
        this.x_offset_arm_der = 6;
        this.y_offset_arm_der = -10;
      }
      if(this.type_weapon == 2){
        this.rot_arm_der = -80;
        this.rot_arm_izq = -50;
        this.x_offset_arm_der = 2;
        this.left_izq_arm = 1;
      }

      if(this.frame == 0){
        if((this.sound_active)&&(this.sound_play)){
          this.sound_play = false;
        }
        this.y_offset += 0.5;
        this.rot_body -=0.5;
        this.rot_leg_der -=4;
        this.rot_leg_izq +=4;
      }
      if(this.frame == 1){
        this.y_offset -= 0.5;
        this.rot_body +=0.5;
        this.rot_leg_der +=4;
        this.rot_leg_izq -=4;
      }
      if(this.frame == 2){
        if((this.sound_active)&&(this.sound_play)){
          this.sound_play = false;
        }
        this.y_offset += 0.5;
        this.rot_body +=0.5;
        this.rot_leg_der +=4;
        this.rot_leg_izq -=4;
      }
      if(this.frame == 3){
        this.y_offset -= 0.5;
        this.rot_body -=0.5;
        this.rot_leg_der -=4;
        this.rot_leg_izq +=4;
      }
    }
    if(this.anim == "pain"){
      this.step += 0.75;

      if(this.frame == 0){
        this.rot_head += 6;
        this.rot_body += 2;
      }
      if(this.frame == 1){
        this.rot_head -= 2;
        this.rot_body -= 2;
      }
      if(this.frame == 2){
        this.rot_head -= 2;
        this.rot_body += 2;
      }
      if(this.frame == 3){
        this.rot_head -= 2;
        this.rot_body -= 2;
      }
    }
    if(this.anim == "program"){
      this.step += 0.75;

      if(this.frame == 0){
        this.rot_body += 2;
        this.rot_head -= 2;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
      if(this.frame == 1){
        this.rot_body -= 2;
        this.rot_head += 2;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 2){
        this.rot_body -= 2;
        this.rot_head += 2;
        this.rot_leg_der +=0.25;
        this.rot_leg_izq +=0.25;
      }
      if(this.frame == 3){
        this.rot_body += 2;
        this.rot_head -= 2;
        this.rot_leg_der -=0.25;
        this.rot_leg_izq -=0.25;
      }
    }
    if(this.anim == "dead_0"){
      this.step += 0.5;

      if(this.frame == 0){
        this.rot_body -= 19;
        this.rot_head += 8;
      }
      if(this.frame == 1){
        this.y_offset += 1;
        this.rot_head -= 8;
      }
      if(this.frame == 2){
        this.x_offset_arm_der = -9999;
        this.x_offset_arm_izq = -9999;
        this.y_offset -= 1;
        this.rot_head += 1;
      }
    }
    if(this.anim == "dead_0_end"){
      this.step += 0.5;

      this.rot_body = -90;
      this.rot_head = 8;
      this.x_offset_arm_der = -9999;
      this.x_offset_arm_izq = -9999;
      this.y_offset = 1;
      this.rot_head = 1;

    }
    this.lowDraw(canvas,x,y);
  }
  this.Create = function(){
    this.changeRaza(this.raza);

    this.updateWeapon();
    this.updateCloth();
    this.changeHair(this.hair);

    this.bitmap_shadow = main.resources.load_resource({
      name : "shadow",
      type : "sprites",
      type_file : "png"
    });

  }
  this.changeRaza = function(raza){
    this.raza = raza;
    var image = "";
    if(this.raza == 0){
      image = "humanos"
    }
    if(this.raza == 1){
      image = "orcos"
    }
    if(this.raza == 2){
      image = "ogros"
    }
    if(this.raza == 3){
      image = "vampiros"
    }
    if(this.raza == 4){
      image = "esqueletos"
    }
    this.bitmap_body = main.resources.load_resource({
      name : image,
      type : "sprites",
      type_file : "png"
    });
  }
  this.changeHair = function(i){
    this.bitmap_hair = undefined;
    if(i > -1){
      this.bitmap_hair = main.resources.load_resource({
        name : "hair_" + this.hair,
        type : "sprites",
        type_file : "png"
      });
    }
    this.hair = i;
  }
  this.updateCloth = function(){
    if(this.helmet > -1){
      this.bitmap_helmet = main.resources.load_resource({
        name : "cloth_" + this.helmet,
        type : "sprites",
        type_file : "png"
      });
    }
    if(this.torax > -1){
      this.bitmap_torax = main.resources.load_resource({
        name : "cloth_" + this.torax,
        type : "sprites",
        type_file : "png"
      });
    }
    if(this.pants > -1){
      this.bitmap_pants = main.resources.load_resource({
        name : "cloth_" + this.pants,
        type : "sprites",
        type_file : "png"
      });
    }

  }
  this.updateWeapon = function(){
    if(this.der_item_type == "sword"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "sword_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 0;
    }
    if(this.der_item_type == "big_sword"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "big_sword_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 1;
    }
    if(this.der_item_type == "gun"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "gun_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 3;
    }
    if(this.der_item_type == "big_gun"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "big_gun_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 5;
    }
    if(this.der_item_type == "bow"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "sword_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.bitmap_arm_right = main.resources.load_resource({
        name : "arrow_0",
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 6;
    }
    if(this.der_item_type == "baston"){
      this.bitmap_arm_left = main.resources.load_resource({
        name : "cane_" + this.der_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 7;
    }
    if(this.izq_item_type == "shield"){
      this.bitmap_arm_right = main.resources.load_resource({
        name : "shield_" + this.izq_item,
        type : "sprites",
        type_file : "png"
      });
      if(this.der_item_type == "sword")
      {
        this.type_weapon = 0;
      }
      if(this.der_item_type == "gun")
      {
        this.type_weapon = 3;
      }
    }
    if(this.izq_item_type == "sword"){
      this.bitmap_arm_right = main.resources.load_resource({
        name : "sword_" + this.izq_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 2;
    }
    if(this.izq_item_type == "gun"){
      this.bitmap_arm_right = main.resources.load_resource({
        name : "gun_" + this.izq_item,
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 4;
    }
    if(this.izq_item_type == "arrow"){
      this.bitmap_arm_right = main.resources.load_resource({
        name : "arrow_0",
        type : "sprites",
        type_file : "png"
      });
      this.type_weapon = 6;
    }

    this.rot_body = 0;
    this.rot_leg_der = 0;
    this.rot_leg_izq = 0;
    this.rot_head = 0;
    this.rot_arm_der = 0;
    this.rot_arm_izq = 0;
    this.x_offset_arm_der = 0;
    this.y_offset_arm_der = 0;
    this.x_offset_arm_izq = 0;
    this.y_offset_arm_izq = 0;
    this.left_der_arm = 1;
    this.left_izq_arm = 1;

    this.y_offset = 0;

    var tmp_anim = this.anim;
    this.anim = "";
    this.setAnim(tmp_anim);
  }
this.drawShield = function(canvas){
  //Escudo Una Mano Izquierda
  canvas.save();
    canvas.translate( -2 + this.x_offset_arm_izq, -4 + this.y_offset_arm_izq );
    canvas.rotate( (Math.PI/180) * this.rot_arm_izq );
    canvas.drawImage( this.bitmap_arm_right, this.up * 12, 0, 12, 12, -6, -6, 12, 12 );
  canvas.restore();
};
this.drawBigSword = function(canvas){
  //Arma Dos Mano
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
    canvas.scale( this.left_der_arm, 1 );
    canvas.rotate( (Math.PI/180) * this.rot_arm_der );
    canvas.drawImage( this.bitmap_arm_left,0 + (this.der_item * 24), 0, 24, 24, 0, -12,24,24 );
  canvas.restore();
};
this.drawSwordRight = function(canvas){
  //Arma Una Mano Derecha
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
    canvas.rotate( (Math.PI/180) * this.rot_arm_der );
    canvas.drawImage( this.bitmap_arm_left, this.der_item * 24, 0, 24, 24, 0, -12, 24, 24 );
  canvas.restore();
};
this.drawSwordLeft = function(canvas){
  //Arma Una Mano Izquierda
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_izq, -4 + this.y_offset_arm_izq );
    canvas.scale( this.left_izq_arm, 1 );
    canvas.rotate( (Math.PI/180) * this.rot_arm_izq );
    canvas.drawImage( this.bitmap_arm_right,0 + (this.izq_item * 24), 0, 24, 24, 0,-12,24,24 );
  canvas.restore();
};
this.drawGunLeft = function(canvas){
  //Arma a Distancia una Mano
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_izq, -4 + this.y_offset_arm_izq );
    canvas.rotate( (Math.PI/180) * this.rot_arm_izq );
    canvas.drawImage( this.bitmap_arm_right, this.izq_item * 12, 0, 12, 12, 0, -6,12,12 );
  canvas.restore();
};
this.drawGunRight = function(canvas){
  //Arma a Distancia una Mano
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
    canvas.rotate( (Math.PI/180) * this.rot_arm_der );
    canvas.drawImage( this.bitmap_arm_left, this.der_item * 12, 0, 12, 12, 0, -6, 12, 12 );
  canvas.restore();
};
this.drawBigGun = function(canvas){
  //Arma a Distancia Dos Mano
    canvas.save();
      canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
      canvas.scale( this.left_der_arm, 1 );
      canvas.rotate( (Math.PI/180) * this.rot_arm_der );
      canvas.drawImage( this.bitmap_arm_left, 30 * this.der_item, 0, 30, 18, -13, -10, 30, 18 );
    canvas.restore();
};
this.drawBow = function(canvas){
  //Arma a Distancia Dos Mano
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
    canvas.scale( this.left_der_arm, 1 );
    canvas.rotate( (Math.PI/180) * this.rot_arm_der );
    canvas.drawImage( this.bitmap_arm_left, 0, 0, 30, 18, -15,-9, 30, 18 );
  canvas.restore();
};
this.drawProyectile = function(canvas){
  //Flecha
  canvas.save();
    canvas.translate( -2 + this.x_offset_arm_izq, -4 + this.y_offset_arm_izq );
    canvas.rotate( (Math.PI/180) * this.rot_arm_izq );
    canvas.drawImage( this.bitmap_arm_right, this.proyectile * 7, 0, 7 , 16, -3,-8,7, 16 );
  canvas.restore();
};
this.drawCane = function(canvas){
  //Bastones
  canvas.save();
    canvas.translate( 2 + this.x_offset_arm_der, -4 + this.y_offset_arm_der );
    canvas.scale( this.left_der_arm, 1 );
    canvas.rotate( (Math.PI/180) * this.rot_arm_der );
    canvas.drawImage( this.bitmap_arm_left, 0, 0, 9, 24, -4, -12, 9, 24 );
  canvas.restore();
};
this.drawHairOverflow = function(canvas){
  //Cabello Excedente
  canvas.save();
    canvas.translate( 0, -7 );
    canvas.rotate( (Math.PI/180) * this.rot_head );
    canvas.drawImage( this.bitmap_hair, this.up * 24, 16, 24, 8, -10, 0, 24, 8 );
  canvas.restore();
};
  this.Create();
}