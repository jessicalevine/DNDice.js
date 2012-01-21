var dndice = (function() {
    var num = 0;
    
    //Actions taken on app initialization
    var main = function () {
        //Set triggers on DOM elements when DOM loads
        $(document).ready(function() {
            $("#statement").keyup(function (ev) {
                if(ev.keyCode == 13){
                    create_roll();
                }
            });   
            
            $("#submit").click(function () {
                create_roll();
            });
        });
    };
    
    //Create a roll from form fields, and add it to the DOM
    var create_roll = function () {
        var roll = {
            name: document.getElementById("name").value,
            statement: document.getElementById("statement").value,
            rolls: 0
        };
        
        if (!roll.statement || !roll.statement) {
            alert("Please complete the required fields");
            return;
        }
        
        roll.dice = parse_dice(roll.statement);
        
        num += 1;    
      
        var text = num + ". " + roll.name + " (" + roll.statement + ") : ";
        var text_node = document.createTextNode(text);
        
        var roll_node = document.createElement("input");
        roll_node.setAttribute("type", "button");
        roll_node.setAttribute("value", "Roll");
        roll_node.setAttribute("id", "die" + num);
        
        var par = document.createElement("p");
        par.appendChild(text_node);
        par.appendChild(roll_node);
        
        document.getElementById("dice").appendChild(par);
        
        $("#die" + num).click(function (ev) {
            var res = " " + result(roll.dice);
            roll.rolls += 1;
            if(roll.rolls > 1) {
                res = "," + res;
            }
            ev.target.parentNode.appendChild(document.createTextNode(res));
        });
    }
    
    //Interpret a roll statement to a usable dice object 
    var parse_dice = function (statement) {
        var values = statement.split("d");
        return {
            num: parseInt(values[0], 10),
            size: parseInt(values[1], 10)
        };
    }
    
    //Return the roll of a set of dice
    var result = function (die) {
        var sum = 0;
        for (var i = 0; i < die.num; i += 1) {
            sum += Math.ceil(Math.random() * die.size);
        }
        return sum;
    }
    
    var app = {};
    app.main = main;
    return app;
}());

dndice.main();