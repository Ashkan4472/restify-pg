#!/bin/bash

cd app

npm install
sleep 5
npx sequelize db:migrate
npm run dev
