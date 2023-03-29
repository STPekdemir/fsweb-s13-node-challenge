// projects ara yazılımları buraya
const { get } = require("./projects-model");
// datayı verilen idli bir proje varmı diye kontrol eder eğer varsa requeste id ve project adında objeyi ekler
async function validateId(req, res, next) {
  try {
    const id = req.params.id;
    const project = await get(id);
    if (project) {
      req.project = project;
      req.id = id;
      next();
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen id'ye sahip proje bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
}
// request bodysini kontrol eder ve eğer name ve description varsa completed keyini kontrol ederek bu değerleri requeste ndc objesi olarak verir.
//else kısmında completedi false verme nedenim put requesti atarken eğer completed keyi yoksa hata vermesi
function valideteBody(req, res, next) {
  try {
    const { name, description, completed } = req.body;
    if (name && description) {
      if (completed === true) {
        req.ndc = {
          name: name,
          description: description,
          completed: true,
        };
        next();
      } else {
        req.ndc = {
          name: name,
          description: description,
          completed: false,
        };
        next();
      }
    } else {
      res.status(400).json({ message: "name ve description sağlayınız" });
    }
  } catch (error) {
    next(error);
  }
}
module.exports = {
  validateId,
  valideteBody,
};
