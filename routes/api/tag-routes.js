const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// Get all tags
router.get("/", async (req, res) => {
  try {
    const tags = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tags);
  } catch (err) {
    console.error("Error fetching tags:", err);
    res.status(500).json({ error: "Failed to retrieve tags" });
  }
});

// Get a tag by id
router.get("/:id", async (req, res) => {
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    console.error("Error fetching tag by ID:", err);
    res.status(500).json({ error: "Failed to retrieve tag" });
  }
});

// Create a new tag
router.post("/", async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(201).json(newTag);
  } catch (err) {
    console.error("Error creating tag:", err);
    res.status(400).json({ error: "Failed to create tag" });
  }
});

// Update a tag's name by its `id` value
router.put("/:id", async (req, res) => {
  try {
    const [updatedCount] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedCount === 0) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.status(200).json({ message: "Tag updated successfully" });
  } catch (err) {
    console.error("Error updating tag:", err);
    res.status(500).json({ error: "Failed to update tag" });
  }
});

// Delete a tag by its `id` value
router.delete("/:id", async (req, res) => {
  try {
    const deletedCount = await Tag.destroy({ where: { id: req.params.id } });
    if (deletedCount === 0) {
      res.status(404).json({ error: "Tag not found" });
      return;
    }
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    console.error("Error deleting tag:", err);
    res.status(500).json({ error: "Failed to delete tag" });
  }
});

module.exports = router;
