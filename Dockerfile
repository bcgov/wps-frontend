FROM node:10

# URL for API
ENV API_URL=https://wps-api-prod.pathfinder.gov.bc.ca

# Set working directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

## Install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN npm set progress=false && npm ci --no-cache

# Copy the contents of the project to the image
COPY . .

EXPOSE 3000

CMD ["npm", "start"]