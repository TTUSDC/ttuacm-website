/* eslint no-console: 0  */
import React from 'react';
import { spy } from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { ModalView } from './ModalView.jsx';

// Must provide classes props or test will error out
describe('ModalView Component', () => {
  const toggleSpy = spy();
  const props = {
    classes: {},
    toggle: toggleSpy,
    open: true,
    fullScreen: true,
  };
  let wrapper;
  it('should call the toggle function when the user clicks the close button', () => {
    wrapper = shallow(<ModalView {...props} />);
    wrapper.find('.close-button').simulate('click');
    expect(toggleSpy.calledOnce).to.equal(true);
  });
});
