const router = require('express').Router();
const { Category, Product } = require('../../models');

// Get all categories and their associated products
router.get('/', async (req, res) => {
  try {
    // find all categories and their products
    const categories = await Category.findAll({include: [{model: Product}] });
    res.status(200).json(categories);
  }catch (err) {
    // Handle errors by sending a 500 status with a message
    res.status(500).json({message: 'not found!'});
  }
});

// Get a single category and its products by ID
router.get('/:id', async (req, res) => {
  try {
    // Find category with the matching ID, including its associated products
    const category = await Category.findByPk(req.params.id, { include: [{model: Product}] });

    //if the category is not found send a 404 status with a message
    if (!category) {
      res.status(404).json({message: 'id not found'});
      return;
    }
    res.status(200).json(category);
  } catch (err) {
    // Handle errors by sending a 500 statys with a message
    res.status(500).json({message: 'not found!'});
  }
});

  // create a new category
  router.post('/', async (req, res) => {
    try {
      // create a new category using the data in the request body
      const newCategory = await Category.create(req.body);
      res.status(200).json(newCategory);
    } catch (err) {
      // Hnadle errors by sending a 400 status with a message
      res.status(400).json({ message: 'createon failed'});
    }
  });

  // update a category by its `id` value
  router.put('/:id', async (req, res) => {
    try {
      // UPdate the category with the matching id using the data in the request body
      const updated = await Category.update(req.body, { where: {id: req.params.id} });

      // If the category is not found, send a 404 status with a message
      // otherwise return the updated data
      !updated[0] ? res.status(404).json({ message: 'id not found'}) : res.status(200).json(updated);
    } catch (err) {
      // Handle errors by sending a 500 status with a custom message
      res.status(500).json({message: 'update failed'});
    }
});


  // delete a category by its `id` value
  router.delete('/:id', async (req, res) => {
    try {
      // Delete the category with the matching id
      const deleted = await Category.destroy({ where: {id: req.params.id} });

      //If the category is not found, send a 404 status with a message
      // otherwise return the deleted data
      !deleted ? res.status(404).json({ message: 'id not found'}) : res.status(200).json(deleted);
    } //if there is an error, send a 500 status with the error
    catch (err) {
      res.status(500).json(err);
    }
});

//export the router
module.exports = router;

