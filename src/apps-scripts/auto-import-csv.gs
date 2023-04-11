function myFunction() {
  function importData()
  {
    var ss = SpreadsheetApp.getActive();
    var url = 'https://drive.google.com/uc?export=download&id=179sFZMWCI4kZnhZnOcAH8d74fpMlAFG6';
    var text = UrlFetchApp.fetch(url).getContentText();
    var csvData = Utilities.parseCsv(text);
    var sheet = ss.getSheetByName('Sheet1');
    for (var i = 0; i < csvData.length; i++) {
      sheet.getRange(i+1, 1, 1, csvData[i].length).setValues(new Array(csvData[i]));
    }
  }
  importData();
}
