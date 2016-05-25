this.LoadWindow = function(scope) {
    //properties
    this.loadPercentage = 0;
    this.showLoadWindow = false;
    
    //methods
    this.setPercentage = function(percentage) {
        this.loadPercentage = percentage;
    }
    
    this.show = function() {
        this.showLoadWindow = true;
    }
    
    this.hide = function() {
        this.showLoadWindow = false;
    }
}


