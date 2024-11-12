document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn01Login').addEventListener('click', function () {
        const zip = document.getElementById('txtZip').value;
        const phone = document.getElementById('txtPhone').value;
        
        if (zip && phone) {
            lookup()
                .then(result => {
                    console.log("API Response:", result); // Debugging line to inspect the response
                    
                    // Access rowsAffected and data from the result
                    const numOfReturns = result.rowsAffected ? result.rowsAffected[0] : 0;
                    const data = result.data || result; // Adjust if necessary based on actual structure
                    
                    // Check for results
                    if (numOfReturns > 0 && Array.isArray(data) && data.length > 0) {
                        // Move to the selection section
                        document.getElementById('divMemberLogin').style.display = 'none';
                        document.getElementById('divMemberSelection').style.display = 'block';
                        
                        populateCustomerCards(data); // Pass data to populate cards
                    } else {
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

    function populateCustomerCards(customers) {
        if (!Array.isArray(customers) || customers.length === 0) {
            console.warn("No customers available to display.");
            return;
        }

        const container = document.querySelector('#divMemberSelection .row');
        container.innerHTML = ''; // Clear existing cards

        customers.forEach((customer, index) => {
            const card = document.createElement('div');
            card.className = 'card p-2 col';
            card.style.width = '20rem';

            card.innerHTML = `
                <label class="border border-success-subtle mb-1 p-1 text-center"><b>Customer ${index + 1}</b></label>
                <form>
                    <div class="form-group">
                        <label class="form-label">Name:</label>
                        <input class="form-control" type="text" value="${customer.name}" disabled>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Address:</label>
                        <input class="form-control" type="text" value="${customer.address}" disabled>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone:</label>
                        <input class="form-control" type="text" value="${customer.phone}" disabled>
                    </div>
                </form>
                <button type="button" class="btn bg-success mt-2 col-12 text-white btnSelectCustomer">Select</button>
            `;

            card.querySelector('.btnSelectCustomer').addEventListener('click', () => {
                document.getElementById('txtTicketname').value = customer.name;
                document.getElementById('txtTicketCustID').value = customer.customerId;
                document.getElementById('txtTicketAddress').value = customer.address;
                document.getElementById('txtTicketPhone').value = customer.phone;

                document.getElementById('divMemberSelection').style.display = 'none';
                document.getElementById('divTicketConfirmation').style.display = 'block';
            });

            container.appendChild(card);
        });
    }

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
