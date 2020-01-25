#!/usr/bin/env bash

videoDirectory="$HOME/content_skatevideoserver/videos/"
compressedDirectory="$HOME/content_skatevideoserver/compressed/"
name="skate_videos"

echo "Removing deprecated compressed files..."
rm ${compressedDirectory}*
echo "Creating .zip file..."
zip -r "${compressedDirectory}${name}.zip" $videoDirectory
echo "Creating .tar.gz file..."
tar -czvf "${compressedDirectory}${name}.tar.gz" ${videoDirectory}*

## uncomment for testing
# echo "Creating .tar file..."
# tar -cvf "${compressedDirectory}${name}.tar" $videoDrectory*