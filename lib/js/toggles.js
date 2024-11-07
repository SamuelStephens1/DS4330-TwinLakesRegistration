document.addEventListener('DOMContentLoaded', function () {
    // Login button
    document.getElementById('btn01Login').addEventListener('click', function () { // Updated to match index.html
        const zip = document.getElementById('txtZip').value;
        const phone = document.getElementById('txtPhone').value;
        if (zip && phone) {
            lookup();
        } else {
            alert('Please provide both Zip Code and Phone Number.');
        }
    });

    // Advanced Search button
    document.getElementById('btn01Forgot').addEventListener('click', function () { // Updated to match index.html
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Look-up button (advanced search)
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const name = document.getElementById('txtLookupname').value; // Updated ID
        const address = document.getElementById('txtLookupAddress').value; // Updated ID
        const county = document.getElementById('txtLookupCounty').value; // Updated ID
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

    // Ensure other button IDs are also updated accordingly if needed.
});
