var getDogeData = function getDogeDataF () {
    var topTable = $('section table.table tbody').first();
    var balanceRow = topTable.children('tr:nth-child(1)');
    var balanceElement = balanceRow.children('td:nth-child(2)');
    var DOGEbalance = parseFloat(balanceElement.html());
    var DOGEaddress = window.location.href.split("/").slice(-1)[0];
    var priceElement = $('.doge-price');

    $.get("https://www.dogeapi.com/wow/?a=get_current_price", function(priceString) {
	var DOGEprice = parseFloat(priceString);
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

