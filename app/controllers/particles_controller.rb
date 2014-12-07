class ParticlesController < ApplicationController
  before_filter :set_tools

  def index
    @particle = Particle.new
  end
  def set_tools
    @right = [
      { class_html: 'col-form',
        content: 'form'},
    ]
  end
end
