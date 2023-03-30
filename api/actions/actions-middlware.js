const { get } = require("./actions-model");

const projectModel = require("../projects/projects-model");
// datada verilen idli action var olup olmadığını kontrol eder
async function validateId(req, res, next) {
  try {
    const id = req.params.id;
    const action = await get(id);
    if (action) {
      req.action = action;
      req.id = id;
      next();
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen id'ye sahip action bulunamadı" });
    }
  } catch (error) {
    next(error);
  }
}

async function validateBody(req, res, next) {
  try {
    const { project_id, description, notes, completed } = req.body;
    // request bodysinden yukaridaki değişkenleri alıp kontrol eder
    if (project_id && description.length < 128 && notes) {
      // project_id , description ve notes olup olmadığını kontrol eder ve description uzunluğu 128 karakterden uzunsa hata verir

      const project = await projectModel.get(project_id); // proje datasında id olarak project_id'ye sahip bir proje olup olmadığını kontrol eder

      if (project) {
        // eğer proje datasında id olarak project_id ye sahip bir proje varsa ve completed değişkeni doğru değere sahipse request objesinde actionBody adında bir obje oluşturur ve completed değerine true verir
        if (completed === true) {
          req.actionBody = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: true,
          };

          next();
        } else {
          // eğer proje datasında id olarak project_id ye sahip bir proje varsa ve completed değişkeni yoksa veya false değerine sahipse request objesinde actionBody adında bir obje oluşturur ve completed değerine false verir

          req.actionBody = {
            project_id: project_id,
            description: description,
            notes: notes,
            completed: false,
          };

          next();
        }
      } else {
        res.status(404).json({ message: "belirtilen idli proje yok" });
      }
    } else {
      res.status(400).json({ message: "Lütfen tüm propsları sağlayınız" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { validateId, validateBody };
