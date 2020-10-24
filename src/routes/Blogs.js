//#region - Defining the resources needed
const express = require("express");
const router = express.Router();
//#endregion

//#region - Defining the Blog Account MongoDB Schema
const { Blog } = require("../Models");
//#endregion

//#region - Getting all blogs
router.get("/", (req, res) => {
  return Blog.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ message: err }));
});
//#endregion

//#region - Getting specific blog
router.get("/:id", (req, res) => {
  return Blog.findById(req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) => res.json({ message: err }));
});
//#endregion

//#region - Creating a blog
router.post("/", (req, res) => {
  const blog = new Blog({
    title: req.body.title,
    subtitle: req.body.subtitle,
    context: req.body.context,
  });

  blog
    .save()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      const errors = handleErrors(err);
      res.status(400).json({ errors });
    });
});
//#endregion

//#region - Updating a blog
router.patch("/:id", async (req, res) => {
  let blog = "";
  let updatedBlog = {};
  try {
    blog = await Blog.findById(req.params.id);
    updatedBlog = {
      comments: blog.comments,
      _id: blog._id,
      title: req.body.title ? req.body.title : blog.title,
      subtitle: req.body.subtitle ? req.body.subtitle : blog.subtitle,
      context: req.body.context ? req.body.context : blog.context,
      createdAt: blog.createdAt,
      __v: blog.__v,
    };
    return Blog.findByIdAndUpdate({ _id: req.params.id }, { $set: updatedBlog })
      .then((data) => res.status(200).json(updatedBlog))
      .catch((err) => res.json({ message: err }));
  } catch (err) {
    res.json({ message: err });
  }
});
//#endregion

//#region - Deleting a blog
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.deleteOne({ _id: req.params.id });
    res.json(deletedBlog);
  } catch {}
});
//#endregion

// functions

//#region - Where we handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { title: "", subtitle: "", context: "" };

  // validation errors
  if (err.message.includes("Blog validation failed")) {
    console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};
//#endregion

module.exports = router;
