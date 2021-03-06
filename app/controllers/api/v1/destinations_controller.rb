require 'open-uri'

class Api::V1::DestinationsController < ApiController
  # before_action :authorize_user
  def index
  end

  def show
    destination = Destination.find(params[:id])
    userNote = UserDestination.find_by(user: current_user, destination: destination)
    user_books = current_user.books
    render json: {
      destination: destination,
      books: destination.books,
      userBooks: user_books,
      note: userNote
    }, status: :ok
  end

  def create
    @destination = existing_destination
    if @destination
      userdestination = UserDestination.create(user: current_user, destination: @destination, note: "")
      render json: { destination: @destination, destinationBooks: @destination.books, userDestination: userdestination }, status: :created
    else
      @destination = Destination.new(destination_params)
      @destination.country = @destination.country.split.map(&:capitalize).join(' ')
      @destination.city = @destination.city.to_s.split.map(&:capitalize).join(' ')

      if @destination.save
        userdestination = UserDestination.create(user: current_user, destination: @destination, note: "")
        add_details
        @destination.save
        Destination.retrieve_relevant_books(@destination)
        render json: { destination: @destination, destinationBooks: @destination.books, userDestination: userdestination }, status: :created
      else
        render json: { errors: @destination.errors }, status: :unprocessable_entity
      end
    end
  end

  def destroy
    @user_destination = UserDestination.find_by(user: current_user, destination: params[:id])
    @user_destination.destroy
  end

  private
  def destination_params
    params.require(:destination).permit(:country, :city)
  end

  def add_details
    additional_details = @destination.get_details(params)
    @destination.short_description = additional_details[:blurb]
    @destination.image = additional_details[:image]
  end

  def existing_destination
    if params[:city] != ""
      Destination.find_by(city: params[:city])
    else
      Destination.find_by(country: params[:country])
    end
  end
end
