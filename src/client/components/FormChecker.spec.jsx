/* eslint no-console: 0  */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import FormChecker from './FormChecker.jsx';

const Component = () => <p>This component is just to test if the props were passed properly</p>;

let wrapper;
beforeEach(() => {
  const WrappedComponent = FormChecker(Component);
  wrapper = mount(<WrappedComponent />); // using mount to check for children
});

test('should pass an error when email is invalid', () => {
  wrapper.instance().validate('email', { email: 'Wrong!' });
  wrapper.update();
  expect(wrapper.children().props().emailErr).to.equal('Please use a TTU email address.');
});

test('should pass an error when passwords do not match', () => {
  wrapper.instance().validate('confirmPass', { password: 'Not', confirmPass: 'Matching' });
  wrapper.update();
  expect(wrapper.children().props().confirmErr).to.equal('Please enter a matching password.');
});

test('should pass an error when ID is invalid', () => {
  wrapper.instance().validate('id', { id: '1234567' });
  wrapper.update();
  expect(wrapper.children().props().idErr).to.equal('Please use 8 numbers.');
});

test('should pass an error when password is invalid', () => {
  wrapper.instance().validate('password', { password: 'notagoodpassword' });
  wrapper.update();
  expect(wrapper.children().props().passErr).not.to.equal('');
});
