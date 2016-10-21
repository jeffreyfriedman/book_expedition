import BookDeleteButton from 'components/BookDeleteButton';

describe('BookDeleteButton', () => {
  let wrapper,
      onClick;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        onClick = jasmine.createSpy('onClick spy');
        wrapper = shallow(
          <BookDeleteButton
            key="1"
            onClick={onClick}
          />
        );
      });

    it('should render a button tag', () => {
      expect(wrapper.find('button')).toBePresent();
    });

    it('should render a button tag with the text property value "Delete"', () => {
      expect(wrapper.find('button').text()).toContain('Delete');
    });


    it('should invoke the onClick function from props when clicked', () => {
      wrapper.simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
