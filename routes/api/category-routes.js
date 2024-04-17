const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories and their associated products
router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({ include: [{ model: Product }] });
    res.status(200).json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a single category and its products by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: [{ model: Product }] });
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    console.error('Error fetching category by ID:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json(newCategory);
  } catch (err) {
    console.error('Error creating category:', err);
    res.status(400).json({ error: 'Invalid data provided' });
  }
});

// Update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const [updatedCount, updatedCategories] = await Category.update(req.body, { where: { id: req.params.id } });
    if (updatedCount === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category updated successfully' });
  } catch (err) {
    console.error('Error updating category:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deletedCount = await Category.destroy({ where: { id: req.params.id } });
    if (deletedCount === 0) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (err) {
    console.error('Error deleting category:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
