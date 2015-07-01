class AnimationsController < ApplicationController
  before_filter :set_tools

  def index
    if params[:id]
      @animation = Animation.find params[:id]
    else
      @animation = Animation.new
    end
  end

  def create
    @animation = Animation.create( params[:animation].to_hash )

    redirect_to animation_animation_path(@animation), :notice => "<i class='fa fa-check'></i> Create succefully"
  end

  def update
    @animation = Animation.find(params[:id])
    @animation.update_attributes( params[:animation].to_hash )

    redirect_to animation_animation_path(@animation), :notice => "<i class='fa fa-check'></i> Save succefully"
  end

  def generate
    @animation = Animation.find(params[:id])
    render json: @animation.compilate
  end

  def set_tools
    @right = [
      { class_html: 'col-icons',
        content: 'joints_actions'},
      { class_html: 'col-list-form',
        content: 'form'}
    ]
  end
end
