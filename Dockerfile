FROM node:17.5.0-alpine
WORKDIR /usr/app
COPY package*.json ./

# Installs latest Chromium (92) package.
# RUN apk add --no-cache \
#       chromium \
#       nss \
#       freetype \
#       harfbuzz \
#       ca-certificates \
#       ttf-freefont \
#       nodejs \
#       yarn

# Tell Puppeteer to skip installing Chrome. We'll be using the installed package.
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
#     PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Puppeteer v10.0.0 works with Chromium 92.
# RUN npm install puppeteer@10.0.0

# Add user so we don't need --no-sandbox.
# RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
#     && mkdir -p /home/pptruser/Downloads /app \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /app

RUN npm install
COPY . .
ENTRYPOINT [ "npm", "start" ]