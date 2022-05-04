// Importing files
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET route to find all
router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);

  } catch (error) {
    res.status(500).json(error);
  }
});
// GET route to find by ID
router.get('/:id', (req, res) => {
 // find one category by its `id` value
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!categoryData) {
     // Send error message if ID doesn't match
      res.status(404).json({ message: 'No Category by that ID...' });
      // Returns function
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});
// POST route to add
router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});
// PUT route to update by its ID
router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((productTag) => {
      res.status(200).json(productTag);

    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});
// DELETE route to delete by its ID
router.delete('/:id', (req, res) => { 
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: { id: req.params.id }
    });
    // Send error message if ID doesn't match
    if (!categoryData) {
      res.status(404).json({ message: 'No Category by that ID!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
