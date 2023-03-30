const express = require("express");

const actionMiddleWare = require("./actions-middlware");

const ActiontModel = require("./actions-model");

const actionRouter = express.Router();

actionRouter.use(express.json());

actionRouter.get("/", async (req, res, next) => {
  try {
    const actions = await ActiontModel.get();
    if (actions) {
      res.status(200).json(actions);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

actionRouter.get(
  "/:id",
  actionMiddleWare.validateId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.action);
    } catch (error) {
      next(error);
    }
  }
);

actionRouter.post(
  "/",
  actionMiddleWare.validateBody,
  async (req, res, next) => {
    try {
      const newAction = await ActiontModel.insert(req.actionBody);
      res.status(201).json(newAction);
    } catch (error) {
      next(error);
    }
  }
);

actionRouter.put(
  "/:id",
  actionMiddleWare.validateId,
  actionMiddleWare.validateBody,
  async (req, res, next) => {
    try {
      const updatetedAction = await ActiontModel.update(req.id, req.actionBody);
      res.status(201).json(updatetedAction);
    } catch (error) {
      next(error);
    }
  }
);

actionRouter.delete(
  "/:id",
  actionMiddleWare.validateId,
  async (req, res, next) => {
    try {
      await ActiontModel.remove(req.id);
      res.status(200).json({ message: "Silme işlemi başarılı" });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = actionRouter;
