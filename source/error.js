window.onload = function () {
    comeBack();
}

function comeBack(){
    if(jsonData && jsonData.videos && jsonData.videos.length)
        window.location.replace("index.html");
    else{
        console.log(jsonData);
        console.log(jsonData.compressed);
        console.log(jsonData.videos);
    }
}