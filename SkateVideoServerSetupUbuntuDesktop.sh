#!/usr/bin/env bash

script_dir=$(dirname $0)

if [ $script_dir == "." ]
	then source_dir="source"
		content_dir="content"
else
source_dir=$(echo $(dirname $0)"/source")
content_dir=$(echo $(dirname $0)"/content")
fi

if [ "$EUID" -ne 0 ];then
    echo "Please run as root"
else
    while true; do
        read -p "Please make sure you internet conection and enough battery life to proceed. Continue (y/n)?" choice
        case "$choice" in 
        y|Y )
            install=1
            break
        ;;

        n|N )
            install=0
            break
        ;;
        * )
            echo "Invalid option, try again..."
            continue
        ;;
        esac
    done

    if [ $install -eq 1 ]; then
        ## check for updates
        apt-get update -y

        ## isntall necesary stuff
        apt-get install -y apache2
        apt-get install -y nodejs

        ## put frontend files in place
        mkdir /var/www/html/skatevideoserver 
        mkdir /var/www/html/skatevideoserver/css /var/www/html/skatevideoserver/scripts /var/www/html/skatevideoserver/images
        cp $source_dir/index.html /var/www/html/skatevideoserver/
        cp $source_dir/error.html /var/www/html/skatevideoserver/
        cp $source_dir/master.css /var/www/html/skatevideoserver/css/
        cp $source_dir/desktops.css /var/www/html/skatevideoserver/css/
        cp $source_dir/mobiles.css /var/www/html/skatevideoserver/css/
        cp $source_dir/tablets.css /var/www/html/skatevideoserver/css/
        cp $source_dir/scripts.js /var/www/html/skatevideoserver/scripts/
        cp $source_dir/error.js /var/www/html/skatevideoserver/scripts/
        cp $source_dir/doggo.js /var/www/html/skatevideoserver/scripts/
        cp $source_dir/setup.js /var/www/html/skatevideoserver/scripts/
        cp $source_dir/crane.png /var/www/html/skatevideoserver/images/
        cp $source_dir/croqueto.png /var/www/html/skatevideoserver/images/
        cp $source_dir/downloading-file.png /var/www/html/skatevideoserver/images/
        cp $source_dir/github-logo.png /var/www/html/skatevideoserver/images/
        cp $source_dir/html-coding.png /var/www/html/skatevideoserver/images/
        cp $source_dir/skateboard.png /var/www/html/skatevideoserver/images/
        cp $source_dir/skateboard_fliped.png /var/www/html/skatevideoserver/images/
        cp $source_dir/skateboard_fliped_2.png /var/www/html/skatevideoserver/images/
        cp $source_dir/skateboard_2.png /var/www/html/skatevideoserver/images/
        cp $source_dir/skateboard_color.png /var/www/html/skatevideoserver/images/
        ## create symbolic link in home for easier access
        ln -s /var/www/html/skatevideoserver $HOME/frontend_skatevideoserver

        ## put backend files in place
        mkdir $HOME/backend_skatevideoserver
        cp $source_dir/compress.sh $HOME/backend_skatevideoserver/
        cp $source_dir/config.sh $HOME/backend_skatevideoserver/
        cp $source_dir/node.js $HOME/backend_skatevideoserver/
        chmod +x $HOME/backend_skatevideoserver/compress.sh $HOME/backend_skatevideoserver/config.sh $HOME/backend_skatevideoserver/node.js
        ## add main script to pach for easier usage
        ln -s $HOME/backend_skatevideoserver/config.sh /usr/local/bin/config

        ## put videos and comrpessed files in place
        mkdir $HOME/content_skatevideoserver
	mkdir $HOME/content_skatevideoserver/videos $HOME/content_skatevideoserver/compressed
        cp $content_dir/* $HOME/content_skatevideoserver/videos/

        ## configure server apache-config files
        cp $source_dir/skatevideoserver.conf /etc/apache2/sites-available/
        rm /etc/apache2/sites-enabled/*
        ln -s /etc/apahce2/sites-available/skatevideoserver.conf /etc/apache2/sites-enabled/skatevideoserver.conf
        echo "127.0.0.1 skatevideoserver" >> /etc/hosts


        ## set custom wallpaper
        gsettings set org.gnome.desktop.background picture-uri file:///$source_dir/wallpaper.png
        mkdir $HOME/.wallpaper
        cp $source_dir/wallpaper.png $HOME/.wallpaper
        
	## start services
	service apache2 start

        ## demo of web page
        config --assume-yes
        cat $source_dir/manual.txt
        cp $source_dir/manual.txt $HOME/
    
    else
        echo "Closing..."
    fi

        
fi

exit
