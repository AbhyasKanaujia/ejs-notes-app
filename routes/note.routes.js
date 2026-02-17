const express = require("express");
const Note = require("../models/Note.js");
const requireAuth = require("../middleware/requireAuth.js");

const router = express.Router();

router.use(requireAuth);

router.get("/", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.session.userId }).sort({
      isPinned: -1,
      modifiedAt: -1,
    });
    res.render("index", { notes });
  } catch (error) {
    console.error("Failed to fetch notes: " + error.message);
    res.send("Failed to fetch notes");
  }
});

// GET create note page
router.get("/new", (req, res) => {
  res.render("new");
});

// POST create new note
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = new Note({
      title,
      content,
      userId: req.session.userId,
    });

    await note.save();
    res.redirect("/");
  } catch (error) {
    console.error("Failed to create note: " + error.message);
    res.send("Failed to create note: " + error.message);
  }
});

// GET single note
router.get("/:id", async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!note) {
      return res.send("Note not found");
    }

    res.render("show", { note });
  } catch (error) {
    console.error("Failed to fetch note: " + error.message);
    res.send("Failed to fetch note");
  }
});

// GET edit note page
router.get("/:id/edit", async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!note) {
      return res.send("Note not found");
    }

    res.render("edit", { note });
  } catch (error) {
    console.error("Failed to fetch note: " + error.message);
    res.send("Failed to fetch note");
  }
});

// PUT update note
router.put("/:id", async (req, res) => {
  try {
    const { title, content, tags, isPinned } = req.body;

    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.session.userId },
      { title, content, tags: tags ? tags.split(",") : [], isPinned },
      { returnDocument: "after", runValidators: true },
    );

    if (!note) {
      return res.send("Note not found");
    }

    res.redirect(`/${note._id}`);
  } catch (error) {
    console.error("Failed to update note: " + error.message);
    res.send("Failed to update note: " + error.message);
  }
});

// DELETE note
router.delete("/:id", async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.session.userId,
    });

    if (!note) {
      return res.send("Note not found");
    }

    res.redirect("/");
  } catch (error) {
    console.error("Failed to delete note: " + error.message);
    res.send("Failed to delete note");
  }
});

module.exports = router;
