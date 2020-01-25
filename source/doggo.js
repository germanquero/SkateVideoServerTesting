function doggoSalutesBack(){
    document.querySelector(".greetings").innerHTML = "Woof-Woof! (Croqueto says Hi back)";
    document.querySelector(".doggoButton").innerHTML.setAttribute("onclick", "javascript: doggoGetsBored();");
}

function doggoGetsBored(){
    document.querySelector(".greetings").innerHTML = "Croqueto gets bored and goes away...";
    document.querySelector(".croqueto").style.display = "none";
    setTimeout(function (){document.querySelector(".greetings").style.display = "none" ;}, 1200);
}