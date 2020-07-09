const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('Todo', TodoSchema);
