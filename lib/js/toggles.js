document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn01Login').addEventListener('click', function () {
        const zip = document.getElementById('txtZip').value;
        const phone = document.getElementById('txtPhone').value;
        
        if (zip && phone) {
            lookup() // Call the updated lookup function
                .then(result => {
                    // Check if rows are affected (assuming non-zero means a match is found)
                    const numOfReturns = JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0];
                    
                    if (numOfReturns > 0) {
                        // Move to the next section (show the next section of the HTML)
                        document.getElementById('divMemberLogin').style.display = 'none';
                        document.getElementById('divMemberSelection').style.display = 'block';
                    } else {
                        // No match found
                        alert('No match found. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('An error occurred while fetching data. Please try again later.');
                });
        } else {
            alert('Please provide both Zip Code and Phone Number.');
        }
    });

    // Advanced Search button
    document.getElementById('btn01Forgot').addEventListener('click', function () { // Updated to match index.html
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Look-up button (advanced search)
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const name = document.getElementById('txtLookupname').value; // Updated ID
        const address = document.getElementById('txtLookupAddress').value; // Updated ID
        const county = document.getElementById('txtLookupCounty').value; // Updated ID
        if (name && address && county) {
            advlookup();
        } else {
            alert('Please provide required lookup details.');
        }
    });

    // Cancel Lookup button
    document.getElementById('btn02Cancel').addEventListener('click', function () {
        document.getElementById('divMemberLookup').style.display = 'none';
        document.getElementById('divMemberLogin').style.display = 'block';
    });

    // Ensure other button IDs are also updated accordingly if needed.
});
