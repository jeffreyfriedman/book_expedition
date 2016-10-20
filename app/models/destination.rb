class Destination < ActiveRecord::Base
  has_many :user_destinations
  has_many :users, through: :user_destinations

  has_many :book_destinations, dependent: :destroy
  has_many :books, through: :book_destinations

  validates :country, presence: true

  def get_details(keywords)
    api_key = ENV['FLICKR_KEY']
    formatted_keywords = "#{keywords[:country]}" + "#{keywords[:city].to_s}"
    photos = HTTParty.get("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=#{api_key}&text=#{formatted_keywords}%20landmark&sort=relevance&license=1%2C2%2C3%2C4%2C5%2C6%2C7%2C8&safe_search=1&content_type=1&media=photos&extras=original_format&format=json&nojsoncallback=1")

    if !photos.nil?
      index = 0
      while photos["photos"]["photo"][index]['originalsecret'].nil? || photos["photos"]["photo"][index]['originalformat'].nil?
        binding.pry
        index += 1
      end
      first_photo = photos["photos"]["photo"][0]

      owner_info = HTTParty.get("https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=#{api_key}&photo_id=#{first_photo['id']}&format=json&nojsoncallback=1")
      original_secret = first_photo['originalsecret']
      original_format = first_photo['originalformat']
      photo_url = "https://farm#{first_photo['farm']}.staticflickr.com/#{first_photo['server']}/#{first_photo['id']}_#{original_secret}_o.#{original_format}"

      owner = owner_info["photo"]["urls"]["url"][0]["_content"]
    else
      photo_url = ""
      owner = ""
    end

    blurb = ""
    return { blurb: blurb, image: photo_url, owner: owner }
  end

  def self.retrieve_relevant_books(destination)
    binding.pry
    relevant_books = destination.books
    if !relevant_books.empty?
    else
      culture_book = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{destination.country}+#{destination.city}+culture")
      travel_book = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{destination.country}+#{destination.city}+travel")
      business_book = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{destination.country}+#{destination.city}+business")
      novel_book = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{destination.country}+#{destination.city}+novel")
      history_book = HTTParty.get("https://www.googleapis.com/books/v1/volumes?q=#{destination.country}+#{destination.city}+history")
      binding.pry
      #title = culture_book["items"][0]["volumeInfo"]["title"]
      #author = culture_book["items"][0]["volumeInfo"]["author"]
      #description = culture_book["items"][0]["volumeInfo"]["description"]
      #isbn = culture_book["items"][0]["volumeInfo"]["industryIdentifiers"][0]["identifier"]
      #image = culture_book["items"][0]["imageLinks"]["smallThumbnail"]
      #url = https://www.amazon.com/dp/#{isbn}?tag=#{ENV['AMAZON_ASSOCIATE_KEY']}"
    end
  end
end
