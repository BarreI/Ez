clear
echo "npm での公開処理"
echo " "
cat ~/.npmrc

echo -n "ここに公開しても良いですか?"
read ANS

case $ANS in
    [Yy]*)
    clear
    
    npm pack --dry-run
    
    echo -n "このファイルを公開しても良いですか?"
    read ANS_2

    case $ANS_2 in 
    [Yy]*)
        sh ready.sh
        cp index.ts docs/index.ts
        cp index.js docs/index.js
        cp -r documents docs/documents
        clear
        echo "公開中..."
        npm publish
    ;;
    *)
    clear
    echo "公開をキャンセルしました。"
    esac

    ;;
    *)
    clear
    echo "公開をキャンセルしました。"
esac