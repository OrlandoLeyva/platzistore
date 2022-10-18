import * as Joi from 'joi';

export const PurchaseSchema = Joi.object({
  productId: Joi.number().positive().integer().required(),
  quantity: Joi.number().positive().integer().required(),
});

export const PurchasesSchema = Joi.array().items(PurchaseSchema);
