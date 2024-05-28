$(document).ready(function() {
    // Login button click handler
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

    // Forgot button click handler
    $('#btn01Forgot').on('click', function() {
        toggleLoginToLookup();
    });

    // Lookup button click handler
    $('#btn02Lookup').on('click', function() {
        toggleLookupToSelection();
    });

    // Select button click handler
    $('#btn03Select').on('click', function() {
        toggleSelectionToConfirmation();
    });

    // Corrections button click handler
    $('#btn04Corrections').on('click', function(){
        $('#divTicketConfirmation').slideUp();
        $('#divTicketCorrection').slideDown();
    });

    // Confirmation button click handler
    $('#btn05Confirm').on('click', function() {
        toggleCorrectionToConfirmation();
    });

    // Cancel button click handler
    $('#btn05Cancel').on('click', function() {
        $('#divTicketCorrection').slideUp(function() {
            $('#divTicketConfirmation').slideDown();
        });
    });

    // Verify button click handler
    $('#btn04Verify').on('click', function(){
        window.print();
    });
});
