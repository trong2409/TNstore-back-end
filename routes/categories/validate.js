import yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required(),
  products: yup.array(),
});

export const inputValidate = (req, res, next) => {
  schema
    .isValid({
      name: req.body.name,
    })
    .then((valid) => {
      next();
    })
    .catch((err) => {
      res.status(400).send(err.errors.name.message);
    });
};
