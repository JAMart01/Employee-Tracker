DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS _role;
DROP TABLE IF EXISTS employees;



CREATE TABLE department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    _name VARCHAR(30) NOT NULL
);


CREATE TABLE _role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 0) NOT NULL,
    department_id INTEGER, 
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);


CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES _role(id)
);


