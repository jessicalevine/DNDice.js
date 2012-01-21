var dndice = (function() {
    var num_rolls = 0; //Tracks number of existing rolls
   
    var main = function () {
        //Set triggers on DOM elements when DOM loads
        $(document).ready(function() {
            $("#statement").keyup(function (ev) {
                if(ev.keyCode == 13){
                    handle();
                }
            });   
            
            $("#submit").click(function () {
                handle();
            });
        });
    }; //Actions taken on app initialization
    
    var handle = function () {
        var roll = init_roll(document.getElementById("name").value, document.getElementById("statement").value); //Create a roll object from DOM data
        
        if (!roll.valid) {
            alert("Please complete the required fields");
            return;
        } //Validate necessary data or stop creating roll
        
        num_rolls += 1; //Increment existing rolls
        
        document.getElementById("dice").appendChild(roll.to_node()); //Add roll to DOM
        
        $("#die" + num_rolls).click(roll.handle); //Give the roll an event handler
    }; //Create a roll from form fields and add it to DOM
    
    var init_roll  = function (name, statement) {
        var roll = {};
        
        var parse_dice = function (statement) {
            var values = statement.split("d");
            return {
                num: parseInt(values[0], 10),
                size: parseInt(values[1], 10)
            };
        }; //Interpret a roll statement to a usable dice object 
    
        roll.name = name;
        roll.statement = statement;
        roll.rolls = 0;
        
        roll.valid = function () {
            return (roll.name || roll.statement);
        }; //Validates a roll contains necessary data
        
        roll.dice = (roll.valid) ? parse_dice(roll.statement) : null;
        
        roll.to_node = function () {
            var text = num_rolls + ". " + roll.name + " (" + roll.statement + ") : ";
            var text_node = document.createTextNode(text);
            
            var roll_node = document.createElement("input");
            roll_node.setAttribute("type", "button");
            roll_node.setAttribute("value", "Roll");
            roll_node.setAttribute("id", "die" + num_rolls);
            
            var par = document.createElement("p");
            par.appendChild(text_node);
            par.appendChild(roll_node);
            
            return par;
        }; //Return a DOM node representing the roll
        
        roll.result = function (die) {
            var sum = 0;
            for (var i = 0; i < die.num; i += 1) {
                sum += Math.ceil(Math.random() * die.size);
            }
            return sum;
        }; //Return the roll of a set of dice
        
        roll.handle = function (ev) {
            var result = " " + roll.result(roll.dice);
            roll.rolls += 1;
            if(roll.rolls > 1) {
                result = "," + result;
            }
            ev.target.parentNode.appendChild(document.createTextNode(result));
        }; //Event handler for activating a roll
        
        return roll;
    }; //Initialize a roll object
    
    var app = {};
    app.main = main;
    return app;
}()); //Wrap the entire app in a closure to avoid scope problems

dndice.main();