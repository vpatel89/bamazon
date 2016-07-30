var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
});


purchaseItem();

function purchaseItem() {
	connection.query('SELECT * FROM Products', function(err, res) {
	    if (err) throw err;

	    for (var i = 0; i < res.length; i++) {
			console.log('ItemID: ' + res[i].ItemID + ' | Product: ' + res[i].ProductName + ' | Price: ' +  res[i].Price + 
				' | Department: ' + res[i].DepartmentName + ' | Stock: ' + res[i].StockQuantity);
			console.log('');
		};


		inquirer.prompt([
			{
			type: 'input',
			message: 'What is the ID of the product that you would like to buy?',
			name: 'enterID'
			},
			{
			type: 'input',
			message: 'How many would you like?',
			name: 'enterQuantity'
			}
		]).then(function(user) {
			connection.query('SELECT * FROM Products WHERE ?',{
				ItemID: user.enterID
			}, function(err, res) {
			    if (err) throw err;
			
			    if (user.enterQuantity > res[0].StockQuantity) {
			    	console.log('Sorry, we currently dont have that many in stock!');
			    	return purchaseItem();
			    } else {
			    	var totalPrice = parseFloat(user.enterQuantity * res[0].Price);
			    	console.log('Thank you for your purchase! Your ' + res[0].ProductName + ' will cost $' + totalPrice + '.');
			    	console.log('');

			  		var newStock = (res[0].StockQuantity - user.enterQuantity);

			    	connection.query("UPDATE Products SET ? WHERE ?", [{
					    StockQuantity: newStock
					}, {
					    ItemID: user.enterID
					}], function(err, res) {
					    if (err) throw err;
					});
					return purchaseItem();
			    }
			});
		});
	});
}