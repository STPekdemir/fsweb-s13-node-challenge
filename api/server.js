const express = require("express");
const projectrouter = require("./projects/projects-router");
const server = express();
server.use(express.json());

server.use("/api/projects", projectrouter);

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;
