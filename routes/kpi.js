const Router = require("express");
const Sequelize = require("sequelize");
const { QueryTypes } = require("sequelize");
const db = require("../models");
const { sequelize } = require("../models");
const Cliente = require("../models/cliente")(db.sequelize, Sequelize.DataTypes);

const router = Router();

router.get("/", async (req, res) => {
  try {
    let promedio = await sequelize.query(
      `SELECT ROUND(AVG("age"), 2) AS "promedio" FROM "Clientes";`
    );
    //console.log(promedio[0][0].promedio);
    promedio = parseFloat(promedio[0][0].promedio);

    let devest_data = await sequelize.query(
      `SELECT ROUND(CAST(sqrt(SUM(("age" - ${promedio}) ^ 2 ) / (COUNT("age") - 1)) AS numeric), 2) AS desv FROM "Clientes";`,
      {
        type: QueryTypes.SELECT,
      }
    );

    devest_data = parseFloat(devest_data[0].desv);

    //console.log(devest_data[0].desv);

    return res.status(200).json({
      edad_promedio: promedio,
      desv_estandar: devest_data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ mensaje: "Error del servidor" });
  }
});

module.exports = router;
