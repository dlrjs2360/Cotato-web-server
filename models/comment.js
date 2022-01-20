const mongoose = require("mongoose")

const commentSchema = mongoose.Schema(
  {
    // 댓글 쓰는 게시물 아이디
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    // 대댓글 구현시 부모 댓글이 무엇인지
    parentComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      required: true,
    },
    depth: {
      type: Number,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { toObject: { virtuals: true }, toJSON: { virtuals: true } }
)

commentSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "parentComment",
})

commentSchema
  .virtual("childComments")
  .get(function () {
    return this._childComments
  })
  .set(function (v) {
    this._childComments = v
  })

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
