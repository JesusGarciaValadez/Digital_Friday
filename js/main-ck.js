!function($,window,document,undefined){$(function(){var Url=String(location.href);if(Url.search(/index.html/i))for(Url=Url.replace(/.*\?(.*?)/,"$1"),Variables=Url.split("&"),i=0;i<Variables.length;i++)Separ=Variables[i].split("="),Separ[1]!==undefined&&null!==Separ[1]&&eval("var "+Separ[0]+'="'+Separ[1]+'"');var err;if(err!==undefined&&null!==err){var expression=new RegExp("%20","gi");err=err.replace(expression," ");var errorMessage="<p>"+err+"</p>";errorMessage=errorMessage.replace(/%C3%B3/gi,"ó"),CMVDF.openAlert("Error",errorMessage)}if($(".alert_background").exists()){$(".alert_background").css({background:"#000",opacity:"0.9"}),$(".alert_background img").centerHeight();var blinkingLogo=setInterval(function(){$(".alert_background img").fadeOut(200,function(){$(".alert_background img").fadeIn(200)})},2e3)}if($("figure").exists()){var winWidth;winWidth=$.browser.msie&&"8.0"===$.browser.version?$(window).width():window.innerWidth,$("figure").height(winWidth)}if($("#background").exists()){var windowWidth=$(window).innerWidth();$("#background").width(windowWidth)}if($("figure").exists()&&$("figure.scene").width($(window).innerWidth()),$("h1").exists()&&$("h1").centerWidth(),$(".rocket").exists()&&$(".rocket").centerWidth(),$(".session").exists()&&$(".session").centerWidth(),$(".vertical_points").exists()&&$(".vertical_points").centerWidth(),$(".arrow").exists()&&$(".arrow").centerWidth(),$(".hands").exists()&&$(".hands").centerWidth(),$("#DG_Logo").exists()&&$("#DG_Logo").centerWidth(),$("#six .points").exists()){var pointOne=CMVDF.getCenterWidth($("#six .points").eq(0))-80,pointTwo=CMVDF.getCenterWidth($("#six .points").eq(1))+80;$("#six .points").eq(0).css({left:pointOne+"px"}),$("#six .points").eq(1).css({left:pointTwo+"px"})}$("h3").exists()&&$("h3").centerWidth(),$("h4").exists()&&$("h4").centerWidth(),$("form").exists()&&$("form").centerWidth()}),$(document).on("ready",function(e){if($(".alert_box").exists()&&(CMVDF.doOverlay($("a.alert_trigger"),{effect:"apple",close:$(".alert_box a.close"),closeOnClick:!0,closeOnEsc:!0,speed:"normal",fixed:!1,onBeforeLoad:function(e){$(".alert_background").height("100%"),$(".alert_background").width($(window).innerWidth()),$(".alert_box").centerWidth(),$(".alert_box").centerHeight()},onLoad:function(){$(".alert_background").fadeIn(300)},onBeforeClose:function(){$(".alert_box").fadeOut(10,function(){$(".alert_background").fadeOut(10),$(".alert_box h4").text(""),$(".alert_box p").remove(),$(".alert_box form").remove(),$(".alert_box table").remove(),$(".alert_box div").remove(),$(".alert_box button").remove(),$(".alert_box div.confirm").remove()})},onClose:function(e){}}),CMVDF.overlay=$(".alert_trigger").data("overlay"),$(".alert_background").height($("body").height()),$(window).on({resize:function(e){$(".alert_box").centerWidth()},touchstart:function(e){$(".alert_box").centerWidth()},touchend:function(e){$(".alert_box").centerWidth()}})),$("a.close").exists()&&$("a.close").on("click",function(e){CMVDF.closeAlert()}),$("form").exists()){var r={mail_verifier:{required:!0},session:{required:!0}},t={mail_verifier:"Por favor, selecciona una opción",session:"Por favor, selecciona una opción",required:"Por favor, selecciona una opción",minlength:"Por favor, haga su respuesta más amplia.",maxlength:"Por favor, acorte su respuesta",email:"Escriba un email válido",number:"Escriba solo números",digits:"Escriba solo números"};CMVDF.validateForms(r,t)}if($("figure.scene").exists(),$(".hands").exists())var o=setInterval(function(){$(".hands").fadeOut(200,function(){$(".hands").fadeIn(200)})},2e3);if($(".rocket").exists()){var i=$("#background").height()-$(window).innerHeight(),n=$(window).innerHeight()/2-$(".rocket").height()/2,a=!1;$(document).on("scroll",function(e){if(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),CMVDF.tool=window.pageYOffset!==undefined?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop,CMVDF.tool===i&&($(".rocket").dequeue().animate({top:$(window).innerHeight()-205+"px"},1e3),a=!1),CMVDF.tool>0&&CMVDF.tool<i-1){if(a)return!1;$(".rocket").dequeue().animate({top:n},1e3),a=!0}0===CMVDF.tool&&($(".rocket").dequeue().animate({top:"-310px"},1e3),a=!1)})}$(".alert_background").exists()&&CMVDF.smoothScroll($("#background").height(),10,function(){$(".alert_background").dequeue().fadeIn(300,function(){$(".alert_background").fadeOut(500,function(){CMVDF.smoothScroll($("#background").height(),0),$(".alert_background").removeAttr("style"),$(".alert_background").css("display","none"),$(".alert_background img").remove()})})})})}(jQuery,window,document);
//# sourceMappingURL=./main-ck.map