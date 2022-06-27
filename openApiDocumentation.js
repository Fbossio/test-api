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
      },
    },
    "/courses": {
      description: "Recurso de cursos",
      post: {
        description: "Operación para registrar un array de cursos",
        parameters: [
          {
            name: "cursos",
            in: "body",
            required: true,
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  fullname: {
                    type: "string",
                  },
                  shortname: {
                    type: "string",
                  },
                  categoryid: {
                    type: "integer",
                  },
                  startdate: {
                    type: "string",
                  },
                  enddate: {
                    type: "string",
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Cursos creados exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    courses_requested: {
                      type: "integer",
                    },
                    courses_created: {
                      type: "integer",
                    },
                    courses_not_created: {
                      type: "integer",
                    },
                    courses: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          status: {
                            type: "integer",
                          },
                          courseid: {
                            type: "integer",
                          },
                          shortname: {
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
      },
    },
    "/users": {
      description: "Recurso de usuarios",
      post: {
        description: "Operación para registrar un array de usuarios",
        parameters: [
          {
            name: "usuarios",
            in: "body",
            required: true,
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  firstName: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Usuarios creados exitosamente",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    users_requested: {
                      type: "integer",
                    },
                    users_created: {
                      type: "integer",
                    },
                    users_not_created: {
                      type: "integer",
                    },
                    users: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          status: {
                            type: "integer",
                          },
                          userid: {
                            type: "integer",
                          },
                          username: {
                            type: "string",
                          },
                          email: {
                            type: "string",
                          },
                          password: {
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
      },
    },
    "/enrollments": {
      description: "Recurso de inscripciones",
      post: {
        description: "Operación para inscribir usuarios en cursos",
        parameters: [
          {
            name: "inscripciones",
            in: "body",
            required: true,
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  user: {
                    type: "object",
                    properties: {
                      firstName: {
                        type: "string",
                      },
                      lastName: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      role: {
                        type: "string",
                      },
                    },
                  },
                  courses: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        fullname: {
                          type: "string",
                        },
                        shortname: {
                          type: "string",
                        },
                        categoryname: {
                          type: "string",
                        },
                        timestart: {
                          type: "string",
                        },
                        duration: {
                          type: "integer",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        ],
        responses: {
          200: {
            description: "Usuario inscrito satisfactoriamente",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      usuario_nuevo: {
                        type: "boolean",
                      },
                      username: {
                        type: "string",
                      },
                      userid: {
                        type: "integer",
                      },
                      firstName: {
                        type: "string",
                      },
                      lastName: {
                        type: "string",
                      },
                      email: {
                        type: "string",
                      },
                      password: {
                        type: "string",
                      },
                      enrollment: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            status: {
                              type: "integer",
                            },
                            course: {
                              type: "string",
                            },
                            category: {
                              type: "string",
                            },
                            role: {
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
        },
      },
    },
  },
};
