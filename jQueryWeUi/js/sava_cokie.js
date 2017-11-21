  function setCookie(name,value,hours,path,domain,secure){
      var cdata = name + "=" + value;
      if(hours){
          var d = new Date();
          d.setHours(d.getHours() + hours);
          cdata += "; expires=" + d.toGMTString();
      }
      cdata +=path ? ("; path=" + path) : "" ;
      cdata +=domain ? ("; domain=" + domain) : "" ;
      cdata +=secure ? ("; secure=" + secure) : "" ;
      document.cookie = cdata;
  }
   
  function getCookie(name){
      var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/"); 
      return reg.test(document.cookie) ? RegExp.$1 : "";
  }
   
  function removeCookie(name,path,domain){
      this.setCookie(name,"",-1,path,domain);
  }
    