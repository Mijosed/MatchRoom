# Build Stage 1
FROM node:22-alpine AS build
WORKDIR /app

# Activation de corepack (optionnel avec npm, mais gardé si tu en as besoin)
RUN corepack enable

# Copie des fichiers nécessaires pour installer les dépendances
COPY package.json package-lock.json ./

# Installation des dépendances avec npm
RUN npm install

# Copie de tout le projet dans l'image
COPY . ./

# Construction du projet
RUN npm run build

# Build Stage 2
FROM node:22-alpine
WORKDIR /app

# Copie du dossier de sortie de la build
COPY --from=build /app/.output/ ./

# Configuration du port et de l'hôte
ENV PORT 80
ENV HOST 0.0.0.0

EXPOSE 80

# Lancement de l'application
CMD ["node", "/app/server/index.mjs"]
