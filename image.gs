// スクリプトのプロパティから環境変数を取得
var prop = PropertiesService.getScriptProperties().getProperties();
//lineから送信された画像をバイナリデータで取得
function getImage(url) {
    return UrlFetchApp.fetch(url, {
        "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
    });
}
//バイナリデータの画像をgyazoに送信し、urlを取得
function gyazoup(image){
  var options  = {
    "method": "post",
    "payload": {
      "access_token": prop.GYAZO_TOKEN,
      "imagedata": image
    }
  };
  return UrlFetchApp.fetch("https://upload.gyazo.com/api/upload",options);
}
