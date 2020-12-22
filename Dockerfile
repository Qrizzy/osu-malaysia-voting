# Node image
FROM node:12.18.3-alpine

# Set the working directory
WORKDIR /app

# Copy package.json
COPY dist/apps/api/package.json /app

# Copy lockfile
COPY dist/apps/api/yarn.lock /app

# Install dependencies
RUN yarn install --prod --ignore-scripts

# Copy dist
COPY dist/ /app/dist/

# Expose port
EXPOSE 3333

CMD [ "yarn", "start:prod" ]
