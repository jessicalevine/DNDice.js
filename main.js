var num = 0;

$(document).ready(function() {
    $("#value").keyup(function(ev){
        if(ev.keyCode == 13){
            create_dice();
        }
    });   
    
    $("#submit").click(function() {
        create_dice();
    });
});

function create_dice() {
    var roll = {
        name: document.getElementById("name").value,
        value: document.getElementById("value").value,
        rolls: 0
    };
    if(!roll.name || !roll.value) {
        alert("Please complete the required fields");
        return;
    }
    
    roll.dice = parse_dice(roll.value);
    
    num += 1;    
  
    var text = num + ". " + roll.name + " (" + roll.dice.num + "d" + roll.dice.size + ") : ";
    var text_node = document.createTextNode(text);
    
    var roll_node = document.createElement("input");
    roll_node.setAttribute("type", "button");
    roll_node.setAttribute("value", "Roll");
    roll_node.setAttribute("id", "die" + num);
    
    var par = document.createElement("p");
    par.appendChild(text_node);
    par.appendChild(roll_node);
    
    document.getElementById("dice").appendChild(par);
    
    $("#die" + num).click(function(ev) {
        var res = " " + result(roll.dice);
        roll.rolls += 1;
        if(roll.rolls > 1) {
            res = "," + res;
        }
        ev.target.parentNode.appendChild(document.createTextNode(res));
    });
}

function parse_dice(value) {
    var values = value.split("d");
    return {
        num: parseInt(values[0], 10),
        size: parseInt(values[1], 10)
    };
}

function result(die) {
    var sum = 0;
    for(var i = 0; i < die.num; i += 1) {
        sum += Math.ceil(Math.random() * die.size);
    }
    return sum;
}