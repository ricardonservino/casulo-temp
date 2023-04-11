function postToDiscord(msg) {
  const url = "https://discord.com/api/webhooks/1068171211667951638/I1cr97HTsPiw5m_YXG5fiCGjX0wDpOmxHUVZnkLfPPTLIRnIjyOa8pyV_rgceeDkM5q9";

  const formData = {
      content: msg
  };

  const options = {
    'method' : 'post',
    'payload' : formData
  };

  UrlFetchApp.fetch(url, options);
}

function postFromSpreadSheet(){
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName('Sheet3');

  const temp = sheet.getRange('Q7').getValue();
  const time = sheet.getRange('Q3').getValue();

  const time_diff = (Date.now() - Date.parse(time))/60000;


  if(temp > 27){
    const msg = "Temperatura alta: " + temp + " ºC";
    alert(msg, 10);
  }

  if(time_diff > 45){ //longer than 30 min
    const msg = "Tempo sem resposta: " + Math.floor(time_diff) + " min";
    alert(msg, 10);
  }
}

function alert(message, cooldown){ //cooldown in minutes
  const lastAlert = PropertiesService.getScriptProperties().getProperty('last-alert');

  if(((Date.now() - lastAlert)/60000) > 10){
    postToDiscord(message);
    PropertiesService.getScriptProperties().setProperty('last-alert', Date.now());
  }
}
