module SkeletonsHelper
  def collect_skins
    Dir['public/files/sprites/*_0.png'].collect{|q| q.split('/').last.split('.').first }
  end
  def all_skeletons
    Skeleton.all
  end
end
