function lookup() {
    return $.getJSON('http://10.111.195.138:3000/' + document.getElementById('txtZip').value + '/' + document.getElementById('txtPhone').value)
        .then(result => {
            sessionStorage.setItem("databaseReturns", JSON.stringify(result));
            sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
            return result;  // Return the result to be used in toggles.js
        });
}

function advlookup() {
    $.getJSON('http://10.111.195.138:3000/adv/' +
        document.getElementById('txtLookupname').value + '/' +
        document.getElementById('txtLookupAddress').value + '/' +
        document.getElementById('txtLookupCounty').value, function (result) {
        sessionStorage.setItem("databaseReturns", JSON.stringify(result));
        sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
        return result;
    });
}
