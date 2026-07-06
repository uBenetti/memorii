FROM mcr.microsoft.com/devcontainers/python:3.12

RUN apt-get update && apt-get install -y curl

RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash -

RUN apt-get install -y nodejs

RUN npm install -g npm