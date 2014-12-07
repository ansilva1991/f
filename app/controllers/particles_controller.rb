class ParticlesController < ApplicationController
  before_filter :set_tools

  def index
    if params[:id]
      @particle = Particle.find params[:id]
    else
      @particle = Particle.new
    end
  end

  def create
     @particle = Particle.create( params[:particle].to_hash )
     redirect_to particle_particle_path(@particle)
  end

  def update
    @particle = Particle.find(params[:id])
    @particle.update_attributes( params[:particle].to_hash )
    redirect_to particle_particle_path(@particle)
  end

  def set_tools
    @right = [
      { class_html: 'col-form',
        content: 'form'},
    ]
  end
end
