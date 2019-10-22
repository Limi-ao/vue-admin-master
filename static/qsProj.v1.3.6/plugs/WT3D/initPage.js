var WT3DModel;
function threeStart(_height) { 
    WT3DModel = new WT3D();   
    var initOption = {
        antialias: true, 
        loadSyn: false, 
        showHelpGrid: false,
        clearCoolr: 0x4068b0,  
        clearColorOp: 0,    
    };
    var Aobjects = {  // 给3D对象绑定事件
        objects: getBuildData(),
        events: {
            dbclick: [
                {
                    obj_name: "ALL",
                    obj_event: function (_obj, face,inserts) { 
                        {
                            var selectobj = null;
                            $.each(inserts, function (_index, _iobj) {
                                if (_iobj.object && _iobj.object.name && _iobj.object.name.indexOf("dev_") >= 0 && selectobj==null) {
                                    selectobj = _iobj.object;
                                    if (selectobj) {
                                        if (selectobj.name.indexOf("OBJCREN") > 0) {
                                            var selectname = selectobj.name.split("OBJCREN")[0];
                                            selectobj=WT3DObj.commonFunc.findObject(selectname);
                                        }
                                    }
                                }
                            });
                            if (_obj.name.indexOf("light_")>=0) {
                                selectobj = _obj;
                            }
                            if (!selectobj) {
                                return;
                            }
                            CloseDistance(selectobj, function () {
                                modelBussiness.dbClickSelectCabinet(selectobj, face, inserts);
                            });
                            console.log(inserts);
                        }
                    }
                },
            ]
        },
        btns: [
        ]
    }
    if (parent != null && parent.Aobjects_objects != null) {
        Aobjects.objects = parent.Aobjects_objects;
    }
    Aobjects.imageList = [];
    imageUUIDList = [];
    function getImageList(obj) {
        if (obj && typeof (obj) == "object") {
            $.each(obj, function (_index, _obj) {
                if (_obj && _obj.imgurl) {
                    var imgObj = {};
                    imgObj.uuid = _obj.imgurl;
                    imgObj.imgurl = _obj.imgurl;
                    if ($.inArray(imgObj.uuid, imageUUIDList) < 0) {
                        imageUUIDList.push(imgObj.uuid);
                        Aobjects.imageList.push(imgObj);
                    }
                }
                getImageList(_obj);
            });
        }
    }
    getImageList(Aobjects.objects);
    if (_height != null && typeof (_height) != 'undefined' && _height == 0) {
        $("#canvas-frame").height($(document).height());
    }
    WT3DModel.initWT3D('canvas-frame', initOption, Aobjects);
    WT3DModel.start();
}
function CloseDistance(_obj,callBack) {
    {
        var mainCamera = WT3DObj.camera;//主场景
        var objpositionx = _obj.position.x;
        var objpositiony = _obj.position.y;
        var objpositionz = _obj.position.z;
        if (typeof (_obj.parent) != 'undefined' && _obj.parent != null && typeof (_obj.parent.position) != 'undefined' && _obj.parent.position != null) {
            objpositionx += _obj.parent.position.x;
            objpositiony += _obj.parent.position.y;
            objpositionz += _obj.parent.position.z;
        }
        if (typeof (_obj.oldPosition) != 'undefined' && _obj.oldPosition != null) {
            objpositionx = _obj.oldPosition.x;
            objpositiony = _obj.oldPosition.y;
            objpositionz = _obj.oldPosition.z;
        }
        new TWEEN.Tween(WT3DObj.controls.target).to({
            x: objpositionx, y: objpositiony, z: objpositionz
        }, 600).onComplete(function () {
            var x_distance = mainCamera.position.x - objpositionx;
            var y_distance = mainCamera.position.y - objpositiony;
            var z_distance = mainCamera.position.z - objpositionz;
            var lv = 300 / Math.sqrt(x_distance * x_distance + y_distance * y_distance + z_distance * z_distance);
            var runtweenTime = 1000;
            if (lv > 0.6) {
                runtweenTime = 400;
            } else if (lv > 0.3) {
                runtweenTime = 1000;
            } else if (lv > 0.1) {
                runtweenTime = 1200;
            } else if (lv > 0.05) {
                runtweenTime = 1600;
            } else if (lv > 0.01) {
                runtweenTime = 2000;
            } else {
                runtweenTime = 2500;
            }
            if (x_distance * x_distance + y_distance * y_distance + z_distance * z_distance > 300 * 300 && lv < 0.9999) {
                new TWEEN.Tween(mainCamera.position).to({
                    x: objpositionx + (mainCamera.position.x - objpositionx) * lv, y: objpositiony + (mainCamera.position.y - objpositiony) * lv, z: objpositionz + (mainCamera.position.z - objpositionz) * lv
                }, runtweenTime).onComplete(function () {
                
                    }).start();
                if (callBack) {
                    callBack();
                }
            } else {
                if (callBack) {
                callBack();
                }
            }
        }).start();
    }
}
