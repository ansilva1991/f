module ParticlesHelper
  def collect_types
    [
      ["Circle","circle"],
      ["Rect","rect"]
    ]
  end

  def all_particles
    Particle.all
  end
end
