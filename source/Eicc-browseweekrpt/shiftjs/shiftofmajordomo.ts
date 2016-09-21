var KingofAttendances = KingofAttendances || {};
KingofAttendances.ShiftMajordomo=new function() {
    var shiftMajordomo = this;
    var dbs;
    var appConfig;
    shiftMajordomo.setData=function(data,adbs,aappConfig){
       var o = data[0];
       dbs=adbs;
       appConfig=aappConfig;
            $("#spMajordomo").html(data[0].C3_526389708747);
            $("#spCount").html(data[0].C3_526389709403);
            $("#spHour").html(data[0].C3_526578899253);
            $("#spDate").html(data[0].C3_526389708966+"~"+data[0].C3_526580475483);
           
            $("#spMonth").html(data[0].C3_526389709184);
               $("#spEverageHour").html(data[0].C3_527627855884);
            new mini.Form("form1").setData(o);
             var hrtext=mini.getbyName("C3_526389710526"); 
             appConfig.appfunction.textStyle.setInputStyle(hrtext);
             hrtext=mini.getbyName("C3_526389710744"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
             hrtext=mini.getbyName("C3_526389711025"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
               hrtext=mini.getbyName("C3_526389711259"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
          
         
    }

      shiftMajordomo.getImgurl=function(){
       return  $("#hfurl").val();
    }
  shiftMajordomo.setData2=function(data,bdbs,aappConfig){
        dbs=bdbs;
        appConfig=aappConfig;
            $("#spHour").html(data[0].C3_526578576195);
			      $("#spCount").html(data[0].C3_525716987383);
            $("#spDate").html(data[0].C3_525699725313+"~"+data[0].C3_526580294945);
            $("#spMonth").html(data[0].C3_525699725531);
            $("#spSupervisor").html(data[0].C3_525699725094);
           $("#spEverageHour").html(data[0].C3_527627780180);
             var o = data[0];
           
            
			  if (data[0].C3_526393969049=="Y")
            {
             
     
        var list="<tr>"+
  "<td class='title' >"+
     " <span>超标原因类型：</span></td>"+
 "<td colspan=2><input style='width:100%' name='C3_526417619516' class='mini-textarea' allowInput='false' /></span></td>"+
  "<td><span lang='EN-US' style='color:#0070C0' </span>"+
 "</td></tr><tr>"+
 " <td class='title'><span>超标原因描述：</span>"+
  "</td></td><td colspan='2'  >"+
  "<input style='width:100%' name='C3_526417619250' class='mini-textarea' allowInput='false' /></td><td   >"+
  "<p ><span ><a class='mini-button' id='asp' onclick='KingofAttendances.ShiftMajordomo.saveData2' >超标审批</a>  </span></p></td></tr>";
               
          $("#tbsupervisor tbody").append(list);
     

            }
            else 
            {
                 $("#isIllegal").html("正常");
             
            }
              if (data[0].C3_526417619032=="Y")
           {
             mini.parse();
              mini.get("asp").set({"text":"已审批"});
              mini.get("asp").enabled=false;
           }
             mini.parse();
             new mini.Form("form1").setData(o);
            var hrtext=mini.getbyName("C3_525716986259"); 
             appConfig.appfunction.textStyle.setInputStyle(hrtext);
             hrtext=mini.getbyName("C3_525716986041"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
             hrtext=mini.getbyName("C3_525716985823"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
               hrtext=mini.getbyName("C3_525716985573"); 
              appConfig.appfunction.textStyle.setInputStyle(hrtext);
           // debugger;
           
            return;
}

 shiftMajordomo. saveData2=function() {
     
            var o = new mini.Form("form1").getData();            
             o._id=1;
             o._state="modified";
             o.C3_526417619032="Y";
            var json = mini.encode([o]);
         dbs.dbSavedata(525699610587,0,json,dataSaved,fnerror,fnhttperror);
            function dataSaved(text)
            {
                 alert("审批成功");
                mini.get("asp").set({"text":"已审批"});
               mini.get("asp").enabled=false;
            }
         function fnerror(text){
                    alert("审批失败");

         }
         function fnhttperror(jqXHR, textStatus, errorThrown){
             alert("error");

         }
          
        
        }
}
