module MapsHelper
  def collect_tiles
    Dir['public/files/tiles/tiles_*'].collect{|q| q.split('/').last.split('.').first }
  end
  def all_maps
    Map.all
  end
  def tiles_index_objects
    resp = {}
    GameObject::KINDS.each_with_index{|k,v| resp[k.first.to_s] = v }
    resp
  end
end
