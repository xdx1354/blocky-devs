# BUILDING THE APP
FROM node:20-slim AS base
ENV PATH="/app/node_modules/.bin:$PATH"
WORKDIR /app
COPY . ./

# RUNNING THE APP
FROM base AS runner
ARG REACT_APP_PUBLIC_API_PORT
ARG REACT_APP_PUBLIC_API_HOST
ENV REACT_APP_PUBLIC_API_PORT=${REACT_APP_PUBLIC_API_PORT}
ENV REACT_APP_PUBLIC_API_HOST=${REACT_APP_PUBLIC_API_HOST}
ARG REACT_APP_RPC_KEY
ENV REACT_APP_RPC_KEY=${REACT_APP_RPC_KEY}
ARG REACT_APP_COINGECO_API_KEY
ENV REACT_APP_COINGECO_API_KEY=${REACT_APP_COINGECO_API_KEY}
ARG REACT_APP_WALLET_PROJECT_ID
ENV REACT_APP_WALLET_PROJECT_ID=${REACT_APP_WALLET_PROJECT_ID}

RUN npm install --frozen-lockfile
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]