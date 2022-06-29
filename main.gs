// スクリプトのプロパティから環境変数を取得
var prop = PropertiesService.getScriptProperties().getProperties();

// Messaging APIのチャネルアクセストークン
var CHANNEL_ACCESS_TOKEN = prop.LINE_TOKEN

// LINEのグループID
var groupid_tmp = prop.GROUP_ID
// Discord側のサーバーID
var guild_id=prop.SERVER_ID

// Discordでのテキストチャンネル
var templeChannel=prop.TEXT_ID

// railwayのURL
var replitURL = prop.RAILWAY_URL
// LINE側に送りたくないメッセージチャンネル名 例：NG_CHANNEL=チャンネル名,チャンネル名....
const NGchannel = prop.NG_CHANNEL.split(',')

/*
 * ボットイベント処理
 */
//トリガーはここ
function doPost(e) {

  try{
    // LINEBotの状況を取得
    var states = dayget();
    
    // 送られてきたJSONファイルを展開
    var events = JSON.parse(e.postData.contents).events;
    
    // 展開されたJSONは配列なのでforEachで読み込み
    events.forEach(function(event) {
      //LINEからのメッセージの場合
      if(event.type == "message") {
        // LINEBotの状況をスプレッドシートに書き込む
        const letLog=[new Date(),
                      states.botfriend,
                      states.totalpush,
                      states.endmonth,
                      states.today,
                      states.endpush,
                      states.topush,
                      states.consumption,
                      states.daylimit,
                      event
        ]
        outputLog(letLog,"LINEログ")
        // Discordへメッセージ送信
        sendToDiscord(event);
      // Discordからのメッセージの場合
      }else if(event.type == 'discord') {
        // 送られてきたサーバーIDが一致しない場合
        if(event.guildid!=guild_id){
          outputLog(["別鯖"],"シート5")
          return
        }
        // 1日に(1000/月末日)件以上送った場合送信しない
        let flag=0
        // 送信可能か判断
        NGchannel.forEach((NG) => {
          if(states.topush>=states.endpush || event.channelid!=templeChannel && states.daylimit<2 || event.channelname==NG)
            flag=1
        });
        const letLog=[new Date(),
                      states.botfriend,
                      states.totalpush,
                      states.endmonth,
                      states.today,
                      states.endpush,
                      states.topush,
                      states.consumption,
                      flag,
                      event
        ]
        outputLog(letLog,"Discordログ")
        // 送信不可と判断し終了
        if(flag>0) return
        // 送信する際、1日の上限に達した場合警告
        if((states.totalpush+states.botfriend)/states.today>=states.endpush) angryDiscord();
        // LINEにメッセージを送信
        sendLineMessage(event);
      }
    });
  //}catch(TypeError){
  // ただの例外処理
  }catch(e){
    const letLog=[new Date(),
                      e
        ]
    //outputLog(letLog) 
    return
  }
}

//スプレッドシートに書き出し
function outputLog(txt,txtname) {
  var id = prop.SPREAD_ID;  
  var spreadSheet = SpreadsheetApp.openById(id);  
  var sheetName = txtname;
  //var sheetName = "シート5";
  
  spreadSheet.getSheetByName(sheetName).appendRow(
    txt
  );
}
