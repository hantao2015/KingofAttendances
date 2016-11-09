var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftMajordomo = new function () {
    var shiftMajordomo = this;
    var dbs;
    var appConfig;
    shiftMajordomo.setData = function (data, adbs, aappConfig) {
        var o = data[0];
        dbs = adbs;
        appConfig = aappConfig;
        setTimeout(function () {
            $("#spMajordomo").html(data[0].C3_526389708747);
            $("#spCount").html(data[0].C3_526389709403);
            $("#spHour").html(data[0].C3_526578899253);
            $("#spDate").html(data[0].C3_531915818570 + "~" + data[0].C3_526580475483);
            $("#spMonth").html(data[0].C3_526389709184);
            $("#spEverageHour").html(data[0].C3_527627855884);
            new mini.Form("form1").setData(o);
            var hrtext = mini.getbyName("C3_526389710526");
            appConfig.appfunction.textStyle.setInputStyle(hrtext);
            hrtext = mini.getbyName("C3_526389710744");
            appConfig.appfunction.textStyle.setInputStyle(hrtext);
            hrtext = mini.getbyName("C3_526389711025");
            appConfig.appfunction.textStyle.setInputStyle(hrtext);
            hrtext = mini.getbyName("C3_526389711259");
            appConfig.appfunction.textStyle.setInputStyle(hrtext);
            if (data[0].C3_529685145915 == "Y") {
                mini.get("con").set({ "text": "已批准" });
                mini.get("con").enabled = false;
            }
        }, 500);
    };
    shiftMajordomo.getImgurl = function () {
        return $("#hfurl").val();
    };
    shiftMajordomo.setData2 = function (data, bdbs, aappConfig) {
        dbs = bdbs;
        appConfig = aappConfig;
        mini.parse();
        $("#spHour").html(data[0].C3_526578576195);
        $("#spCount").html(data[0].C3_525716987383);
        $("#spDate").html(data[0].C3_531912802153 + "~" + data[0].C3_526580294945);
        $("#spMonth").html(data[0].C3_525699725531);
        $("#spSupervisor").html(data[0].C3_525699725094);
        $("#spEverageHour").html(data[0].C3_527627780180);
        var o = data[0];
        if (data[0].C3_526393969049 == "Y") {
            var list = "<tr>" +
                "<td class='title' >" +
                " <span>超标原因类型：</span></td>" +
                "<td colspan=2><input style='width:100%' name='C3_526417619516' class='mini-textarea' allowInput='false' /></span></td>" +
                "<td><span lang='EN-US' style='color:#0070C0' </span>" +
                "</td></tr><tr>" +
                " <td class='title'><span>超标原因描述：</span>" +
                "</td></td><td colspan='2'  >" +
                "<input style='width:100%' name='C3_526417619250' class='mini-textarea' allowInput='false' /></td><td   >" +
                "<p ><span ><a class='mini-button' id='asp' onclick='KingofAttendances.ShiftMajordomo.saveData2' >超标审批</a><a class='mini-button' id='asp1' onclick='KingofAttendances.ShiftMajordomo.saveData3' >拒绝申请</a></span></p></td></tr>";
            $("#tbsupervisor tbody").append(list);
        }
        else {
            $("#isIllegal").html("正常");
        }
        if (data[0].C3_526417619032 == "Y") {
            mini.parse();
            mini.get("asp").set({ "text": "已审批" });
            mini.get("asp").enabled = false;
            mini.get("asp1").set({ "visible": false });
        }
        if (data[0].C3_526417619032 == "N") {
            mini.parse();
            mini.get("asp").set({ "text": "已拒绝" });
            mini.get("asp").enabled = false;
            mini.get("asp1").set({ "visible": false });
        }
        mini.parse();
        new mini.Form("form1").setData(o);
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
    shiftMajordomo.saveData2 = function () {
        if (confirm('您确定要审批么？')) {
            var o = new mini.Form("form1").getData();
            o._id = 1;
            o._state = "modified";
            o.C3_526417619032 = "Y";
            var json = mini.encode([o]);
            dbs.dbSavedata(525699610587, 0, json, dataSaved, fnerror, fnhttperror);
            function dataSaved(text) {
                alert("审批成功");
                mini.get("asp").enabled = false;
                mini.get("asp").set({ "text": "已审批" });
                mini.get("asp").enabled = false;
            }
            function fnerror(text) {
                alert("审批失败");
            }
            function fnhttperror(jqXHR, textStatus, errorThrown) {
                alert("error");
            }
        }
        else {
            return;
        }
    };
    shiftMajordomo.saveData3 = function () {
        if (confirm('您确定要拒绝么？')) {
            var o = new mini.Form("form1").getData();
            o._id = 1;
            o._state = "modified";
            o.C3_526417619032 = "N";
            o.C3_526417619765 = "N";
            var json = mini.encode([o]);
            var json = mini.encode([o]);
            dbs.dbSavedata(525699610587, 0, json, dataSaved, fnerror, fnhttperror);
            function dataSaved(text) {
                alert("操作成功");
                mini.get("asp").enabled = false;
                mini.get("asp1").set({ "text": "已拒绝" });
                mini.get("asp1").enabled = false;
            }
            function fnerror(text) {
                alert("操作失败");
            }
            function fnhttperror(jqXHR, textStatus, errorThrown) {
                alert("error");
            }
        }
        else {
            return;
        }
    };
    shiftMajordomo.saveData4 = function () {
        if (confirm('您确定要批准么？')) {
            var o = new mini.Form("form1").getData();
            o._id = 1;
            o._state = "modified";
            o.C3_529685145915 = "Y";
            var json = mini.encode([o]);
            dbs.dbSavedata(526418740112, 0, json, dataSaved, fnerror, fnhttperror);
            function dataSaved(text) {
                alert("操作成功");
                mini.get("con").set({ "text": "已批准" });
                mini.get("con").enabled = false;
            }
            function fnerror(text) {
                alert("操作失败");
            }
            function fnhttperror(jqXHR, textStatus, errorThrown) {
                alert("error");
            }
        }
        else {
            return;
        }
    };
};
