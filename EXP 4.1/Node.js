const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let employee = [];

function menu() {
  console.log("\n1.Add\n2.Display\n3.Update\n4.Delete\n5.Exit");
  rl.question("Enter your choice: ", (choice) => {
    switch (choice) {
      case '1':
        addEmployee();
        break;
      case '2':
        displayEmployee();
        break;
      case '3':
        updateEmployee();
        break;
      case '4':
        deleteEmployee();
        break;
      case '5':
        rl.close();
        break;
      default:
        console.log("Invalid choice.");
        menu();
    }
  });
}

function addEmployee() {
  rl.question("Enter employee name: ", (name) => {
    rl.question("Enter employee age: ", (age) => {
      rl.question("Enter employee department: ", (department) => {
        let emp = { name, age, department };
        employee.push(emp);
        console.log("Employee added.");
        menu();
      });
    });
  });
}

function displayEmployee() {
  if (employee.length === 0) {
    console.log("No employee records.");
  } else {
    employee.forEach((emp, index) => {
      console.log(`${index + 1}. ${emp.name}, ${emp.age}, ${emp.department}`);
    });
  }
  menu();
}

function updateEmployee() {
  if (employee.length === 0) {
    console.log("No employee to update.");
    return menu();
  }

  displayEmployee();

  rl.question("Enter employee number: ", (num) => {
    let i = num - 1;

    if (!employee[i]) {
      console.log("Invalid number.");
      return menu();
    }

    rl.question("Enter new name: ", (name) => {
      employee[i].name = name;
      console.log("Updated.");
      menu();
    });
  });
}

function deleteEmployee() {
  if (employee.length === 0) {
    console.log("No employee to delete.");
    return menu();
  }

  displayEmployee();

  rl.question("Enter employee number: ", (num) => {
    let i = num - 1;

    if (!employee[i]) {
      console.log("Invalid number.");
    } else {
      employee.splice(i, 1);
      console.log("Deleted.");
    }
    menu();
  });
}

menu();
