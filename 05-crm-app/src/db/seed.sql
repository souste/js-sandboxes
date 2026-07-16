TRUNCATE contacts, companies RESTART IDENTITY CASCADE;

INSERT INTO companies (name, industry)
VALUES
('Acme Technologies', 'Software'),
('Northwind Solutions', 'Finance'),
('Green Energy Ltd', 'Renewable Energy'),
('Stark Industries', 'Manufacturing'),
('Wayne Enterprises', 'Technology'),
('Umbrella Corp', 'Healthcare'),
('Globex Corporation', 'Consulting'),
('Initech', 'IT Services'),
('Hooli', 'Cloud Computing'),
('Wonka Industries', 'Food Production');


INSERT INTO contacts (first_name, surname, email, company_id)
VALUES
('Sarah', 'Smith', 'sarah.smith@acme.com', 1),
('James', 'Wilson', 'james.wilson@acme.com', 1),
('Emily', 'Brown', 'emily.brown@acme.com', 1),

('Daniel', 'Taylor', 'daniel.taylor@northwind.com', 2),
('Olivia', 'Davies', 'olivia.davies@northwind.com', 2),
('Jack', 'Evans', 'jack.evans@northwind.com', 2),

('Sophie', 'Thomas', 'sophie.thomas@greenenergy.com', 3),
('Harry', 'Roberts', 'harry.roberts@greenenergy.com', 3),

('George', 'Johnson', 'george.johnson@stark.com', 4),
('Amelia', 'Walker', 'amelia.walker@stark.com', 4),
('Charlie', 'Wright', 'charlie.wright@stark.com', 4),

('Jessica', 'White', 'jessica.white@wayne.com', 5),
('Thomas', 'Harris', 'thomas.harris@wayne.com', 5),

('Lily', 'Martin', 'lily.martin@umbrella.com', 6),
('Oscar', 'Thompson', 'oscar.thompson@umbrella.com', 6),

('Isla', 'Garcia', 'isla.garcia@globex.com', 7),
('William', 'Martinez', 'william.martinez@globex.com', 7),
('Mia', 'Robinson', 'mia.robinson@globex.com', 7),

('Leo', 'Clark', 'leo.clark@initech.com', 8),
('Grace', 'Rodriguez', 'grace.rodriguez@initech.com', 8),

('Noah', 'Lewis', 'noah.lewis@hooli.com', 9),
('Ella', 'Lee', 'ella.lee@hooli.com', 9),

('Henry', 'Walker', 'henry.walker@wonka.com', 10),
('Evie', 'Hall', 'evie.hall@wonka.com', 10),

-- Contacts without companies
('Ava', 'Allen', 'ava.allen@gmail.com', NULL),
('William', 'Young', 'william.young@gmail.com', NULL),
('Grace', 'King', 'grace.king@gmail.com', NULL);