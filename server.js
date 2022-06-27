const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const openApiDocumentation = require("./openApiDocumentation");
//const DisableTryItOutPlugin = require("./swaggerPlugins");

// Inicialización
const app = express();

// Init Middleware
//app.use(cors());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
//app.options('*', cors())
app.use(express.json({ extended: false }));

// Importar rutas
const clienteRoutes = require("./routes/cliente");
const kpiRoutes = require("./routes/kpi");

// Rutas
app.use("/api/cliente", clienteRoutes);
app.use("/api/kpi", kpiRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
