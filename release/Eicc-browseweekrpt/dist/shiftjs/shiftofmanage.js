var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftManage = new function () {
    var shiftManage = this;
    var dbs;
    var appConfig;
    shiftManage.ajaxFileUpload = function () {
        var inputFile = $("#file1 > input:file")[0];
        appConfig.appfunction.uploadFile.ajaxFileUpload(appConfig, inputFile);
    };
    shiftManage.swfFileUpload = function () {
        mini.parse();
        var fileupload = mini.get("fileupload1");
        appConfig.appfunction.uploadFile.swfFileUpload(appConfig, fileupload);
    };
    shiftManage.getImgurl = function () {
        return $("#imgUploaded")[0].src;
    };
    shiftManage.setData = function (data, adbs, aappConfig) {
        var o = data[0];
        dbs = adbs;
        appConfig = aappConfig;
        $("#spCount").html(data[0].C3_525716987383);
        $("#spHour").html(data[0].C3_526578576195);
        $("#spDate").html(data[0].C3_525699725313 + "~" + data[0].C3_526580294945);
        $("#spMonth").html(data[0].C3_525699725531);
        $("#spManage").html(data[0].C3_525699725094);
        $("#spEverageHour").html(data[0].C3_527627780180);
        if (data[0].C3_526393969049 == "Y") {
            var list = "<tr>" +
                "<td class='title'>" +
                "<span>超标原因类型：</span></td>" +
                "<td colspan=2><input class='mini-combobox' style='width:100%;' name='C3_526417619516' id='cbReasons' textField='C3_526765634258' valueField='C3_526765634258' showNullItem='true' allowInput='true'/></td>" +
                "<td><span lang='EN-US' style='color:#0070C0' </span>" +
                "</td></tr><tr>" +
                " <td class='title'><span>超标原因描述：</span>" +
                "</td><td colspan=2>" +
                "<input  name='C3_526417619250' class='mini-textarea' style='width:100%;' />" +
                "</td></tr>" +
                "<tr><td class='title'>附件</td>" +
                " <td colspan=3><input id='fileupload1' name='' onuploaderror='onUploadError' onfileselect='onFileSelect' onuploadsuccess='onUploadSuccess'  uploadUrl='upload.aspx' flashUrl='swfupload/swfupload.swf' class='mini-fileupload' uploadOnSelect=true name='Fdata' " +
                " limitType='*.jpg;*.jpeg;*.png' style='width:90%;' /></td></tr>" +
                "<tr><td class='title'></td><td colspan=2><img align='middle' style='margin-left:100px;width:200px;height=200px;position:relative;' id='imgUploaded'  /></td>" +
                "<td  >" +
                "<a class='mini-button' id='asave' onclick='KingofAttendances.ShiftManage.saveData' style='position:absolute;bottom:2px;right:2px;' >超标申请</a></td></tr>";
            $("#tbManage tbody").append(list);
            mini.parse();
            var fileupload = mini.get("fileupload1");
            fileupload.setUploadUrl(aappConfig.app.uploadFileUrl + "?savepath=e:\\web\\rispweb\\upfiles&httppath=" + aappConfig.app.httppath);
            var resid = appConfig.app.dic1Resid;
            var subresid = "";
            var cmswhere = "";
            dbs.dbGetdata(resid, 0, cmswhere, fnSuccess, null, null);
            function fnSuccess(data, subdata) { mini.parse(); mini.get("cbReasons").set({ "data": data }); }
        }
        else {
            $("#isIllegal").html("正常");
        }
        if (data[0].C3_526417619765 == "Y") {
            mini.parse();
            mini.get("fileupload1").enabled = false;
            mini.get("asave").set({ "text": "已申请" });
            mini.get("asave").enabled = false;
        }
        new mini.Form("form1").setData(o);
        var imgfield = mini.get('imgurl');
        var imgurl = imgfield.getValue();
        if (imgurl) {
            var img = $("#imgUploaded");
            img[0].src = imgurl;
        }
        var hrtext = mini.getbyName("C3_525716986259");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716986041");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716985823");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716985573");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        return;
    };
    shiftManage.getImgurl2 = function () {
        return $("#hfurl").val();
    };
    shiftManage.saveData = function () {
        var o = new mini.Form("form1").getData();
        o.C3_526417619765 = "Y";
        o._id = 1;
        o._state = "modified";
        var json = mini.encode([o]);
        dbs.dbSavedata(525699610587, 0, json, dataSaved, fnerror, fnhttperror);
        function dataSaved(text) {
            alert("申请成功");
            mini.get("asave").set({ "text": "已申请" });
            mini.get("asave").enabled = false;
        }
        function fnerror(text) {
            alert("申请失败");
        }
        function fnhttperror(jqXHR, textStatus, errorThrown) {
            alert("error");
        }
    };
    shiftManage.setData2 = function (data, bdbs, aappConfig) {
        dbs = bdbs;
        appConfig = aappConfig;
        $("#spHour").html(data[0].C3_526577949788);
        $("#spCount").html(data[0].C3_525716459309);
        $("#spDate").html(data[0].C3_525698252634 + "~" + data[0].C3_526580236305);
        $("#spMonth").html(data[0].C3_525698252852);
        $("#spSupervisor").html(data[0].C3_525697777450);
        $("#spEverageHour").html(data[0].C3_527627934738);
        var o = data[0];
        if (data[0].C3_526393560160 == "Y") {
            $("#isIllegal").html("超标");
            var list = "<tr>" +
                "<td class='title' >" +
                " <span>超标原因类型：</span></td>" +
                "<td colspan=2><input  name='C3_526393593762' class='mini-textarea' allowInput='false' style='width:100%;' /></span></td>" +
                "<td><span ><span lang='EN-US' style='color:#0070C0' </span>" +
                "</td></tr><tr>" +
                " <td class='title'><span>超标原因描述：</span>" +
                "</td><td colspan=2>" +
                "<input  name='C3_526416460460' class='mini-textarea' style='width:100%;' allowInput='false' /></td>" +
                "<td><a class='mini-button' id='asp' onclick='KingofAttendances.ShiftManage.saveData2' >超标审批</a>  </td></tr>";
            var a = list;
            $("#tbsupervisor tbody").append(list);
        }
        else {
            $("#isIllegal").html("正常");
        }
        if (data[0].C3_526416147534 == "Y") {
            mini.parse();
            mini.get("asp").set({ "text": "已审批" });
            mini.get("asp").enabled = false;
        }
        mini.parse();
        new mini.Form("form1").setData(o);
        var hrtext = mini.getbyName("C3_525716460432");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716460666");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716460900");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        hrtext = mini.getbyName("C3_525716461134");
        appConfig.appfunction.textStyle.setInputStyle(hrtext);
        return;
    };
    shiftManage.saveData2 = function () {
        var url = $("#hfurl").val();
        var o = new mini.Form("form1").getData();
        o._id = 1;
        o._state = "modified";
        o.C3_526416147534 = "Y";
        var json = mini.encode([o]);
        dbs.dbSavedata(525697747154, 0, json, dataSaved, fnerror, fnhttperror);
        function dataSaved(text) {
            alert("审批成功");
            mini.get("asp").set({ "text": "已审批" });
            mini.get("asp").enabled = false;
        }
        function fnerror(text) {
            alert("审批失败");
        }
        function fnhttperror(jqXHR, textStatus, errorThrown) {
            alert("error");
        }
    };
};
