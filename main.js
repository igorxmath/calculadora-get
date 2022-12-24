const listTabs = document.getElementsByClassName("tab");
const radios = document.getElementsByName("act");
const step = document.getElementsByClassName("step");
const info = JSON.parse(localStorage.getItem("info")) || "";

var currentTab = 0;
showTab(currentTab);

Object.entries(info).forEach(entry => {
    const [key, value] = entry;
    if (key == "checked") {
        document.getElementById(value).checked = "checked";
    }
    else {
        document.getElementById(key).value = value;
    }
});

// anonymous functions
document.querySelector("#prevBtn").onclick = () => {
    nextPrev(-1);
}

document.querySelector("#nextBtn").onclick = () => {
    nextPrev(1);
}

function showTab(n) {
    listTabs[n].style.display = "block";

    if (n == 0){
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }

    if (n == (listTabs.length - 1)){
        document.getElementById("nextBtn").innerHTML = "Finalizar";
    } else {
        document.getElementById("nextBtn").innerHTML = "Próximo";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    if (n == 1 && !validadeForm()) return false;

    if (n == 1 && currentTab + 1 == listTabs.length && !validadeRadios()) {
        alert("Marque uma opção de nível de atividade");
        return false;
    }

    step[currentTab].className += " finish";

    listTabs[currentTab].style.display = "none";
    currentTab = currentTab + n;

    if (currentTab >= listTabs.length) {
        document.getElementById("containermv").style.display = "none";
        document.getElementById("regForm").style.display = "none";
        document.getElementById("loaderid").style.display = "block";
        waitFunction();
        return false;
        }

    showTab(currentTab);
}

function validadeForm() {
    const dataInput = listTabs[currentTab].getElementsByTagName("input");

    for (i=0; dataInput.length > i; i++) {
        let strData = dataInput[i].value
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
    for (i=0; step.length > i; i++) {
        step[i].className = step[i].className.replace(" active", "")
    }
    step[n].className += " active" 
}

function waitFunction() {
    setTimeout(showResultsSection, 1000);
}

function showResultsSection() {
    document.getElementById("loaderid").style.display = "none";
    document.getElementById("results").style.display = "block";
    document.getElementById("showResultsGET").innerHTML = calculateTotalEnergy().toFixed(2) + " Kcal";
    document.getElementById("showResultsBMR").innerHTML = calculateBasal().toFixed(2) + " Kcal";
}

function calculateBasal() {
    let BMR;

    const itemsForm = document.getElementById("regForm").elements;

    let weight = itemsForm[0].value, height = itemsForm[1].value, age = itemsForm[2].value, sex = itemsForm[3].value;

    const infoUser = {
        "weight" : weight,
        "height" : height,
        "age" : age,
        "sex" : sex,
        "checked" : validadeRadios()
    }

    localStorage.setItem("info", JSON.stringify(infoUser))

    if (sex == "Option 1") {
        BMR = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    }
    else if (sex == "Option 2") {
        BMR = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }
    
    return BMR
}

function validadeRadios() {
    for (item of radios) {
        if (item.checked) {
            return item.id
        }
    }
    return false;
}

function calculateActivity() {
    let itemCheck = validadeRadios();
    let multiplier;

    switch(itemCheck){
        case "low":
            multiplier = 1.2
            break;
        case "mid":
            multiplier = 1.375
            break;
        case "high":
            multiplier = 1.55
            break;
        case "intense":
            multiplier = 1.725
            break;
    }

    return multiplier
}

function calculateTotalEnergy() {
    return calculateBasal() * calculateActivity();
}
