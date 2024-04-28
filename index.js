const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

/*SISTEMA DE GESTIÓN DE EMPLEADOS CON LOS SIGUIENTES ENDPOINTS

. 
  . GET /employees -- Obtiene todos los empleados
  . POST /employees -- Crea un nuevo empleado
  . GET /employees/:document -- obtiene empleado por documento
  . PUT /employees/:document -- actualiza empleado por documento
  . DELETE /employees/:document -- elimina empleado por documento

El proyecto se puede corre con f5 ya que está configurado el modo debugger,
Sino también con npm run dev.

Adjunto collection de postman de pruebas

*/
const employees = [
  {
    id: 1,
    name: "Jose Luis Perez",
    job: "dev",
    years: "28",
    document: "111111",
  },
  {
    id: 2,
    name: "Edison Cavani",
    job: "football player",
    years: "33",
    document: "222222",
  },
  {
    id: 3,
    name: "Lionel Andres Messi ",
    job: "football player",
    years: "36",
    document: "333333",
  },
];
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/employees", (req, res) => {
  const { employee } = req.body;
  const exist = employees.filter((actual) => actual.document === employee.document);
  if (exist > 0) {
    res.status(200).send("el empleado ya esta en nuestra base de datos");
  } else {
    employee.id = employees.at(-1).id + 1;
    employees.push(employee);
    res.status(200).send({
        text: "empleado agregado correctamente",
        employeesResponse: employees,
      });
  }
});

app.put("/employees/:document", (req, res) => {
    const { employee } = req.body;
    const employeeDocument = req.params.document;
    const employeeIndex = employees.findIndex(emp => emp.document === employeeDocument);
  
    if (employeeIndex !== -1) {
      const updatedEmployee = { ...employees[employeeIndex], ...employee }; 
      employees[employeeIndex] = updatedEmployee;
      res.status(200).json({ text: "Empleado actualizado correctamente", employee: updatedEmployee });
    } else {
      res.status(404).send("No existe el empleado");
    }
  });
  

app.delete("/employees/:document", (req, res) => {
    const exist = employees.some(actual=> actual.document === req.params.document)

    exist ? res.status(200).send(employees.filter(actual=> actual.document !== req.params.document)) : res.status(404).send("No existe el empleado");
});

app.get("/employees/:document", (req, res) => {
    const exist = employees.some(actual=> actual.document === req.params.document)

    exist ? res.status(200).send(employees.filter(actual=> actual.document === req.params.document)) : res.status(404).send("No existe el empleado");
});

app.listen(3000);
console.log("Servidor escuchando en puerto 3000");
