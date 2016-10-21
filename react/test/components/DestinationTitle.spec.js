import DestinationTitle from 'components/DestinationTitle';

describe('DestinationTitle', () => {
  let wrapper,
      onClick;

  beforeEach(() => {
    jasmineEnzyme();
  });

  describe('shallow rendered component', () => {
      beforeEach(() => {
        onClick = jasmine.createSpy('onClick spy');
        wrapper = shallow(
          <DestinationTitle
            key="1"
            id="1"
            country="Japan"
            city="Tokyo"
            onClick={onClick}
          />
        );
      });

    it('should render an li tag', () => {
      expect(wrapper.find('li')).toBePresent();
    });

    it('should render an li tag with the text property value "Japan"', () => {
      expect(wrapper.find('li').text()).toContain('Japan');
    });

    it('should render an li tag with the text property value "Tokyo"', () => {
      expect(wrapper.find('li').text()).toContain('Tokyo');
    });

    it('should invoke the onClick function from props when clicked', () => {
      wrapper.simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
