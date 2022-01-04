const db = require("../models");
const Tutorial = db.tutorials;

// Создать и сохранить новую запись
exports.create = (req, res) => {
    // Подтвердить запрос
    if (!req.body.title) {
      res.status(400).send({ message: "Контент не может быть пустым!" });
      return;
    }
  
    // Создать запись
    const tutorial = new Tutorial({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published ? req.body.published : false
    });
  
    // Сохранить запись в базе данных
    tutorial
      .save(tutorial)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Произошла ошибка при создании записи!"
        });
      });
};

// Получить все записи из базы данных
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Tutorial.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Произошла ошибка при получении записи!"
        });
      });
};

// Найти одну запись с идентификатором
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Не найдена запись с идентификатором: " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Ошибка при получении записи с идентификатором: " + id });
      });
};

// Обновить запись по идентификатору в запросе
exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Данные для обновления не могут быть пустыми!"
      });
    }
  
    const id = req.params.id;
  
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Невозможно обновить запись с идентификатором: ${id}. Возможно запись не была найдена!`
          });
        } else res.send({ message: "Запись успешно обновлена!" });
      })
      .catch(err => {
        res.status(500).send({
          message: "Ошибка обновления записи с идентификатором: " + id
        });
      });
};

// Удалить запись с указанным идентификатором в запросе
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Невозможно удалить запись с идентификатором: ${id}. Возможно запись не была найдена!`
          });
        } else {
          res.send({
            message: "Запись была успешно удалена!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Не удалось удалить запись с идентификатором: " + id
        });
      });
};

// Удалить все записи из базы данных
exports.deleteAll = (req, res) => {
    Tutorial.deleteMany({})
      .then(data => {
        res.send({
          message: `${data.deletedCount} Записи были успешно удалены!`
        });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Произошла ошибка при удалении всех записей!"
        });
      });
};

// Найти все опубликованные записи
exports.findAllPublished = (req, res) => {
    Tutorial.find({ published: true })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Произошла ошибка при получении записей!"
        });
      });
};