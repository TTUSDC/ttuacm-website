/* eslint no-console: 0  */
import React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import TextField from './TextField.jsx';

const onNewValueSpy = spy();

const initProps = {
  title: 'title',
  tag: 'test-tag',
  hide: true,
  error: '',
  currentValue: 'value',
  onNewValue: onNewValueSpy,
};

describe('TextField.jsx', () => {
  it('should call the handler function that was passed as a prop', () => {
    const wrapper = shallow(<TextField {...initProps} />);
    wrapper.find('#test-tag').simulate('change', { target: { value: 'Changed Value' } });
    expect(onNewValueSpy.calledOnce).to.equal(true);
  });

  it('should display the FormHelperText component when there is an error', () => {
    const props = {
      ...initProps,
      error: 'there is one',
    };
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper.find('#test-tag-error').props().display).to.equal('none');
  });

  it('should not display the FormHelperText component when there is no error', () => {
    const props = {
      ...initProps,
      error: '',
    };
    const wrapper = shallow(<TextField {...props} />);
    expect(wrapper.find('#test-tag-error').props().display).to.equal(null);
  });

  it('should display the title in the InputLabel', () => {
    const wrapper = shallow(<TextField {...initProps} />);
    expect(wrapper.find('[htmlFor="test-tag"]').render().text()).to.equal('title');
  });
});
