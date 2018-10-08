const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  profileImage: {type: String, default: ''},
  resume: { type: String, default: '' },
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: false },
  classification: { type: String, required: true, default: 'Other' },
  hasPaidDues: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
});

const Profile = module.exports = mongoose.model('Profiles', userSchema);
