const router = require('express').Router();

const models = require('../db/models');

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await models.users.create({ name, email, password });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await models.users.findAll();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get a user by ID
router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await models.users.findByPk(id); // { include: { model: models.Cars, as: 'carDetails' } }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

router.get('/users/:id/cars', async (req, res) => {
   
    try {
        const { id } = req.params;
        const user = await models.users.findByPk(id, {
            attributes: ['name', 'email'],
            include: [ {
                model: models.Cars, 
                as: 'carDetails',
                attributes: ['title', 'description'],
            }]
        });

        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user and cars' });
    }
});


module.exports = router;
