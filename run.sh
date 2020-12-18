#!/bin/bash

npm run build
pm2 serve build 3000 --spa --name frontend 
