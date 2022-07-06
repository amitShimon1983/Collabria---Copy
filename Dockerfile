FROM alpine

RUN apk add --update nodejs npm git yarn

COPY . /

RUN npm install ts-node typescript tsconfig-paths bunyan vite jest rimraf -g

RUN yarn nuke-r \
    && rm -rf packages/backend/subscriptions \
    && rm yarn.lock \
    && yarn \
    && yarn frontend:build \ 
    && yarn email-teammate:build 

RUN mkdir -p /packages/backend/server/collabria
RUN mkdir -p /packages/backend/server/email-teammate

RUN cp -R /packages/frontend/collabria/dist/** /packages/backend/server/collabria
RUN cp -R /packages/frontend/email-teammate/dist/** /packages/backend/server/email-teammate

ENV NODE_ENV=production

EXPOSE 3978

ENTRYPOINT ["yarn", "backend:serve"]
