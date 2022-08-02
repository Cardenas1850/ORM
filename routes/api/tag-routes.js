const router = require("express").Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ["id", "tag_name"],
    include: {
      model: Product,
      attributes: ["product_name", "id", "price", "stock", "category_id"],
    },
  })
  .then((data) => res.json(data))
  .catch((err) => {
    //console.log(err);
    res.status(400).json(err);
  });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

Tag.findOne({
  where: {
    id: req.params.id,
  },
  attributes: ["tag_name", "id"],
  include: {
    model: Product,
    attributes: ["product_name", "id", "stock", "category_id", "price"],
  },
})
.then((data) => {
  if (!data) {
    res.status(404).json({message: "Tag not found"});
    return;
  }
  res.json(data);
})
.catch((err) => {
  console.log(err);
  res.status(400).json(err)
});
  });

router.post("/", (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  })
  .then((data) => res.json(data))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
  .then((data) => {
    if (!data[0]) {
      res.status(404).json({message: "tag not found."});
      return;
    }
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
  .then((data) => {
    if (!data[0]) {
      res.status(404).json({message: "tag not found"});
    }
    res.json(data);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json.apply(err);
  });
});

module.exports = router;
