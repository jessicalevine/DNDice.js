//Give all objects an inspect method for debugging
Object.prototype.inspect = function() {
    for(var property in this) {
        console.log(property);
    }
};

Object.prototype.alert = function() {
    alert(this);
};