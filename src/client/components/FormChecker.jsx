import React from 'react';
import logger from 'utils/logger';

const FormChecker = Component => class extends React.Component {
  state = {
    emailErr: '',
    passErr: '',
    newPassErr: '',
    confirmErr: '',
    idErr: '',
  }

  checkEmail = (email) => {
    let output = '';

    if(email === '') {
      output = '';
    } else if(/@ttu.edu$/.test(email) !== true) {
      output = 'Please use a TTU email address.';
    }

    this.setState({
      ...this.state,
      emailErr: output,
    });
  };

  checkPassQuality = (password) => {
    let output = '';

    if(password === '') {
      // Empty value will take out error
      output = '';
    } else if (/^[\x00-\x7F]+$/.test(password) !== true) {
      // ASCII only
      output = 'Please use only ASCII characters.';
    } else if(password.length < 8) {
      // 8 characters long
      output = 'Please use at least 8 characters.';
    } else if(/[A-Z]/.test(password) !== true) {
      // 1 uppercase
      output = 'Please use at least one uppercase letter.';
    } else if(/[a-z]/.test(password) !== true) {
      // 1 lowercase
      output = 'Please use at least one lowercase letter.';
    } else if(/[0-9]/.test(password) !== true) {
      // 1 number
      output = 'Please use at least one number.';
    } else if(/[^A-Za-z0-9]/.test(password) !== true) {
      // 1 special character
      output = 'Please use at least one special character.';
    }

    return output;
  }

  checkPass = (password) => {
    const output = this.checkPassQuality(password);
    this.setState({
      ...this.state,
      passErr: output,
      confirmErr: '',
    });
  };

  checkNewPass = (password) => {
    const output = this.checkPassQuality(password);
    this.setState({
      ...this.state,
      newPassErr: output,
    });
  };

  checkConfirm = (password, confirm) => {
    let output = '';

    if (password === '') {
      output = '';
    } else if(password !== confirm) {
      output = 'Please enter a matching password.';
    }

    this.setState({
      ...this.state,
      confirmErr: output,
    });
  };

  checkID = (studentID) => {
    let output = '';

    if(/^[0-9]{8}$/.test(studentID) !== true) {
      output = 'Please use 8 numbers.';
    }

    this.setState({
      ...this.state,
      idErr: output,
    });
  };

  /**
   * Used to validate different types of inputs
   *
   * @param {string} tag the type of input
   * @param {string} currentValues the current value of the input field
   */
  validate = (tag, currentValues) => {
    switch(tag) {
      case 'confirmPass':
        this.checkConfirm(
          currentValues.password,
          currentValues.confirmPass,
        );
        break;
      case 'password':
        this.checkPass(currentValues.password);
        break;
      case 'newPassword':
        this.checkNewPass(currentValues.newPassword);
        break;
      case 'email':
        this.checkEmail(currentValues.email);
        break;
      case 'id':
        this.checkID(currentValues.id);
        break;
      default:
        // Don't validate the input
        logger.error(`${tag} tag not supported`);
        break;
    }
  }

  render() {
    return (
      <Component
        validate={this.validate}
        {...this.state}
        {...this.props}
      />
    );
  }
};

export default FormChecker;
