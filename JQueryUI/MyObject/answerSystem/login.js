// JavaScript Document
/*
	($('#login').dialog({  //提交按钮
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
						url:'login.php',
						type:'POST',
						beforeSubmit:function(formDate,jqForm,option){   //防止恶意提交
							$('#login').dialog('widget').find('button').eq(1).button('disable');
							$('#loading').dialog('open');
						},
						success:function(responseText,statusText){
							if(responseText)
							 $('#login').dialog('widget').find('button').eq(1).button('enable');
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
					user:{
						required:true,
						minlength:2,
					},
					pass:{
						required:true,
						minlength:6,
					},
				},
				messages:{
					 user:{
						 required:"账号不能为空",
						 minlength:jQuery.validator.format('账号不得小于{0}位'), 
					 },
					 pass:{
						 required:'密码不得为空',
						 minlength:$.validator.format('密码不得少于{0}位'),
					 },
				},
			   
		   });
	   
		   $('#login_a').click(function(){
							  $('#reg').dialog('open');		  
		   });
		   
		    //提交后的交互,让用户可以看到数据正在提交，不会反复提交
		 $('#loading').dialog({
			autoOpen:false,
			modal:true,
			closeOnEscape:false,
			resizable:false,
			draggable:false,
			width:180,
			height:58,
		 }).parent().parent().find('.ui-widget-header').hide();
		   
		      
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
	 )
	*/
	$('#login').bind('click',function(){
	   alert('分爱');								  
	});
		   