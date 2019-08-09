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

connection.connect(function(err) {
    if (err) throw err;
    start();
});

function makeTable(info) {

    var c = 1;
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

    ui.log.write("Pick a number, guy".green);
    inquirer.prompt([{
            name: "item",
            message: "What item number would you like to purchase?",
            type: "input",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "howmany",
            message: "How many would you like to purchase?",
            type: "input",
            validate: function(value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(ans => {

        console.log(ans.item);
    });
}

function start() {
    connection.query(`SELECT product_name, department from products`, function(err, results) {
        if (err) throw err;
        makeTable(results);
        display();

    });

}