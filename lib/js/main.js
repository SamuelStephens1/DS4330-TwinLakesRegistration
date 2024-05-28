$(document).ready(function() {
    $('#btn01Login').on('click', function() {
        const email = $('#txtEmail').val();
        const password = $('#txtPassword').val();

        loginUser(email, password)
        .then(data => {
            if (data.success) {
                toggleMemberLoginToTicketConfirmation(data.user);
            } else {
                alert('Customer not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });

    $('#btn01Forgot').on('click', function() {
        toggleLoginToLookup();
    });

    $('#btn02Lookup').on('click', function() {
        toggleLookupToSelection();
    });

    $('#btn03Select').on('click', function() {
        toggleSelectionToConfirmation();
    });

    $('#btn04Corrections').on('click', function(){
        $('#divTicketConfirmation').slideToggle(function(){
            $('#divTicketCorrection').slideToggle();
        });
    });

    $('#btn05Confirm').on('click', function() {
        toggleCorrectionToConfirmation();
    });

    $('#btn05Cancel').on('click', function() {
        $('#divTicketCorrection').slideToggle(function() {
            $('#divTicketConfirmation').slideToggle();
        });
    });
});

function generatePrintTemplate() {
    const firstName = $('#txtCorrectFname').val();
    const lastName = $('#txtCorrectLname').val();
    const customerID = $('#txtCorrectCustID').val();
    const address = $('#txtCorrectAddress').val();
    const phone = $('#txtCorrectPhone').val();
    const email = $('#txtCorrectEmail').val();

    // Generate HTML template
    const template = `
        <div>
            <h2>Customer Information</h2>
            <p><b>First Name:</b> ${firstName}</p>
            <p><b>Last Name:</b> ${lastName}</p>
            <p><b>Customer ID:</b> ${customerID}</p>
            <p><b>Address:</b> ${address}</p>
            <p><b>Phone:</b> ${phone}</p>
            <p><b>Email:</b> ${email}</p>
        </div>
    `;

    // Insert template into a hidden element
    $('#hiddenPrintTemplate').html(template);

    // Trigger print functionality
    window.print();
}
