const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

module.exports = mongoose.model('Image', {
  name: String,
  description: String,
  path: String,
  created_by: ObjectId, // User ID
  likes: [ObjectId],    // Array of User IDs
  comments: [{}]        // ObjectId (User ID) & String (content)
});