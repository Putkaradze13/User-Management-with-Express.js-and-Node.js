**How To Run**

To run the application you need to write command 'npm run start' or 'npm run dev' in terminal and press Enter.

**How It Works**

The application is connected to mongoDB database and Postman and can sign up and sign in users, update user information and get all users list.

For sign up 'POST' request should be sent on port 'localhost:3000/signup'. required fields are: first_name, last-name, user_name and password.
For login 'POST' request should be sent on port 'localhost:3000/login'. required fields are: user_name and password.
For update 'PUT' request should be sent on port 'localhost:3000/update'. required fields are: first_name, last-name and new password in Body and user_name and current password in Auth.
For getUsers 'GET' request should be sent on port 'localhost:3000/getUsers'.

##env Usage Configuration
adding new variables must be with the format key=value, delimited by line breaks. Variables in .env files don’t require quotation marks unless there are spaces in the value.
