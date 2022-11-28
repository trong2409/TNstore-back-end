import yup from "yup";

const schema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  image: yup.string(),
  originalPrice: yup.string().required(),
  promotionPercent: yup.string().required().default("0"),
  saled: yup.string().default("0"),
  quantity: yup.string().required().default("0"),
  color: yup.string().required(),
  size: yup.string().required(),
});

export const inputValidate = (req, res, next) => {
  schema
    .isValid({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      originalPrice: req.body.originalPrice,
      promotionPercent: req.body.promotionPercent,
      saled: req.body.saled,
      quantity: req.body.quantity,
      color: req.body.color,
      size: req.body.size,
    })
    .then((valid) => {
      next();
    })
    .catch((err) => {
      res.status(400).send(err.errors.name.message);
    });
};
