var appfunctions=appfunctions||{};
var appConfig;
$.getJSON("./dist/app.config.json",function(data,textStatus,hr){appConfig=data;appConfig.appfunction=appfunctions});
//load file

appfunctions.uploadFile=new function (){
    var uploadFile=this;
    /** swfFileUpload 在服务器根目录下放crossdomain.xml可以跨域上传文件*/
    this.swfFileUpload=function (aappConfig,fileupload) {
        fileupload.setUploadUrl(aappConfig.app.uploadFileUrl+"?savepath=e:\\web\\rispweb\\upfiles&httppath="+aappConfig.app.httppath);
        fileupload.startUpload();

    }
    this.ajaxFileUpload=function (aappConfig,inputFile) {
       mini.parse();
      
       // $.getScript('dist/ajaxfileupload.js',scriptLoaded)
        scriptLoaded();
       function scriptLoaded(){
           alert('scriptLoaded');
           //document.domain = "localhost";
           $.ajaxFileUpload({
            url: aappConfig.app.uploadFileUrl,                 //用于文件上传的服务器端请求地址
            fileElementId: inputFile,               //文件上传域的ID
            data: { savepath: "e:\\web\\rispweb\\upfiles" },            //附加的额外参数
            dataType: 'json',               //返回值类型 一般设置为json
            
            success: function (data, status)    //服务器成功响应处理函数
            {
                if (data)
                {alert("上传成功: " + data);}
                else
                {alert("上传成功,无返回信息 " );}
                

            },
            error: function (data, status, e)   //服务器响应失败处理函数
            {
                alert(e);
            },
            complete: function () {
                var jq = $("#file1 > input:file");
                jq.before(inputFile);
                jq.remove();
            }
        });
    }}
        

}
appfunctions.textStyle=new function (){
    var textStyle=this;
    textStyle.setInputStyle=function (hrtext){
     if (hrtext.getValue()=='priority')
            {
              hrtext.set({"inputStyle":"background-color:red"});
            };
    if (hrtext.getValue()=='major')
            {
              hrtext.set({"inputStyle":"background-color:sandybrown"});
            };
     if (hrtext.getValue()=='normal'||hrtext.getValue()=='minor')
            {
              hrtext.set({"inputStyle":"background-color:yellow"});
            };
        }
}
 class dbHelper {
    baseUrl:string;
    saveMethod:string=appConfig.app.saveMethod;
    getMethod:string=appConfig.app.getMethod;
    user:string ;
    ucode:string;
   constructor(baseurl:string,user:string,ucode:string)
   {
       this.baseUrl=baseurl;
       this.user=user;
       this.ucode=ucode;
   }
   dbGetdata(resid:number,subresid:number,cmswhere:string,fnSuccess:any,fnError:any,fnSyserror:any) {
      var url : string;
      url=this.baseUrl+"&method="+this.getMethod+"&user="+this.user+"&ucode="+this.ucode+"&resid="+resid+"&subresid="+subresid+"&cmswhere="+cmswhere;
    
      $.ajax({
            url: url,
            dataType:"jsonp",
            jsonp: "jsoncallback",
            success: function (text) {
                if (text !== "") {    
                    var data = mini.decode(text);
                     
                    if (data.error == -1) {
                     if (fnError!=null)
                     {fnError(data);}
                       
                    }
                    var adata = [];
                    var subdata=[];
                    adata = data.data;
                    if (data.subdata!=null){subdata=data.subdata.data;}
                    
                     if (fnSuccess!=null)
                     {fnSuccess(adata,subdata);}

                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                 
                 if (fnSyserror!=null)
                     { fnSyserror(jqXHR, textStatus, errorThrown);}
            }});
  
  }
  dbSavedata( resid:number,subresid:number,json:string,fnSuccess:any,fnError:any,fnSyserror:any)
  {
       var url : string;
       url=this.baseUrl+"&method="+this.saveMethod+"&user="+this.user+"&ucode="+this.ucode;
       //alert(url);
         $.ajax({
                url:  url,
                async:false,
                dataType:"jsonp",
                jsonp: "jsoncallback",
		        type: 'post',
                data: {data:json,resid:resid},
                cache: false,
                success: function (text) {
            
                if (text.error=="0")
                {
                  
                  
                    if (fnSuccess!=null){fnSuccess(text);}}
                else    
                {
                  
                   if (fnError!=null){ fnError(text);}
                }  
                 
                },
                error: function (jqXHR, textStatus, errorThrown) {
                  if (fnSyserror!=null){fnSyserror(jqXHR, textStatus, errorThrown);}
                    
                 
                    
                }
              });
   }
}
class miniPanel {
    element: HTMLElement;
    span: HTMLElement;
    timerToken: number;
    mini_grid: HTMLElement;
    mini_control:HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element;
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toLocaleTimeString();
    }

    start() {
         var jsonString :string  = '{"messge": "ok","error":"-1"}';
         this.timerToken = setInterval(() => this.span.innerHTML = new Date().toLocaleTimeString(), 500);
    }

    stop() {
        clearTimeout(this.timerToken);
    }
    
    appendPanel(parentelement: HTMLElement,panelid :string ,mini:any,classname:string,title:string,url:string,fnload:any,expanded:Boolean,iconCls:string){
        
        this.mini_control=document.createElement('div');
        this.mini_control.id = panelid;
        this.mini_control.className=classname;
        this.mini_control.title=title;
       
        parentelement.appendChild(this.mini_control);
        mini.parse();
        var aPanel = mini.get(panelid);
        aPanel.set({"width":"auto","height":"500px","iconCls":iconCls,"buttons":"collapse","expanded":expanded,"onbuttonclick":"onbuttonclick"});
        aPanel.load(url, function () {
            var iFrame = aPanel.getIFrameEl();
             fnload(iFrame);
        },null);
           
    }
    PanelAddbutton(panel:any,buttonname:string,icon:string,buttonid:string,css:string)
    {
        //<a class="mini-button" iconCls="icon-edit" onclick="onClick">Edit</a>
       
       var abutton:HTMLElement=document.createElement('a');
      
        abutton.className="mini-button";
        abutton.id=buttonid;
        abutton.text=buttonname;
         
        
        panel.set({"showToolbar":true});
        panel.setToolbar ( abutton );
        mini.parse();
        var minibt=mini.get(buttonid);
        minibt.set({"iconCls":icon,"style":css});

    }
    
 
}
 
function getQueryString(name) { 
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
        var r = window.location.search.substr(1).match(reg); 
        if (r != null) return unescape(r[2]); return null; 
} 
function  onbuttonclick(e){
                
        if (e.name="collapse")
                {
                     setTimeout(function() {
                            if (e.sender.expanded == true) { 
                                         e.sender.set({ "height": "400px" }); 
                              }
                    }, 500);

                }
}



   