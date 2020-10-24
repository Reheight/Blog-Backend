//#region Define the libraries required for this service
const mongoose = require("mongoose");
//#endregion

/*
- author (ID of the authors account)
- title (Maximum of 30 characters, Make sure you escape any HTML, and JSON characters)
- subtitle (Maximum of 50 characters, Make sure you escape any HTML, and JSON characters)
- context (Make sure you escape any HTML, and JSON characters)
- keywords (Array which will hold relevant keywords about the post)
- comments (This will be an array of objects for comments, which will include likes, status, author, and context)
- feedback (An array for collecting rating feedback on the post)
- active (Allows us to take down a post without taking it out of our database)
- createdAt (Timestamp of creation)
*/

const blogsSchema = new mongoose.Schema({
  author: {
    type: String,
  },
  title: {
    type: String,
    required: [true, "title is required"],
    minlength: [4, "Minimum title length is 4 characters"],
    maxlength: [30, "Maximum title length is 30 characters"],
  },
  subtitle: {
    type: String,
    required: [true, "subtitle is required"],
    minlength: [1, "Minimum title length is 4 characters"],
    maxlength: [50, "Maximum title length is 30 characters"],
  },
  context: {
    type: String,
    required: [true, "context is required"],
  },
  comments: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Blog", blogsSchema);
