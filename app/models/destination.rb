class Destination < ActiveRecord::Base
  has_many :user_destinations
  has_many :users, through: :user_destinations

  validates :country, presence: true

  def get_details(keywords)
    if keywords[:city].nil? || keywords[:city].strip.length == 0
      url = URI("https://www.tripadvisor.com/#{keywords[:country]}")
    else
      url = URI("https://www.tripadvisor.com/#{keywords[:city]}")
    end

    html = Nokogiri::HTML(open(url))
    blurb = html.css('.highlightsSection').css('.blurb').css('.content').text
    image = html.css('.heroPhotoImg').attr('src').value
    return { blurb: blurb, image: image }
  end
end
