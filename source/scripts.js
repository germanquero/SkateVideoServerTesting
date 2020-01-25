window.onload = function () {
    checkJson();
    drawButtons();
}

function chechJson(){
    if(jsonData == undefined || jsonData == null || jsonData.compressed.length == 0 || jsonData.videos.length == 0 || jsonData.length == 0 ){
        window.location.replace("error.html");
    }
}

function drawbuttons(){
    for(var i = 0; i < jsonData.compressed.length; ++i){
        document.querySelector(".compressed").innerHTML += `
        <a class="downloadButton all" href="${jsonData.compressed[i].path}" download="${jsonData.compressed[i].download}">
        <div><img src="/var/www/html/skatevideoserver/images/downloading-file.png" alt="X" class="image downloadIcon"></div>
        <div class="text fileNAme">${jsonData.compressed[i].name}</div>
        <div class="text weight>${jsonData.compressed[i].size}</div>
        </a>`;
    }
    for(var i = 0; i < jsonData.compressed.length; ++i){
        document.querySelector(".compressed").innerHTML += `
        <a class="downloadButton" href="${jsonData.videos[i].path}" download="${jsonData.videos[i].download}">
        <div><img src="/var/www/html/skatevideoserver/images/downloading-file.png" alt="X" class="image downloadIcon"></div>
        <div class="text fileNAme">${jsonData.videos[i].name}</div>
        <div class="text weight>${jsonData.videos[i].size}</div>
        </a>`;
    }
}