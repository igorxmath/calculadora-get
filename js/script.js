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

    if (n == 1 && !validadeForm(x)) return false;

    if (n == 1 && currentTab + 1 == x.length && !validadeRadios()) {
        alert("Marque uma opção de nível de atividade");
        return false;
    }

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

function validadeRadios() {
    var radios = document.getElementsByName("act");

    for (item of radios) {
        if (item.checked) {
            return true;
        }
    }

    return false;
}

function validadeForm(x) {
    var y = x[currentTab].getElementsByTagName("input");
    var i;

    for (i=0; y.length > i; i++) {
        var strData = y[i].value
        if (strData == "") {
            alert("O formulário deve ser preenchido apenas com números e não deve estar vazio");
            return false;
        }
        else if (!containsOnlyNumbers(strData) && !strData == "low" && !strData == "mid" && !strData == "high" && !strData == "intense") {
            alert("O formulário deve ser preenchido apenas com números e não deve estar vazio");
            return false;
        }
    }

    return true;
}

function containsOnlyNumbers(strData) {
    return /^[0-9]+$/.test(strData);
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
    document.getElementById("showResultsGET").innerHTML = calculateTotalEnergy().toFixed(2) + " Kcal";
    document.getElementById("showResultsBMR").innerHTML = calculateBasal().toFixed(2) + " Kcal";

    document.getElementById("resultsIMC").style.display = "block";
    document.getElementById("showResultsIMC").innerHTML = "IMC elevado";
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