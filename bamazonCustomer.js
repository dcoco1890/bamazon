var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require('colors');
var ui = new inquirer.ui.BottomBar();

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "", //password
    database: "bamazon"
});

var endQuestion = [{
    name: "escape",
    type: "confirm",
    message: "Order again?",
    default: true
}];

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query(`SELECT product_name, department from products`, function(err, results) {
        if (err) throw err;
        makeTable(results);
        display();

    });

}

//this is used just to display the items to the user
function makeTable(info) {

    var c = 1; //keeps track of, and numbers the items
    console.log(`\n\n`);
    console.log(`----------Here's what's available----------\n`);
    for (var i = 0; i < info.length; i++) {
        // console.log(`${c}:  ${info[i].product_name}----------${info[i].department}`.bgBlue);
        // makes the foreground blue and background yellow for the item number and product name
        // because why not
        console.log("\x1b[43m\x1b[34m%s\x1b[0m", `${c}:  ${info[i].product_name}`, `${info[i].department}`);
        c++;
    }
    console.log(`\n\n`);
}

function display() {

    var q = `SELECT * FROM products`;
    connection.query(q, function(err, res) {

        if (err) throw err;
        var info = res;
        ui.log.write("Pick a number, guy".green);
        inquirer.prompt([{
                name: "item",
                message: "What item number would you like to purchase?",
                type: "input",
                validate: function(value) {
                    if (isNaN(value) === false && value <= info.length && value > 0) {
                        return true;
                    }
                    return "That's not a product number";
                }
            },
            {
                name: "howmany",
                message: "How many would you like to purchase?",
                type: "input",
                validate: function(value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    return "C'mon guy enter a real number";
                }
            }
        ]).then(ans => {
            var item = ans.item;
            var amount = ans.howmany;
            var x = info[item - 1].stock;

            if (amount <= x) {
                console.log(`\nPlacing your order for`);
                console.log(`${amount}  of this:  ${info[item - 1].product_name}`.green);
                console.log(`---------------------`);
                console.log(`${info[item - 1].price} * ${amount}`.red);
                console.log(`You owe ${amount * info[item - 1].price}`);
                console.log(`---------------------\n`);
                // updateStore(item, amount);
            } else {
                console.log(`Sorry, we don't have enough of that!`);
            }

            inquirer.prompt(endQuestion).then(ans => {
                if (ans.escape) {
                    start();
                } else {
                    connection.end();
                };
            });


        });

    })
};

function updateStore(product, amount) {

}