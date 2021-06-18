echo Convarting TS to JS
tsc index.ts
echo Convarted

jsonData=`cat package.json`
version=$(echo $jsonData | jq '.version' | sed 's/^.*"\(.*\)".*$/\1/' | tr -d .)
version=$((version + 1))
echo $version

echo copying to docs
mkdir docs/versions/$version -p
cp index.js docs/versions/$version/index.js
cp index.ts docs/versions/$version/index.ts
cp -r documents docs/versions/$version/documents

mkdir docs/beta
cp index.js docs/beta/index.js
cp index.ts docs/beta/index.ts

cp test.html docs/beta/test.html
