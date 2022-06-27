const Router = require("express");
const Sequelize = require("sequelize");
const parse = require("postgres-date");
const { QueryTypes } = require("sequelize");
const db = require("../models");
const { body, validationResult } = require("express-validator");
const { sequelize } = require("../models");
const Cliente = require("../models/cliente")(db.sequelize, Sequelize.DataTypes);

const router = Router();

// @route       POST api/cliente
// @desc        crear un cliente
// @access      Pública

router.post(
  "/",
  [
    body("nombre", "Por favor ingresar su nombre").not().isEmpty(),
    body("apellido", "Por favor ingresar su apellido").not().isEmpty(),
    body("edad", "Por favor ingresar su edad").not().isEmpty().isNumeric(),
    body("fecha_nacimiento", "Por favor ingresar su fecha de nacimiento")
      .not()
      .isEmpty()
      .isDate(),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }

    let { nombre, apellido, edad, fecha_nacimiento } = req.body;

    try {
      await Cliente.create({
        firstName: nombre,
        lastName: apellido,
        age: edad,
        date_birth: fecha_nacimiento,
      });
      return res.status(200).json({ mensaje: "Cliente creado exitosamente" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ mensaje: "Error del servidor" });
    }
  }
);

router.get("/", async (req, res) => {
  const EXPECT_VIDA = 73; // Constante tomada del Banco Mundial https://datos.bancomundial.org/indicator/SP.DYN.LE00.IN?end=2020&start=1960&view=chart
  try {
    const clientes = await sequelize.query(
      `SELECT "firstName" AS "nombre", "lastName" AS "apellido", "age" AS "edad", 
      "date_birth" AS "fecha_nacimiento" FROM "Clientes";`,
      {
        type: QueryTypes.SELECT,
      }
    );

    if (clientes) {
      let fecha_muerte;
      for (let cliente of clientes) {
        if (cliente.edad < EXPECT_VIDA) {
          let fecha_nacimiento = parse(cliente.fecha_nacimiento);

          fecha_muerte = `${fecha_nacimiento.getFullYear() + EXPECT_VIDA}-${(
            "0" +
            fecha_nacimiento.getMonth() +
            1
          ).slice(-2)}-${("0" + fecha_nacimiento.getDate()).slice(-2)}`;
        } else {
          fecha_muerte = cliente.fecha_nacimiento;
        }

        cliente["fecha_prob_muerte"] = fecha_muerte;
      }
    }
    res.status(200).json(clientes);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ mensaje: "Error del servidor" });
  }
});

module.exports = router;
