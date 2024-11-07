function lookup() {
    $.getJSON('http://10.111.195.138:3000/' + document.getElementById('txtZip').value + '/' + document.getElementById('txtPhone').value, function (result) {
        sessionStorage.setItem("databaseReturns", JSON.stringify(result));
        sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
    });
}

function advlookup() {
    $.getJSON('http://10.111.195.138:3000/adv/' +
        document.getElementById('txtName').value + '/' +
        document.getElementById('txtAddress').value + '/' +
        document.getElementById('txtCounty').value, function (result) {
        sessionStorage.setItem("databaseReturns", JSON.stringify(result));
        sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
    });
}
