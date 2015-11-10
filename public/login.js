define(["/table.js","/button.js","/textfield.js",'css!/style.css'], 
	function(table,button,textfield){
    var LoginWindow = function(){

        var own = this;
        var Window = new table();
        Window.addRow();
        Window.addCell(0);
        var Panel = new table();
        Panel.addRow();
        Panel.addRow();
        Panel.addRow();

        Panel.addCell(0);
        Panel.addCell(1);
        Panel.addCell(2);

        var usernamefield = new textfield();
        var passwordfield = new textfield();
        var loginButton = new button("Нэвтрэх");
        var registerButton = new button("Бүртгүүлэх");

        Window.addCellContentOneRow(0, 0, Panel);

        own._view = Window._view;
        own._view.attr("class","LoginWindow");
        jQuery("body").append(own._view);

        Panel._view.attr("class", "LoginPanel");
        
        Panel.addCellContentOneRow(0, 0, usernamefield);
	    Panel.addCellContentOneRow(1, 0, passwordfield);
	    Panel.addCellContentOneRow(2, 0, loginButton);
	    Panel.addCellContentOneRow(2, 0, registerButton);	
		jQuery(loginButton._view).click(function(){
			var userInfo = {
				username : usernamefield.getText(),
				password : passwordfield.getText()
			}
			window.socket.emit("LogIn", {user:userInfo});
			name = userInfo.username;
			window.socket.emit("LoginClient", name);	
		})
    	
        jQuery(registerButton._view).click(function(){
        	require(["register.js"],function(RegisterWindow){
        		own._view.remove();
        		var register = new RegisterWindow();
        	})
        })
        
        Panel._view.on("click",function(){
            jQuery("body .LoginPanel").removeClass("active");
            Panel._view.addClass("active");
        })
        socket.on("LoginCorrect",function(){
        	own._view.remove();
        })
    }
    return LoginWindow;
})