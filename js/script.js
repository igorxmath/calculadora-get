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
        // currentTab = 0; finish
        var teste = document.getElementById("regForm").elements[3].value;
        console.log(teste);
        document.getElementById("prevBtn").style.display = "none";
        document.getElementById("nextBtn").style.display = "none";
        document.getElementById("containermv").style.display = "none";
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
