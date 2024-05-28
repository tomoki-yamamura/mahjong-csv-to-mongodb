#!/bin/bash

# .envファイルから環境変数を読み込む
export $(grep -v '^#' .env | xargs)

# sam local invokeコマンドを実行
sam local invoke MahjongScoreLambdaFunction --event event.json
