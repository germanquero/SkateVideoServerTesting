window.onload = function () {
    comeBack();
}

function comeBack(){
    if(jsonData != undefined && jsonData != null && jsonData.compressed != undefined && jsonData.compressed != null && jsonData.videos != undefined && jsonData.videos != null){
        window.location.replace("index.html");
    }
    else
        console.log(jsonData);
}