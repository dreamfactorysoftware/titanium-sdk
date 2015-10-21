
var token = Ti.App.Properties.getString('token');
var infoCount = 0;

var args = arguments[0] || {};
var group_id = args.group_id;
var contact_id = args.contact_id;

//--------------------------------------------------------------------------
//  Navigation
//--------------------------------------------------------------------------

var contact_edit = Ti.UI.createWindow({
  backgroundColor:'white'
});

var scrollView = Ti.UI.createScrollView({
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

contact_edit.add(scrollView);
contact_edit.open();

var nav = Ti.UI.iOS.createNavigationWindow({
   window: contact_edit
});

nav.open();

var backBtn = Ti.UI.createButton({ title: 'Back' });
contact_edit.leftNavButton = backBtn;

var doneBtn = Ti.UI.createButton({ title: 'Done' });
contact_edit.rightNavButton = doneBtn;

backBtn.addEventListener('click',function(e)
{
   var arg = {group_id: group_id, contact_id: contact_id};
   Alloy.createController('contact_show',arg);
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

   apiModule.updateRecord('contact/' + contact_id, params, token, null);
   
   var params = 'filter=contact_id%3D' + contact_id;
   apiModule.deleteRecord('contact_info', params, token, callback_contactdel);
});

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

contact_edit.titleControl = imageView;

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

var callback_contactdel = function(data) {
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
            	contact_id: contact_id,
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
   	
   	var args = {group_id: group_id, contact_id: contact_id};
   	Alloy.createController('contact_show',args);
};

var callback_contact = function(data) {
	contactFirstname.value = data.first_name;
	contactLastname.value = data.last_name;
	contactTwitterName.value = data.twitter;
	contactSkypeName.value = data.skype;
	contactNotes.value = data.notes;
};

apiModule.getRecords('contact/' + contact_id, null, token, callback_contact);

var callback_infos = function(data) {
	_.each(data.resource, function(element, index, list){
		populateInfos(element, index);
	});
};

var params = '?filter=contact_id%3D' + contact_id;
apiModule.getRecords('contact_info' + params, null, token, callback_infos);

function populateInfos(info, index) {
	var x = 380 * index;
	
	var contactType = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Type',
	  value: info.info_type,
	  top: 310 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactType);
	
	var contactPhone = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Phone',
	  value: info.phone,
	  top: 355 + x, 
	  left: 25,
	  right: 25,
	  height: 40	  
	});
	
	scrollView.add(contactPhone);
	
	var contactEmail = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Email',
	  value: info.email,
	  top: 400 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactEmail);
	
	var contactAddress = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Address',
	  value: info.address,
	  top: 445 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactAddress);
	
	var contactCity = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'City',
	  value: info.city,
	  top: 490 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactCity);
	
	var contactState = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'State',
	  value: info.state,
	  top: 535 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactState);
	
	var contactZip = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Zip',
	  value: info.zip,
	  top: 580 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactZip);
	
	var contactCountry = Ti.UI.createTextField({
	  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
	  hintText: 'Country',
	  value: info.country,
	  top: 625 + x, 
	  left: 25,
	  right: 25,
	  height: 40
	});
	
	scrollView.add(contactCountry);

	infoCount = index + 1;
}

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

function saveInfo() {
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
            	contact_id: contact_id,
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
}


