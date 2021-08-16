const inquirer = require('inquirer');
const db = require('./config/connection');
const cTable = require('console.table');



db.connect(err => {
    if (err) {
        throw err;
    }
});

const viewDepartments = function() {
    db.query(`SELECT * FROM department`, (err, row) =>{
        if (err) {
            console.log(err)
        }
        console.table(row);
        console.log('You viewed all departments!'); 
        console.log('----------------------');
        optionList();
    });
};

const viewRoles = function() {
    db.query(`SELECT * FROM _role`, (err, row) =>{
        if (err) {
            console.log(err)
        }
        console.table(row);
        console.log('You viewed roles!'); 
        console.log('----------------------');
        optionList();
    });
};

const viewEmployees = function() {
    db.query(`SELECT * FROM employees`, (err, row) =>{
        if (err) {
            console.log(err)
        }
        console.table(row);
        console.log('You viewed all employees!'); 
        console.log('----------------------');
        optionList();
    });
};

const addDepartment = async function() {
    let answer = await inquirer.prompt([
        {
            name: "departmentName",
            type: 'input',
            message: 'Please enter the new departments name!'
        }
    ])
    db.query(`INSERT INTO department SET ?`, {
      _name: answer.departmentName
    })
    console.log(`${answer.departmentName} was added to the department table`);
    console.log('----------------------');
    optionList();
}; 

const addRole = async function() {
    console.log('You are adding a role!')

    let departmentChoices = await db.promise().query(`SELECT * FROM department`);

    let departmentArray = [];

    // Adds all of the names from our department table into our choices array
    for (let i = 0; i < departmentChoices[0].length; i++){
        departmentArray.push(departmentChoices[0][i]._name)
    }

    let answer = await inquirer.prompt([
        {
           name: 'roleTitle',
           type: 'input',
           message: 'Please enter the new roles name!' 
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'Please enter this roles salary!'
        },
        {
            name: 'department',
            type: 'list',
            choices: departmentArray
        }
    ])

    var departmentId = await db.promise().query(`SELECT id FROM department WHERE _name = ?`, answer.department);

    db.query(`INSERT INTO _role SET ?`, {
        title: answer.roleTitle,
        salary: answer.roleSalary,
        department_id: departmentId[0][0].id
    })

    console.log(`The new ${answer.roleTitle} role was added to the _role table`)
    console.log('----------------------');
    optionList();
};



const addEmployee = async function() {
    console.log('You are adding an employee!');

    let roleChoices = await db.promise().query(`SELECT * FROM _role`);

    let roleArray = [];

    for (let i = 0; i < roleChoices[0].length; i++) {
        roleArray.push(roleChoices[0][i].title)
    }

    let answer = await inquirer.prompt([
        {
            name: 'employeeFirstName',
            type: 'input',
            message: "What is the employee's first name?"
        },
        {
            name: 'employeeLastName',
            type: 'input',
            message: "What is the employee's last name?"
        },
        {
            name: 'role',
            type: 'list',
            choices: roleArray
        },
        {
            name: 'employeeManager',
            type: 'input',
            message: "If this employee has a manager, please enter the manager's id"
        }
    ])

    var roleId = await db.promise().query(`SELECT id FROM _role WHERE title = ?`, answer.role);

    db.query(`INSERT INTO employees SET ? `, {
        first_name: answer.employeeFirstName,
        last_name: answer.employeeLastName, 
        role_id: roleId[0][0].id,
        manager_id: answer.employeeManager
    })
    console.log(`${answer.employeeFirstName} was added to the employee table`);
    console.log('----------------------');
    optionList();
};



const updateEmployeeRole = async function() {
    console.log('You are updating an employees role');

    let employeeChoices = await db.promise().query(`SELECT * FROM employees`);
    let employeesArray = []
    let roleChoices = await db.promise().query(`SELECT * FROM _role`);
    let roleArray = [];

    for (let i = 0; i < employeeChoices[0].length; i++) {
        employeesArray.push(employeeChoices[0][i].first_name)
    }

    for (let i = 0; i < roleChoices[0].length; i++) {
        roleArray.push(roleChoices[0][i].title)
    }

    let answer = await inquirer.prompt([
        {
            name: 'chosenEmployee',
            type: 'list',
            choices: employeesArray
        },
        {
            name: 'chosenRole',
            type: 'list',
            choices: roleArray
        }
    ]);

    let employeeId = await db.promise().query(`SELECT id FROM employees where first_name = ?`, answer.chosenEmployee); 

    let roleId = await db.promise().query(`SELECT id FROM _role WHERE title = ?`, answer.chosenRole);

   await db.promise().query(`UPDATE employees SET role_id = ? WHERE employees.id = ${employeeId[0][0].id}`, roleId[0][0].id);

    console.log(`${answer.chosenEmployee}'s role updated to ${answer.chosenRole}`);
    console.log('----------------------');
    optionList();
};



// function to call inquirer to ask what the user would like to do.
const optionList = function () { 
    return inquirer.prompt({
        name: 'options',
        type: 'list',
        message: 'What would you like to do',
        choices: ['View Departments', 'View Roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', "Update an employee's role", "Exit"]
    })
    .then(choice => {
        if (choice.options === 'View Departments') {
            viewDepartments();
        }
        if (choice.options === 'View Roles') {
            viewRoles();
        }
        if (choice.options === 'View all employees') {
            viewEmployees();
        }
        if (choice.options === 'Add a department') {
            addDepartment();
        }
        if (choice.options === 'Add a role') {
            addRole();
        }
        if (choice.options === 'Add an employee') {
            addEmployee();
        }
        if (choice.options === "Update an employee's role") {
            updateEmployeeRole();
        }
        if (choice.options === "Exit") {
            console.log('Exiting Employee Tracker');
            return;
        }
    });
};




optionList()