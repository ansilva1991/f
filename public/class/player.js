function Player(){

  this.x = 0;
  this.y = 0;
  this.h_mask = 3;
  this.v_mask = 3;
  this.monigote = new Monigote({
    der_item_type : 'sword',
    der_item : 0,
    izq_item_type : 'shield',
    izq_item : 0
  });

  this.status = "idle";
  this.vel = 1;

  this.axis_game_pad = { x : 0, y : 0 };

  this.time_push_action = 0;

  this.object_picked;

  this.last_dir = 0;

  this.Start = function(){

  };
  this.Update = function(){
    if(( this.status == "idle" )|| ( this.status == "object_pick_idle" ) ){
      this.monigote.setAnim("idle");
      this.time_push_action = 0;
    }
    if(( this.status == "walk" )||( this.status == "object_pick_walk" )){
      this.monigote.setAnim("walk");
      if(this.axis_game_pad.x != 0){
        this.monigote.left = this.axis_game_pad.x;
      }
      if(this.axis_game_pad.y != 0){
        this.monigote.up = this.axis_game_pad.y == 1 ? 0 : 1;
      }

      if(!main.gameview.etapa.getCollision(this.x + this.vel * this.axis_game_pad.x, this.y, {
        except : this.id,
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        this.x += this.vel * this.axis_game_pad.x;
      }
      if(!main.gameview.etapa.getCollision(this.x, this.y + this.vel * this.axis_game_pad.y, {
        except : this.id,
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        this.y += this.vel * this.axis_game_pad.y;
      }
      if(this.time_push_action > 20){
        this.PushObject();
        this.time_push_action = 0;
      }
    }
    if(this.status == "object_init_pick_idle"){
      this.monigote.no_hands = true;
      this.monigote.setAnim("attack");
      this.time_push_action = 0;
      if((this.object_picked.status == "pick")&&(this.monigote.end_anim)){
        this.status = "object_pick_idle";
      }
    }
    if(this.status == "object_pick_throw"){
      this.monigote.setAnim("attack");
      if(this.monigote.end_anim){
        this.monigote.no_hands = false;
        this.status = "idle";
      }
    }
    if(this.status == "pushing"){
      this.monigote.setAnim("attack");
      if(this.monigote.end_anim){
        this.status = "walk";
      }
    }
    if( this.status == "defense" ){
      this.monigote.setAnim("defense");
      this.time_push_action = 0;
    }
    if( this.status == "walk_defense" ){
      this.monigote.setAnim("walk_defense");
      if(this.axis_game_pad.x != 0){
        this.monigote.left = this.axis_game_pad.x;
      }
      if(this.axis_game_pad.y != 0){
        this.monigote.up = this.axis_game_pad.y == 1 ? 0 : 1;
      }

      if(!main.gameview.etapa.getCollision(this.x + (this.vel * 0.3) * this.axis_game_pad.x, this.y, {
        except : this.id,
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        this.x += (this.vel * 0.3) * this.axis_game_pad.x;
      }
      if(!main.gameview.etapa.getCollision(this.x, this.y + (this.vel * 0.3) * this.axis_game_pad.y, {
        except : this.id,
        h_mask : this.h_mask,
        v_mask : this.v_mask
      })){
        this.y += (this.vel * 0.3) * this.axis_game_pad.y;
      }
    }

    this.getCurrentAction();
  };
  this.Draw = function(ctx){
    this.monigote.Draw(ctx,this.x,this.y);
  };
  this.gameButtonA = function(){
    var x_area = this.x + 4 * this.monigote.left;
    var y_area = this.y + 4 - 8 * this.monigote.up;
    var in_front = main.gameview.etapa.objects.inArea(x_area, y_area, 8);

    if(this.ActionIfAllowByStatus('object_pick_drop_throw')){
      if(this.object_picked != undefined){
        if(this.status == "object_pick_idle"){
          if(this.last_dir == 0){
            if(main.gameview.etapa.getCollision(this.x + 12, this.y, {
              except : this.object_picked.id,
              h_mask : this.object_picked.h_mask,
              v_mask : this.object_picked.v_mask
            })){
              return false;
            }
          }
          if(this.last_dir == 1){
            if(main.gameview.etapa.getCollision(this.x, this.y - 12, {
              except : this.object_picked.id,
              h_mask : this.object_picked.h_mask,
              v_mask : this.object_picked.v_mask
            })){
              return false;
            }
          }
          if(this.last_dir == 2){
            if(main.gameview.etapa.getCollision(this.x - 12, this.y, {
              except : this.object_picked.id,
              h_mask : this.object_picked.h_mask,
              v_mask : this.object_picked.v_mask
            })){
              return false;
            }
          }
          if(this.last_dir == 3){
            if(main.gameview.etapa.getCollision(this.x, this.y + 12, {
              except : this.object_picked.id,
              h_mask : this.object_picked.h_mask,
              v_mask : this.object_picked.v_mask
            })){
              return false;
            }
          }
          this.object_picked.Drop(this.last_dir);
          this.monigote.no_hands = false;
          this.status = "idle";
        }
        if(this.status == "object_pick_walk"){
          this.object_picked.Throw(this.last_dir);
          this.status = "object_pick_throw";
        }
        this.object_picked = undefined;

        return false;
      }
    }
    if(this.ActionIfAllowByStatus('talk')){
      if(in_front.types.NPC != undefined){
        in_front.types.NPC[0].Active();
        return false;
      }
    }
    if(this.ActionIfAllowByStatus('object_pick')){
      if(in_front.types.ObjectPick != undefined){
        if(in_front.types.ObjectPick[0].status == "idle"){
          this.object_picked = in_front.types.ObjectPick[0];
          in_front.types.ObjectPick[0].Pick();
          this.status = "object_init_pick_idle";
          return false;
        }
      }
    }
  };
  this.gameButtonB = function(mode){
    if(mode == "defense"){
      if(this.ActionIfAllowByStatus('defense')){
        this.status = "defense";
        main.gameview.etapa.gui.buttonB.active = true;
        return;
      }
      if(this.ActionIfAllowByStatus('down_defense')){
        this.status = "idle";
        main.gameview.etapa.gui.buttonB.active = false;
        return;
      }
    }
  }
  this.gamePad = function(x_axis,y_axis){
    this.axis_game_pad.x = x_axis;
    this.axis_game_pad.y = y_axis;

    if(this.ActionIfAllowByStatus('walk')){
      if(this.status == "idle"){
        this.status = "walk";
      }
      if(this.status == "object_pick_idle"){
        this.status = "object_pick_walk";
      }
      if(this.status == "defense"){
        this.status = "walk_defense";
      }

      if(this.axis_game_pad.x > 0){ this.last_dir = 0; }
      if(this.axis_game_pad.x < 0){ this.last_dir = 2; }
      if(this.axis_game_pad.y > 0){ this.last_dir = 3; }
      if(this.axis_game_pad.y < 0){ this.last_dir = 1; }

      if((this.axis_game_pad.x == 0) && (this.axis_game_pad.y == 0)){
        if(this.status == "walk"){
          this.status = "idle";
        }
        if(this.status == "object_pick_walk"){
          this.status = "object_pick_idle";
        }
        if(this.status == "walk_defense"){
          this.status = "defense";
        }
      }
    }
  };
  this.getCurrentAction = function(){
    var current_action = 0;
    var x_area = this.x + 4 * this.monigote.left;
    var y_area = this.y + 4 - 8 * this.monigote.up;
    var in_front = main.gameview.etapa.objects.inArea(x_area, y_area, 8);

    if(this.ActionIfAllowByStatus('object_pick_drop_throw')){
      if(this.object_picked != undefined){
        if(this.status == "object_pick_idle"){
          current_action = 3;
        }
        if(this.status == "object_pick_walk"){
          current_action = 4;
        }
        main.gameview.etapa.gui.buttonA.current_action = current_action;
        return false;
      }
    }
    if(this.ActionIfAllowByStatus('talk')){
      if(in_front.types.NPC != undefined){
        current_action = 1;
        main.gameview.etapa.gui.buttonA.current_action = current_action;
        return false;
      }
    }
    if(this.ActionIfAllowByStatus('object_pick')){
      if(in_front.types.ObjectPick != undefined){
        if(in_front.types.ObjectPick[0].status == "idle"){
          current_action = 2;
          main.gameview.etapa.gui.buttonA.current_action = current_action;
          return false;
        }
      }
    }
    if(this.ActionIfAllowByStatus('object_push')){
      if(in_front.types.ObjectPush != undefined){
        if(this.status == "walk"){
          this.time_push_action += 1;
        }
      }
    }

    main.gameview.etapa.gui.buttonA.current_action = current_action;
  };
  this.PushObject = function(){
    var x_area = this.x + 4 * this.monigote.left;
    var y_area = this.y + 4 - 8 * this.monigote.up;
    var in_front = main.gameview.etapa.objects.inArea(x_area, y_area, 8);

    if(in_front.types.ObjectPush == undefined){ return; }

    var push_to;
    var o = in_front.types.ObjectPush[0];

    if(this.axis_game_pad.x > 0){
      if((o.y - 5 > this.y) || (o.y + 5 < this.y)){ return; }
      push_to = 0;
    }
    if(this.axis_game_pad.y < 0){
      if((o.x - 5 > this.x) || (o.x + 5 < this.x)){ return; }
      push_to = 1;
    }
    if(this.axis_game_pad.x < 0){
      if((o.y - 5 > this.y) || (o.y + 5 < this.y)){ return; }
      push_to = 2;
    }
    if(this.axis_game_pad.y > 0){
      if((o.x - 5 > this.x) || (o.x + 5 < this.x)){ return; }
      push_to = 3;
    }

    if(in_front.types.ObjectPush != undefined){
      o.Push(push_to);
      this.status = "pushing";
    }
  };
  this.ActionIfAllowByStatus = function(action){
    var status_actions = {
      idle : ['walk','object_pick','object_push','defense','talk'],
      walk : ['walk','object_pick','object_push','defense','talk'],
      object_pick_idle : ['walk','object_pick_drop_throw'],
      object_pick_walk : ['walk','object_pick_drop_throw'],
      defense : ['walk','down_defense','talk'],
      walk_defense : ['walk','down_defense','talk'],
    }
    if(status_actions[this.status] == undefined){ return false; }
    return (status_actions[this.status].indexOf(action) > -1) ? true : false;
  }
}