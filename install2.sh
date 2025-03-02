#!/bin/bash 

# Interrompere l'esecuzione in caso di errore
set -e

if [ -d "node_modules" ]; then
    echo "La cartella 'node_modules' esiste già. Saltando il download e l'installazione."
else
    echo "Scaricando node_modules.tar.gz..."
    curl -L -o node_modules.tar.gz https://github.com/ilcescodicosenz/cescobot/releases/download/1.1.8/node_modules.tar.gz

    echo "Estraendo node_modules..."
    tar -xzf node_modules.tar.gz

    # Eliminare il file compresso dopo l'estrazione
    rm node_modules.tar.gz

fi

echo "Avviando il bot..."
npm start
