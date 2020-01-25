window.onload = function () {
    checkJson();
    drawButtons();
}

function checkJson(){
    if(!jsonData || !jsonData.videos || !jsonData.videos.length)
        window.location.replace("error.html");
}

function drawButtons(){
    for(var i = 0; i < jsonData.compressed.length; ++i){
        document.querySelector(".compressed").innerHTML += `
        <a class="downloadButton all" href="${jsonData.compressed[i].path}" download="${jsonData.compressed[i].download}">
        <div><img src="images/downloading-file.png" alt="X" class="image downloadIcon"></div>
        <div class="text fileName">${jsonData.compressed[i].name}</div>
        <div class="text weight">${jsonData.compressed[i].size}</div>
        </a>`;
    }
    for(var i = 0; i < jsonData.videos.length; ++i){
        document.querySelector(".video").innerHTML += `
        <a class="downloadButton" href="${jsonData.videos[i].path}" download="${jsonData.videos[i].download}">
        <div><img src="images/downloading-file.png" alt="X" class="image downloadIcon"></div>
        <div class="text fileName">${jsonData.videos[i].name}</div>
        <div class="text weight">${jsonData.videos[i].size}</div>
        </a>`;
    }
}