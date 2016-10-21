import DeleteDestinationButton from 'components/DeleteDestinationButton';

describe('DeleteDestinationButton', () => {
  let wrapper,
      onClick;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        onClick = jasmine.createSpy('onClick spy');
        wrapper = shallow(
          <DeleteDestinationButton
            key="1"
            id="1"
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
