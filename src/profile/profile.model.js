const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
  profileImage: { type: String, default: '' },
  resume: { type: String, default: '' },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  classification: { type: String, required: true, default: 'Other' },
  hasPaidDues: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
});

class Profile {}

module.exports = Profile;
