window.onload = function () {
    comeBack();
}

function comeBack(){
    if(jsonData != undefined && jsonData != null && jsonData.videos != undefined && jsonData.videos != null)
        window.location.replace("index.html");
    else{
        console.log(jsonData);
        console.log(jsonData.compressed);
        console.log(jsonData.videos);
    }
}