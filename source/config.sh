#!/usr/bin/env bash


prechoice=$1
commit=0

if [ $prechoice == "--assume-yes" ]; then
    commit=1
else
    while true; do
            read -p "You will commit changes are you sure (y/n)?" choice
            case "$choice" in 
            y|Y )
                commit=1
                break
            ;;

            n|N )
                commit=0
                break
            ;;
            * )
                echo "Invalid option, try again..."
                continue
            ;;
            esac
        done
fi

if [ $commit -eq 0 ]; then
    echo "Closing..."
else
    echo "Creating compressed files."
    sh $HOME/backend_skatevideoserver/compress.sh
    echo "Overwritting json."
    nodejs $HOME/backend_skatevideoserver/node.js
fi