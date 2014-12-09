class Map < ActiveRecord::Base

  has_many :game_objects

  def grid_init
    self.base_tiles = Array.new(10){ Array.new(10){0} }
    self.base_top_tiles = Array.new(10){ Array.new(10){0} }
    self.base_shadow = Array.new(10){ Array.new(10){0} }
  end
  def process_objects objects
    self.game_objects.destroy_all
    objects.each do |k,v|
      tmp = GameObject.new({ options: v.to_json.to_s })
      self.game_objects << tmp
    end

    self.save
  end
  def get_objects
    result = {}
    self.game_objects.each do |o|
      opts = JSON.parse(o.options)
      result[opts['id']] = opts
    end
    result
  end
end
