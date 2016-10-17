class Destination < ActiveRecord::Base
  validates :country, presence: true
  
  def get_details(keywords)
    if keywords[:city].nil?
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
