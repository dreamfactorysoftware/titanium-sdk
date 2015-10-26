
var token = Ti.App.Properties.getString('token');

var infoCount = 0;

var args = arguments[0] || {};
var group_id = args.group_id;
var contact_id = args.contact_id;

//--------------------------------------------------------------------------
//  Navigation
//--------------------------------------------------------------------------

var contact_add = Ti.UI.createWindow({
  backgroundColor:'white'
});

var scrollView = Ti.UI.createScrollView({
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

contact_add.add(scrollView);
contact_add.open();

var nav = Ti.UI.iOS.createNavigationWindow({
   window: contact_add
});

nav.open();

var backBtn = Ti.UI.createButton({ title: 'Back' });
contact_add.leftNavButton = backBtn;

var doneBtn = Ti.UI.createButton({ title: 'Done' });
contact_add.rightNavButton = doneBtn;

backBtn.addEventListener('click',function(e)
{
	var arg = {group_id: group_id};
   	Alloy.createController('group_show', arg);
});

doneBtn.addEventListener('click',function(e)
{
   var firstName = '';
   var lastName = '';
   var twitter = '';
   var skype = '';
   var notes = '';
   
   for (var x = 0; x < 5; x++) {
   		if(scrollView.children[x].hintText == 'First Name')
   			firstName = scrollView.children[x].value;
   			
   		if(scrollView.children[x].hintText == 'Last Name')
   			lastName = scrollView.children[x].value;
   			
   		if(scrollView.children[x].hintText == 'Twitter')
   			twitter = scrollView.children[x].value;
   			
   		if(scrollView.children[x].hintText == 'Skype')
   			skype = scrollView.children[x].value;
   			
   		if(scrollView.children[x].hintText == 'Notes')
   			notes = scrollView.children[x].value;	
   }
   
   var params = {		
            data: {
                first_name: firstName,
                last_name: lastName,
                twitter: twitter,
                skype: skype,
                notes: notes
            }     
		};
   
   apiModule.setRecord('contact', params, token, callback_contactadd);
});

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

contact_add.titleControl = imageView;

//--------------------------------------------------------------------------
//  Main UI
//--------------------------------------------------------------------------

var contactFirstname = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'First Name',
  top: 20, 
  left: 25,
  right: 25,
  height: 40
});

scrollView.add(contactFirstname);

var contactLastname = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'Last Name',
  top: 65, 
  left: 25,
  right: 25,
  height: 40
});

scrollView.add(contactLastname);

var contactTwitterName = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'Twitter',
  top: 110, 
  left: 25,
  right: 25,
  height: 40
});

scrollView.add(contactTwitterName);

var contactSkypeName = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'Skype',
  top: 155, 
  left: 25,
  right: 25,
  height: 40
});

scrollView.add(contactSkypeName);

var contactNotes = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  hintText: 'Notes',
  top: 200, 
  left: 25,
  right: 25,
  height: 40
});

scrollView.add(contactNotes);

var addAddrBtn = Ti.UI.createButton({
    	top: 255, 
    	height:40, 
    	backgroundColor:'#6baab2',
	   	left:25,
	    right:25,
	    borderRadius:5,
	    borderColor:'#6baab2', 
	    color: '#fff',
	    title: 'Add New Address',
	    font: {fontSize: '16'}
    });

scrollView.add(addAddrBtn);

addAddrBtn.addEventListener('click',function(e) {
	addInfo(infoCount);
});

//--------------------------------------------------------------------------
//  Functions
//--------------------------------------------------------------------------

var callback_contactadd = function(data) {
	var new_id = data.resource[0].id;
	
	var params = {		
            data: {
            	contact_group_id: group_id,
                contact_id: new_id
               }
          };
          
	apiModule.setRecord('contact_group_relationship', params, token, null);
		
	var infos = (scrollView.children.length - 1 - 5) / 8;

   	for (var e = 0; e < infos; e++) {
   		var start = 6 + (e * 8);
   		var end = start + 8;
   		
   		var info_type = '', phone = '', email = '', address = '', city = '', state = '', zip = '', country = '';
   		
   		for (var x = start; x < end; x++) {
	        if (scrollView.children[x].hintText == 'Type')
	        	type = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'Phone')
	        	phone = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'Email')
	        	email = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'Address')
	        	address = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'City')
	        	city = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'State')
	        	state = scrollView.children[x].value;
	       
	       	if (scrollView.children[x].hintText == 'Zip')
	        	zip = scrollView.children[x].value;
	        	
	        if (scrollView.children[x].hintText == 'Country')
	        	country = scrollView.children[x].value;
	    }
	    
	    var params = {		
            data: {
            	ordinal: 0,
            	contact_id: new_id,
                info_type: type,
                phone: phone,
                email: email,
                address: address,
                city: city,
                state: state,
                zip: zip,
                country: country
            }     
		};

	    apiModule.setRecord('contact_info', params, token, null);
   	}
   	
   	var arg = {group_id: group_id};
	Alloy.createController('group_show',arg);
};


function addInfo(index) {	
	var x = 380 * index;
	
	var contactType = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Type',
	  top: 310 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactType);
	
	var contactPhone = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Phone',
	  top: 355 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactPhone);
	
	var contactEmail = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Email',
	  top: 400 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactEmail);
	
	var contactAddress = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Address',
	  top: 445 + x, 
	  left: 25,
	  right: 25,
	  height: 40 
	});
	
	scrollView.add(contactAddress);
	
	var contactCity = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'City',
	  top: 490 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactCity);
	
	var contactState = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'State',
	  top: 535 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactState);
	
	var contactZip = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Zip',
	  top: 580 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	  
	});
	
	scrollView.add(contactZip);
	
	var contactCountry = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Country',
	  top: 625 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactCountry);

	infoCount++;
}



