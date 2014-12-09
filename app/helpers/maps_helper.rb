module MapsHelper
  def collect_tiles
    Dir['public/files/tiles/tiles_*'].collect{|q| q.split('/').last.split('.').first }
  end
  def all_maps
    Map.all
  end
end
