
 class dbHelper {
    baseUrl:string;
    saveMethod:string="SaveData_Ajax";
    getMethod:string="ShowHostTableDatas_Ajax";
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

   