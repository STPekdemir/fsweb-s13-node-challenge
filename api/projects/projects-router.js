const express = require("express");

const projectMiddleWare = require("./projects-middleware");

const ProjectModel = require("./projects-model");

const projectRouter = express.Router();

projectRouter.use(express.json());

projectRouter.get("/", async (req, res, next) => {
  try {
    const post = await ProjectModel.get();
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json(null);
    }
  } catch (error) {
    next(error);
  }
});

projectRouter.get(
  "/:id",
  projectMiddleWare.validateId,
  async (req, res, next) => {
    try {
      res.status(200).json(req.project);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.post(
  "/",
  projectMiddleWare.valideteBody,
  async (req, res, next) => {
    try {
      const newPost = await ProjectModel.insert(req.ndc);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.put(
  "/:id",
  projectMiddleWare.validateId,
  projectMiddleWare.valideteBody,
  async (req, res, next) => {
    try {
      if (!req.body.hasOwnProperty("completed")) {
        res.status(400).json({ message: "completed değerini sağlayınız" });
      } else {
        const newPost = await ProjectModel.update(req.id, req.ndc);

        res.status(201).json(newPost);
      }
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.delete(
  "/:id",
  projectMiddleWare.validateId,
  async (req, res, next) => {
    try {
      await ProjectModel.remove(req.id);
      res.status(201).json({ message: "silindi" });
    } catch (error) {
      next(error);
    }
  }
);

projectRouter.get(
  "/:id/actions",
  projectMiddleWare.validateId,
  async (req, res, next) => {
    try {
      const postActions = await ProjectModel.getProjectActions(req.id);
      res.status(200).json(postActions);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = projectRouter;
