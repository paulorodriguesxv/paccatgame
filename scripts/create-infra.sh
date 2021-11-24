#!/bin/bash

sudo apt-get update -y 
sudo apt-get upgrade -y
# needs restart 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

nvm install 12.18
nvm use 12.18
npm install pm2 -g
npm install yarn -g

# gerar certificado ssh e adiciona-lo ao github
# clonar repositorio
# configurar o contract address e as demais variavies de ambiente corretas no paccat-server

# iniciar o serviço:
#   pm2 start index.js  -i max --watch

# acessar ./app/paccat-client e executar o buil: npm run build
# mover os arquivos da pasta build para dentro da pasta public do server