const router = require('express').Router();
const { Category, Product } = require('../../models');
const { sync } = require('../../models/Product');

router.get('/', (req, res) => {
  Category.findAll({
    include: [Product]
  }) .then(
    (categoryData) => {
      res.json(categoryData)
    }
  )
});

router.get('/:id', (req, res) => {
  Category.findByPk((req.params.id), 
  {
    include: [{model: Product}]
  }, ) 
  .then((categoryData) => {
    res.json(categoryData)
  })
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((generatedCategory) => {
    res.json(generatedCategory)
  })
  .catch((err) => {
    res.json(err)
  })
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    !data[0] ? (res.status(404).json({message: "Error: No category found!" }))
    : res.status(200).json(data)
  }
  catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Category.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    })
    !data[0] ? (res.status(404).json({message: "Error: No category found!" }))
    : res.status(200).json(data)
  }
  catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
