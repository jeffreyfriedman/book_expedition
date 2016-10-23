import App from 'components/App';
import DestinationTitle from 'components/DestinationTitle';
import DestinationDetails from 'components/DestinationDetails';
import NewDestination from 'components/NewDestination';

describe('App', () => {
  let wrapper,
      handleBookAddClick,
      selectedDestination,
      userDestinations;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        spyOn(App.prototype, 'handleFormSubmit').and.callThrough();
        spyOn(App.prototype, 'handleCountryChange').and.callThrough();
        spyOn(App.prototype, 'handleCityChange').and.callThrough();
        spyOn(App.prototype, 'handleDestinationClick').and.callThrough();
        spyOn(App.prototype, 'handleBookAddClick');
        wrapper = shallow(<App />);
      });

    it('should should have the specified inital state', () => {
      expect(wrapper.state()).toEqual({
        userInfo: [],
        userDestinations: [],
        userDestinationNotes: [],
        userBooks: [],
        selectedDestination: "",
        selectedDestinationBooks: [],
        editableDestinationNote: false,
        newDestinationNoteBody: "",
        newCountry: "",
        newCity: "",
        blurb: "",
        image: ""
      });
    });

    it('should render a div tag', () => {
      expect(wrapper.find('div')).toBePresent();
    });

    it('should render an h1 tag with the text property value "Book Expedition"', () => {
      expect(wrapper.find('h1').text()).toContain('Book Expedition');
    });

    it('should render an DestinationTitle Component', () => {
      wrapper.setState({ userDestinations: [{"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"}] });
      expect(wrapper.find(DestinationTitle)).toBePresent();
    });

    it('should render an NewDestination Component', () => {
      expect(wrapper.find(NewDestination)).toBePresent();
    });

    it('should render a DestinationDetails Component', () => {
      let newDestination = {"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"};
      wrapper.setState({ selectedDestination: newDestination });
      wrapper.setState({ userDestinations: [newDestination] });
      expect(wrapper.find(DestinationDetails)).toBePresent();
    });

    it('should render the DestinationDetails Component with specific props when selectedDestination has an id', () => {
      let newDestination = {"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"};
      let newBook = {"id":1,"title":"test title","author":"test author","description":"test description","url":"test url","image":"test image"};
      let handleBookAddClick = App.prototype.handleBookAddClick;
      wrapper.setState({ userBooks: [newBook] })
      wrapper.setState({ selectedDestination: newDestination });
      wrapper.setState({ selectedDestinationBooks: [newBook] });
      wrapper.setState({ userDestinations: [newDestination] });

      expect(wrapper.find(DestinationDetails).prop('myBooks')).toEqual([newBook]);
      expect(wrapper.find(DestinationDetails).prop('selectedDestination')).toEqual(newDestination);
      expect(wrapper.find(DestinationDetails).prop('selectedDestinationBooks')).toEqual([newBook]);
    });

    describe('handleDestinationClick', () => {
      it('should be invoked when the function assigned to the onClick propety of the DestinationTitle props is executed', () => {
        wrapper.setState({ userDestinations: [{"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"}] });
        wrapper.setState({ userDestinationNotes: [{"id":1,"user_id":1,"destination_id":1,"note": "test note"}] });
        wrapper.find(DestinationTitle).props().onClick();
        expect(App.prototype.handleDestinationClick).toHaveBeenCalled();
      });

      it('should change the selectedDestination property in the state to the object of the clicked destination', () => {
        wrapper.setState({ userDestinations: [{"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"}] });
        wrapper.setState({ userDestinationNotes: [{"id":1,"user_id":1,"destination_id":1,"note": "test note"}] });
        wrapper.find(DestinationTitle).props().onClick();
        let selDestId = wrapper.state().userDestinations[0];
        expect(wrapper.state().selectedDestination).toEqual(selDestId);
      });

      it('should change the selectedDestination property in the state to the object of the clicked destination', () => {
        wrapper.setState({ userDestinations: [{"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"}] });
        wrapper.setState({ userDestinationNotes: [{"id":1,"user_id":1,"destination_id":1,"note": "test note"}] });
        wrapper.find(DestinationTitle).props().onClick();
        let selDestId = wrapper.state().userDestinations[0];
        expect(wrapper.state().selectedDestination).toEqual(selDestId);
      });
    });

    describe('full DOM rendered component', () => {
      beforeEach(() => {
        spyOn(App.prototype, 'componentDidMount').and.callThrough();
        spyOn(global, 'alert');
        wrapper = mount(<App />);
      });

      it('should invoke componentDidMount', () => {
        expect(App.prototype.componentDidMount).toHaveBeenCalled();
      });

      it('should render a div tag with the text property value "Tokyo Japan"', () => {
        wrapper.setState({ userDestinations: [{"id":1,"country":"Japan","city":"Tokyo","short_description":"\nTradition collides with pop culture in Tokyo, where you can reverently wander ancient temples before rocking out at a karaoke bar. Wake up before the sun to catch the lively fish auction at the Tsukiji Market, then refresh with a walk beneath the cherry blossom trees that line the Sumida River. Spend some time in the beautiful East Gardens of the Imperial Palace, then brush up on your Japanese history at the Edo-Tokyo Museum. Don’t forget to eat as much sushi, udon noodles, and wagashi (Japanese sweets) as your belly can handle.\n","image":"https://media-cdn.tripadvisor.com/media/photo-s/01/2f/bc/7a/gates-to-imperial-palace.jpg","created_at":"2016-10-18T00:12:03.899Z","updated_at":"2016-10-18T00:12:03.899Z"}] });
        wrapper.setState({ userDestinationNotes: [{"id":1,"user_id":1,"destination_id":1,"note": "test note"}] });
        wrapper.find(DestinationTitle).props().onClick();
        expect(wrapper.find('.destinationDetails').text()).toContain('Tokyo');
        expect(wrapper.find('.destinationDetails').text()).toContain('Japan');
      });
    });
  });
});
