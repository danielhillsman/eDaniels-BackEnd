const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET route for all tags
router.get('/', async (req, res) => {
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
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: "products_tag" }],
    });
    // Send error message if ID doesn't match
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found by that ID...' });
      return;
    }

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }
});
// POST route to add a new tag
router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);

  } catch (err) {
    res.status(400).json(err);
  }
});
// PUT route to UPDATE tag name by ID
router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
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
// DELETE route by ID
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: { id: req.params.id }
    });
    // Send error message if ID doesn't match
    if (!tagData) {
      res.status(404).json({ message: 'No Tag with that ID...' });
      return;
    }
    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err);
  }

});
// Exports this file
module.exports = router;
