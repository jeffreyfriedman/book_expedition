import MyBookList from 'components/MyBookList';

describe('MyBookList', () => {
  let wrapper,
      books,
      onClick;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        books = [{"id":1,"title":"test title","author":"test author","description":"test description","url":"test url","image":"test image"}];
        onClick = jasmine.createSpy('onClick spy');
        wrapper = shallow(
          <MyBookList
            books={books}
            handleBookDeleteClick={onClick}
          />
        );
      });

    it('should render a div tag', () => {
      expect(wrapper.find('div')).toBePresent();
    });

    it('should render a figure tag', () => {
      expect(wrapper.find('figure')).toBePresent();
    });

    it('should render a figcaption tag', () => {
      expect(wrapper.find('figcaption')).toBePresent();
    });

    it('should render a figcaption tag with the text property value "test title"', () => {
      expect(wrapper.find('figcaption').text()).toContain('test title');
    });
  });
});
