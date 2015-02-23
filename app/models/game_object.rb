class GameObject < ActiveRecord::Base
  KINDS = {
    NPC: {
      x: 0,
      y: 0,
      h_mask: 0,
      v_mask: 0,
      name: "",
      msj: "",
      behavior: ["idle","random_walk"]
    },
    ObjectPush: {
      x: 0,
      y: 0,
      type: [0]
    },
    ObjectPick: {
      x: 0,
      y: 0,
      type: [0],
      fragile: [true,false]
    }
  }

  belongs_to :map
end
