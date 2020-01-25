#!/usr/bin/env bash

video_directory="$HOME/content_skatevideoserver/videos/"
compressed_directory="$HOME/content_skatevideoserver/compressed/"
name="skate_videos"
num_videos=$(ls -l $video_directory | wc -l)

if [ $num_videos < 2 ]; then
    echo "Not enough videos to make compress files"
else
    echo "Removing deprecated compressed files..."
    rm ${compressed_directory}*
    echo "Creating .zip file..."
    zip -r "${compressed_directory}${name}.zip" $video_directory
    echo "Creating .tar.gz file..."
    tar -czvf "${compressed_directory}${name}.tar.gz" ${video_directory}*
di
## uncomment for testing
# echo "Creating .tar file..."
# tar -cvf "${compressedDirectory}${name}.tar" $videoDrectory*