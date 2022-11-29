import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  products: Joi.array(),
});

export const inputValidate = async (req, res, next) => {
  try {
    const value = await schema.validateAsync({
      name: req.body.name,
    });
    next();
  } catch (err) {
    res.status(400).send(err.details[0].message);
  }
};
