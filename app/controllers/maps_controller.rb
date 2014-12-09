class MapsController < ApplicationController
  before_filter :set_tools

  def index
    if params[:id]
      @map = Map.find params[:id]
      @objects = @map.get_objects
    else
      @map = Map.new
      @map.grid_init
    end
  end

  def create
    @map = Map.create( params[:map].to_hash )
    @map.process_objects(JSON.parse(params[:objects]))

    redirect_to map_map_path(@map), :notice => "<i class='fa fa-check'></i> Create succefully"
  end

  def update
    @map = Map.find(params[:id])
    @map.update_attributes( params[:map].to_hash )
    @map.process_objects(JSON.parse(params[:objects]))

    redirect_to map_map_path(@map), :notice => "<i class='fa fa-check'></i> Save succefully"
  end

  def set_tools
    @left = [
      { class_html: 'col-icons',
        content: 'left_icons'},
    ]
    @right = [
      { class_html: 'col-tiles',
        content: 'col_tiles'},
      { class_html: 'col-icons',
        content: 'form_icons'},
      { class_html: 'col-list-form',
        content: 'col_objects'},
      { class_html: 'col-form',
        content: 'form'}
    ]
  end
end
