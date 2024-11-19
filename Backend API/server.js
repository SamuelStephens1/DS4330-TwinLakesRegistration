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

//request for simple search
app.get('/:zip/:phone', (req, res, next) => {
    
    // Close any previous SQL connections
    sql.close();

    // Get the parameters from the request URL
    const zip = req.params.zip;
    const phone = req.params.phone;

    // Connect to your database
    sql.connect(config, function (err) {

        //error if no database connection
        if (err) {
            console.log(err);
            res.status(500).send('Database connection error');
            return;
        }

        // Create Request object
        var request = new sql.Request();

        // Use parameterized query to prevent SQL injection
        const query = "SELECT member_number, name, phone, customer_type, service_address, billing_zip FROM data WHERE billing_zip = @zip and phone = @phone group by member_number, name, phone, customer_type, service_address, billing_zip";

        // Add the parameters to the SQL query
        request.input('zip', sql.VarChar, zip);
        request.input('phone', sql.VarChar, phone);

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

//request for advanced search
app.get('/adv/:name/:county', (req, res, next) => {

    // Close any previous SQL connections
    sql.close();

    // Get the parameters from the request URL
    const name = req.params.name;
    const county = req.params.county;

    // Connect to your database
    sql.connect(config, function (err) {

        // Error if no database connection
        if (err) {
            console.log(err);
            res.status(500).send('Database connection error');
            return;
        }

        // Create Request object
        var request = new sql.Request();

        // First parameterized query
        const query1 = `
            SELECT member_number, name, phone, customer_type, service_address, billing_zip
            FROM data
            WHERE name = @name AND service_county = @county
            GROUP BY member_number, name, phone, customer_type, service_address, billing_zip`;

        // Add parameters for the first query
        request.input('name', sql.VarChar, name);
        request.input('county', sql.VarChar, county);

        // Execute the first query
        request.query(query1, function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).send('Query execution error');
                sql.close();
                return;
            }

            // Check if results are empty
            if (result.recordset.length === 0) {

                // Modify the name parameter for the second query
                const partialName = `%${name.substring(0, 3)}%`;

                // Second parameterized query
                const query2 = `
                    SELECT member_number, name, phone, customer_type, service_address, billing_zip
                    FROM data
                    WHERE name LIKE @partialName AND service_county = @county
                    GROUP BY member_number, name, phone, customer_type, service_address, billing_zip`;

                // Update the parameters for the second query
                request.input('partialName', sql.VarChar, partialName);

                // Execute the second query
                request.query(query2, function (err, secondResult) {
                    if (err) {
                        console.log(err);
                        res.status(500).send('Query execution error');
                    } else {
                        res.json(secondResult);
                    }

                    // Close the SQL connection
                    sql.close();
                });
            } else {
                // Return the results of the first query
                res.json(result);

                // Close the SQL connection
                sql.close();
            }
        });
    });
});


// This code tells the application to listen on the port we set at the top of the code.  Additionally, the console.log command allows us to have a visual representation in our command prompt or terminal telling us the node project is running and which port we should try to access it on. 
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});