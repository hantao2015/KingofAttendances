
declare var mini: any;
declare  var baseUrl;
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
        var title="";
        aLineleader=data[0]
          if(data[0].C3_526410163545=="Y"){
                className="mini-panel mini-panel-danger";
              title+="<span style='color:red'> 【已超标】</span>";
            }
              else{
         
           className="mini-panel mini-panel-success";
        }
       title+=data[0].C3_525642615889+data[0].C3_525715020942+"排班"+data[0].C3_525715678864+"人，"+"排班"+data[0].C3_526578100819+"小时，"+"人均排班"+data[0].C3_527626009087+"小时";
        
      
        
       
       data[0].C3_525718264194=(data[0].C3_525718264194*100);
       data[0].C3_525718264474=(data[0].C3_525718264474*100);
       data[0].C3_525718264693=(data[0].C3_525718264693*100);
       data[0].C3_525718264911=(data[0].C3_525718264911*100);
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
       var  style="";
       
       dates =(data[0].C3_525698252634+"~"+data[0].C3_526580236305);
       title =dates+" 日产线排班整体情况<br>"+dates+" Shift Arrangement Overall Data";

       
         if(data[0].C3_526393560160=="Y"){
            className="mini-panel mini-panel-danger";
    

      }
      else{
            className="mini-panel mini-panel-success";
      }
       // alert(data[0].C3_525718184010);C3_525718184727
        data[0].C3_525718184010=(data[0].C3_525718184010*100);
        data[0].C3_525718184259=(data[0].C3_525718184259*100);
        data[0].C3_525718184478=(data[0].C3_525718184478*100);
        data[0].C3_525718184727=(data[0].C3_525718184727*100);
      
         super.appendPanel(parentelement,panelid,mini,className,title,appConfig.shifrpttofsuper.mainHtml,
           function(iFrame){
               iFrame.contentWindow.KingofAttendances.ShiftSupervisor.setData(data,dbs,appConfig);

            }
              ,true,"");
         //mini.parser();
         var aPanle=mini.get(panelid);
         super.PanelAddbutton(aPanle,"查看附件","icon-search","button1","float:right;margin-right:20px");
         mini.parse();
         var abutton=mini.get("button1");
         abutton.set({"onclick":"onclickButton1"});
         var el:HTMLElement= aPanle.getHeaderEl();
         el.id="panelHeader";
          $(".mini-panel-title").css({"float":"none" ,"text-align":"center"});

    }
}
function onclickButton1 (e){
    var panel=mini.get("supervisor");
    var iFrame=panel.getIFrameEl();
    var imgurl=iFrame.contentWindow.KingofAttendances.ShiftSupervisor.getImgurl();

   // alert(imgurl);
      var win = mini.open({
            
            url: '../dist/component/imgwindow.html',
            showModal: false,
            width: 800,
            height: 600,
            onload: function () {       //弹出页面加载完成
                var iframe = this.getIFrameEl(); 
                     

                //调用弹出页面方法进行初始化
               iframe.contentWindow.Setimg(imgurl); 
                        
    },
        });
};
window.onload = function()  {
    $.getJSON("./dist/app.config.json",function(data,textStatus,hr){appConfig=data;
        appConfig.appfunction=appfunctions;
        main();});
}
function main()
{
//load file
    //alert(appConfig.app.baseUrl);
    baseUrl=appConfig.app.baseUrl;
    getMethod=appConfig.app.getMethod;
    saveMethod=appConfig.app.saveMethod;
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

        $(".mini-panel").css({"padding-top":"10px"});
         
    }
    function fnerror(data){   alert(data.message);

    }
    function fnhttperror(jqXHR, textStatus, errorThrown){alert(jqXHR.responseText);}
}