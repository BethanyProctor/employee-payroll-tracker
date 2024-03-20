// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');


// Collect employee data
const collectEmployees = function() {
  // TODO: Get user input to create and return an array of employee objects
    //create an array for the employees
    let employeesArray = [];
    
    let addMoreEmployees = true;

    //add new employee or employees process
    while (addMoreEmployees) {
      let employeeFirstName = "";
      let employeeLastName = "";
      let employeeSalary = 0

      //prompt the user for the first name
      while (employeeFirstName === "") {
        employeeFirstName = window.prompt(`Enter the employee's first name`);
      }

      //prompt the user for the last name
      while (employeeLastName === "") {
        employeeLastName = window.prompt(`Enter the employee's last name`)
      }

      //prompt the user for the salary
      while (isNaN(employeeSalary) || employeeSalary === 0) {
        let inputSalary = window.prompt(`Enter the employee's annual salary (Please only enter numeric digits)`)
        if  (inputSalary === null) {
          addMoreEmployees = false;
          break;
        }

        //make sure that the salary is a number
        employeeSalary = parseFloat(inputSalary);
      }

      //create an object
      let employee = {
        firstName: employeeFirstName,
        lastName: employeeLastName,
        salary: `$` + employeeSalary
      }

      //add the new employee to the array
      employeesArray.push(employee);

      //prompt the user if they want to add another employee
      let addMoreInput = window.confirm(`Would you like to add another employee?`)
      if (addMoreInput === false) {
        addMoreEmployees = false;
      }
    }

    //return the array of employee objects
    return employeesArray;
   
}


// Display the average salary
const displayAverageSalary = function(employeesArray) {
  // TODO: Calculate and display the average salary
  //first make sure there is something in the array
  if (employeesArray.length === 0) {
    console.log("No employees found.");
    return;
  }

  //get all of the salaries without the $ and add them together
  let sum = 0
  for (const employee of employeesArray) {
    sum += parseFloat(employee.salary.replace('$', ""));
  }

  //get the average salary
  const avgSalary = sum / employeesArray.length;

  //make sure that the average is displayed with 2 decimal points
  const avgSalaryRounded = avgSalary.toFixed(2);
  
  //display the result on the console
  console.log(`The number of employees is ${employeesArray.length}`)
  console.log(`The average salary of the ${employeesArray.length} employee(s) is $${avgSalaryRounded}`)
}


// Select a random employee
const getRandomEmployee = function(employeesArray) {
  // TODO: Select and display a random employee
  
  //get a random whole number between 0 and employeesArray.length (includes the min and max)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  let randomEmployee = getRandomInt(0, employeesArray.length);

  //choose that random numbered element in the array and display it on the console
  console.log(`Congratulations to ${employeesArray[randomEmployee].firstName} ${employeesArray[randomEmployee].lastName}, our random drawing winner!`)
}


/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
