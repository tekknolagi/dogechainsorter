var getDogeData = function getDogeDataF () {
    var topTable = $('section table.table tbody').first();
    var balanceRow = topTable.children('tr:nth-child(1)');
    var balanceElement = balanceRow.children('td:nth-child(2)');
    var DOGEbalance = parseFloat(balanceElement.html());
    var DOGEaddress = window.location.href.split("/").slice(-1)[0];
    var priceElement = $('.doge-price');

    $.getJSON("http://query.yahooapis.com/v1/public/yql?q=select%20content%20from%20html%20where%20url%20%3D%20'http%3A%2F%2Fcoinmarketcap.com%2F'%20and%20xpath%3D'%2F%2Fa%5Bcontains(%40href%2C%22http%3A%2F%2Fwww.cryptocoincharts.info%23jump-doge-btc%22)%5D'&format=json", function(data) {
	var DOGEprice = parseFloat((data.query.results.a).replace(/ /g, '').slice(1));
	var DOGE_val = DOGEbalance;
        var USD_val = (DOGEbalance*DOGEprice).toFixed(5);
	balanceElement.html(DOGE_val+' DOGE / '+USD_val+' USD'); 
	priceElement.html(DOGEprice.toFixed(6));
    });
};

$(function () {
    $.getScript("http://cdnjs.cloudflare.com/ajax/libs/jquery-timeago/1.1.0/jquery.timeago.min.js");

    var topTable = $('section table.table tbody').first();
    topTable.children().first().remove(); // remove QR code
    var balanceRow = topTable.children('tr:nth-child(1)');
    balanceRow.after('<tr><td>DOGE Price</td><td class="doge-price">??? USD</td></tr>');
    getDogeData();
    setInterval(getDogeData, 5000); // 5 seconds

    var transactionTable = $('div.table-responsive table tbody');
    transactionTable.html(transactionTable.children('tr').get().reverse());
    transactionTable.prepend(transactionTable.children('tr:last-child').get());

    var transactionRows = transactionTable.children('tr');
    transactionRows.slice(1).map(function (ind, val) {
	var theDate = $(val).children('td:nth-child(3)');
	theDate.html(theDate.html()+' / '+$.timeago(theDate.html()));
    });
});

