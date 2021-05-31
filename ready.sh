echo Convarting TS to JS
tsc index.ts
echo Convarted

echo copying to docs
cp index.js docs/index.js
cp index.ts docs/index.ts

cp ./test.html ./docs/test.html
