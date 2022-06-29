// スクリプトのプロパティから環境変数を取得
var prop = PropertiesService.getScriptProperties().getProperties();

function sendToDiscord(e) {
  // LINEからユーザ名を取得するためのリクエストヘッダー
  var requestHeader = {
    "headers" : {
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    }
  };
  var userID = e.source.userId;
  
  // LINEにユーザープロフィールリクエストを送信(返り値はJSON形式)
  var groupid_tmp = e.source.groupId;
  
  // LINEにユーザープロフィールリクエストを送信(返り値はJSON形式)
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/group/"+groupid_tmp+"/member/"+userID, requestHeader);
  
  var message = e.message.text;
  // レスポンスからユーザーのディスプレイネームを抽出
  var name = JSON.parse(response.getContentText()).displayName;
  if(e.message.type === 'image'){
    //画像データをバイナリで取得
    var image = getImage('https://api-data.line.me/v2/bot/message/'+e.message.id+'/content');
    //バイナリデータを画像ファイルに変換しURLを取得
    var gyazo = JSON.parse(gyazoup(image.getBlob()));
    sendDiscordImage(name, gyazo);
  }else{
    sendDiscordMessage(name, message);
  }
  // LINEにステータスコード200を返す(これがないと動かない)
  return response.getResponseCode();
}


//lineから送られてきたテキストメッセージをdiscordにrailway経由で送信
function sendDiscordMessage(name, message) {
  var headers = {
    "Content-Type": "application/json"
  };
  var events = [{
    "type": "discord",
    "name": name,
    "guild_id": guild_id,
    "templeChannel_id": templeChannel,
    "message": message,
  }]
  var payload = JSON.stringify(events)
  var options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    "muteHttpExceptions" : true,
  };
  
  response = UrlFetchApp.fetch(replitURL, options);
    
  // こちらはステータスコードを返す必要はない
}


//lineから送られてきた画像をdiscordにrailway経由で送信
function sendDiscordImage(name, gazou) {
  var headers = {
    "Content-Type": "application/json"
  };
  var events = [{
    "type": "discord",
    "name": name,
    "guild_id": guild_id,
    "templeChannel_id": templeChannel,
    "message": name+"\n"+gazou.url,
  }]
  var payload = JSON.stringify(events)
  var options = {
    "method": "post",
    "headers": headers,
    "payload": payload,
    "muteHttpExceptions" : true,
  };
  
  response = UrlFetchApp.fetch(replitURL, options);
}


//1日のpush上限を超えそうな場合
function angryDiscord(){
  var webhookURL = prop.ANGRY_WEBHOOK;
  //デバック用
  //var webhookURL = prop.TEST_WEBHOOK;
  
  var states = dayget();
  
  let angry=["本日分のpush上限になりました。\nちょっとは遠慮してください。",
             "いい加減にしなさい。もうプッシュ上限ですよ。",
             "何回言えばいいんだ！！プッシュ上限やぞ！！",
             "月1000だから警告します！プッシュ上限行きました！！！！！",
             "プッシュ上限DAAAAAAAAAAAAAAAAAAAAA!!",
             "HikakinTVでプッシュ上限とか言ったことあんまないけど",
             "初めてですよ、ここまで私をコケにしたおバカさんたちは、、、、",
             "初めてですよ、ここまでメッセージプッシュをしたおバカさんたちは、、、、",
             "ふざけたことを、シグマ！！！！！",
             "LINEAPIがゴミすぎる！！！！！！もうプッシュ上限行っちまった！！！！",
             "https://i.gyazo.com/f33c91b679db9d43e487a361af71c24b.jpg",
             "https://i.gyazo.com/823876944f308a302385d5c3796e8807.jpg",
             "https://cdn.discordapp.com/attachments/838941939935084544/905718258034941952/E5CE1C31-63A0-4203-9BDE-6623A42D008F.jpg",
             "https://i.gyazo.com/cc676d2a5c59250f3d4f3fba83e20553.png",
             "https://i.gyazo.com/af5e076ed50ae2dae0b2b772a7fa7cfe.png",
             "もうキレキレkinですよもう。"];
  var angmes=angry[Math.floor(Math.random()*angry.length)]
  var options = {
    "content" : "@everyone "+angmes+
                "\n一か月分のプッシュ上限                                                 "+states.monthlimit+"件"+
                "\n今月分のプッシュ数                                                          "+states.totalpush+
                "件\n1送信につき消費するプッシュ数（botの友達数） "+states.botfriend+
                "\n本日分のプッシュ上限                                                     "+states.endpush+
                "\n本日のプッシュ数                                                              "+states.topush
  };
  
  // データを作って投げる
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
  
}
function pushMesseage(){
  var webhookURL = prop.SIGNAL_WEBHOOK;
  //var webhookURL = prop.TEST_WEBHOOK;
  
  var states = new dayget();
  
  var options = {
    "content" : "@here 日付が変更されました。本日分の上限をお伝えいたします。\n"+
                "\n一か月分のプッシュ上限                  "+states.monthlimit+"件"+
                "\n今月分のプッシュ数                          "+states.totalpush+"件"+
                "\n本日分のプッシュ上限                      "+states.endpush+
                "\n本日のプッシュ数                               "+states.topush+
                "\n1送信につき消費するプッシュ数   "+states.consumption+
                "\n**残り送信上限                                           "+states.daylimit+
                "**\n残り送信上限が2以上の場合、雑談以外のチャンネルのメッセージも送信されます。(閲覧注意チャンネルは除く。)"
  };
  // データを作って投げる
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
}

function pushMesseage2(){
  //var webhookURL = prop.TEST_WEBHOOK;
  var webhookURL = prop.ANGRY_WEBHOOK;
  var options = {
    "content" : ""
  };
  // データを作って投げる
  var response = UrlFetchApp.fetch(
    webhookURL,
    {
      method: "POST",
      contentType: "application/json",
      payload: JSON.stringify(options),
      muteHttpExceptions: true,
    }
  );
}
