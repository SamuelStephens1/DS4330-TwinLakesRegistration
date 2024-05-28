function toggleMemberLoginToTicketConfirmation(user) {
    $('#txtTicketFname').val(user.firstName);
    $('#txtTicketLname').val(user.lastName);
    $('#txtTicketCustID').val(user.customerID);
    $('#txtTicketAddress').val(user.address);
    $('#txtTicketPhone').val(user.phone);
    $('#txtTicketEmail').val(user.email);

    $('#divMemberLogin').slideToggle(function() {
        $('#divTicketConfirmation').slideToggle();
    });
}

function toggleLoginToLookup() {
    $('#divMemberLogin').slideToggle(function() {
        $('#divMemberLookup').slideToggle();
    });
}

function toggleLookupToSelection() {
    $('#divMemberLookup').slideToggle(function() {
        $('#divMemberSelection').slideToggle();
    });
}

function toggleSelectionToConfirmation() {
    $('#divMemberSelection').slideToggle(function() {
        $('#divTicketConfirmation').slideToggle();
    });
}

function toggleConfirmationToCorrection() {
    $('#divTicketConfirmation').slideToggle(function() {
        $('#divTicketCorrection').slideToggle();
    });
}

function toggleCorrectionToConfirmation() {
    $('#divTicketCorrection').slideToggle(function() {
        $('#divTicketConfirmation').slideToggle();
    });
}

function populateCorrectionFields() {
    const firstName = $('#txtTicketFname').val();
    const lastName = $('#txtTicketLname').val();
    const customerID = $('#txtTicketCustID').val();
    const address = $('#txtTicketAddress').val();
    const phone = $('#txtTicketPhone').val();
    const email = $('#txtTicketEmail').val();

    $('#txtCorrectFname').val(firstName);
    $('#txtCorrectLname').val(lastName);
    $('#txtCorrectCustID').val(customerID);
    $('#txtCorrectAddress').val(address);
    $('#txtCorrectPhone').val(phone);
    $('#txtCorrectEmail').val(email);
}

function toggleCorrectionToConfirmation() {
    $('#divTicketCorrection').slideToggle(function() {
        $('#divTicketConfirmation').slideToggle();
    });
}

function toggleConfirmationToCorrection() {
    $('#divTicketConfirmation').slideToggle(function() {
        $('#divTicketCorrection').slideToggle();
    });
}

// Add other functions if needed
