// "project" routerını buraya yazın!
const express = require("express");

const projectRouter = express();

projectRouter.use(express.json());

projectRouter.get("/", (req, res) => {});
projectRouter.get("/:id", (req, res) => {});
projectRouter.post("/", (req, res) => {});
projectRouter.put("/:id", (req, res) => {});
projectRouter.delete("/:id", (req, res) => {});
projectRouter.get("/:id/actions", (req, res) => {});
