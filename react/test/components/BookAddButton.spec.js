import BookAddButton from 'components/BookAddButton';

describe('BookAddButton', () => {
  let wrapper,
      onClick;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        onClick = jasmine.createSpy('onClick spy');
        wrapper = shallow(
          <BookAddButton
            key="1"
            onClick={onClick}
          />
        );
      });

    it('should render a button tag', () => {
      expect(wrapper.find('button')).toBePresent();
    });

    it('should render a button tag with the text property value "Add"', () => {
      expect(wrapper.find('button').text()).toContain('Add');
    });


    it('should invoke the onClick function from props when clicked', () => {
      wrapper.simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
