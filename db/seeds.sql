INSERT INTO department (_name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Marketing'),
('Design')
;


INSERT INTO _role (title, salary, department_id)
VALUES
('Front End Developer', 90000, 1),
('Back End Developer', 70000, 1),
('Artist', 100000, 5),
('Full-Stack Developer', 180000, 1),
('Lawyer', 90000, 3),
('Accountant', 65000, 2),
('Marketing Analyst', 60000, 4)
;


INSERT INTO employees (first_name, last_name, role_id)
VALUES
("Jorge", "Martinez", 1),
("Kyle", 'Ahn', 1),
("Gabe", "Perry", 4),
("Winnetta", "Chan", 5)
;