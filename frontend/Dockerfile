FROM node:20-slim AS base
ENV PATH="/app/node_modules/.bin:$PATH"
COPY . /app
WORKDIR /app

FROM base AS runner
ARG NEXT_PUBLIC_API_PORT
ARG NEXT_PUBLIC_API_HOST
ENV NEXT_PUBLIC_API_PORT=${NEXT_PUBLIC_API_PORT}
ENV NEXT_PUBLIC_API_HOST=${NEXT_PUBLIC_API_HOST}
RUN npm install --frozen-lockfile
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
