import BookIcon from 'components/BookIcon';

describe('BookAddButton', () => {
  let selectedBook,
      wrapper;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
    beforeEach(() => {
      selectedBook = {"id":1,"title":"test title","authors":"test author","description":"test description","category":"test category","url":"test url","image":"test image"};
      wrapper = shallow(
        <BookIcon book={selectedBook} />
      );
    });

    it('should render an anchor tag', () => {
      expect(wrapper.find('a')).toBePresent();
    });

    it('should render an anchor tag with the specific props', () => {
      expect(wrapper.find('a').prop('href')).toEqual('test url');
    });

    it('should render an img tag with the specific props', () => {
      expect(wrapper.find('img').props()).toEqual({
        src: 'test image'
      });
    });

    it('should render an h4 tag with the text property value "test title"', () => {
      expect(wrapper.find('h4').text()).toBe('test title');
    });

    it('should render an h5 tag with the text property value "test author"', () => {
      expect(wrapper.find('h5').text()).toBe('test author');
    });
  });
});
