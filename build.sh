git pull
cd client
npm install --force
npm run build
mv build ../server/build
cd ../server
npm install