function lookup() {
    const zip = document.getElementById('txtZip').value.trim();
    const phone = document.getElementById('txtPhone').value.trim();

    if (!zip || !phone) {
        alert("Please provide both Zip Code and Phone Number.");
        return Promise.reject("Missing required fields.");
    }

    const url = `http://192.168.1.82:3000/${encodeURIComponent(zip)}/${encodeURIComponent(phone)}`;

    return $.getJSON(url)
        .then(result => {
            sessionStorage.setItem("databaseReturns", JSON.stringify(result));
            sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
            return result;
        })
        .catch(error => {
            console.error("Error in lookup:", error);
            alert("An error occurred while fetching data. Please try again later.");
            return Promise.reject(error);
        });
}

function advlookup(name, county) {
    if (!name || !county) {
        alert("Please provide both Name and County.");
        return Promise.reject("Missing required fields.");
    }

    const url = `http://192.168.1.82:3000/adv/${encodeURIComponent(name)}/${encodeURIComponent(county)}`;

    return $.getJSON(url)
        .then(result => {
            sessionStorage.setItem("databaseReturns", JSON.stringify(result));
            sessionStorage.setItem("numOfReturns", JSON.parse(sessionStorage.getItem("databaseReturns")).rowsAffected[0]);
            return result;
        })
        .catch(error => {
            console.error("Error in advlookup:", error);
            alert("An error occurred while fetching data. Please try again later.");
            return Promise.reject(error);
        });
}
