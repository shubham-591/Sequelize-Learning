const router = require('express').Router();
const models = require('../db/models');

// Create a new tag
router.post('/tags', async (req, res) => {
  try {
    const { name } = req.body;
    const tag = await models.Tag.create({ name });
    res.status(201).json(tag);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create tag' });
  }
});

// Get all tags
router.get('/tags', async (req, res) => {
  try {
    const tags = await models.Tag.findAll();
    res.json(tags);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tags' });
  }
});

// Get a tag by ID
router.get('/tags/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await models.Tag.findByPk(id);
    if (tag) {
      res.json(tag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tag' });
  }
});

// Update a tag by ID
router.put('/tags/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [updated] = await models.Tag.update({ name }, { where: { id } });
    if (updated) {
      const updatedTag = await models.Tag.findByPk(id);
      res.json(updatedTag);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update tag' });
  }
});

// Delete a tag by ID
router.delete('/tags/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await models.Tag.destroy({ where: { id } });
    if (deleted) {
      res.status(204).json({ message: 'Tag deleted' });
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete tag' });
  }
});

// Get all cars associated with a tag
router.get('/tags/:id/cars', async (req, res) => {
  try {
    const { id } = req.params;
    const tag = await models.Tag.findByPk(id, {
      include: { model: models.Cars, as: 'cars' },
    });

    if (tag) {
      res.json(tag.cars);
    } else {
      res.status(404).json({ error: 'Tag not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cars for tag' });
  }
});

// Add tags to a car
router.post('/cars/:carId/tags', async (req, res) => {
  const { carId } = req.params;
  const { tagIds } = req.body; // An array of tag IDs

  try {
    const car = await models.Cars.findByPk(carId);

    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    const tags = await models.Tag.findAll({
      where: {
        id: tagIds,
      },
    });

    await car.addTags(tags); // Add the tags to the car using the many-to-many relationship

    res.status(201).json({ message: 'Tags added to car successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add tags to car' });
  }
});

module.exports = router;
