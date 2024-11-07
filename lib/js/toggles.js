
document.addEventListener('DOMContentLoaded', function () {
    // Login button
    document.getElementById('btn01Search').addEventListener('click', function () {
        const zip = document.getElementById('txtZip').value;
        const phone = document.getElementById('txtPhone').value;
        if (zip && phone) {
            lookup();
            // Additional logic for checking results or displaying messages
        } else {
            alert('Please provide both Zip Code and Phone Number.');
        }
    });

    // Forgot Login button
    document.getElementById('btn01AdvancedSearched').addEventListener('click', function () {
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Look-up button
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const name = document.getElementById('txtName').value;
        const address = document.getElementById('txtAddress').value;
        const county = document.getElementById('txtCounty').value;
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

    // Select Customer button (for customer 1 or 2)
    document.querySelectorAll('#btn03Select').forEach(function (button) {
        button.addEventListener('click', function () {
            const customerData = {
                firstName: "John",
                lastName: "Doe",
                address: "123 Main St",
                phone: "555-555-5555",
                customerId: "123456",
                membership: "Active",
            };

            document.getElementById('txtTicketname').value = customerData.firstName;
            document.getElementById('txtTicketCustID').value = customerData.customerId;
            document.getElementById('txtTicketAddress').value = customerData.address;
            document.getElementById('txtTicketPhone').value = customerData.phone;

            document.getElementById('divMemberSelection').style.display = 'none';
            document.getElementById('divTicketConfirmation').style.display = 'block';
        });
    });

    // Cancel Customer Selection button
    document.getElementById('btn03Cancel').addEventListener('click', function () {
        document.getElementById('divMemberSelection').style.display = 'none';
        document.getElementById('divMemberLogin').style.display = 'block';
    });

    // Verify ticket information
    document.getElementById('btn04Verify').addEventListener('click', function () {
        console.log('Ticket information verified');
        generatePrintableVotingSlip();
    });

    // Corrections to ticket information
    document.getElementById('btn04Corrections').addEventListener('click', function () {
        document.getElementById('divTicketConfirmation').style.display = 'none';
        document.getElementById('divTicketCorrection').style.display = 'block';
    });

    // Confirm ticket corrections
    document.getElementById('btn05Confirm').addEventListener('click', function () {
        const name = document.getElementById('txtCorrectname').value;
        const custID = document.getElementById('txtCorrectCustID').value;
        const address = document.getElementById('txtCorrectAddress').value;
        const phone = document.getElementById('txtCorrectPhone').value;

        if (name && custID && address && phone) {
            document.getElementById('txtTicketname').value = name;
            document.getElementById('txtTicketCustID').value = custID;
            document.getElementById('txtTicketAddress').value = address;
            document.getElementById('txtTicketPhone').value = phone;

            document.getElementById('divTicketCorrection').style.display = 'none';
            document.getElementById('divTicketConfirmation').style.display = 'block';
        } else {
            alert('Please fill in all required fields.');
        }
    });

    // Cancel corrections
    document.getElementById('btn05Cancel').addEventListener('click', function () {
        document.getElementById('divTicketCorrection').style.display = 'none';
        document.getElementById('divTicketConfirmation').style.display = 'block';
    });

    // Function to generate and print the voting slip
    function generatePrintableVotingSlip() {
        const custID = document.getElementById('txtTicketCustID').value;
        const fname = document.getElementById('txtTicketFname').value;
        const lname = document.getElementById('txtTicketLname').value;
        const phone = document.getElementById('txtTicketPhone').value;

        const votingSlipTemplate = `
            <div style="border:1px solid #000; padding: 20px; font-family: Arial; width: 600px;">
                <h2>Voting Slip</h2>
                <p><strong>Member Number:</strong> ${custID}</p>
                <p><strong>Telephone #:</strong> ${phone}</p>
                <p><strong>Membership:</strong> Active</p>
                <p><strong>Print Name:</strong> ${fname} ${lname}</p>
                <p><strong>Voter Signature:</strong> ________________________</p>
                <p><strong>Registrar Initials:</strong> ________________________</p>
            </div>
        `;

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head><title>Voting Slip</title></head>
                <body>${votingSlipTemplate}</body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
    }
});
