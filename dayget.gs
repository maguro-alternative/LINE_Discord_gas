function dayget() {
  //当月分のpushメッセージ数
  var quota = pushTotal();
  var day = new Date();
  
  //月末の日にちを取得
  var date = new Date(day.getFullYear(), day.getMonth()+1, 0);
  
  //botの友達数を取得
  var botFriend = groupCount()
  
  //botの送信上限
  var plimit=pushLimit()
  
  var Dayget={
    "totalpush":quota,
    "today":day.getDate(),
    "endmonth":date.getDate(),
    "endpush":plimit/date.getDate(),
    "botfriend":botFriend,
    "consumption":(quota+botFriend)/day.getDate()-(quota/day.getDate()),
    "topush":quota/day.getDate(),
    "daylimit":limitCount(plimit/date.getDate(),quota/day.getDate(),(quota+botFriend)/day.getDate()-(quota/day.getDate())),
    "monthlimit":plimit,
  }
  
  /*
  { 
    totalpush: 210,                当月プッシュしたメッセージ数
    today: 8,                      本日の日付(6月8日)
    endmonth: 30,                  月末日(6月30日)
    endpush: 33.333333333333336,   1日分のプッシュ上限(1000/月末日=1000/30=33.333336)
    botfriend: 10,                 グループの人数(botは除く)
    consumption: 1.25,             1回送信するたび消費するプッシュ数(27.5-26.25=1.25)
    topush: 26.25,                 1日分のプッシュ数(210/8=26.25)
    daylimit: 6,                   本日分の残り上限数(33.336-26.25=7.086,7.086/1.25=5.6688=6)
    monthlimit: 1000               botの送信上限
  }
  */
  console.log(Dayget)
  return Dayget
  
}

//残り送信上限(時報)
function limitCount(endPush,toPush,syo){
  var con=0
  while(endPush>=toPush){
    toPush=toPush+syo
    con++
  }
  return con
}

//残り送信上限
function channelLimit(){
  
  var states = dayget();
  
  var toPush = states.totalpush/states.today
  
  console.log(states)
  
  var con=0
  var tmp=0
  //var syo = (quota+botFriend)/today-toPush
  while(states.endpush>=toPush){
    con++
    tmp=toPush
    toPush=(states.totalpush+states.botfriend*con)/states.today
    console.log(states.topush-tmp);
  }
  console.log(con);
  return con
}

//当月分のプッシュ数を取得し、1日分の上限を定める
function pushTotal() {
  //利用状況をリクエスト(ついでにパース)
  var quota = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/message/quota/consumption", {
      "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  //当月分のプッシュ数を代入
  return quota.totalUsage;
}
//友達数を取得する関数
function friendCount(){
  var date = new Date();
  var today = Utilities.formatDate( date, 'UTC+9', 'yyyyMMdd');
  var friend = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/insight/followers?date="+today, {
        "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  return friend.followers;
}
//グループの人数を取得する関数
function groupCount(){
  var friend = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/group/"+groupid_tmp+"/members/count", {
        "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  return friend.count;
}
//botの送信上限(標準で1000)
function pushLimit(){
  var push = JSON.parse(UrlFetchApp.fetch("https://api.line.me/v2/bot/message/quota", {
        "method": "get",
        'headers': {
            'Content-Type': 'application/json; charset=UTF-8',
            'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN
        }
  }));
  console.log(push.value)
  return push.value;
}
