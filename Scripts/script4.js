function makeMenu(items, tags) {
  
  tags = tags || ['ul', 'li']; // default list tags
  var parent = tags[0];
  var child = tags[1];
  
  var item, value = '';
  for (var i = 0, l = items.length; i < l; i++) {
    item = items[i];
    // Separate item and value if value is present
    if (/:/.test(item)) {
      item = items[i].split(':')[0];
      value = items[i].split(':')[1];
    }
    items[i] = '<'+ child +' '+ 
      (value && 'value="'+value+'"') +'>'+ // add value if present
        item +'</'+ child +'>';
  }
  
  return '<'+ parent +'>'+ items.join('') +'</'+ parent +'>';
}

$('button').click(function(){
  var id = this.id;
  var menu = makeMenu(
    $('input').val().split(/,\s?/), 
    id === 'select' && ['select', 'option'] ||
    id === 'olist' && ['ol', 'li'] ||
    ['ul', 'li']
  );
  $('#menu').append(menu);
});