module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Test API",
    description:
      "API para el proceso de selección de Desarrollador Backend - Llatan",
    contact: {
      name: "Felix Bossio",
      url: "https://www.felixbossio.com",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://172.16.1.2:5000",
    },
    {
      url: "http://localhost:5000",
    },
  ],
  paths: {
    "/api/cliente": {
      description: "Recurso de clientes",
      post: {
        description: "Operación para registrar clientes",
        parameters: [
          {
            name: "clientes",
            in: "body",
            required: true,
            schema: {
              type: "object",
              properties: {
                nombre: {
                  type: "string",
                },
                apellido: {
                  type: "string",
                },
                edad: {
                  type: "string",
                },
                fecha_nacimiento: {
                  type: "string",
                },
              },
              example: {
                nombre: "Paolo",
                apellido: "Guerrero",
                edad: 38,
                fecha_nacimiento: "1984-01-01",
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Cliente creado exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensaje: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Error del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensaje: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        description: "Operación para obtener información de los clientes",
        parameters: [{ in: "path" }],
        responses: {
          200: {
            description: "Clientes listados exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nombre: {
                        type: "string",
                      },
                      apellido: {
                        type: "string",
                      },
                      edad: {
                        type: "integer",
                      },
                      fecha_nacimiento: {
                        type: "string",
                      },
                      fecha_prob_muerte: {
                        type: "string",
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Error del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensaje: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/api/kpi": {
      description: "Recurso de indicadores",
      get: {
        description: "Operación para obtener indicadores estadísticos",
        parameters: [{ in: "path" }],
        responses: {
          200: {
            description: "Indicadores obtenidos exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    edad_promedio: {
                      type: "number",
                    },
                    desv_estandar: {
                      type: "number",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Error del servidor",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    mensaje: {
                      type: "string",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
