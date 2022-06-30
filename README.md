# LINE_Discord_gas  
[DiscordとLINE連携](https://github.com/maguro-alternative/discord_taityo)のLINE側です。  
[参考](https://qiita.com/i_tatte/items/6cd8d9ce0a93df249937)(というかほぼ丸パクリです。)

## 使用例  
<img src="https://raw.githubusercontent.com/maguro-alternative/mywebsite/main/pic/IMG_8389.png" width="45%">   <img src="https://raw.githubusercontent.com/maguro-alternative/mywebsite/main/pic/IMG_8390.png" width="45%"/>  

## LINE側でメンションも可能です。  
![](https://cdn.discordapp.com/attachments/964819280845766699/991519488149291079/2022-06-19_153318.png)
![](https://cdn.discordapp.com/attachments/964819280845766699/991520439325184030/2022-06-29_104732.png)  

## 時報と警告つき
無料フランの場合、LINE側には月1000件のメッセージ上限があります。  
それを回避するためのリミッターを設けてます。  
![](https://cdn.discordapp.com/attachments/964819280845766699/991893475266150400/unknown.png)  

#### リミッターの計算式は以下のとおり。  
```bash
1日の上限=メッセージ上限/月末日
残りの上限=メッセージ送信数/本日の日付

1日の上限>残りの上限
この条件が成立している場合にDiscordからLINEへメッセージが送信されます。

=================================================================

メッセージ上限(無料プラン)=1000
例:6月の場合
6月の月末日=30

1000/30=33.333333

メッセージ送信数が1日の時点で10の場合
10/1=10

1日の上限>残りの上限
33.333..>10

条件が成立するので送信されます。

メッセージ送信数が4日の時点で140の場合
140/4=35

1日の上限>残りの上限
33.333..<35

条件が成立しないので送信されません。

```
また、条件が成立しなくなる場合(1日の上限を超える場合)、警告メッセージが送信されます。  
![](https://cdn.discordapp.com/attachments/964819280845766699/991893555939381358/unknown.png)

# 概要  
Google Apps Scriptを使用しています。また、以下のAPIを使用します。  
|[![](https://gyazo.com/apple-touch-icon.png)](https://gyazo.com/api/docs)|[![](https://developers.line.biz/console/favicon.ico)](https://developers.line.biz/console/?status=success)|[![](https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico)](https://discord.com/developers/docs/resources/webhook)|
|---|---|---|
|[Gyazoトークン](https://gyazo.com/api/docs)|[LINE Developers](https://developers.line.biz/console/?status=success)|[Discord Webhook](https://discord.com/developers/docs/resources/webhook)|
|[参考(アーカイブ)](https://web.archive.org/web/20170724151212/http://yoshiyuki-hirano.hatenablog.jp/entry/2015/09/18/153155)|[参考](https://qiita.com/taka777n/items/c601421b871fd2b6a55f)|[参考](https://qiita.com/iroha71/items/b2a473898d6c9b4b4ae7)|
# プロパティ内容

```bash
スクリプトのプロパティの内容
prop.LINE_TOKEN     :LINEBotのトークン
prop.GROUP_ID       :LINEグループのid 
prop.SERVER_ID      :Discordサーバーのid
prop.TEXT_ID        :Discordサーバーのテキストチャンネルid
prop.RAILWAY_URL    :railwayで稼働させてるDiscordBotのURL
prop.NG_CHANNEL     :LINE側に送りたくないDiscordのテキストチャンネル名(カンマ区切り)
prop.SPREAD_ID      :Google Spread Sheetのid
prop.ANGRY_WEBHOOK  :1日の上限に達した場合警告するDiscordのWebhookのURL
prop.SIGNAL_WEBHOOK :日付が変更された場合にプッシュ状況を通知するDiscordのWebhookのURL
prop.TEST_WEBHOOK   :テスト用のDiscordのWebhookのURL
prop.GYAZO_TOKEN    :画像保存サービスGyazoのAPIを扱うためのトークン
```
