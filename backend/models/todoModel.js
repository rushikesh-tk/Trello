import mongoose from "mongoose";

const todoSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    todos: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: false,
        },
        status: {
          type: Number,
          required: true,
          default: 0,
        },
        createdAt: {
          type: Date,
        },
        updatedAt: {
          type: Date,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
