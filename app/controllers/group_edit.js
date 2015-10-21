
var token = Ti.App.Properties.getString('token');

var args = arguments[0] || {};

var group_id = args.group_id;

//--------------------------------------------------------------------------
//  Navigation
//--------------------------------------------------------------------------

var group_edit = Ti.UI.createWindow({
  backgroundColor:'white',
});

var nav = Ti.UI.iOS.createNavigationWindow({
   window: group_edit
});

nav.open();

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

group_edit.titleControl = imageView;

var backBtn = Ti.UI.createButton({ title: 'Back' });
group_edit.leftNavButton = backBtn;

var doneBtn = Ti.UI.createButton({ title: 'Done' });
group_edit.rightNavButton = doneBtn;

var scrollView = Ti.UI.createScrollView({
  showVerticalScrollIndicator: true,
  showHorizontalScrollIndicator: true
});

group_edit.add(scrollView);
group_edit.open();

backBtn.addEventListener('click',function(e)
{
   var arg = {group_id: group_id};
   Alloy.createController('group_show', arg);
});

doneBtn.addEventListener('click',function(e)
{
	var params = 'filter=contact_group_id%3D' + group_id;
	apiModule.deleteRecord('contact_group_relationship', params, token, function(data) {
		
		var selected = _.filter(tbl.data[0].rows, function(obj){ return obj.selected == 1; });
		Ti.API.info(selected);	
	
		_.each(selected, function(element, index, list){
			Ti.API.info(element);	
			var params = {		
	            data: {
	                contact_group_id: group_id,
	                contact_id: element.id
	            }     
			};
		
			apiModule.setRecord('contact_group_relationship', params, token, null);
		});
		
		var group = {		
            data: {
                name: tf1.value
            }     
		};
	
		apiModule.updateRecord('contact_group/' + group_id, group, token, null);
		
		var arg = {group_id: group_id};
   		Alloy.createController('group_show', arg);
	});
});

var imageView = Ti.UI.createImageView({
    image : "df-logo.png",
    height : 20
});

group_edit.titleControl = imageView;

//--------------------------------------------------------------------------
//  Main UI
//--------------------------------------------------------------------------

var tf1 = Ti.UI.createTextField({
    color:'#336699',
    top:15,
	hintText: 'Group Name'
});

group_edit.add(tf1);

var search = Titanium.UI.createSearchBar({
    barColor:'#f0f0f0', 
    borderColor:'#f0f0f0',
    top:50,
});

group_edit.add(search);

var tbl = Titanium.UI.createTableView({
		allowsSelection:true,
		search: search,
        top: 95
});

group_edit.add(tbl);

tbl.addEventListener('click',function(e){
   if(!e.row.selected) {
      e.row.backgroundColor = '#66bbb0';
      e.row.selected = 1;
   }
   else{
      e.row.backgroundColor = '#fff';
      e.row.selected = 0;
   }
});

//--------------------------------------------------------------------------
//  Functions
//--------------------------------------------------------------------------

var callback_selectedcontacts = function(data) {
	
	var selected_contacts = [];
     _.each(data.resource, function(element, index, list){
     	selected_contacts.push(element.contact_id);
     });
     
     apiModule.getRecords('contact', null, token, function(data) {
     	var contacts = [];
	     _.each(data.resource, function(element, index, list){
	     	if(selected_contacts.indexOf(element.id) > -1) {
	     		contacts.push({id: element.id, title: element.first_name + ' ' + element.last_name, selected: 1, backgroundColor: '#66bbb0'});
	     	}
	     	else {
	     		contacts.push({id: element.id, title: element.first_name + ' ' + element.last_name, selected: 0, backgroundColor: '#fff'});
	     	}
	     });
	     
	     tbl.setData(contacts);
     });
};

function callback_groupname(data) {
	tf1.value = data.name;
}

var params = '?filter=contact_group_id%3D' + group_id + '&fields=contact_id';
apiModule.getRecords('contact_group_relationship' + params, null, token, callback_selectedcontacts);

apiModule.getRecords('contact_group/' + group_id, null, token, callback_groupname);












