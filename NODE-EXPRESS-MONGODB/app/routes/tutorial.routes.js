module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
  
    var router = require("express").Router();
  
    // Создать новую запись
    router.post("/", tutorials.create);
  
    // Получить все записи
    router.get("/", tutorials.findAll);
  
    // Получить все опубликованные записи
    router.get("/published", tutorials.findAllPublished);
  
    // Получить одну запись по идентификатору
    router.get("/:id", tutorials.findOne);
  
    // Обновить запись по идентифекатору
    router.put("/:id", tutorials.update);
  
    // Удалить запись по идентификатору
    router.delete("/:id", tutorials.delete);
  
    // Удалить все записи
    router.delete("/", tutorials.deleteAll);
  
    app.use('/api/tutorials', router);
  };