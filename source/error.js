window.onload = function () {
    comeBack();
}

function comeBack(){
    if(jsonData != undefined && jsonData != null && jsonData.compressed.length != 0 && jsonData.videos.length != 0 && jsonData.length != 0){
        window.location.replace("index.html");
    }
}