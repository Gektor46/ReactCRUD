const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// Разбор запросов типа - application/json
app.use(bodyParser.json());

// Разбор запросов типа - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => {
    console.log("Подключен к базе данных!");
})
  .catch(err => {
    console.log("Не удается подключиться к базе данных!", err);
    process.exit();
});

// Маршрут
app.get("/", (req, res) => {
    res.json({ message: "Добро пожаловать в приложение!" });
});

require("./app/routes/tutorial.routes")(app);

// Установить порт, собирать запросы
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Сервер работает на порту ${PORT}.`);
});