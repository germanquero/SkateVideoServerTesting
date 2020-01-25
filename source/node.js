#!/usr/bin/env node

function capitalizeStr(str){
    var array1 = str.split(" ");
    var newArray1 = [];

    for(var x = 0; x < array1.length; ++x){
        newArray1.push(array1[x].charAt(0).toUpperCase()+array1[x].slice(1));
    }
    return newArray1.join(" ");
}

const homedir = require("os").homedir();
var videoDirectory = homedir+"/content_skatevideoserver/videos";
var compressedDirectory = homedir+"/content_skatevideoserver/compressed/";
var scriptDirectory = "/var/www/skatevideoserver/scripts/json.js";
var fs = require('fs');
var videoPath= fs.readdirSync(videoDirectory);
var compressedPath= fs.readdirSync(compressedDirectory);
var videoName = [];
var compressedName = [];
var videoSize = [];
var compressedSize = [];
var videoDownload = [];
var compressedDownload = [];
var stats;
var extension;
let jsonLine;

fs.writeFileSync("videos.json", "{\"videos\":[");

for (let i = 0; i < videoPath.length; ++i){
    console.logs(i);
    videoDownload.push(capitalizeStr(videoPath[i].replace(/.*\//,"").replace(/_/g,"")));
    videoName.push(videoDownload[i].replace(/\.[^/.]+$/,""));
    videoPath[i] = videoDirectory + videoPath[i];
    stats = fs.statSync(videoPath[i]);
    videoSize.push((stats.size / 1000000.0).toString().replace(/\.[^/.]+$/,"") + "Mb.");
    jsonLine = {
        name: videoName[i],
        path: videoPath[i],
        size: videoSize[i],
        downlaod: videoDownload[i]
    }
    fs.appendFileSync("videos.json", JSON.stringify(jsonLine));
    if (i != (videoPath.length - 1))
        fs.appendFileSync("videos.json", ",");
}

fs.appendFileSync("videos.json", "],\"compressed\":[");

for (let i = 0; i < compressedPath.length; ++i){
    extension = compressedPath[i].replace(/^(.*?)\./, "");
    compressedDownload.push("Skate Videos (All)." + extension);
    compressedName.push("Download All (." + extension + ")");
    compressedPath[i] = compressedDirectory + compressedPath[i];
    stats = fs.statSync(compressedPath[i]);
    compressedSize.push((stats.size / 1000000.0).toString().replace(/\.[^/.]+$/,"") + "Mb.");
    jsonLine = {
        name: compressedName[i],
        path: compressedPath[i],
        size: compressedSize[i],
        downlaod: compressedDownload[i]
    }
    fs.appendFileSync("videos.json", JSON.stringify(jsonLine));
    if (i != (compressedPath.length - 1))
        fs.appendFileSync("videos.json", ",");
}

fs.appendFileSync("videos.json", "]}");

fs.writeFileSync(scriptDirectory, "var jsonData = " + fs.readFileSync("videos.json", "utf-8"));

console.log("VIDEO NAMES: ");
console.log(videoName);
console.log("VIDEO PATHS: ");
console.log(videoPath);
console.log("VIDEO SIZES: ");
console.log(videoSize);
console.log("VIDEO DOWNLOADS: ");
console.log(videoDownload);
console.log("COMPRESSED NAMES: ");
console.log(compressedName);
console.log("COMPRESSED PATHS: ");
console.log(compressedPath);
console.log("COMPRESSED SIZES: ");
console.log(compressedSize);
console.log("COMPRESSED DOWNLOADS: ");
console.log(compressedDownload);