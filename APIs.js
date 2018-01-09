// Functions to integrate various APIs into Google sheets
function GDAXTicker(currency, now) {
  var baseUrl = 'https://api.gdax.com';
  var request1 = "/products/";  
  var request2;
  if(currency == "ETH") {
    request2 = "ETH";
  } else if (currency == "LTC") {
    request2 = "LTC";
  } else if (currency == "BCH") {
    request2 = "BCH";
  } else {
    request2 = "BTC";
  }
  
  var request3 = "-usd/ticker";
  
  var requestUrl = baseUrl + request1 + request2 + request3;
  var response = UrlFetchApp.fetch(requestUrl);
  var responseText = response.getContentText();
  var json = JSON.parse(responseText);
  var value = [[json.price]];
  return value;

}


function CoinMarketCapTicker(currency, now) {
  var baseUrl = "https://api.coinmarketcap.com/v1/ticker/";
  if(currency == "ETH") {
    request = "ethereum";
  } else if (currency == "BTC") {
    request = "bitcoin";
  } else if (currency == "BTG") {
    request = "bitcoin-gold";
  } else if (currency == "EOS") {
    request = "EOS";
  } else if (currency == "BCH") {
    request = "bitcoin-cash";
  } else {  
    request = "bitcoin";
  }
  
  var requestUrl = baseUrl + request;
  var response = UrlFetchApp.fetch(requestUrl);
  var responseText = response.getContentText();
  var json = JSON.parse(responseText);
  var value = json[0].price_usd;
  return value;
  
}


function BittrexTicker(currency, now) {
  var baseUrl = 'https://bittrex.com/api/v1.1/public/getticker';
  var request;
  if(currency == "POWR-ETH") {
    request = "?market=eth-powr";
  } else {
    request = "?market=eth-powr";
  }
  
  var requestUrl = baseUrl + request;
  var response = UrlFetchApp.fetch(requestUrl);
  var responseText = response.getContentText();
  var json = JSON.parse(responseText);
  var value = json.result.Bid;
  return value;

}

function myIncrementCellA16(){

  // define the cell to be incremented
  var cell = SpreadsheetApp.getActiveSheet().getRange("A16");
  
  // get and set the cell value
  var cellValue = cell.getValue();
  cell.setValue(cellValue + 1);  // this increments by 1 but could be any number

}


function getINRRate(subtractAmount) {
  
  var url = "https://api.fixer.io/latest?base=USD&&symbols=INR";
  var response = UrlFetchApp.fetch(url);
  var json = JSON.parse(response);
  // RESPONSE SAMPLE: {"base":"USD","date":"2017-12-29","rates":{"INR":63.876}}
  return json.rates.INR - subtractAmount;
}
