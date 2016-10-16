import UserDashboard from 'components/UserDashboard';
import { shallow } from 'enzyme';
import React from 'react';

describe('UserDashboard', () => {
  let image,
      onClick,
      text,
      wrapper;

  beforeEach(() => {
    jasmineEnzyme();
    onClick = jasmine.createSpy('onClick spy');
    wrapper = shallow(
      <UserDashboard
        text="John Doe"
        onClick={onClick}
      />
    );
  });

  it('should render a div tag', () => {
    expect(wrapper.find('div')).toBePresent();
  });

  it('should render a div tag with the text property value', () => {
    expect(wrapper.find('div').text()).toBe('John Doe');
  });

  it('should invoke the onClick function from props when clicked', () => {
    wrapper.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
