FROM fedora:37 

# Aggiorna il sistema e installa le dipendenze necessarie
RUN sudo dnf -y update &&\
    sudo dnf install -y https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm &&\
    sudo dnf install -y git ffmpeg ImageMagick nodejs yarnpkg libwebp &&\
    sudo dnf clean all -y

# Clona il repository
RUN git clone https://github.com/ilcescodicosenz/cescobot

# Imposta la directory di lavoro
WORKDIR /root/cescobot

# Copia i file locali nella directory di lavoro
COPY ./root/Rei-cescobot

# Installa le dipendenze tramite yarn
RUN yarn install

# Comando per avviare il bot
CMD ["node", "index.js"]
