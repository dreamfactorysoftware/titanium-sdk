var token = Ti.App.Properties.getString('token');

//--------------------------------------------------------------------------
//  Navigation
//--------------------------------------------------------------------------

var groups = Ti.UI.createWindow({
  backgroundColor:'white',
});

var nav = Ti.UI.iOS.createNavigationWindow({
   window: groups
});

nav.open();

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

groups.titleControl = imageView;

var logoutkBtn = Ti.UI.createButton({ title: 'Logout' });
groups.leftNavButton = logoutkBtn;

var addBtn = Ti.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.ADD });
groups.rightNavButton = addBtn;

logoutkBtn.addEventListener('click',function(e)
{
   apiModule.logout(function(data) {
   		Ti.App.Properties.setString('token', '');
   		Alloy.createController('index');
   });
});

addBtn.addEventListener('click',function(e) {
   Alloy.createController('group_add');
});


//--------------------------------------------------------------------------
//  Main UI
//--------------------------------------------------------------------------

var search = Ti.UI.createSearchBar({
    barColor:'#f0f0f0', 
    borderColor:'#f0f0f0',
    height:43,
    top:0,
});

groups.add(search);

search.addEventListener('singletap',function(){ 
	search.focus(); 
});

var hView = Ti.UI.createView({
    height : 1,
    backgroundColor: '#f0f0f0'
});

var tbl = Ti.UI.createTableView({
				touchEnabled : true,
				search: search,
				editable: true,
	        	top: 43,
	        	headerView: hView
			});

groups.add(tbl);

var eventHandler = function(e) {	
	var group_id = e.row.id;
	
	switch (e.type) {
		case 'click':
			var arg = {group_id:e.row.id};
			Alloy.createController('group_show',arg);
			break;
		case 'delete':
			deleteConfirm(group_id, e);
			break;
		default:
			Ti.API.info('none');
	}
};

tbl.addEventListener('click', eventHandler);
tbl.addEventListener('delete', eventHandler);


//--------------------------------------------------------------------------
//  Functions
//--------------------------------------------------------------------------

var callback_groups = function(data) {
	var groups = [];
	_.each(data.resource, function(element, index, list){
		var section = element.name.charAt(0);
		groups.push({id: element.id, title: element.name, section: section.toUpperCase()});
	});
	 
	var dat = []; 
	var sortedGroups = _.sortBy(groups, function (i) { return i.title.toLowerCase(); });
	var sections =  _.groupBy(sortedGroups, "section");
	
	_.each(sections, function(section, key) {
		var sec = Ti.UI.createTableViewSection({ headerTitle: key });
		_.each(section, function(groupObj) {
 		 	sec.add(Ti.UI.createTableViewRow({id: groupObj.id, title: groupObj.title, section: groupObj.section}));
		});
		dat.push(sec);
	});
	
	tbl.setData(dat);	 
};

apiModule.getRecords('contact_group', null, token, callback_groups);


function deleteConfirm(group_id, e) {
	var row_index = e.index; 
  	var row_obj = e.row;
  	  
	var dialog = Ti.UI.createAlertDialog({
    				cancel: 1,
    				buttonNames: ['Confirm', 'Cancel'],
    				message: 'Do you want to delete the group "' + row_obj.title + '"?',
    				title: 'Delete Group'
  				});
  				
  	dialog.addEventListener('click', function(e){
    	if (e.index === e.source.cancel){
      		tbl.insertRowBefore(row_index, row_obj);
    	}
    	else {
      		var params = 'ids=' + group_id;
    		apiModule.deleteRecord('contact_group', params, token, null);
    		
    		var params = 'filter=contact_group_id%3D' + group_id;
    		apiModule.deleteRecord('contact_group_relationship', params, token, null);
    	}
  	});
  
  	dialog.show();
}

