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
                    const data = result.recordset;

                    if (numOfReturns > 0 && Array.isArray(data) && data.length > 0) {
                        if (data.length === 1) {
                            populateTicketForm(data[0]);
                            document.getElementById('divMemberLogin').style.display = 'none';
                            document.getElementById('divTicketConfirmation').style.display = 'block';
                        } else {
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
        container.innerHTML = ''; 

        customers.forEach((customer, index) => {
            const card = document.createElement('div');
            card.className = 'card p-2 col';
            card.style.width = '20rem';

            let cardContent = `
                <label class="border border-success-subtle mb-1 p-1 text-center"><b>Customer ${index + 1}</b></label>
                <form>`;

            for (const key in customer) {
                if (customer.hasOwnProperty(key) && key !== 'member_number' && key !== 'email') {
                    const label = key.replace(/_/g, ' ').toUpperCase();
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
                <button type="button" class="btn bg-success mt-2 col-12 text-white btnSelectCustomer">Select</button>`;

            card.innerHTML = cardContent;

            card.querySelector('.btnSelectCustomer').addEventListener('click', () => {
                populateTicketForm(customer);
                document.getElementById('divMemberSelection').style.display = 'none';
                document.getElementById('divTicketConfirmation').style.display = 'block';
            });

            container.appendChild(card);
        });
    }

    // Function to populate the ticket confirmation form with selected customer data
    function populateTicketForm(customer) {
        document.getElementById('txtTicketname').value = customer.name || '';
        document.getElementById('txtTicketCustID').value = customer.member_number || '';
        document.getElementById('txtTicketAddress').value = customer.service_address || '';
        document.getElementById('txtTicketPhone').value = customer.phone || '';
        console.log("Customer ID (Member Number):", customer.member_number);
    }

    // Advanced Search button to toggle form display
    document.getElementById('btn01Forgot').addEventListener('click', function () {
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Advanced Look-up button click event
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const name = document.getElementById('txtLookupname').value;
        const address = document.getElementById('txtLookupAddress').value;
        const county = document.getElementById('txtLookupCounty').value;

        if (name && address && county) {
            // Call the existing `advlookup` function
            const result = advlookup();

            // Retrieve results from `sessionStorage`
            const databaseReturns = JSON.parse(sessionStorage.getItem("databaseReturns"));
            const numOfReturns = sessionStorage.getItem("numOfReturns");

            if (numOfReturns > 0 && Array.isArray(databaseReturns.recordset) && databaseReturns.recordset.length > 0) {
                if (databaseReturns.recordset.length === 1) {
                    populateTicketForm(databaseReturns.recordset[0]);
                    document.getElementById('divMemberLookup').style.display = 'none';
                    document.getElementById('divTicketConfirmation').style.display = 'block';
                } else {
                    document.getElementById('divMemberLookup').style.display = 'none';
                    document.getElementById('divMemberSelection').style.display = 'block';
                    populateCustomerCards(databaseReturns.recordset);
                }
            } else {
                alert('No match found for the advanced search. Please try again.');
            }
        } else {
            alert('Please provide Name, Address, and County for advanced search.');
        }
    });

    // Handle "Information is Correct" button
    document.getElementById('btn04Verify').addEventListener('click', function () {
        const memberNumber = document.getElementById('txtTicketCustID').value;
        const phoneNumber = document.getElementById('txtTicketPhone').value;
        const membershipName = document.getElementById('txtTicketname').value;

        function generatePrintableVotingSlip(memberNumber, phoneNumber, membershipName) {
            const template = `
                <div style="font-family: Arial; width: 8.5in; height: 5.5in; display: flex; padding: 20px; border: 1px solid #000;">
                    <div style="width: 6in; padding-right: 10px;">
                        <h2 style="text-align: center;">Twin Lakes Telephone Cooperative</h2>
                        <p style="text-align: center;">Early Voting or Annual Meeting of Members</p>
                        <hr style="margin: 10px 0;">
                        <table style="width: 100%; margin-top: 10px;">
                            <tr><td><strong>Member Number:</strong></td><td>${memberNumber}</td></tr>
                            <tr><td><strong>Telephone #:</strong></td><td>${phoneNumber}</td></tr>
                            <tr><td><strong>Membership:</strong></td><td>${membershipName}</td></tr>
                            <tr><td><strong>Print Name:</strong></td><td>________________________</td></tr>
                            <tr><td><strong>Voter Signature:</strong></td><td>________________________</td></tr>
                        </table>
                        <div style="margin-top: 10px; text-align: right;"><strong>Application #: ${memberNumber}</strong></div>
                    </div>
                    <div style="width: 2.5in; display: flex; align-items: center; justify-content: center; border: 1px dashed #000;">
                        <div style="transform: rotate(90deg); text-align: center;">
                            <p style="font-size: medium; margin: 0;">Raffle Ticket</p>
                            <p style="font-size: large; margin: 5px 0;"><strong>${memberNumber}</strong></p>
                            <p style="font-size: medium; margin: 5px 0;">${membershipName}</p>
                            <p style="font-size: small; margin: 5px 0;">${memberNumber} • ${phoneNumber}</p>
                        </div>
                    </div>
                </div>`;

            const printWindow = window.open('', '_blank', 'width=850,height=550');
            printWindow.document.write(`<html><head><title>Voting Slip</title></head><body>${template}</body></html>`);
            printWindow.document.close();
            printWindow.print();
            printWindow.close();
        }

        generatePrintableVotingSlip(memberNumber, phoneNumber, membershipName);
    });

    // Information is Incorrect button
    document.getElementById('btn04Corrections').addEventListener('click', function () {
        document.getElementById('txtCorrectFname').value = document.getElementById('txtTicketname').value.split(" ")[0] || '';
        document.getElementById('txtCorrectLname').value = document.getElementById('txtTicketname').value.split(" ")[1] || '';
        document.getElementById('txtCorrectCustID').value = document.getElementById('txtTicketCustID').value;
        document.getElementById('txtCorrectCustID').disabled = true;
        document.getElementById('txtCorrectAddress').value = document.getElementById('txtTicketAddress').value;
        document.getElementById('txtCorrectPhone').value = document.getElementById('txtTicketPhone').value;
        document.getElementById('divTicketCorrection').style.display = 'block';
        document.getElementById('divTicketConfirmation').style.display = 'none';
    });

    // Confirm button in correction form
    document.getElementById('btn05Confirm').addEventListener('click', function () {
        document.getElementById('txtTicketname').value = document.getElementById('txtCorrectFname').value + ' ' + document.getElementById('txtCorrectLname').value;
        document.getElementById('txtTicketCustID').value = document.getElementById('txtCorrectCustID').value;
        document.getElementById('txtTicketAddress').value = document.getElementById('txtCorrectAddress').value;
        document.getElementById('txtTicketPhone').value = document.getElementById('txtCorrectPhone').value;
        document.getElementById('divTicketCorrection').style.display = 'none';
        document.getElementById('divTicketConfirmation').style.display = 'block';
    });

    // Cancel button in correction form
    document.getElementById('btn05Cancel').addEventListener('click', function () {
        document.getElementById('divTicketCorrection').style.display = 'none';
        document.getElementById('divTicketConfirmation').style.display = 'block';
    });
});
