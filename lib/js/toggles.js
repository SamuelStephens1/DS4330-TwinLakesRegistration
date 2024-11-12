document.addEventListener('DOMContentLoaded', function () {
    // Button on the Search Page
    document.getElementById('btn01Login').addEventListener('click', function () {
        const zip = document.getElementById('txtZip').value;
        const phone = document.getElementById('txtPhone').value;

        if (zip && phone) {
            lookup()
                .then(result => {
                    console.log("API Response:", result);

                    const numOfReturns = result.rowsAffected ? result.rowsAffected[0] : 0;
                    const data = result.recordset; // The actual customer data is within `recordset`

                    if (numOfReturns > 0 && Array.isArray(data) && data.length > 0) {
                        if (data.length === 1) {
                            // If only one customer, skip selection and go directly to ticket confirmation
                            populateTicketForm(data[0]);
                            document.getElementById('divMemberLogin').style.display = 'none';
                            document.getElementById('divTicketConfirmation').style.display = 'block';
                        } else {
                            // If multiple customers, display the selection section
                            document.getElementById('divMemberLogin').style.display = 'none';
                            document.getElementById('divMemberSelection').style.display = 'block';
                            populateCustomerCards(data);
                        }
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

    // Function to populate the customer selection cards
    function populateCustomerCards(customers) {
        const container = document.querySelector('#divMemberSelection .row');
        container.innerHTML = ''; // Clear any existing content

        customers.forEach((customer, index) => {
            const card = document.createElement('div');
            card.className = 'card p-2 col';
            card.style.width = '20rem';

            // Create card content with all fields except `member_number` and `email`
            let cardContent = `
                <label class="border border-success-subtle mb-1 p-1 text-center"><b>Customer ${index + 1}</b></label>
                <form>`;

            for (const key in customer) {
                if (customer.hasOwnProperty(key)) {
                    // Skip `member_number` and `email` fields for all cards
                    if (key === 'member_number' || key === 'email') {
                        continue;
                    }

                    // Format the field key as a label and use the corresponding value
                    const label = key.replace(/_/g, ' ').toUpperCase(); // Format key as a label
                    const value = customer[key];

                    cardContent += `
                        <div class="form-group">
                            <label class="form-label">${label}:</label>
                            <input class="form-control" type="text" value="${value}" disabled>
                        </div>`;
                }
            }

            cardContent += `
                </form>
                <button type="button" class="btn bg-success mt-2 col-12 text-white btnSelectCustomer">Select</button>
            `;

            card.innerHTML = cardContent;

            // Add event listener to the Select button
            card.querySelector('.btnSelectCustomer').addEventListener('click', () => {
                populateTicketForm(customer); // Populate ticket form with selected customer data
                document.getElementById('divMemberSelection').style.display = 'none';
                document.getElementById('divTicketConfirmation').style.display = 'block';
            });

            container.appendChild(card);
        });
    }

    // Function to populate the ticket confirmation form with selected customer data
    function populateTicketForm(customer) {
        document.getElementById('txtTicketname').value = customer.name || '';
        document.getElementById('txtTicketCustID').value = customer.member_number || ''; // Populate with member_number
        document.getElementById('txtTicketAddress').value = customer.service_address || '';
        document.getElementById('txtTicketPhone').value = customer.phone || '';

        console.log("Customer ID (Member Number):", customer.member_number); // Debugging line to check if member_number is being retrieved
    }

    // Advanced Search button
    document.getElementById('btn01Forgot').addEventListener('click', function () {
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Look-up button (advanced search)
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const name = document.getElementById('txtLookupname').value;
        const address = document.getElementById('txtLookupAddress').value;
        const county = document.getElementById('txtLookupCounty').value;
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

    // Handle "Information is Correct" button
    document.getElementById('btn04Verify').addEventListener('click', function () {
        // Gather data from the ticket confirmation form
        const memberNumber = document.getElementById('txtTicketCustID').value;
        const phoneNumber = document.getElementById('txtTicketPhone').value;
        const membershipName = document.getElementById('txtTicketname').value;

        function generatePrintableVotingSlip(memberNumber, phoneNumber, membershipName) {
            const template = `
                <div style="font-family: Arial, sans-serif; width: 8.5in; height: 5.5in; display: flex; padding: 20px; box-sizing: border-box; border: 1px solid #000;">
                    <!-- Main Voting Slip Content -->
                    <div style="width: 6in; padding-right: 10px; box-sizing: border-box;">
                        <h2 style="text-align: center; margin: 5px 0;">Twin Lakes Telephone Cooperative</h2>
                        <p style="text-align: center; margin: 5px 0;">Early Voting or Annual Meeting of Members</p>
                        <hr style="margin: 10px 0;">
                        <table style="width: 100%; margin-top: 10px;">
                            <tr>
                                <td><strong>Member Number:</strong></td>
                                <td>${memberNumber}</td>
                            </tr>
                            <tr>
                                <td><strong>Telephone #:</strong></td>
                                <td>${phoneNumber}</td>
                            </tr>
                            <tr>
                                <td><strong>Membership:</strong></td>
                                <td>${membershipName}</td>
                            </tr>
                            <tr>
                                <td><strong>Print Name:</strong> <span style="font-size: smaller;">(If other than member voting)</span></td>
                                <td>________________________</td>
                            </tr>
                            <tr>
                                <td><strong>Voter Signature:</strong></td>
                                <td>________________________</td>
                            </tr>
                        </table>
                        <div style="margin-top: 10px; text-align: right;">
                            <strong>Application #: ${memberNumber}</strong>
                        </div>
                    </div>
        
                    <!-- Raffle Ticket Section -->
                    <div style="width: 2.5in; display: flex; align-items: center; justify-content: center; border: 1px dashed #000; padding: 5px; box-sizing: border-box;">
                        <div style="transform: rotate(90deg); text-align: center;">
                            <p style="font-size: medium; margin: 0;">Raffle Ticket</p>
                            <p style="font-size: large; margin: 5px 0;"><strong>${memberNumber}</strong></p>
                            <p style="font-size: medium; margin: 5px 0;">${membershipName}</p>
                            <p style="font-size: small; margin: 5px 0;">${memberNumber} &bull; ${phoneNumber}</p>
                        </div>
                    </div>
                </div>
            `;
        
            // Open a new window for print preview
            const printWindow = window.open('', '_blank', 'width=850,height=550');
            printWindow.document.write(`
                <html>
                    <head><title>Voting Slip</title></head>
                    <body style="margin: 0; padding: 0;">${template}</body>
                </html>
            `);
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        }                                       

        // Call the function to generate the print preview
        generatePrintableVotingSlip(memberNumber, phoneNumber, membershipName);
    });

    document.addEventListener('DOMContentLoaded', function () {
        // Corrected event listener for "Information is Incorrect" button
        document.getElementById('btn04Corrections').addEventListener('click', function () {
            // Populate the correction form with current values from the confirmation form
            document.getElementById('txtCorrectFname').value = document.getElementById('txtTicketname').value.split(" ")[0] || '';
            document.getElementById('txtCorrectLname').value = document.getElementById('txtTicketname').value.split(" ")[1] || '';
            document.getElementById('txtCorrectCustID').value = document.getElementById('txtTicketCustID').value;
            document.getElementById('txtCorrectAddress').value = document.getElementById('txtTicketAddress').value;
            document.getElementById('txtCorrectPhone').value = document.getElementById('txtTicketPhone').value;
            document.getElementById('txtCorrectEmail').value = ''; // Set email field default
    
            // Show the correction form and hide the confirmation page
            document.getElementById('divTicketCorrection').style.display = 'block';
            document.getElementById('divTicketConfirmation').style.display = 'none';
        });
    
        // Confirm button in the correction form
        document.getElementById('btn05Confirm').addEventListener('click', function () {
            // Update confirmation form with corrected values
            document.getElementById('txtTicketname').value = document.getElementById('txtCorrectFname').value + ' ' + document.getElementById('txtCorrectLname').value;
            document.getElementById('txtTicketCustID').value = document.getElementById('txtCorrectCustID').value;
            document.getElementById('txtTicketAddress').value = document.getElementById('txtCorrectAddress').value;
            document.getElementById('txtTicketPhone').value = document.getElementById('txtCorrectPhone').value;
    
            // Hide correction form and show confirmation form
            document.getElementById('divTicketCorrection').style.display = 'none';
            document.getElementById('divTicketConfirmation').style.display = 'block';
        });
    
        // Cancel button in the correction form
        document.getElementById('btn05Cancel').addEventListener('click', function () {
            // Hide correction form and return to confirmation form without saving changes
            document.getElementById('divTicketCorrection').style.display = 'none';
            document.getElementById('divTicketConfirmation').style.display = 'block';
        });
    });
      
});
