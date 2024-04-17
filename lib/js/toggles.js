$('#btn01Login').on('click', function(){
    $('#divMemberLogin').slideToggle(function(){
        $('#divTicketConfirmation').slideToggle();
    })
})

$('#btn01Forgot').on('click',function(){
    $('#divMemberLogin').slideToggle(function(){
        $('#divMemberLookup').slideToggle();
    })
})

$('#btn02Lookup').on('click',function(){
    $('#divMemberLookup').slideToggle(function(){
        $('#divMemberSelection').slideToggle();
    })
})

$('#btn02Cancel').on('click',function(){
    $('#divMemberLookup').slideToggle(function(){
        $('#divMemberLogin').slideToggle();
    })
})

$('#btn03Select').on('click',function(){
    $('#divMemberSelection').slideToggle(function(){
        $('#divTicketConfirmation').slideToggle();
    })
})

$('#btn03Cancel').on('click',function(){
    $('#divMemberSelection').slideToggle(function(){
        $('#divMemberLookup').slideToggle();
    })
})
$('#btn04Verify').on('click',function(){
    $('#').slideToggle(function(){
        $('#').slideToggle();
    })
})
$('#btn04Corrections').on('click',function(){
    $('#divTicketConfirmation').slideToggle(function(){
        $('#divTicketCorrection').slideToggle();
    })
})
$('#btn05Confirm').on('click',function(){
    $('#divTicketCorrection').slideToggle(function(){
        $('#divTicketConfirmation').slideToggle();
    })
})
$('#btn05Cancel').on('click',function(){
    $('#divTicketCorrection').slideToggle(function(){
        $('#divTicketConfirmation').slideToggle();
    })
})