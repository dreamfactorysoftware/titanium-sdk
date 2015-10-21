//--------------------------------------------------------------------------
//  Navigation
//--------------------------------------------------------------------------

var index = Ti.UI.createWindow({
  backgroundColor:'white',
});

var nav = Ti.UI.iOS.createNavigationWindow({
   window: index
});

nav.open();

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

index.titleControl = imageView;


//--------------------------------------------------------------------------
//  Main UI
//--------------------------------------------------------------------------


var scrollView = Ti.UI.createScrollView({
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

index.add(scrollView);
index.open();

var loginEmail = Ti.UI.createTextField({
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			  			hintText: 'Email',
			  			top: 30, 
			  			left: 25,
			  			right: 25,
			  			height: 40
					});

scrollView.add(loginEmail);

var loginPassword = Ti.UI.createTextField({
						textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
  						hintText: 'Password',
  						passwordMask: true,
  						top: 75, 
  						left: 25,
  						right: 25,
  						height: 40
					});

scrollView.add(loginPassword);

var signinBtn = Ti.UI.createButton({
				    	top: 135, 
				    	height:40, 
				    	backgroundColor:'#d86a27',
					   	left:50,
					    right:50,
					    borderRadius:5,
					    borderColor:'#d86a27', 
					    color: '#fff',
					    title: 'Sign In',
					    font: {fontSize: '24'}
				    });
    
scrollView.add(signinBtn);

var registerBtn = Ti.UI.createButton({
						top: 185, 
						height:40, 
						backgroundColor:'#6baab2',
					   	left:50,
					    right:50,
					    borderRadius:5,
					    borderColor:'#6baab2', 
					    color: '#fff',
					    title: 'Register',
					    font: {fontSize: '24'}
					});

scrollView.add(registerBtn);

registerBtn.addEventListener('click', function(e) {
	Alloy.createController('register');
});

//--------------------------------------------------------------------------
//  Functions
//--------------------------------------------------------------------------

var loginResponse = function(data) {
				         Ti.App.Properties.setString('token', data.session_token);
				         Alloy.createController('groups');    
					};

signinBtn.addEventListener('click', function(e) {
	apiModule.login(loginEmail.value, loginPassword.value, loginResponse);
});


