I have used Node.js and MySQL.

# Password check API

Implemented an API (app.js) in NodeJs that provides an endpoint to check a password. The endpoint host and port details can be edited from .evn file. The endpoint  allow to POST a password and respond with either a 204 if the password is fine or with a 400 and a set of errors in case the password does not match the minimal password rules.

The rules to check if a password is valid are written in password.json file. It's included the following information per rule:

- Regular expession to check the rule
- Error message to show in case the rule is not met

*The password check rules are as follows:*

- Password length is minimum 5 characters
- At least one digit is used in the password
- There are no more than two repeating characters (like 'bbb' – 2 are allowed, but not 3 or more)
- There is at least one upper-case character OR alternatively one special character

# Script for checking passwords
- Here index.js connect with MYSQL database and retrive all passwords that needs to be validated.
- MYSQL Connection details can be editable from .env file
- The script validate all the given password using Password check API and update database table with 1 or 0 for valid and invalid passwords.
- It shows output a success message or the errors received from the API for each of the responses.
