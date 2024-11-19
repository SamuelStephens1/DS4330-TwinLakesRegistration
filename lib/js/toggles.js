document.addEventListener('DOMContentLoaded', function () {
    const verifyButton = document.getElementById('btn04Verify');
    if (!verifyButton) {
        console.error('btn04Verify not found in the DOM.');
        return;
    }
    // Button on the Search Page
    // List of all Tennessee and Kentucky ZIP codes
    const validZipCodes = [
        37301, 37302, 37303, 37304, 37305, 37306, 37307, 37308, 37309, 37310,
        37311, 37312, 37313, 37317, 37318, 37321, 37322, 37323, 37324, 37325,
        37327, 37328, 37329, 37330, 37331, 37332, 37333, 37334, 37335, 37336,
        37338, 37339, 37340, 37341, 37342, 37343, 37345, 37347, 37348, 37350,
        37352, 37353, 37354, 37355, 37356, 37357, 37359, 37360, 37361, 37362,
        37363, 37365, 37366, 37367, 37369, 37370, 37373, 37374, 37375, 37376,
        37377, 37378, 37379, 37380, 37381, 37382, 37383, 37384, 37385, 37387,
        37388, 37389, 37391, 37394, 37396, 37397, 37398, 37401, 37402, 37403,
        37404, 37405, 37406, 37407, 37408, 37409, 37410, 37411, 37412, 37415,
        37416, 37419, 37421, 37422, 37424, 37450, 37501, 37544, 37601, 37602,
        37604, 37605, 37614, 37615, 37616, 37617, 37618, 37620, 37621, 37625,
        37640, 37641, 37642, 37643, 37644, 37645, 37650, 37656, 37657, 37658,
        37659, 37660, 37662, 37663, 37664, 37665, 37669, 37680, 37681, 37682,
        37683, 37684, 37686, 37687, 37688, 37690, 37691, 37692, 37694, 37701,
        37705, 37707, 37708, 37709, 37710, 37711, 37713, 37714, 37715, 37716,
        37717, 37719, 37721, 37722, 37723, 37724, 37725, 37726, 37727, 37729,
        37730, 37731, 37732, 37733, 37737, 37738, 37742, 37743, 37744, 37745,
        37748, 37752, 37753, 37754, 37755, 37756, 37757, 37760, 37762, 37763,
        37764, 37765, 37766, 37769, 37770, 37771, 37772, 37773, 37774, 37777,
        37778, 37779, 37801, 37802, 37803, 37804, 37806, 37807, 37809, 37810,
        37811, 37813, 37814, 37815, 37816, 37818, 37819, 37820, 37821, 37822,
        37824, 37825, 37826, 37828, 37829, 37830, 37831, 37840, 37841, 37843,
        37845, 37846, 37847, 37848, 37849, 37851, 37852, 37853, 37854, 37857,
        37860, 37861, 37862, 37863, 37864, 37865, 37866, 37867, 37869, 37870,
        37871, 37872, 37873, 37874, 37876, 37877, 37878, 37879, 37880, 37881,
        37882, 37885, 37886, 37887, 37888, 37890, 37891, 37901, 37902, 37909,
        37912, 37914, 37915, 37916, 37917, 37918, 37919, 37920, 37921, 37922,
        37923, 37924, 37927, 37928, 37929, 37930, 37931, 37932, 37933, 37934,
        37938, 37939, 37940, 37950, 37995, 37996, 37997, 38001, 38002, 38004,
        38006, 38007, 38008, 38010, 38011, 38012, 38014, 38015, 38016, 38017,
        38018, 38019, 38021, 38023, 38024, 38025, 38027, 38028, 38029, 38030,
        38034, 38036, 38037, 38039, 38040, 38041, 38042, 38044, 38046, 38047,
        38049, 38050, 38052, 38053, 38054, 38055, 38057, 38058, 38059, 38060,
        38061, 38063, 38066, 38067, 38068, 38069, 38070, 38075, 38076, 38077,
        38079, 38080, 38083, 38088, 38101, 38103, 38104, 38105, 38106, 38107,
        38108, 38109, 38111, 38112, 38113, 38114, 38115, 38116, 38117, 38118,
        38119, 38120, 38122, 38125, 38126, 38127, 38128, 38130, 38131, 38132,
        38133, 38134, 38135, 38136, 38137, 38138, 38139, 38141, 38145, 38147,
        38148, 38150, 38151, 38152, 38157, 38159, 38161, 38163, 38166, 38167,
        38168, 38173, 38174, 38175, 38177, 38181, 38182, 38183, 38184, 38186,
        38187, 38188, 38190, 38193, 38197, 38201, 38220, 38221, 38222, 38223,
        38224, 38225, 38226, 38229, 38230, 38231, 38232, 38233, 38235, 38236,
        38237, 38238, 38240, 38241, 38242, 38251, 38253, 38254, 38255, 38256,
        38257, 38258, 38259, 38260, 38261, 38301, 38302, 38303, 38305, 38308,
        38310, 38311, 38313, 38314, 38315, 38316, 38317, 38318, 38320, 38321,
        38324, 38326, 38327, 38328, 38329, 38330, 38331, 38332, 38333, 38334,
        38336, 38337, 38338, 38339, 38340, 38341, 38342, 38343, 38344, 38345,
        38346, 38347, 38348, 38351, 38352, 38355, 38356, 38357, 38358, 38359,
        38361, 38362, 38363, 38365, 38366, 38367, 38368, 38369, 38370, 38371,
        38372, 38374, 38375, 38376, 38377, 38378, 38379, 38380, 38381, 38382,
        38387, 38388, 38389, 38390, 38391, 38392, 38401, 38402, 38425, 38449,
        38450, 38451, 38452, 38453, 38454, 38455, 38456, 38457, 38459, 38460,
        38461, 38462, 38463, 38464, 38468, 38469, 38471, 38472, 38473, 38474,
        38475, 38476, 38477, 38478, 38481, 38482, 38483, 38485, 38486, 38487,
        38488, 38501, 38502, 38503, 38504, 38505, 38506, 38541, 38542, 38543,
        38544, 38545, 38547, 38548, 38549, 38550, 38551, 38552, 38553, 38554,
        38555, 38556, 38557, 38558, 38559, 38560, 38562, 38563, 38564, 38565,
        38567, 38568, 38569, 38570, 38571, 38572, 38573, 38574, 38575, 38577,
        38578, 38579, 38580, 38581, 38582, 38583, 38585, 38587
    ];

    // Button on the Search Page
    document.getElementById('btn01Login').addEventListener('click', function () {
        const zip = document.getElementById('txtZip').value;
        let phone = document.getElementById('txtPhone').value;

        // Remove any non-numeric characters from the phone number
        phone = phone.replace(/\D/g, '');  // Strip out all non-numeric characters

        // Update the input field with the sanitized number (optional)
        document.getElementById('txtPhone').value = phone;

        // Check if ZIP code is valid for Tennessee or Kentucky
        if (!validZipCodes.includes(parseInt(zip, 10))) {
            alert('Please enter a valid Tennessee or Kentucky ZIP code.');
            return; // Exit function if ZIP code is not valid
        }

        // Ensure both fields are filled before calling the lookup function
        if (zip && phone) {
            lookup() // Proceed to the lookup with the sanitized phone number
                .then(result => {
                    console.log("API Response:", result);

                    const numOfReturns = result.rowsAffected ? result.rowsAffected[0] : 0;
                    const data = result.recordset;

                    if (numOfReturns > 0 && Array.isArray(data) && data.length > 0) {
                        if (data.length === 1) {
                            populateTicketForm(data[0]);
                            document.getElementById('divMemberLogin').style.display = 'none';
                            document.getElementById('divTicketConfirmation').style.display = 'block';
                        } else {
                            document.getElementById('divMemberLogin').style.display = 'none';
                            document.getElementById('divMemberSelection').style.display = 'block';
                            populateCustomerCards(data);
                        }
                    } else {
                        alert('No match found. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('An error occurred while fetching data. Please try again later.');
                });
        } else {
            alert('Please provide both Zip Code and Phone Number.');
        }
    });

    // Function to populate the customer selection cards
    function populateCustomerCards(customers) {
        const container = document.querySelector('#divMemberSelection .row');
        container.innerHTML = '';

        customers.forEach((customer, index) => {
            const card = document.createElement('div');
            card.className = 'card p-2 col';
            card.style.width = '20rem';

            let cardContent = `
                <label class="border border-success-subtle mb-1 p-1 text-center"><b>Customer ${index + 1}</b></label>
                <form>`;

            for (const key in customer) {
                if (customer.hasOwnProperty(key) && key !== 'member_number' && key !== 'email') {
                    const label = key.replace(/_/g, ' ').toUpperCase();
                    const value = customer[key];

                    cardContent += `
                        <div class="form-group">
                            <label class="form-label">${label}:</label>
                            <input class="form-control" type="text" value="${value}" disabled>
                        </div>`;
                }
            }

            cardContent += `
                </form>
                <button type="button" class="btn bg-success mt-2 col-12 text-white btnSelectCustomer">Select</button>`;

            card.innerHTML = cardContent;

            card.querySelector('.btnSelectCustomer').addEventListener('click', () => {
                populateTicketForm(customer);
                document.getElementById('divMemberSelection').style.display = 'none';
                document.getElementById('divTicketConfirmation').style.display = 'block';
            });

            container.appendChild(card);
        });
    }

    // Function to populate the ticket confirmation form with selected customer data
    function populateTicketForm(customer) {
        document.getElementById('txtTicketname').value = customer.name || '';
        document.getElementById('txtTicketCustID').value = customer.member_number || '';
        document.getElementById('txtTicketAddress').value = customer.service_address || '';
        document.getElementById('txtTicketPhone').value = customer.phone || '';
        console.log("Customer ID (Member Number):", customer.member_number);
    }

    // Advanced Search button to toggle form display
    document.getElementById('btn01Forgot').addEventListener('click', function () {
        document.getElementById('divMemberLogin').style.display = 'none';
        document.getElementById('divMemberLookup').style.display = 'block';
    });

    // Advanced Look-up button click event
    document.getElementById('btn02Lookup').addEventListener('click', function () {
        const firstName = document.getElementById('txtLookupFname').value.trim();
        const lastName = document.getElementById('txtLookupLname').value.trim();
        let county = document.getElementById('txtLookupCounty').value.trim();

        // Convert name to "LASTNAME FIRSTNAME" format in uppercase
        const fullName = `${lastName.toUpperCase()} ${firstName.toUpperCase()}`;

        // Validate and format county
        if (county.length === 4) {
            county = county.toUpperCase();
        } else {
            alert('County code must be exactly 4 letters.');
            return;
        }

        advlookup(fullName, county)
            .then(result => {
                const data = JSON.parse(sessionStorage.getItem("databaseReturns")).recordset;
                if (data && data.length > 0) {
                    if (data.length === 1) {
                        populateTicketForm(data[0]);
                        document.getElementById('divMemberLookup').style.display = 'none';
                        document.getElementById('divTicketConfirmation').style.display = 'block';
                    } else {
                        populateCustomerCards(data);
                        document.getElementById('divMemberLookup').style.display = 'none';
                        document.getElementById('divMemberSelection').style.display = 'block';
                    }
                } else {
                    alert('No match found. Please try again.');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    });

    function isSafari() {
        const ua = navigator.userAgent.toLowerCase();
        return ua.includes("safari") && !ua.includes("chrome");
    }

    // Print Slip Implementation for Safari
    function printSlipSafari(memberNumber, phoneNumber, membershipName) {
        const printWindow = window.open("", "PrintSlip", "width=850,height=550");
        const template = `
        <html>
        <head>
            <title>Voting Slip</title>
            <style>
                @page {
                    size: 8.5in 5.5in;
                    margin: 0;
                }
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                }
                .slip-container {
                    display: flex;
                    width: 8.5in;
                    height: 5.5in;
                    padding: 20px;
                    box-sizing: border-box;
                    border: 1px solid #000;
                }
                .left-section {
                    width: 6in;
                    padding-right: 10px;
                    box-sizing: border-box;
                }
                .right-section {
                    width: 2.5in;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 1px dashed #000;
                }
                .raffle-content {
                    transform: rotate(90deg);
                    text-align: center;
                }
                .raffle-content p {
                    margin: 5px 0;
                }
                .raffle-content .large {
                    font-size: large;
                    font-weight: bold;
                }
                .raffle-content .medium {
                    font-size: medium;
                }
                .raffle-content .small {
                    font-size: small;
                }
            </style>
        </head>
        <body>
            <div class="slip-container">
                <div class="left-section">
                    <h2 style="text-align: center;">Twin Lakes Telephone Cooperative</h2>
                    <p style="text-align: center;">Early Voting or Annual Meeting of Members</p>
                    <hr>
                    <table style="width: 100%; margin-top: 10px;">
                        <tr><td><strong>Member Number:</strong></td><td>${memberNumber}</td></tr>
                        <tr><td><strong>Telephone #:</strong></td><td>${phoneNumber}</td></tr>
                        <tr><td><strong>Membership:</strong></td><td>${membershipName}</td></tr>
                        <tr><td><strong>Print Name:</strong></td><td>________________________</td></tr>
                        <tr><td><strong>Voter Signature:</strong></td><td>________________________</td></tr>
                    </table>
                    <div style="margin-top: 10px; text-align: right;"><strong>Application #: ${memberNumber}</strong></div>
                </div>
                <div class="right-section">
                    <div class="raffle-content">
                        <p class="medium">Raffle Ticket</p>
                        <p class="large">${memberNumber}</p>
                        <p class="medium">${membershipName}</p>
                        <p class="small">${memberNumber} • ${phoneNumber}</p>
                    </div>
                </div>
            </div>
        </body>
        </html>
    `;

        printWindow.document.write(template);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = function () {
            printWindow.close();
        };
    }

    // Print Slip Implementation for Chrome/Other Browsers
    function printSlipChrome(memberNumber, phoneNumber, membershipName) {
        const originalContent = document.body.innerHTML;

        const template = `
        <div class="slip-container" style="display: flex; width: 8.5in; height: 5.5in; padding: 20px; box-sizing: border-box; border: 1px solid #000;">
            <div class="left-section" style="width: 6in; padding-right: 10px; box-sizing: border-box;">
                <h2 style="text-align: center;">Twin Lakes Telephone Cooperative</h2>
                <p style="text-align: center;">Early Voting or Annual Meeting of Members</p>
                <hr>
                <table style="width: 100%; margin-top: 10px;">
                    <tr><td><strong>Member Number:</strong></td><td>${memberNumber}</td></tr>
                    <tr><td><strong>Telephone #:</strong></td><td>${phoneNumber}</td></tr>
                    <tr><td><strong>Membership:</strong></td><td>${membershipName}</td></tr>
                    <tr><td><strong>Print Name:</strong></td><td>________________________</td></tr>
                    <tr><td><strong>Voter Signature:</strong></td><td>________________________</td></tr>
                </table>
                <div style="margin-top: 10px; text-align: right;"><strong>Application #: ${memberNumber}</strong></div>
            </div>
            <div class="right-section" style="width: 2.5in; display: flex; align-items: center; justify-content: center; border: 1px dashed #000;">
                <div class="raffle-content" style="transform: rotate(90deg); text-align: center;">
                    <p style="font-size: medium; margin: 0;">Raffle Ticket</p>
                    <p style="font-size: large; margin: 5px 0;"><strong>${memberNumber}</strong></p>
                    <p style="font-size: medium; margin: 5px 0;">${membershipName}</p>
                    <p style="font-size: small; margin: 5px 0;">${memberNumber} • ${phoneNumber}</p>
                </div>
            </div>
        </div>
    `;

        document.body.innerHTML = template;
        window.print();
        document.body.innerHTML = originalContent;
    }
    // Function to decide which print implementation to use
    function printSlip(memberNumber, phoneNumber, membershipName) {
        if (isSafari()) {
            printSlipSafari(memberNumber, phoneNumber, membershipName); // Safari-specific function
        } else {
            printSlipChrome(memberNumber, phoneNumber, membershipName); // Chrome/other browsers
        }
    }

    document.getElementById('btn04Verify').addEventListener('click', function () {
        const memberNumber = document.getElementById('txtTicketCustID').value;
        const phoneNumber = document.getElementById('txtTicketPhone').value;
        const membershipName = document.getElementById('txtTicketname').value;

        printSlip(memberNumber, phoneNumber, membershipName);
    });

    // Information is Incorrect button
    document.getElementById('btn04Corrections').addEventListener('click', function () {
        document.getElementById('txtCorrectFname').value = document.getElementById('txtTicketname').value.split(" ")[0] || '';
        document.getElementById('txtCorrectLname').value = document.getElementById('txtTicketname').value.split(" ")[1] || '';
        document.getElementById('txtCorrectCustID').value = document.getElementById('txtTicketCustID').value;
        document.getElementById('txtCorrectCustID').disabled = true;
        document.getElementById('txtCorrectAddress').value = document.getElementById('txtTicketAddress').value;
        document.getElementById('txtCorrectPhone').value = document.getElementById('txtTicketPhone').value;
        document.getElementById('divTicketCorrection').style.display = 'block';
        document.getElementById('divTicketConfirmation').style.display = 'none';
    });

    // Confirm button in correction form
    document.getElementById('btn05Confirm').addEventListener('click', function () {
        document.getElementById('txtTicketname').value = document.getElementById('txtCorrectFname').value + ' ' + document.getElementById('txtCorrectLname').value;
        document.getElementById('txtTicketCustID').value = document.getElementById('txtCorrectCustID').value;
        document.getElementById('txtTicketAddress').value = document.getElementById('txtCorrectAddress').value;
        document.getElementById('txtTicketPhone').value = document.getElementById('txtCorrectPhone').value;
        document.getElementById('divTicketCorrection').style.display = 'none';
        document.getElementById('divTicketConfirmation').style.display = 'block';
    });

    // Cancel button in correction form
    document.getElementById('btn05Cancel').addEventListener('click', function () {
        document.getElementById('divTicketCorrection').style.display = 'none';
        document.getElementById('divTicketConfirmation').style.display = 'block';
    });
});
