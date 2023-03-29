const express = require("express");

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

projectRouter.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ProjectModel.get(id);
    if (post) {
      res.status(200).json(post);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen id'ye sahip post bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

projectRouter.post("/", async (req, res, next) => {
  try {
    const { name, description, completed } = req.body;
    if (name && description) {
      if (completed === true) {
        const newPost = await ProjectModel.insert({
          name: name,
          description: description,
          completed: true,
        });
        res.status(200).json(newPost);
      } else {
        const newPost2 = await ProjectModel.insert({
          name: name,
          description: description,
        });
        res.status(200).json(newPost2);
      }
    } else {
      res.status(400).json({ message: "name ve description sağlayınız" });
    }
  } catch (error) {
    next(error);
  }
});

projectRouter.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ProjectModel.get(id);
    if (post) {
      const { name, description, completed } = req.body;
      if (name && description) {
        if (completed === true) {
          const newPost = await ProjectModel.update(id, {
            name: name,
            description: description,
            completed: true,
          });
          res.status(201).json(newPost);
        } else {
          const newPost2 = await ProjectModel.update(id, {
            name: name,
            description: description,
          });
          res.status(201).json(newPost2);
        }
      } else {
        res.status(400).json({ message: "name ve description sağlayınız" });
      }
    } else {
      res
        .status(404)
        .json({ message: "belirtilen id'ye sahip kullanıcı bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

projectRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ProjectModel.get(id);
    if (post) {
      await ProjectModel.remove(id);
      res.status(200).json({ message: "silindi" });
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen id'ye sahip post bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

projectRouter.get("/:id/actions", async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await ProjectModel.get(id);
    if (post) {
      const postActions = await ProjectModel.getProjectActions(id);
      res.status(200).json(postActions);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen id'ye sahip post bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = projectRouter;
