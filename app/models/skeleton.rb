class Skeleton < ActiveRecord::Base

  def compilate
    @materials = []

    {
      joints: recursiveJoints(JSON.parse(joints).first),
      materials: @materials.uniq
    }
  end

  private
  def recursiveJoints j
    @materials << j['material'] if j['material']

    tmp = {
      n: j['name'],
      x: j['x'],
      y: j['y'],
      zd: j['z_down'] || 0,
      zu: j['z_up'] || 0,
      m: j['name'] == 'root' ? {} : {
        m: j['material'],
        xd: j['image']['x_down'],
        yd: j['image']['y_down'],
        wd: j['image']['w_down'],
        hd: j['image']['h_down'],
        xu: j['image']['x_up'],
        yu: j['image']['y_up'],
        wu: j['image']['w_up'],
        hu: j['image']['h_up'],
        x: j['image']['offset_x'],
        y: j['image']['offset_y'],
      }
    }

    tmp['c'] = j['childrens'].collect{|jc| recursiveJoints(jc) } if j['childrens'].presence

    tmp = tmp.reject{|k,v| v == 0 }
    tmp[:m] = tmp[:m].reject{|k,v| v == 0 || v == "0" }

    tmp
  end

end
