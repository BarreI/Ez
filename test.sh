jsonData=`cat package.json`
version=$(echo $jsonData | jq '.version' | sed 's/^.*"\(.*\)".*$/\1/')
echo $version