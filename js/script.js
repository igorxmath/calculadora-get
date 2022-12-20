var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";

    if (n == 0){
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (x.length - 1)){
        document.getElementById("nextBtn").innerHTML = "Finalizar";
    } else {
        document.getElementById("nextBtn").innerHTML = "Próximo";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");

    document.getElementsByClassName("step")[currentTab].className += " finish";

    x[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= x.length) {
        document.getElementById("containermv").style.display = "none";
        document.getElementById("regForm").style.display = "none";
        document.getElementById("loaderid").style.display = "block";
        waitFunction();
        return false;
      }

    showTab(currentTab);
}

function fixStepIndicator(n) {
    var i, x = document.getElementsByClassName("step");
    for (i=0; x.length > i; i++) {
        x[i].className = x[i].className.replace(" active", "")
    }
    x[n].className += " active" 
}

function waitFunction() {
    setTimeout(showPage, 1000);
}

function showPage() {
    document.getElementById("loaderid").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("showResults").innerHTML = calculateTotalEnergy().toFixed(2);;
}

function calculateBasal() {
    var BMR;

    var itemsForm = document.getElementById("regForm").elements;

    var weight = itemsForm[0].value, height = itemsForm[1].value, age = itemsForm[2].value, sex = itemsForm[3].value;

    if (sex == "Option 1") {
        BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    }
    else if (sex == "Option 2") {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }
    
    console.log(BMR)

    return BMR
}

function calculateIdActivite() {
    var radios = document.getElementsByName("act");
    var final;
    var calc;

    for (item of radios) {
        if (item.checked) {
            final = item.value
        }
    }

    switch(final){
        case "low":
            calc = 1.2
            break;
        case "mid":
            calc = 1.375
            break;
        case "high":
            calc = 1.55
            break;
        case "intense":
            calc = 1.725
            break;
    }

    return calc
}

function calculateTotalEnergy() {
    return calculateBasal() * calculateIdActivite();
}