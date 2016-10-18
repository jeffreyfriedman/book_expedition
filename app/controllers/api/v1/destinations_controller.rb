require 'Nokogiri'
require 'open-uri'
require 'pry'

class Api::V1::DestinationsController < ApiController
  def index

  end

  def create
    @destination = Destination.new(destination_params)
    additional_details = @destination.get_details(params)
    @destination.short_description = additional_details[:blurb]
    @destination.image = additional_details[:image]

    if @destination.save
      UserDestination.create(user: current_user, destination: @destination)
      render json: { destination: @destination }, status: :created
    else
      render json: { errors: @destination.errors }, status: :unprocessable_entity
    end
  end

  private
  def destination_params
    params.require(:destination).permit(:country, :city)
  end
end
