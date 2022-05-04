const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET route for all tags
router.get('/', (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: "products_tag" }],
    });
    res.status(200).json(tagData);

  } catch (error) {

    console.log(error)
    res.status(500).json(error);
  }
});
// GET route for tags by ID
router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});
// POST route to add a new tag
router.post('/', (req, res) => {
  // create a new tag
});
// PUT route to UPDATE tag name by ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});
// DELETE route by ID
router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
