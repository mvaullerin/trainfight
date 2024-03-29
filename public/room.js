var room = {
    name: null,
    manager: null,
    disruptors: null,
    actions : {},
    reactions :{},
    actionInProgress:{},
    reactionInProgress:{},
    reactionUsed: null,
    reInit: function(){
        this.actionInProgress = {};
        this.reactionInProgress = {};
        this.reactionUsed = null;
    },
    joinRoom: function (roomName, userData) {
        var _userData = (userData)? userData : null;
        this.name = roomName;
        socket.emit('joinRoom', {room: this.name,userData: _userData});
        var stateObj = {page: "waitingRoom"};
        history.pushState(stateObj, "Room" + this.name, "/room/" + this.name);
    },
    generatePlayerlist: function(){

        $('.manager').text(this.manager);
        for(key in this.disruptors){
            var _disruptorId = (this.disruptors[key].socketId).replace('/#', '');
            $('.disruptors').append('<li class="mdl-list__item '+_disruptorId+'"><span class="mdl-list__item-primary-content"><i class="material-icons mdl-list__item-avatar">person</i><span>'+this.disruptors[key].pseudo+'</span></span><span class="mdl-list__item-secondary-content score"></span></li>')
        }
        if(!jQuery.isEmptyObject(this.disruptors)){
            $('#waitingPlayers').addClass('hide');
            $('.startGame').removeAttr('disabled');
        } 
    },
    generateStation: function(lines){
        var heightHeaderMap = initializeHeaderMap();
        var _html = "";
        for(key in lines){
            var _line = lines[key];
            var _stations = _line.stations;
            for(key in _stations){
                var _station = _stations[key];
                _html += '<div id="'+_station.id+'" class="station" data-id="'+_station.id+'" data-name="'+_station.name+'" data-line="'+_line.name+'" ';
                if(_station.actions.length>0){
                    _html += 'data-actions="';
                    for(key in _station.actions){
                        if(key != 0){
                            _html += ","+_station.actions[key];
                        }
                        else{
                            _html += _station.actions[key];
                        }
                    }
                    _html += '"';
                }
                _html += ' style="top:'+(_station.locationY+heightHeaderMap+30)*0.7+'px;left:'+(_station.locationX-22)*0.7+'px">';
                _html += '<div class="markerProgress hide"><p>100%</p></div>';
                _html += '<p class="buttonStation">'+_station.name+'</p>';
                _html += '</div>';
            }
        }
        $('.mapLine').html(_html);

        if(user.role == 'disruptor'){
            $('.availableAgent').addClass('hide');
        }
    },
    setSatisfaction: function(satisfaction){
        this.satisfaction = satisfaction;
        $('.satisfaction').text(satisfaction/100+'%');
        document.querySelector('#progressBar').MaterialProgress.setProgress(satisfaction/100);
    },
    setReactionUsed: function(reactionUsed){
        this.reactionUsed = reactionUsed;
    }
};