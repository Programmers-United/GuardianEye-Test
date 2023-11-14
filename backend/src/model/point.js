const { v4: uuidv4 } = require('uuid');
const mongoose = require("../database/connectDataBase");
const { Schema } = mongoose;

const pointSchema = new Schema({
  // Attributes of the collection
  _id:{
    type: String,
    default: uuidv4,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['assalto', 'roubo', 'furto', 'outros'],
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  time: {
    type: Date, // In Mongoose, time is often stored as a Date object
    required: true,
  },
  geometric: {
    type: {
      type: String,
      enum: ["Point"], // assuming you're storing a Point
      required: true,
    },
    coordinates: {
      type: [Number], // assuming you're using GeoJSON format [longitude, latitude]
      required: true,
    },
  },
});

// Create a Mongoose model
const Point = mongoose.model("Point", pointSchema);

// Synchronize function is not needed in Mongoose

module.exports = Point;
