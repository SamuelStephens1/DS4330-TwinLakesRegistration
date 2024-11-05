// This section of code gives us the ability to use the libraries that we added with npm.  The first line creates a reference to the express library.  The second line creates a reference to the cors library so it also can be used in the application/web service.  The third line creates a new instance of express and assigns it to the variable app.  We will use app throughout our code to reference this instance.  Finally, the fourth line creates a variable that we can store the HTTP port number we wish to communicate to the web service on.  Remember that the port number is similar to a room number.  If a computer or server is similar to a building, the port is like a room. 
const express = require('express');
const cors = require('cors'); 
const sql = require("mssql");

const app = express(); 
app.use(cors()); 
const port = 3000; 

// config for your database
var config = {
    user: 'sa',
    password: 'Password12!',
    server: 'localhost', 
    database: 'twinlakes', 
    port: 1433,
    options: {
        encrypt: false // Use this if your SQL Server requires encryption
    }
};

// Create the app.get code here 
// This code should take a get request to ‘/‘ and return a simple message saying ‘There is 1 record in the dataset’
// Define route to accept 'county' as a parameter
app.get('/:county', (req, res, next) => {
    
    // Close any previous SQL connections
    sql.close();

    // Get the 'county' parameter from the request URL
    const county = req.params.county;

    // Connect to your database
    sql.connect(config, function (err) {

        if (err) {
            console.log(err);
            res.status(500).send('Database connection error');
            return;
        }

        // Create Request object
        var request = new sql.Request();

        // Use parameterized query to prevent SQL injection
        const query = "SELECT * FROM data WHERE service_county = @county";

        // Add the county parameter to the SQL query
        request.input('county', sql.VarChar, county);

        // Execute the query
        request.query(query, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send('Query execution error');
            } else {
                res.json(result);
            }

            // Close the SQL connection
            sql.close();
        });

    });
});


// This code tells the application to listen on the port we set at the top of the code.  Additionally, the console.log command allows us to have a visual representation in our command prompt or terminal telling us the node project is running and which port we should try to access it on. 
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});