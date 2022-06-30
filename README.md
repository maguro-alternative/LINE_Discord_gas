# LINE_Discord_gas  
[DiscordとLINE連携](https://github.com/maguro-alternative/discord_taityo)のLINE側です。  
[参考](https://qiita.com/i_tatte/items/6cd8d9ce0a93df249937)(というかほぼ丸パクリです。)
## 使用例  
<img src="https://raw.githubusercontent.com/maguro-alternative/mywebsite/main/pic/IMG_8389.png" width="45%">   <img src="https://raw.githubusercontent.com/maguro-alternative/mywebsite/main/pic/IMG_8390.png" width="45%"/>  
## LINE側でメンションも可能です。  
![](https://cdn.discordapp.com/attachments/964819280845766699/991519488149291079/2022-06-19_153318.png)
![](https://cdn.discordapp.com/attachments/964819280845766699/991520439325184030/2022-06-29_104732.png)  
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
