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

var backBtn = Ti.UI.createButton({ title: 'Logout' });
groups.leftNavButton = backBtn;

var addBtn = Ti.UI.createButton({ systemButton:Titanium.UI.iPhone.SystemButton.ADD });
groups.rightNavButton = addBtn;

backBtn.addEventListener('click',function(e)
{
   //Alloy.createController('groups').getView().open();
});

addBtn.addEventListener('click',function(e)
{
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

var tbl = Ti.UI.createTableView({
				touchEnabled : true,
				search: search,
				editable: true,
	        	top: 43,
			});

groups.add(tbl);

tbl.addEventListener('click',function(e){
	var arg = {group_id:e.row.id};
	Alloy.createController('group_show',arg);
});

//--------------------------------------------------------------------------
//  Functions
//--------------------------------------------------------------------------

var callback_groups = function(data) {
	var group = [];
	_.each(data.resource, function(element, index, list){
		group.push({id: element.id, title: element.name});
	});
	 
	tbl.setData(group);
};

apiModule.getRecords('contact_group', null, token, callback_groups);



