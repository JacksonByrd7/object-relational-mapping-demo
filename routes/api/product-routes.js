const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// Get all products, including associated Category and Tag data
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Failed to retrieve products" });
  }
});

// Get a single product, including associated Category and Tag data
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product by ID:", err);
    res.status(500).json({ error: "Failed to retrieve product" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds && req.body.tagIds.length) {
      await ProductTag.bulkCreate(
        req.body.tagIds.map((tag_id) => ({
          product_id: product.id,
          tag_id,
        }))
      );
    }
    res.status(201).json(product);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(400).json({ error: "Failed to create product" });
  }
});

// Update a product by its `id` value
router.put("/:id", async (req, res) => {
  try {
    await Product.update(req.body, { where: { id: req.params.id } });

    // Update product tags
    if (req.body.tags && req.body.tags.length > 0) {
      await ProductTag.destroy({ where: { product_id: req.params.id } });
      await ProductTag.bulkCreate(
        req.body.tags.map((tag_id) => ({
          product_id: req.params.id,
          tag_id,
        }))
      );
    }

    // Fetch updated product with tags
    const updatedProduct = await Product.findByPk(req.params.id, { include: [{ model: Tag }] });
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

// Delete a product by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ error: "Product not found" });
      return;
    }
    res.status(200).json(deleted);
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
