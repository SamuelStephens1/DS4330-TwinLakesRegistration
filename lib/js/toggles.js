$('#btnRegisterSwap').on('click', function(){
    $('#divLogin').slideToggle(function(){
        $('#divRegister').slideToggle();
    })
})
$('#btnReturnLogin').on('click',function(){
    $('#divRegister').slideToggle(function(){
        $('#divLogin').slideToggle();
    })
})