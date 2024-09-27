// controllers/pets.js

const Pet = require('../models/pet.js');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    res.json({ message: 'Create route' })
})

router.get('/', async (req, res) => {
    try {
        const foundPets = await Pet.find();
        res.status(200).json(foundPets);  // 200 OK
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });


    // controllers/pets.js

// READ - GET - /pets/:petId
    router.get('/:petId', async (req, res) => {
    try {
      const foundPet = await Pet.findById(req.params.petId);
      if (!foundPet) {
        res.status(404);
        throw new Error('Pet not found.');
      }
      res.status(200).json(foundPet); // 200 OK
    } catch (error) {
        if (res.statusCode === 404) {
            res.json({ error: error.message });
          } else { 
            res.status(500).json({error: 'The server is really broken.'})
          }
        }
        });

        router.delete('/:petId', async (req, res) => {
            try {
            const deletedPet = await Pet.findByIdAndDelete(req.params.petId);
            if(!deletedPet === null) {
                res.status(404);
                throw new ErrorEvent('Pet not found.')
            }
            } catch (error) {
                res.status(500).json({ error: 'Servers broken' })
            }
        })


        router.put('/:petId', async (req, res) => {
            try {
                const updatedPet = await Pet.findByIdAndUpdate(req.params.petId, req.body, {new: true,
                });
                if(!updatedPet) {
                    res.status(404);
                    throw new Error('Pet not found.');
                }
                res.status(200).json(updatedPet);
            } catch  {
                if (res.statusCode === 404) {
                    res.json({error: error.message});
                } else {
                    res.status(500).json({error: error.message})
                }
            }
        });
  

module.exports = router;
