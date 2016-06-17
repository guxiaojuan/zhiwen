// JavaScript Document


$(function(){
		   //注册部分
		   $('#search_button').button({     //查询按钮
			      //label:'查询',
			      icons:{
					primary:'ui-icon-search', 
					//secondary:'ui-icon-trangle'
				  }       						  
		   });
		   
		    $('#question_button').button({    //提问按钮
			      //label:'查询',
			      icons:{
					primary:'ui-icon-lightbulb', 
				  }       						  
		   }).click(function(){
			   if($.cookie('user')){
					$('#question').dialog('open');
			   }
			   else{
				   $('#error').dialog('open');
				   setTimeout(
					  function(){
						 $('#error').dialog('close');
						 $('#login').dialog('open');
					  },1000);
			   }
		   });
			
			//评论的ajax显示
			$.ajax({
			   url:'show_content.php',
			   type:'POST',
			   success:function(response,status,xhr){
				  var json=$.parseJSON(response);
				  var html='';
				  var arr=[];
				  $.each(json,function(index,value){
									   html+=' <h4>' + value.user + '发表于' + value.date + '</h4><h3>' + value.title + '</h3><div class="editor">' + value.content + '</div><div class="bottom">0条评论<span class="down">显示全部</span></div><hr />';
									   
				  });
				  $('.content').append(html);
				  
				  /*第一种显示评论和收起评论的方案是严格控制每个发布内容的高度，有点生硬，不太好
				  $.each($('.editor'),function(index,value){
						arr[index]=$(value).height();
						if($(value).height()>160)
						   $(value).next('.bottom').find('.up').hide();
						$(value).height(155);
				  });
				  $.each($('.bottom .down'),function(index,value){
						$(this).click(function(){
							$(this).parent().prev().height(arr[index]);	
							$(this).hide();
							$(this).parent().find('.up').show();
						});							 
				  });
				  $.each($('.bottom .up'),function(index,value){
					     $(this).click(function(){							                             $(this).parent().prev().height(155);
							 $(this).hide();
							 $(this).parent().find('.down').show();					   
						});
				  });
				  */
			   },
				   
			});
			
			$('#question').dialog({  
							autoOpen:false,
							modal:true,
							//width:380,
							resizable:false,
							width:750,
							height:380,
							buttons:{
								'发布':function(){
									 $(this).ajaxSubmit({
										  url:'add_content.php',
										  type:'POST',
										  data:{
											  user:$.cookie('user'),
											  content:$('.uEditorIframe').contents().find('#iframeBody').html(),
										  },
										  beforeSubmit:function(formData,jqForm,option){   
												$('#question').dialog('widget').find('button').eq(1).button('disable'); //防止恶意提交
												$('#loading').dialog('open');
										  },
										  success:function(responseText,statusText){
												if(responseText){
													 $('#question').dialog('widget').find('button').eq(1).button('enable');
													 $('#loading').css('background','url(img/correct.png) no-repeat 20px 8px').html('发布成功');
													 
													 setTimeout(function(){
														$('#loading').dialog('close');
														$('#question').dialog('close');
														$('#question').resetForm();
														$('#loading').css('background','url(img/loading.gif) no-repeat 20px 8px').html('正在发布中');
														$('.uEditorIframe').contents().find('#iframeBody').html("请输入问题描述");
													 },1000);
												}
										  },
									 });
						         },	
						 },
			 });	
									   
		     $('.uEditorCustom').uEditor();
		   
		   //登录提示
		   $('#error').dialog({
			autoOpen:false,
			modal:true,
			closeOnEscape:false,
			resizable:false,
			draggable:false,
			width:160,
			height:50,
		 }).parent().find('.ui-widget-header').hide();
			
		   //刚开始把用户和退出隐藏
		   $('#member,#logout').hide();
		   
		   $('#reg').dialog({  
						autoOpen:false,
						modal:true,
						//width:380,
						resizable:false,
						buttons:{
							'提交':function(){
							   $(this).submit();	
							}
						},
		   }).validate({    //验证表单
		       submitHandler:function(form){
				   $(form).ajaxSubmit({
						url:'add.php',
						type:'POST',
						beforeSubmit:function(formDate,jqForm,option){   
							$('#reg').dialog('widget').find('button').eq(1).button('disable'); //防止恶意提交
							$('#loading').dialog('open');
							
						},
						success:function(responseText,statusText){
							if(responseText){
								 $('#reg').dialog('widget').find('button').eq(1).button('enable');
								 $('#loading').css('background','url(img/correct.png) no-repeat 20px 8px').html('提交成功');
								 
								 $.cookie('user',$('#user').val());
								 
								 
								 setTimeout(function(){
									$('#loading').dialog('close');
									$('#reg').dialog('close');
									$('#reg').resetForm();
									$('#reg span').html('*');
									$('#loading').css('background','url(img/loading.gif) no-repeat 20px 8px').html('正在提交中');
									$('#member,#logout').show();
									$('#reg_a,#login_a').hide();
									//alert($.cookie('user'));
									$('#member').html($.cookie('user'));
								 },1000);
							}
						},
									  
				   });
			   },
			   
			   //错误提示
			   errorLabelContainer:'ol.reg_error',
			   wrapper:'li',
			   
		
			   highlight:function(element,errorClass){
				   $(element).css('border','1px solid #630');
				   $(element).parent().find('span').html('*');
			   },
			   unhighlight:function(element,errorClass){
				   $(element).css('border','1px solid #ccc');
				   $(element).parent().find('span').html('正确');
			   },
			    rules:{
					user:{
						required:true,
						minlength:2,
						remote:{
					       url:'is_user.php',
						   type:'POST',
						},
					},
					pass:{
						required:true,
						minlength:6,
					},
					email:{
					   required:true,
					   email:true,
					}
				},
				messages:{
					 user:{
						 required:"账号不能为空",
						 minlength:jQuery.validator.format('账号不得小于{0}位'), 
						 remote:"该用户名已被占用",
					 },
					 pass:{
						 required:'密码不得为空',
						 minlength:$.validator.format('密码不得少于{0}位'),
					 },
					 email:{
						 required:"邮箱不能为空",
						 minlength:'请输入正确的邮箱格式',
					 }
				},
			   
		   });
		   
		   $('#reg_a').click(function(){
							  $('#reg').dialog('open');		  
		   });
		   
		   //日历组件
		   $('#date').datepicker({
					changeMonth:true,
					changeYear:true,
					//autoSize:true,  设置了CSS，不会有作用
					showButtonPanel:true,
					yearRange:'1964:2100',
			});
		   /*
		   $('#reg input[title]').tooltip({
				  //show:false,
				 // hidden:false,
			      position:{
					  my:'left center',
					  at:'right+5 center' //相对my进行定位
				  }
           });
		  */ 
		   
		   $('#email').autocomplete({   //邮箱的自动补全
			  autoFocus:true,
			  source:function(request,response){
				  //request.term是输入框中的数据
				  //response是绑定数据源的，但是它不会根据搜索关键字过滤显示结果
				  var hosts=['qq.com','163.com','263.com','126.com','sina.com','gmail.com','hotmail.com'],
				      term=request.term; //获取用户输入的数据
					
				   var name=term,
				       host='', //域名
					   ix=term.indexOf('@'), //获取@的位置
					   result=[];  //保存最终呈现结果
					   
					   if(ix>-1){  //有@
					       name=term.slice(0,ix);
						   host=term.slice(ix+1);
					   }
					   result.push(term);//把用户输入的内容加进来
					   if(name){
					   //如果用户已经输入域名，就找到相关的域名提示
					   //如果用户还没有输入@，则将所有域名都提示出来
						   var findHosts=[];
						   if(host){
							   //grep函数用来过滤数组
							   findHosts=$.grep(hosts,function(value,index){
									return value.indexOf(host)>-1;	
							   });
						   }
						   else
						       findHosts=hosts;
							  
						   var findResult=$.map(findHosts,function(value,index){
    					         return name+'@'+value;
						   });
						   
						    result=result.concat(findResult);
					   }
					   response(result);
			  }, 
			  delay:0,
		   });
		   
		   //JQuery日历组件语言汉化
		   jQuery(function($){
				$.datepicker.regional['zh-CN']={
					closeText:'关闭',
				    prevText:'&#x3C;上月',
					nextText:'下月&#x3E;',
					currentText:'今天',
					monthNames:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
					monthNamesShort:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
					dayNames:['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
					dayNamesShort:['周日','周一','周二','周三','周四','周五','周六'],
					dayNamesMin:['日','一','二','三','四','五','六'],
					weekHeader:'周',
					//showWeek:true,
					dateFormat:'yy-mm-dd',
					firstDay:1,
					isRTL:false,
					showMonthAfterYear:true,   //月份放在年份之后
					yearSuffix:'年'
				};
				$.datepicker.setDefaults($.datepicker.regional['zh-CN']);
		   });
		   
		 //提交后的交互,让用户可以看到数据正在提交，不会反复提交
		 $('#loading').dialog({
			autoOpen:false,
			modal:true,
			closeOnEscape:false,
			resizable:false,
			draggable:false,
			width:160,
			height:60,
		 }).parent().find('.ui-widget-header').hide();
		   //.parent().parent().find('.ui-widget-header').hide()
		      
		  //根据cookie判断用户是否登录
		  if($.cookie('user')){  
			   $('#member,#logout').show();
			   $('#reg_a,#login_a').hide();
			   //alert($.cookie('user'));
			   $('#member').html($.cookie('user'));
		   }
		   else{
			   $('#member,#logout').hide();
			   $('#reg_a,#log_a').show();
		   }
		   
		   //当用户点击退出时,回到初始界面
		   $('#logout').click(function(){
				$.removeCookie('user');
				window.location.href='/Zhandian/JQueryUI/MyObject/answerSystem/answer.html'
		   });
		   
		   
		  //登录部分
		  
		  $('#login').dialog({  //提交按钮
						autoOpen:false,
						modal:true,
						//width:380,
						resizable:false,
						buttons:{
							'登录':function(){
							   $(this).submit();	
							}
						},
		   }).validate({    //验证表单
		       submitHandler:function(form){
				   $(form).ajaxSubmit({
						url:'login.php',
						type:'POST',
						beforeSubmit:function(formDate,jqForm,option){   //防止恶意提交
							$('#login').dialog('widget').find('button').eq(1).button('disable');
							$('#loading').dialog('open');
						},
						success:function(responseText,statusText){
							if(responseText)
							 $('#login').dialog('widget').find('button').eq(1).button('enable');
							 $('#loading').css('background','url(img/correct.png) no-repeat 20px 8px').html('登录成功');
							 
							 //设置cookie的有效期
							 if($('#expires').is(':checked')){	
							        $.cookie('user',$('#login_user').val(),{
										expires:7,							
									});
							}
							else{
								$.cookie('user',$('#login_user').val());
							}
							 
							 setTimeout(function(){
							    $('#loading').dialog('close');
								$('#login').dialog('close');
								$('#login').resetForm();
								$('#reg span').html('*');
								$('#loading').css('background','url(img/loading.gif) no-repeat 20px 8px').html('正在提交中');
							    $('#member,#logout').show();
				    			$('#reg_a,#login_a').hide();
				   				//alert($.cookie('user'));
				   				$('#member').html($.cookie('user'));
							 },1000);
						},
									  
				   });
			   },
			   
			   //错误提示
			   errorLabelContainer:'ol.login_error',
			   wrapper:'li',
			   
		
			   highlight:function(element,errorClass){
				   $(element).css('border','1px solid #630');
				   $(element).parent().find('span').html('*');
			   },
			   unhighlight:function(element,errorClass){
				   $(element).css('border','1px solid #ccc');
				   $(element).parent().find('span').html('正确');
			   },
			    rules:{
					login_user:{
						required:true,
						minlength:2,
					},
					login_pass:{
						required:true,
						minlength:6,
						remote:{
							url:'login.php',
							type:'POST',
							data:{
								login_user:function(){
								   return $('#login_user').val();	
								},
							},
						},
					},
				},
				messages:{
					 login_user:{
						 required:"账号不能为空",
						 minlength:jQuery.validator.format('账号不得小于{0}位'), 
					 },
					 login_pass:{
						 required:'密码不得为空',
						 minlength:$.validator.format('密码不得少于{0}位'),
						 remote:'账号或密码输入不正确',
					 },
				},
			   
		   });
	   
		   $('#login_a').click(function(){
							  $('#login').dialog('open');		  
		   });
		   	   
		      
		  //根据cookie判断用户是否登录
		  if($.cookie('user')){  
			   $('#member,#logout').show();
			   $('#reg_a,#login_a').hide();
			   //alert($.cookie('user'));
			   $('#member').html($.cookie('user'));
		   }
		   else{
			   $('#member,#logout').hide();
			   $('#reg_a,#log_a').show();
		   }
		   
		   //当用户点击退出时,回到初始界面
		   $('#logout').click(function(){
				$.removeCookie('user');
				window.location.href='/Zhandian/JQueryUI/MyObject/answerSystem/answer.html'
		   });
	 
		 //   		   
		   $('#tabs').tabs();
		   $('#accordion').accordion();
});