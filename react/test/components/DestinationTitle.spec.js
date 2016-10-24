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

    it('should render a span tag', () => {
      expect(wrapper.find('span')).toBePresent();
    });

    it('should render a div tag with the text property value "Japan"', () => {
      expect(wrapper.find('.card-title').text()).toContain('Japan');
    });

    it('should render an div tag with the text property value "Tokyo"', () => {
      expect(wrapper.find('.card-title').text()).toContain('Tokyo');
    });

    it('should invoke the onClick function from props when clicked', () => {
      wrapper.find('.seeDetails').simulate('click');
      expect(onClick).toHaveBeenCalled();
    });
  });
});
