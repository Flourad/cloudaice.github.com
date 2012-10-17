var StatM = function (){
	this.keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + //all caps
				  "abcdefghijklmnopqrstuvwxyz" + //all lowercase
				  "0123456789+/="; // all numbers plus +/=
}
//Base64
//Heres the encode function
StatM.prototype.encode64 = function(inp){
        var out = ""; //This is the output
        var chr1, chr2, chr3 = ""; //These are the 3 bytes to be encoded
        var enc1, enc2, enc3, enc4 = ""; //These are the 4 encoded bytes
        var i = 0; //Position counter

        do { //Set up the loop here
        chr1 = inp.charCodeAt(i++); //Grab the first byte
        chr2 = inp.charCodeAt(i++); //Grab the second byte
        chr3 = inp.charCodeAt(i++); //Grab the third byte

        //Here is the actual base64 encode part.
        //There really is only one way to do it.
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;

        if (isNaN(chr2)) {
                enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
                enc4 = 64;
        }

        //Lets spit out the 4 encoded bytes
        out = out + this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) + this.keyStr.charAt(enc3) +
        this.keyStr.charAt(enc4);

        // OK, now clean out the variables used.
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";

        } while (i < inp.length); //And finish off the loop

        //Now return the encoded values.
        return out;
}
 
StatM.prototype.getCookie = function(name){
        var cname = name + "=";
        var dc = document.cookie;
        if (dc.length > 0) {
                begin = dc.indexOf(cname);
                if (begin != -1) {
                   begin += cname.length;
                   end = dc.indexOf(";", begin);
                   if (end == -1) {end = dc.length;}
                    return unescape(dc.substring(begin, end));
                }
        }
        return "";
}

StatM.prototype.setCookie = function(name, value){
        var argv = this.setCookie.arguments;
        var argc = this.setCookie.arguments.length;

        var path = (3 < argc) ? argv[3] : null;
        var domain = (4 < argc) ? argv[4] : null;
        var secure = (5 < argc) ? argv[5] : false;
        var expires =(2 < argc) ? argv[2] : null;
        var newcookie = name + "=" + value +
        ((expires == null) ? "" : ("; expires="+expires.toGMTString())) +
        ((path == null) ? "" : ("; path=" + path)) +
        ((domain == null) ? "" : ("; domain=" + domain)) +
        ((secure == true) ? "; secure" : "");
        document.cookie = newcookie;
}
StatM.prototype.initPage = function(){
	var dj_rf = (typeof (encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	if(!dj_rf){ dj_rf = "empty"; }
	var dj_eu = (typeof (encodeURI) == 'function') ? encodeURI(document.URL) : document.URL;
    if(this.getCookie("DJ_UVID") == null || this.getCookie("DJ_UVID") == ""){
        var cookieval = new Date();
        cookieval = cookieval.getTime();
        var rStr_1 = "" + Math.random();
        var rStr_2 = "" + Math.random();
        var rStr_3 = "" + Math.random();
        var rStr_4 = "" + Math.random();
        var rStr_5 = "" + Math.random();
        rStr_1 = rStr_1.charAt(2);
        rStr_2 = rStr_2.charAt(2);
        rStr_3 = rStr_3.charAt(2);
        rStr_4 = rStr_4.charAt(2);
        rStr_5 = rStr_5.charAt(2);

        var uv_expired_data = new Date(2050,1,1);
        cookieval = cookieval + rStr_1 + rStr_2 + rStr_3 + rStr_4 + rStr_5;
		var uvid = this.encode64(cookieval);

        this.setCookie("DJ_UVID", uvid , uv_expired_data, "/", "dajie.com", false);
		
		//给后台第一次数据:start
		var url = "http://st.dajie.com/r.st";
		var i = new Image(1, 1);
		i.src = url + "?DJ_UVID=" + uvid + "&DJ_RF=" + dj_rf + "&DJ_EU="+ dj_eu +"&" + (+new Date());
		i.onload = function() {
			_uVoid();
		}
		//给后台第一次数据:end
    }
	//保存60天的记录
	if(this.getCookie("DJ_RF") == null || this.getCookie("DJ_RF") == ""){
		var rf_expired_data = new Date();
		    rf_expired_data.setDate(rf_expired_data.getDate()+60);
		this.setCookie("DJ_EU", dj_eu , rf_expired_data, "/", "dajie.com", false);
		this.setCookie("DJ_RF", dj_rf , rf_expired_data, "/", "dajie.com", false);
	}
	//记录session级别的数据
	if(this.getCookie("DJ_RF2") == null || this.getCookie("DJ_RF2") == ""){
		this.setCookie("DJ_EU2", dj_eu , null, "/", "dajie.com", false);
		this.setCookie("DJ_RF2", dj_rf , null, "/", "dajie.com", false);
	}
}
var statM = new StatM();
statM.initPage();

function _uVoid() {
	return;
}
function click_p() {
	var url = "";
	url = "http://st.dajie.com/l.st";
	var i = new Image(1, 1);
	r = (typeof (encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	i.src = url + "?r=" + r + "&" + (+new Date());
	i.onload = function() {
		_uVoid();
	}
}
function click_b(statcode) {
	var url = "";
	url = "http://st.dajie.com/b.st";
	var i = new Image(1, 1);
	r = (typeof (encodeURI) == 'function') ? encodeURI(document.referrer) : document.referrer;
	i.src = url + "?b="+statcode+"&r=" + r + "&" + (+new Date());
	i.onload = function() {
		_uVoid();
	}
}
function pageStatistics(event_code){
	var para = ""; 
	var url  = "";
	try{
	var argv = pageStatistics.arguments;
        var argc = pageStatistics.arguments.length;
        para = (1 < argc) ? argv[1] : "";
        }catch(e){
        }
        if('0000' == event_code){//pv统计专门做一个文件进行
		url = "http://st.dajie.com/p.st";
	}else{
		url = "http://st.dajie.com/s.st";
	}
	var i=new Image(1,1);
        i.src= url + "?e_cd=["+event_code+"]"+para+"&"+(+new Date());
  	i.onload=function() {_uVoid();}
}

var dpv;if(!dpv)click_p();dpv=1;

jQuery("a[stat]").live('click', function(){
   if(jQuery(this).attr("stat")!=""){
	click_b(jQuery(this).attr("stat"));
   }
});

jQuery("input[stat]").live('click',function(){
   if(jQuery(this).attr("stat")!=""){
    	click_b(jQuery(this).attr("stat"));
   }
});

jQuery("button[stat]").live('click',function(){
   if(jQuery(this).attr("stat")!=""){
        click_b(jQuery(this).attr("stat"));
   }
});

