//Give all objects an inspect method for debugging
Object.prototype.inspect = function() {
    for(var property in this) {
        console.log(property);
    }
};

//Allow objects to alert themselves
Object.prototype.alert = function() {
    alert(this);
};

/*//Give a set of methods for working with the DOM
Alfred.dom = (function () {
    var dom = {};
    
    dom.from_id = function (id) {
        return document.getElementById(id);
    };
    dom.val_from_id = function (id) {
        return document.getElementById(id).value;
    };
    
    return dom;
}());   */ 
