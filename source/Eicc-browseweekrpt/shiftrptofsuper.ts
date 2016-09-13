
declare var mini: any;
declare  var baseUrl:string;
declare var getMethod;
declare var saveMethod;
class baseObject{
    REC_ID:string;
}
class Lineleader extends baseObject{


}
class Supervisor extends baseObject{

 
}
class Shiftrptofsuper extends miniPanel {
   
    constructor(element: HTMLElement) {
            super(element);

    }
    
    appendLineleader(parentelement: HTMLElement,panelid :string ,data :any,mini:any,dbs:any){
        var aLineleader=new Lineleader();
        var className="";
        var dates:string="";
        var title;
        aLineleader=data[0]
      
        if(data[0].C3_526410163545=="Y"){
          
        
            className="mini-panel mini-panel-danger";

        }
        else{
         
           className="mini-panel mini-panel-success";
        }
      
        
        title=data[0].C3_525642615889+data[0].C3_525715020942+"排班"+data[0].C3_525715678864+"人，"+"排班"+data[0].C3_526578100819+"小时";
      
        super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofsuper.subHtml,
           function(iFrame){
                iFrame.contentWindow. KingofAttendances.ShiftSupervisor.setData2(data,dbs,appConfig);

            }
              ,false,"icon-user");
           
    }
    
    appendSupervisor(parentelement: HTMLElement,data :any,subdata:any,mini:any,dbs:any)
    {
       
       var aSupervisor=new Supervisor();
       var panelid="supervisor";
       var className="";
       var dates:string="";
       var title;
       aSupervisor=data[0];
       dates =(aSupervisor.C3_525698252634);
       title =dates+"日产线排班整体情况";
         if(data[0].C3_526393560160=="Y"){
            className="mini-panel mini-panel-danger";

      }
      else{
            className="mini-panel mini-panel-success";
      }
      
      
         super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofsuper.mainHtml,
           function(iFrame){
               iFrame.contentWindow.KingofAttendances.ShiftSupervisor.setData(data,dbs,appConfig);

            }
              ,true,"");
        
    }
}
 
window.onload = () => {
    //alert(appConfig.app.baseUrl);
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.SaveData_Ajax;
    var ucode = getQueryString('ucode');
    var user  = getQueryString('user');
    var dbs=new dbHelper(baseUrl,user,ucode);
    var resid=appConfig.shifrpttofsuper.resid;
    var subresid=appConfig.shifrpttofsuper.subresid;
    var cmswhere="";
    if (appConfig.app.debug)
    {cmswhere="C3_525697777216=1959";}
    var el = document.getElementById('content');
    var datagrids = document.getElementById('datagrids');
    var shiftPanel = new Shiftrptofsuper(el);
    shiftPanel.start();
    var url ;
    mini.parse();
    dbs.dbGetdata(resid,subresid,cmswhere,dataGot,fnerror,fnhttperror);
    function dataGot(data,subdata)
    {
        if (data.length>0)
        {
            shiftPanel.appendSupervisor(datagrids,data,subdata,mini,dbs);
            if (subdata.length>0){ 
                $.each(subdata, function (i, item) {
                    var row=[];
                    row.push(item);
                    shiftPanel.appendLineleader(datagrids,"dynamicgrid" + i.toString(),row,mini,dbs);
                });
            }
           
        }
        
    }
    function fnerror(data){   alert(data.message);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){alert(jqXHR.responseText);}
 

};