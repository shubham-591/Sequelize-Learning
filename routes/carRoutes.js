const router = require('express').Router();

const models = require('../db/models');

router.post('/create', async (req, res) => {
    try {
        const { title, description, launched, userId } = req.body; // Ensure userId is included in the request body

        const newCar = await models.Cars.create({
            title,
            description,
            launched,
            userId // Assign the userId to the car
        });

        res.status(201).json(newCar);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create car' });
    }
});

router.get('/cars', (req, res) => {
    models.Cars.findAll()
    .then((cars) => {
        res.json(cars);
    }).catch((err) => {
        console.log(err);
    })
});

// router.get('/cars/:id' ,(req, res) => {
//     const {id} = req.params;

//     // models.Cars.findByPk(id)
//     models.Cars.findByPk(id)   //If we want the corresponding user also then write this after id, { include: { model: models.users, as: 'owner' } }
//     .then((cars) => {
//         res.json(cars);
//     }).catch((err) => {
//         console.log(err);
        
//     })
// })
router.get('/cars/:id', (req, res) => {
    const { id } = req.params;
  
    models.Cars.findByPk(id, {
      include: [{
        model: models.Tag,
        as: 'tags' // Ensure the alias matches the one used in the association
      }]
    })
      .then((car) => {
        if (!car) {
          return res.status(404).json({ error: 'Car not found' });
        }
        res.json(car);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: 'Failed to retrieve car' });
      });
  });
  

router.put('/cars/:id', (req, res) => {
    const {id} = req.params;
    const {title, description, launched} = req.body;

    models.Cars.update({
        title, description, launched
    },
    {
        where: {id}
    })
    .then((cars) => {
        res.json(cars);
    }).catch((err) => {
        console.log(err);
        
    })
});

router.delete('/cars/:id', (req, res) => {
    const {id} = req.params;

    models.Cars.destroy(
    {
        where: {id}
    })
    .then((cars) => {
        res.json(cars);
    }).catch((err) => {
        console.log(err);
        
    })
})

router.get('/cars/:id/users', async (req, res) => {

    try {
        const { id } = req.params;
        const car = await models.Cars.findByPk(id, {
            include: { model: models.users, as: 'owner' }
        });

        if (car) {
            res.json(car);
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch car and owner' });
    }
});

// // In your carroutes.js or a new route file for tags
// router.post('/cars/:carId/tags', async (req, res) => {
//     const { carId } = req.params;
//     const { tagIds } = req.body; // An array of tag IDs
  
//     try {
//       const car = await models.Cars.findByPk(carId);
  
//       if (!car) {
//         return res.status(404).json({ error: 'Car not found' });
//       }
  
//       const tags = await models.Tag.findAll({
//         where: {
//           id: tagIds,
//         },
//       });
  
//       await car.addTags(tags); // Add the tags to the car using the many-to-many relationship
  
//       res.status(201).json({ message: 'Tags added to car successfully' });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to add tags to car' });
//     }
//   });
  


module.exports = router;