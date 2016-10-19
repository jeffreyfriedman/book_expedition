class Destination < ActiveRecord::Base
  has_many :user_destinations
  has_many :users, through: :user_destinations

  has_many :book_locations, dependent: :destroy
  has_many :books, through: :book_locations

  validates :country, presence: true

  def get_details(keywords)
    api_key = ENV['FLICKR_KEY']
    formatted_keywords = "#{keywords[:country]}" + "#{keywords[:city].to_s}"
    photos = HTTParty.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=#{api_key}&text=#{formatted_keywords}%20landmark&sort=relevance&license=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8&safe_search=1&content_type=1&media=photos&format=json&nojsoncallback=1")

    if !photos.nil?
      first_photo = photos["photos"]["photo"][0]

      owner_info = HTTParty.get("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=#{api_key}&photo_id=#{first_photo['id']}&format=json&nojsoncallback=1")

      photo_url = "https://farm#{first_photo['farm']}.staticflickr.com/#{first_photo['server']}/#{first_photo['id']}_#{first_photo['secret']}.jpg"

      owner = owner_info["photo"]["urls"]["url"][0]["_content"]
    else
      photo_url = ""
      owner = ""
    end

    blurb = ""
    return { blurb: blurb, image: photo_url, owner: owner }
  end
end
