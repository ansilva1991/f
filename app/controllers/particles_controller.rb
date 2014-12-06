class ParticlesController < ApplicationController
  before_filter :set_tools

  def index
    @particle = Particle.new
  end
  def set_tools
    @left = [
      {
        class_html: 'col-icons',
        content: 'left_icons'
      }
    ]
    @right = [
      { class_html: 'col-form',
        content: 'form'},
    ]
  end
end
