function ModelBussiness() {
    this.currentAnimationState = 0;
}
ModelBussiness.prototype.init = function (roomName) {
    //悬停回调
    WT3DObj.mouseOverCallBack = this.mouseOverCallBack;
    //进入回调
    WT3DObj.mouseOverInCallBack = this.mouseOverInCallBack;
    //离开回调
    WT3DObj.mouseOverLeaveCallBack = this.mouseOverLeaveCallBack;
    //悬停触发时间长度
    WT3DObj.mouseOverTimeLong = 1000;
}
//单击选中
ModelBussiness.prototype.clickSelectCabinet = function (_obj, _face) {
}
ModelBussiness.prototype.currentShowCabinet = null;
ModelBussiness.prototype.currentState = 0;
//双击选中
ModelBussiness.prototype.dbClickSelectCabinet = function (_obj, _face) {
    if (!_obj.visible) {
        return;
    }
    if (_obj.name.indexOf("light_ptssd") >= 0
        || _obj.name.indexOf("makeTextSprite_2") >= 0
        || _obj.name.indexOf("road_suidao_1") >= 0
        || _obj.name.indexOf("road_suidao_2") >= 0) {
        WT3DObj.commonFunc.changeCameraPosition(_obj.position,
            _obj.position, 3000,
            function () {
            });
        setTimeout(function () {
                window.location = "shuidao.html";
        }, 2500);
    }else if (_obj.name.indexOf("light_xsdq") >= 0
        || _obj.name.indexOf("road_xsdq") >= 0
            || _obj.name.indexOf("0makeTextSprite_82") >= 0
    ) {
        WT3DObj.commonFunc.changeCameraPosition(_obj.position,
            _obj.position, 3000,
            function () {
            });
        setTimeout(function () {
            window.location = "xsdq.html";
        }, 2500);
    } else if (_obj.name.indexOf("light_gsdq") >= 0
        || _obj.name.indexOf("road_gsdq_") >= 0
        || _obj.name.indexOf("makeTextSprite_3") >= 0
    ){
        WT3DObj.commonFunc.changeCameraPosition(_obj.position,
            _obj.position, 3000,
            function () {
            });
        setTimeout(function () {
            window.location = "gsdq.html";
        }, 2500);
    }
}
//悬停
ModelBussiness.prototype.mouseOverCallBack = function (_obj, face) {
}
ModelBussiness.prototype.mouseInCurrentObj = null;
ModelBussiness.prototype.lastMouseInCurrentObj = null;
ModelBussiness.prototype.mouseOverInCallBack = function (_obj, face) {
    var _this = this;
    var color = 0xbfffea;

    console.log(_obj.name);
    modelBussiness.lastMouseInCurrentObj = _obj;
    modelBussiness.mouseInCurrentObj = _obj;
    if (_obj.name.indexOf("b1_floor_") >= 0 || _obj.name.indexOf("floor_room_") >= 0) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        modelBussiness.mouseInCurrentObj = _sobj;
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x00ffff);
    } else if (_obj.name.indexOf("b3_tv_2") >= 0) {
        layer.msg("双击该电视返回园区总览");
    } else if (_obj.name.indexOf("messagePanel_2") >= 0) {
        layer.msg("双击该信息牌返回园区总览");
    }
    
}
ModelBussiness.prototype.mouseOverLeaveCallBack = function (_obj, face, nowobj) {
    var _this = this;
    var color = 0x000000;
    if (_obj.name.indexOf("b1_floor_") >= 0 || _obj.name.indexOf("floor_room_") >= 0) {
        var _sobj = _obj;
        if (_obj.name.indexOf("OBJCREN") > 0) {
            _sobj = _obj.parent;
        }
        WT3DObj.commonFunc.setSkinColorByObj(_sobj, 0x000000);
    } else if (_obj.name.indexOf("b3_tv_2") >= 0) {
        layer.closeAll();
    } else if (_obj.name.indexOf("messagePanel_2") >= 0) {
        layer.closeAll();
    }
}
 
var modelBussiness = new ModelBussiness();