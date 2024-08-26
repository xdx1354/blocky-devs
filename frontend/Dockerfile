# Etap 1: Budowanie aplikacji
FROM node:20-slim AS base
ENV PATH="/app/node_modules/.bin:$PATH"
WORKDIR /app
COPY . ./

# Etap 2: Uruchamianie aplikacji
FROM base AS runner
ARG REACT_APP_PUBLIC_API_PORT
ARG REACT_APP_PUBLIC_API_HOST
ENV REACT_APP_PUBLIC_API_PORT=${REACT_APP_PUBLIC_API_PORT}
ENV REACT_APP_PUBLIC_API_HOST=${REACT_APP_PUBLIC_API_HOST}
RUN npm install --frozen-lockfile
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]