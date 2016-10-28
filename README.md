![Build Status](https://codeship.com/projects/045ac6c0-717c-0134-b396-66707d799ba6/status?branch=master)
[![Code Climate](https://codeclimate.com/github/jeffreyfriedman/breakable_toy/badges/gpa.svg)](https://codeclimate.com/github/jeffreyfriedman/breakable_toy)

# Book Expedition
Book Expedition serves the avid reader who is interested in travel.  Users can enter
destinations to which they would like to travel, and the application will send out an
API request to Flickr to retrieve an image representative of that destination to show
to the user.  At the same time, the app will retrieve a list of books that are related
to that destination from the Goolge Books API, and the user can add those books to
his/her reading list.  Users can also take notes on their destinations to help plan
their travel itineraries.

The project uses the following libraries and frameworks:

* React, React Router
* D3
* AJAX
* Javascript
* Ruby on Rails
* Materialize CSS

## Demo
For a live demo of the site, please visit: [Book Expedition](http://bookexpedition.herokuapp.com/).


## Setup
The app uses Ruby 2.3.1 and was developed on Ruby on Rails 5.0.0.1.  React is served up
in Node.js using webpack 1.13.2.

To install, please run the following in your terminal:

### Set up Rails
```
git clone https://github.com/jeffreyfriedman/book_expedition.git
cd book_expedition
bundle install
rake db:create
rake db:migrate
```

### Set up Webpack
`npm install`

To retrieve images from Flickr, you will need to sign up for a Flickr API key.
Once you have your Flickr API key, create a .env file in the root directory,
and add your Flickr API key with the following format:

```
FLICKR_KEY=<YOUR_API_KEY>
```

## Running the application
To run Book Expedition, please run the following commands in your terminal from the
`book_expedition` directory:

```
rails s
npm start
```

Now open your browser and enter `localhost:3000` in your address bar.

## Testing
To run the test suite, please enter the following command from the `book_expedition`
root directory:

`rspec`
