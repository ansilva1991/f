class SkeletonsController < ApplicationController
  before_filter :set_tools

  def index
    if params[:id]
      @skeleton = Skeleton.find params[:id]
    else
      @skeleton = Skeleton.new
    end
  end

  def create
    @skeleton = Skeleton.create( params[:skeleton].to_hash )

    redirect_to skeleton_skeleton_path(@skeleton), :notice => "<i class='fa fa-check'></i> Create succefully"
  end

   def update
    @skeleton = Skeleton.find(params[:id])
    @skeleton.update_attributes( params[:skeleton].to_hash )

    redirect_to skeleton_skeleton_path(@skeleton), :notice => "<i class='fa fa-check'></i> Save succefully"
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
