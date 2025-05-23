var requiredtxtFields = ["firstname", "lastname", "emailaddr", "pword", "reason"]
var dataFields = {"firstname": "First name", "lastname": "Last name", "emailaddr": "Email address", "sex": "Sex", "reason": "Why you're supporting this campaign"};
function checkRequiredtxtFields() {
    var goodToGo = true;
    for(var i = 0; i < requiredtxtFields.length; ++i) {
        var id = requiredtxtFields[i];
        var field = document.getElementById(id);
        var textVal = field.value.trim()
        if(textVal === "") {
            document.getElementById(id+"REQUIRED").innerHTML = "REQUIRED";
            goodToGo = false;
        } else {
            document.getElementById(id+"REQUIRED").innerHTML = "";
        }
    }
    return goodToGo;
}
function signUp() {
    var didTxtFields = checkRequiredtxtFields();
    var didRadioField = false;
    var radiosToCheck = document.getElementsByName("sex");
    for(var i = 0; i < radiosToCheck.length; ++i) {
        if(radiosToCheck[i].checked && didTxtFields) {
            localStorage.setItem("profile", JSON.stringify({
                "firstname": firstname.value,
                "lastname": lastname.value,
                "emailaddr": emailaddr.value,
                "pword": pword.value,
                "contactno": contactno.value,
                "sex": radiosToCheck[i].value,
                "reason": reason.value
            }));
            window.location.href = "proj_profile_bernal.html";
            return;
        } else if(radiosToCheck[i].checked) {
            didRadioField = true;
        }
    }
    if(!didRadioField)
        sexREQUIRED.innerHTML = "REQUIRED";
    else
        sexREQUIRED.innerHTML = "";
}

function loadProfile() {
    if(localStorage.getItem("profile") !== null) {
        var dataFieldsKeys = Object.keys(dataFields);
        var profileData = JSON.parse(localStorage.getItem("profile"));

        welcome_message.innerHTML = `Welcome ${profileData["firstname"]}! Here's your current profile:`;

        profile_content.innerHTML = "";
        for(var i = 0; i < dataFieldsKeys.length; ++i) {
            if(dataFieldsKeys[i] === "reason") {
                profile_content.innerHTML += `${dataFields[dataFieldsKeys[i]]}: <br>${profileData[dataFieldsKeys[i]]}<br>`;
            } else {
                profile_content.innerHTML += `${dataFields[dataFieldsKeys[i]]}: ${profileData[dataFieldsKeys[i]]}<br>`;
            }
        }
    } else {
        profile_content.innerHTML = "Currently not signed in.";
    }
}

if(document.getElementById("signup_nav") != undefined) {
    if(localStorage.getItem("profile") !== null) {
        document.getElementById("signup_nav").remove();
    }
}
