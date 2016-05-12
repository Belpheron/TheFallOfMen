this.ChatMessage = function(datetime, content, idUserNameSender, idUserNameReceiver) {
    //properties
    this.datetime = datetime;
    this.content = content;
    this.idUserNameSender = idUserNameSender;
    this.idUserNameReceiver = idUserNameReceiver;
    
    //accessors
    this.getDatetime = function() {
        return this.datetime;
    }
    this.getContent = function() {
        return this.content;
    }
    this.getIdUserNameSender = function() {
        return this.idUserNameSender;
    }
    this.getIdUserNameReceiver = function() {
        return this.idUserNameReceiver;
    }
    this.setDatetime = function(datetime) {
        this.datetime = datetime;
    }
    this.setContent = function(content) {
        this.content = content;
    }
    this.setIdUserNameSender = function(idUserNameSender) {
        this.idUserNameSender = idUserNameSender;
    }
    this.setIdUserNameReceiver = function(idUserNameReceiver) {
        this.idUserNameReceiver = idUserNameReceiver;
    }
}


