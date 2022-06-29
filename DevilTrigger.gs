//0時にLINE側のプッシュ状況を知らせるためのトリガー設定
function setTrigger(){
  
  delTrigger();
  const time = new Date();
  time.setHours(24);
  time.setMinutes(00);
  ScriptApp.newTrigger('pushMesseage').timeBased().at(time).create();

}
//トリガーの削除
function delTrigger() {

  const triggers = ScriptApp.getProjectTriggers();
  for(const trigger of triggers){
    if(trigger.getHandlerFunction() == "pushMesseage"){
      ScriptApp.deleteTrigger(trigger);
    }
  }
  
}
