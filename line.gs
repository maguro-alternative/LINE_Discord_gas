/*
 * LINEBotへメッセージを送信処理
 */
function sendLineMessage(dis) {
  //try{
  var message={}
  var contmp=[]
  
  // LINEに送るメッセージテキストを構築
  var text=dis.channelname+"にて"+dis.name+"「 "+dis.message+" 」"
  
  //画像や動画が存在する場合
  if(typeof dis.img!=="undefined" || typeof dis.video!=="undefined"){
    text=dis.channelname+"にて"+dis.name+"が"
    if(dis.img.length>0)
      text=text+"、画像を"+dis.img.length+"枚"
    if(dis.video.length>0)
      text=text+"、動画を"+Object.keys(dis.video[0]).length+"件"
    /*if(dis.voice.length>0)
      text=text+"、音声を"+Object.keys(dis.voice[0]).length+"件"*/
    text=text+"送信しました。"+"「 "+dis.message+" 」"
  }
  
  message["to"]=groupid_tmp
  contmp[0]={"type":"text"}
  contmp[0]["text"]=text
  message["messages"]=contmp
  
  /*
  {
    "to":LINEグループid,
    "messages":[
      {
        "type":"text",
        "text":LINEに送るメッセージテキスト
      }
    ]
  }
  */
  
  if(typeof dis.img!=="undefined"){
    //outputLog([new Date(),dis.img.length])
    var len=dis.img.length
    for(let i=0;i<len;i++){
      var tmp={}
      var name="image"+i
      tmp["type"]="image"
      tmp["originalContentUrl"]=dis.img[i][name]
      tmp["previewImageUrl"]=dis.img[i][name]
      message["messages"].push(tmp)
    }
  }
  /*
  {
    "type":"image",
    "originalContentUrl": 画像URL,
    "previewImageUrl": 画像URL
  }
  */
  if(typeof dis.video!=="undefined"){
    var len=dis.video.length
    for(let i=0;i<len;i++){
      var tmp={}
      var name="video"+i
      tmp["type"]="video"
      tmp["originalContentUrl"]=dis.video[i][name]
      tmp["previewImageUrl"]="https://cdn.discordapp.com/attachments/943046430711480402/987284460070404106/ohime.JPG"
      message["messages"].push(tmp)
    }
  }
  /*
  {
    "type":"video",
    "originalContentUrl:動画URL,
    "previewImageUrl":サムネ画像URL
  }
  */
  /*}catch(e){
  const letLog=[new Date(),
                    e
        ]
    outputLog(letLog,"シート5")
  }*/
  /*if(dis.voice.length>0){
    var len=Object.keys(dis.voice[0]).length
    for(let i=0;i<len;i++){
      var tmp={}
      var name="voice"+i
      tmp["type"]="audio"
      tmp["originalContentUrl"]=dis.voice[0][name]
      tmp["previewImageUrl"]=dis.voice[0][name]
      message["message"].push(tmp)
    }
  }*/
  
  /*const letLog=[new Date(),
                   JSON.stringify(message)
        ]
        outputLog(letLog)*/
  
  //var m=JSON.stringify(message)
  // LINEにpostするメッセージデータ
  var replyData = {
    "method" : "post",
    "headers" : {
      "Content-Type" : "application/json",
      "Authorization" : "Bearer " + CHANNEL_ACCESS_TOKEN
    },
    "payload" : JSON.stringify(message)
  };
  // LINEにデータを投げる
  var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", replyData);
  //var response = UrlFetchApp.fetch("https://api.line.me/v2/bot/message/broadcast", replyData);
  // LINEにステータスコード200を返す
  return response.getResponseCode();
}
