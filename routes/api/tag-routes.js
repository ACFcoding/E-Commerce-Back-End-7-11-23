const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', (req, res) => {
  // find all tags
Tag.findAll({
  include: [
    {
      model: Product,
      through: ProductTag
    }
  ]
})
.then((data) => res.status(200).json(data))
.catch((err) => res.status(404).json(err))
});

router.get('/:id', (req, res) => {
  Tag.findByPk((req.params.id), 
  {
    include: [{
      model: Product
    }]
  })
  .then((data) => {
    res.json(data)
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((newData) => {
    res.json(newData)
  })
  .catch((err) => res.status(404).json(err))
});

router.put('/:id', async (req, res) => {
  try {
    const data = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    !data ? res.status(404).json({
      message: "No tag ID found. Sorry."
    })
    : res.status(200).json(data)
  }
  catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy(req.body, {
      where: {
        id: req.params.id,
      },
    })
    !data ? res.status(404).json({
      message: "No tag ID found. Sorry."
    })
    : res.status(200).json(data)
  }
  catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
