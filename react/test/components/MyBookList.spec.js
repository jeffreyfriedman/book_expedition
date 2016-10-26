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
        books = [{"id":1,"title":"test title","authors":"test author","description":"test description","url":"test url","image":"test image"}];
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

    it('should render a p tag with the text property value "test title"', () => {
      expect(wrapper.find('p.booktitle').text()).toContain('test title');
    });
  });
});
