#!/data/data/com.termux/files/usr/bin/bash  

# Codice sviluppato da @gata_dios  
# * Se biforcate questo repository, per favore lasciate i crediti a tutti i creatori di ogni codice. ♥

BOT_DIR="cescobot"  
BOT_REPO="https://github.com/ilcescodicosenz/$BOT_DIR"
DB_FILE="database.json"

GREEN='\033[32m'
BOLD='\033[1m'
RESET='\033[0m'

if [[ $(basename "$PWD") == "$BOT_DIR" ]]; then
    if [ -e "$DB_FILE" ]; then 
        echo -e "${BOLD}${GREEN}Spostando \"$DB_FILE\" in \"$HOME\" e clonando il repository \"$BOT_REPO\" in \"$HOME\"...${RESET}"
        echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning repository \"$BOT_REPO\" into \"$HOME\"...\n${RESET}"
        mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME" && cd && rm -rf "$HOME/$BOT_DIR" && git clone "$BOT_REPO" && cd "$HOME/$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Recuperando il file \"$DB_FILE\" e spostandolo in \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" non esiste in \"$HOME\"${RESET}"
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\"\n${RESET}"
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            cd "$BOT_DIR" && npm start
        fi
    else
        echo -e "${BOLD}${GREEN}\"$DB_FILE\" non trovato in \"$BOT_DIR\", clonando il repository \"$BOT_REPO\" in \"$HOME\"...${RESET}"
        echo -e "${BOLD}${GREEN}\"$DB_FILE\" not found in \"$BOT_DIR\", cloning repository \"$BOT_REPO\" to \"$HOME\"...\n${RESET}"
        cd && rm -rf "$HOME/$BOT_DIR" && git clone "$BOT_REPO" && cd "$HOME/$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Recuperando il file \"$DB_FILE\" e spostandolo in \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" && npm start
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" non esiste in \"$HOME\"${RESET}"
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist in \"$HOME\"\n${RESET}"
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            cd "$BOT_DIR" && npm start
        fi
    fi
else
    echo -e "${BOLD}${GREEN}Posizione attuale: \"$HOME\"${RESET}"
    echo -e "${BOLD}${GREEN}Current location: \"$HOME\"\n${RESET}"
    cd "$HOME"
    if [ -e "$HOME/$BOT_DIR" ]; then
        echo -e "${BOLD}${GREEN}Entrando in \"$BOT_DIR\".${RESET}"
        echo -e "${BOLD}${GREEN}Heading to \"$BOT_DIR\".\n${RESET}"
        cd "$HOME/$BOT_DIR"
        if [ -e "$HOME/$BOT_DIR/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Spostando \"$DB_FILE\" in \"$HOME\" e clonando il repository \"$BOT_REPO\" in \"$HOME\"...${RESET}"
            echo -e "${BOLD}${GREEN}Moving \"$DB_FILE\" to \"$HOME\" and cloning repository \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
            mv "$HOME/$BOT_DIR/$DB_FILE" "$HOME" && cd && rm -rf "$BOT_DIR" && git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install && cd
            if [ -e "$HOME/$DB_FILE" ]; then
                echo -e "${BOLD}${GREEN}Recuperando il file \"$DB_FILE\" e spostandolo in \"$BOT_DIR\".${RESET}"
                echo -e "${BOLD}${GREEN}Rescuing file \"$DB_FILE\" and moving it to \"$BOT_DIR\".\n${RESET}"
                mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" &&
                echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
                echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
                npm start
            else
                echo -e "${BOLD}${GREEN}Entrando in \"$BOT_DIR\"...${RESET}"
                echo -e "${BOLD}${GREEN}Heading to \"$BOT_DIR\".\n${RESET}"
                cd "$BOT_DIR" && 
                echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
                echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
                npm start
            fi
        else
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" non esiste, clonando il repository \"$BOT_REPO\" in \"$HOME\"...${RESET}"
            echo -e "${BOLD}${GREEN}\"$DB_FILE\" does not exist, cloning \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
            cd && rm -rf "$BOT_DIR" && git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install &&
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            npm start
        fi
    else
        echo -e "${BOLD}${GREEN}\"$BOT_DIR\" non esiste, clonando il repository \"$BOT_REPO\" in \"$HOME\"...${RESET}"
        echo -e "${BOLD}${GREEN}\"$BOT_DIR\" does not exist, cloning \"$BOT_REPO\" in \"$HOME\"...\n${RESET}"
        git clone "$BOT_REPO" && cd "$BOT_DIR" && yarn --ignore-scripts && npm install && cd
        if [ -e "$HOME/$DB_FILE" ]; then
            echo -e "${BOLD}${GREEN}Ho trovato un file \"$DB_FILE\" in \"$HOME\", lo sposterò in \"$BOT_DIR\".${RESET}"
            echo -e "${BOLD}${GREEN}I have found a file \"$DB_FILE\" in \"$HOME\", moving it to \"$BOT_DIR\".\n${RESET}"
            mv "$HOME/$DB_FILE" "$HOME/$BOT_DIR/" && cd "$BOT_DIR" &&
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            npm start
        else
            cd "$BOT_DIR" &&
            echo -e "${BOLD}${GREEN}Avviando $BOT_DIR...${RESET}"
            echo -e "${BOLD}${GREEN}Starting $BOT_DIR...\n${RESET}"
            npm start
        fi
    fi
fi
