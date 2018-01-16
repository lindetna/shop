var E_M = function E_M(){

}

E_M.prototype.checkElement = function checkElement(params) {
	let allchecked = true;
	$(params.selector).each(function() {
		if($(this).is(':checked')) {
			if(params.checked && typeof params.checked === 'function'){
				const checked = params.checked.bind(this, {this: this, parent: params})
				checked();
			}
		} else {
			allchecked = false;
			$(params.checkAllSelector).prop('checked', false);
			if(params.unchecked && typeof params.unchecked === 'function'){	
				const unchecked = params.unchecked.bind(this, {this: this, parent: params})
				unchecked();
			}
		}
	})
	if(allchecked) {
		$(params.checkAllSelector).prop('checked', true);
		if(params.allChecked && typeof params.allChecked === 'function'){
			const allChecked = params.allChecked.bind(this, {this: this, parent: params})
			allchecked();
		}

	}
	return params;
};

E_M.prototype.toggleCheckAllElement = function toggleCheckAllElement(params) {
	const e = params.event;
	if($(e.currentTarget).is(':checked')) {
		$(params.selector).each(function() {
			$(this).prop('checked', true);
			if(params.checked && typeof params.checked === 'function'){
				const checked = params.checked.bind(this, {this: this, parent: params})
				checked();
			}
		})
	} else {
		$(params.selector).each(function() {
			$(this).prop('checked', false);
		})
		if(params.unchecked && typeof params.unchecked === 'function'){
			const unchecked = params.unchecked.bind(this, {this: this, parent: params})
			unchecked();
		}
	}
	return params;
};

E_M.prototype.showLoader = function showLoader(){
	$('#loader').removeClass('hidden');
}


E_M.prototype.removeLoader = function removeLoader(params){
	var time = 0;
	if(params.time) {
		time = params.time;
	}
	setTimeout(function(){ $('#loader').addClass('hidden'); }, time);
	
}

E_M.prototype.formatDateField = function formatDateField(params){
	var e = params.event;

	var currentTarget = e.currentTarget;
	var date = currentTarget.value;
	var length = date.length;
	var id = currentTarget.id;

	// input hidden pour qu'on lui envoie la bonne value
	var field_for_date = currentTarget.getAttribute('field-for-date');
	var fieldDate = document.getElementById(field_for_date);
	
	var date_for_db = '';
	

	if(length == 10){
		date_for_db = this.convertDateToDb(date);
		fieldDate.value = date_for_db;
	} else {
		fieldDate.value = '';
	}

	// recupère l'id de l'élément sur lequel on a cliqué
	/*var id = e.currentTarget.id;

	// input hidden pour qu'on lui envoie la bonne value
	var field_for_date = e.currentTarget.getAttribute('field-for-date');
	var fieldDate = document.getElementById(field_for_date);
	
	// la date ecrite par l'utilisateur
	var date = e.currentTarget.value;
	
	var length = date.length;

	// add slash to date
	var editedDate = date;
	if(e.keyCode !== 8) {
		switch(editedDate.length){
			case 2:
				editedDate += "/";
				break;
			case 3:
				if(editedDate[2] != "/") {
					editedDate = editedDate.substr(0, 2) + '/' + editedDate.substr(2, 1);
				}
				break;
			case 5:
				editedDate += "/";
				break;
			case 6:
				if(editedDate[5] != "/") {
					editedDate = editedDate.substr(0, 5) + '/' + editedDate.substr(5, 1);
				}
				break;
			default:
				break;
		}
	}
	e.currentTarget.value = editedDate;
	var date_for_db = '';
	
	if(length == 10){
		date_for_db = this.convertDateToDb(editedDate);
	}
	fieldDate.value = date_for_db;*/
}

//converti la date dans le format db ('yyyy-mm-dd')
E_M.prototype.convertDateToDb = function convertDateToDb(date){
    var year = date.substr(6, 4);
    var month = date.substr(3,2);
    var day = date.substr(0,2);
	var convertedDate = year + "-" + month + "-" + day;
	return convertedDate;
}

//converti la date dans le format vue ('dd/mm/yyyy')
E_M.prototype.convertDateToView = function convertDateToView(date){
	var convertedDate = '';
	if( date ){
		var year = date.substr(0,4);
		var month = date.substr(5,2);
		var day = date.substr(8,2);
		var convertedDate = day + "/" + month + "/" + year;
	}
	return convertedDate;
}

E_M.prototype.unload = function unload(tag){
	// root Tag jQuery context for fast class selecting $('.xx_class_xx', $tagRoot)
	var $tagRoot = $(tag.root);
}

E_M.prototype.toggleVisible = function toggleVisible(e) {
	var node = e.target;
	if($(node).attr('value') == 'hidden') {
		$(node).attr('value', 'visible').attr('title', 'Visible').attr('src', '/img/btn_visible.png');
	} else {
		$(node).attr('value', 'hidden').attr('title', 'Invisible').attr('src', '/img/btn_nonvisible.png');
	}
}

E_M.prototype.showContents = function showContents(e, params) {
	e.preventDefault();
	e.stopPropagation();
	e.preventUpdate = true;
	var params = params || {};
	var container = e.currentTarget.parentNode;
	var $container = $(container);
    var $header = $('header', $container);
    if($header.hasClass('opened')) {
        $header.removeClass('opened');
        $header.addClass('closed');
        $('.slide-up .line-separator', $container).addClass('hidden');
    } else {
        $header.removeClass('closed');
        $header.addClass('opened');
        $('.slide-up .line-separator', $container).removeClass('hidden');
    }

	if( params.toggleClass ){
		$('.slide-up', $container).toggleClass(params.toggleClass);
	}else{
		$('.slide-up', $container).slideToggle('fast');
	}
}

E_M.prototype.disableElementById = function disableElementById(e) {
	var id = e.currentTarget.getAttribute("id-to-disable");
	var checked = e.currentTarget.checked;
	if (checked == true){
		document.getElementById(id).disabled = false;
	} else {
		document.getElementById(id).disabled = true;
	}
}

E_M.prototype.editElement = function editElement(params){
	var e = params.event;
	e.preventDefault();
	var	item = e.item;
	var idElement;
	if(params.prefixId){
		idElement = params.prefixId + item.id;
	}else{
		idElement = item.id;
	}
	var $element = $('#' + idElement);
	var idEdit = idElement + '_edit';
	var $edit = $('#' + idEdit);
	var $show_infos = $('.show_infos', $element);

	if(params.end && typeof params.end === 'function'){
		var end = params.end.bind(this, {item: item, edit: $edit});
		end();
		end = null;
	}

	if(params.hideClass || params.showClass){
		if(params.hideClass){
			$edit.removeClass(params.hideClass);
			$show_infos.addClass(params.hideClass);
		}
		if(params.showClass){
			$edit.addClass(params.showClass);
			$show_infos.removeClass(params.showClass);
		}
	}else{
		$edit.show();
		$show_infos.hide();
	}
}

E_M.prototype.addElement = function addElement(params){
	// show the edit layer and hide the filters
	var e = params.event;
	e.preventDefault();
	var prefix;
	var $element;
	var tag = params.tag || undefined;
	var item = e.item || undefined;

	if(params.prefixId){
		prefix = params.prefixId;
		if( prefix.charAt(prefix.length -1) === '_'){
			prefix = prefix.slice(0,-1);
		}
		$element = $('#add_' + prefix);
	}else{
		$element = $('#add_element');
	}
	var $filtres = $('.filtres');

	if(params.hideClass || params.showClass){
		if(params.hideClass){
			$element.removeClass(params.hideClass);
			$filtres.addClass(params.hideClass);
		}
		if(params.showClass){
			$element.addClass(params.showClass);
			$filtres.removeClass(params.showClass);
		} 
	}else{
		$filtres.slideUp();
		$element.slideDown();
	}
	
	if( params.end && typeof params.end === 'function' ){
		var end = params.end.bind(this, { tag: tag, item: item });
		end();
		end = null;
	}
}

E_M.prototype.validDeleteElement = function validDeleteElement(params){
	var e = params.event;
	e.preventDefault();
	var item = e.item;
	var idElement;
	if(params.prefixId){
		idElement = params.prefixId + item.id;
	}else{
		idElement = item.id;
	}
	var $show_infos = $('.show_infos', '#' + idElement);
	var $element = $('#' + idElement + '_delete');
	if(params.hideClass || params.showClass){
		if(params.hideClass){
			$element.removeClass(params.hideClass);
			$show_infos.addClass(params.hideClass);
		}
		if(params.showClass){
			$element.addClass(params.showClass);
			$show_infos.removeClass(params.showClass);
		}
	}else{
		$show_infos.slideUp();
		$element.slideDown();
	}
}

E_M.prototype.cancelDeleteElement = function cancelDeleteElement(params){
	var e = params.event;
	e.preventDefault();
	var item = e.item;
	var idElement;
	if(params.prefixId){
		idElement = params.prefixId + item.id;
	}else{
		idElement = item.id;
	}
	$element = $('#' + idElement + '_delete');
	$show_infos = $('.show_infos', '#' + idElement);

	if(params.hideClass || params.showClass){
		if(params.hideClass){
			$element.addClass(params.hideClass);
			$show_infos.removeClass(params.hideClass);
		}
		if(params.showClass){
			$element.removeClass(params.showClass);
			$show_infos.addClass(params.showClass);
		}
	}else{
		$element.slideUp();
		$show_infos.slideDown();
	}
}

E_M.prototype.deleteElement = function deleteElement(params){
	var e = params.event;
	e.preventDefault();
	var item = e.item;
	var tag = params.tag;
	var app = tag.app;
	var data = {};
	var url = params.url;
	var elements, idElements;
	var e_m = this;
	if(params.loader){
		this.showLoader();
	}
	if(params.elements && params.idElements){
		elements = params.elements;
		idElements = params.idElements;
	}else{
		elements = tag.elements;
		idElements = tag.idElements;
	}
	if(params.type_element){
		data.type_element = params.type_element;
	}
	data.action = 'delete';
	data.id = item.id;
	if( params.idsToDelete ){
		var idsToDelete = params.idsToDelete;
		for( var i in idsToDelete ){
			data[i] = idsToDelete[i];
		}
	}

	$.ajax(url, {
		data : data,
		type : 'POST',
		dataType: 'json',
		success: function (result, textStatus, jqXHR){
			console.log('delete result: ' + JSON.stringify(result));
			if(result.id){
				elements.splice( idElements[ item.id ], 1); 
				idElements[ item.id ] = null;
				app.setByIds(elements, idElements);
			}else if(result.ids){
				// TODO:
			}else if(result.error){	
				// TODO:
			}
			if( params.end && typeof params.end === 'function' ){
				var end = params.end.bind(this, { tag: tag, item: item });
				end();
				end = null;
			}
			tag.update();
			if(params.loader){
				e_m.removeLoader({time: 1000});
			}

			// free reference to permit garbage collect the tag when it will be unmounted
			tag = null;
		}
	}).done(function(){
		console.log('done!...');
		// free reference to permit garbage collect the tag when it will be unmounted
		tag = null;
	}).fail(function(){
		console.log('fail!...');
		// free reference to permit garbage collect the tag when it will be unmounted
		tag = null;
	});
	
}

E_M.prototype.makeVisible = function makeVisible(params){
	var e = params.event;
	e.preventDefault();
	e.preventUpdate = true;
	var currentTarget = e.currentTarget; 
	// button to set visible/invisible an element 
	if($(currentTarget).hasClass('neutral')){
		$(currentTarget).removeClass('neutral').addClass('yes');
		$('.invisible', $(currentTarget).parent()).removeClass('no').addClass('neutral');
	}
	currentTarget.value = 'visible';
	$('.invisible', $(currentTarget).parent()).val('visible');
}

E_M.prototype.makeInvisible = function makeInvisible(params){
	var e = params.event;
	e.preventDefault();
	e.preventUpdate = true;
	var currentTarget = e.currentTarget; 
	// button to set visible/invisible an element
	if($(currentTarget).hasClass('neutral')){
		$(currentTarget).removeClass('neutral').addClass('no');
		$('.visible', $(currentTarget).parent()).removeClass('yes').addClass('neutral');
	}
	currentTarget.value = 'hidden';
	$('.visible', $(currentTarget).parent()).val('hidden');
}

E_M.prototype.cancelElement = function cancelElement(params){
	var e = params.event;
	e.preventDefault();
	var i, field;
	var item = this.item = e.item;
	var fields = params.fields;
	var l = fields.length;
	var idElement;
	var prefix;
	var tag = params.tag || undefined;

	if(item){
		if(params.prefixId){
			idElement = params.prefixId + item.id;
		}else{
			idElement = item.id;
		}
	}else{
		if(params.prefixId){
			prefix = params.prefixId;
			if( prefix.charAt(prefix.length -1) === '_'){
				prefix = prefix.slice(0,-1);
			}
			idElement = 'add_' + prefix;
		}else{
			idElement = 'add_element';
		}
	}
	this.idElement = idElement;
	var editContainerId = item ? idElement + '_edit' : idElement;
	var containerId = idElement;
	var $container = $('#' + containerId);
	var $editContainer = this.$editContainer = $('#' + editContainerId);

	$show_infos = $('.show_infos', $container);

	if(params.hideClass || params.showClass){
		if(params.hideClass){
			$editContainer.addClass(params.hideClass);
			$show_infos.removeClass(params.hideClass);
		}
		if(params.showClass){
			$editContainer.removeClass(params.showClass);
			$show_infos.addClass(params.showClass);
		}
	}else{
		$show_infos.slideDown();
		$editContainer.slideUp();
	}

	if( ! item ){
		var $filtres = $('.filtres');
		if(params.hideClass || params.showClass){
			if(params.hideClass){
				$filtres.removeClass(params.hideClass);
			}
			if(params.showClass){
				$filtres.addClass(params.showClass);
			}
		}else{
			$filtres.slideDown();
		}
		// here we clean the form data for this element
		for(i=0; i<l; i++){
			field = fields[i];
			$('.' + field, $editContainer ).val( '' );
		}
	}else{
		// here we refresh last data for this element
		for(i=0; i<l; i++){
			field = fields[i];
			$('.' + field, $editContainer ).val( item[field] );
		}
	}

	if( params.end && typeof params.end === 'function' ){
		var end = params.end.bind(this, { tag: tag, });
		end();
		end = null;
	}
}

E_M.prototype.saveElement = function saveElement(params){
	var e = params.event;
	e.preventDefault();
	var i, field, fieldById, elem, data = {};
	var typeElement = params.typeElement || undefined;
	var typeModele = params.typeModele || undefined;
	var suffixId = params.suffixId || undefined;
	var prefixFields = params.prefixFields || '';
	var prefixId = params.prefixId || '';
	var tag = params.tag;
	var item = e.item;
	var currentTarget = e.currentTarget;
	var url = params.url;
	var fields = params.fields;
	var action = params.action || undefined;
	var l = fields.length;
	var idElement;
	var element, value, numElement, isEdit, fieldId;
	var e_m = this;

	if(params.loader) {
		this.showLoader();
	}

	if(item){
		isEdit = true;
		if(params.id){
			idElement = params.id;
		}else{
			idElement = item.id;
		}
	}else{
		if(suffixId){
			idElement = 'add_' + suffixId;
		}else{
			idElement = 'add_element';
		}
	}

	var editContainerId = isEdit ? prefixId + idElement + '_edit' : idElement;
	var containerId = prefixId + idElement;
	var $container = $('#' + containerId);
	var $editContainer = $('#' + editContainerId);
	var elements, idElements;
	if(params.elements && params.idElements){
		elements = params.elements;
		idElements = params.idElements;
	}else{
		elements = tag.elements;
		idElements = tag.idElements;
	}

	if( isEdit ){
		element = elements[idElements[idElement]];
	}else{
		element = new Object();
	}

	for(i=0; i<l; i++){
		field = fields[i];
		if( isEdit ){
			fieldId  = prefixFields + field + '_' + idElement;
		}else{
			fieldId  = prefixFields + field;
		}
		if(document.getElementById( fieldId )){
			elem = document.getElementById( fieldId );
			if( elem.type === 'checkbox'){
				if( elem.checked ){
					value = 1;
				}else{
					value = 0;
				}
			}else if( elem.type === 'radio'){
				elem = document.querySelector('input[name="' + fieldId + '"]:checked');
				if(elem){
					value = elem.value;
				}else{
					value = null;
				}
			}else{
				value = elem.value;
			}
		}else{
			value = null;
		}

		data[field] = value;

		element[field] = value;
	}
	

	if(typeElement){
		data['type_element'] = typeElement;
	}

	if(typeModele){
		data['type_modele'] = typeModele;
	}

	if( ! action ){
		if( isEdit ){
			data['id'] = idElement;
			data.action = 'update';
		}else{
			data.action = 'add';
		}
	}else{
		data['action'] = action;
	}

	if( params.beforeSend && typeof params.beforeSend === 'function' ){
		var beforeSend = params.beforeSend.bind(this, { tag: tag, element: element, action: data.action, data: data });
		beforeSend();
		beforeSend = null;
	}

console.log('saveElement data: ' + JSON.stringify(data));
	$.ajax(url, {
		data : data,
		type : 'POST',
		dataType: 'json',
		success: function (result, textStatus, jqXHR){
			console.log('saveElement result: ' + JSON.stringify(result));
			this.result = result;
			if(result && ! result.error){

				if( isEdit ){
					var $show_infos = $('.show_infos', $container);
				}else{
					var $addElement = $('#' + idElement);
					var $filtres = $('.filtres');

					if( result.id ){
						element.id = result.id;
					}

					if( params.fieldsToGetFromDB ){
						var fieldsToGetFromDB = params.fieldsToGetFromDB;
						for( var i in fieldsToGetFromDB){
							element[i] = fieldsToGetFromDB[i];
						}
					}

					elements.push(element);

					numElement = elements.length - 1;
					idElements[result.id] = numElement;
				}

				if( params.beforeUpdate && typeof params.beforeUpdate === 'function' ){
					var beforeUpdate = params.beforeUpdate.bind(this, { tag: tag, elements: elements, });
					beforeUpdate();
					beforeUpdate = null;
				}
				tag.update();
				if(params.loader) {
					e_m.removeLoader({time: 1000});
				}

				if(params.hideClass || params.showClass){
					if(params.hideClass){

						if( isEdit ){
							$show_infos.removeClass(params.hideClass);
							$editContainer.addClass(params.hideClass);
						}else{
							$addElement.addClass(params.hideClass);
							$filtres.removeClass(params.hideClass);
						}
					}
					if(params.showClass){
						if( isEdit ){
							$show_infos.addClass(params.showClass);
							$editContainer.removeClass(params.showClass);
						}else{
							$addElement.removeClass(params.showClass);
							$filtres.addClass(params.showClass);
						}
					}
				}else{
					if( isEdit ){
						$show_infos.slideDown();
						$editContainer.slideUp();
					}else{
						$addElement.slideUp();
						$filtres.slideDown();
					}
				}

				if( params.end && typeof params.end === 'function' ){
					var end = params.end.bind(this, { tag: tag, });
					end();
					end = null;
				}
			}else if(result.ids){
				// TODO:
			}else if(result.error){
				// TODO:
				setTimeout(function(){ $('#loader').addClass('hidden'); }, 0);
			}
			tag = null;
		}
	}).done(function(){
		console.log('done!...');
		tag = null;
	}).fail(function(){
		console.log('fail!...');
		tag = null;
	}); //, 'json'
}

E_M.prototype.scrollToId = function scrollToId(id){ 
	var tag = $('#' + id.replace(/[\W]+/g,'_') ); 
	$('html,body').animate({scrollTop: tag.offset().top},'slow'); 
}

E_M.prototype.backEndError = function backEndError(params){ 
	if(params.error && params.error.code){
		switch(params.error.code){
			case 1:
				this.showModalInvalidSession(params);
				break;
			default:
			
		}
	}
}

E_M.prototype.showModalInvalidSession = function showModalInvalidSession(params){ 
console.log('showModalInvalidSession');
	var tag = params.tag;
	var app = tag.app;
	app.insertTag('modal-reco', '#modal-reco');
	app.loadTag('/js/tag/modal-reco.html','modal-reco', function(){
		var $back_modal = $('#back_modal');
		$back_modal.show();
		$('.modal', $back_modal).show();
	});
}

E_M.prototype.getElements = function getElements(params){
	var tag = params.tag;
	var url = params.url;
	var fields = params.fields;
	var elements = params.elements;
	var idElements = params.idElements;
	var getParameters = params.getParameters || {};
	$.getJSON( url, getParameters, function(data){
		if(data && data.elements){
			if(params.init && typeof params.init === 'function'){
				params.init(tag);
			}
			var i, field, d;
			var l = data.elements.length;
			for(i=0; i<l; i++){
				d = new Object();
				for(field in fields){
					d[fields[field]] = data.elements[i][field];
				}
				if(params.childsName){
					d[params.childsName] = [];
				}
				idElements[d['id']] = i;
				elements.push(d);
			}

			tag.update();
			if(params.end && typeof params.end === 'function'){
				var end = params.end.bind(this, { tag: tag, });
				end();
				end = null;
			}
		}else{
			// TODO: no data elements, get and manage error!...
		}
		tag = null;
		url = null;
		fields = null;
		elements = null;
		idElements = null;
	});
}

E_M.prototype.replaceAccents = function replaceAccents(myString){
	// tableau des caractères accentués
	var tabAccents = new Array(/À/g, /Á/g, /Â/g, /Ã/g, /Ä/g, /Å/g, /Æ/g, /Ç/g, /È/g, /É/g, /Ê/g, /Ë/g, 
	/Ì/g, /Í/g, /Î/g, /Ï/g, /Ð/g, /Ñ/g, /Ò/g, /Ó/g, /Ô/g, /Õ/g, /Ö/g, /Ø/g, /Ù/g, /Ú/g, /Û/g, /Ü/g, /Ý/g, 
	/Þ/g, /ß/g, /à/g, /á/g, /â/g, /ã/g, /ä/g, /å/g, /æ/g, /ç/g, /è/g, /é/g, /ê/g, /ë/g, /ì/g, /í/g, /î/g, 
	/ï/g, /ð/g, /ñ/g, /ò/g, /ó/g, /ô/g, /õ/g, /ö/g, /ø/g, /ù/g, /ú/g, /û/g, /ü/g, /ý/g, /ý/g, /þ/g, /ÿ/g, / /g);
            
    //tableau des équivalents sans accents
    var tabNoAccents =  new Array("A","A","A","A","A","A","A","C","E","E","E","E",
	"I","I","I","I","D","N","O","O","O","O","O","O","U","U","U","U","Y",
	"b","s","a","a","a","a","a","a","a","c","e","e","e","e","i","i","i",
	"i","d","n","o","o","o","o","o","o","u","u","u","u","y","y","b","y","");
    for (var i = 0; i <= tabAccents.length; i++){
    	myString = myString.replace(tabAccents[i], tabNoAccents[i]);
    }
    return myString;
}

//rajoute les '.' automatiquement
E_M.prototype.addDotToEndPhoneNumber = function addDotToEndPhoneNumber(phone_number){
	switch(phone_number.length){
		case 2:
			phone_number += ".";
			break;
		case 5:
			phone_number += ".";
			break;
		case 8:
			phone_number += ".";
			break;
		case 11:
			phone_number += ".";
			break;
		default:
			break;
		return phone_number;
	}
}

E_M.prototype.getGrammar = function getGrammar(params){

	var id =  params.id ? '_' + params.id : '' ;
	var champs = params.champs;
	var grammar = params.grammar;
	var cl1 = $('#' + ( params.option_1 ? params.option_1 : 'option_1' ) + (id)).val();
	var cl2 = $('#' + ( params.option_2 ? params.option_2 : 'option_2' ) + (id)).val();
	var cl3 = $('#' + ( params.option_3 ? params.option_3 : 'option_3' ) + (id)).val();
	var cl4 = $('#' + ( params.option_4 ? params.option_4 : 'option_4' ) + (id)).val();
	var cl5 = $('#' + ( params.option_5 ? params.option_5 : 'option_5' ) + (id)).val();
	var cl6 = $('#' + ( params.option_6 ? params.option_6 : 'option_6' ) + (id)).val();
	var cl7 = $('#' + ( params.option_7 ? params.option_7 : 'option_7' ) + (id)).val();
	var cl8 = $('#' + ( params.option_8 ? params.option_8 : 'option_8' ) + (id)).val();
	var cl9 = $('#' + ( params.option_9 ? params.option_9 : 'option_9' ) + (id)).val();
	var cl10 = $('#' + ( params.option_10 ? params.option_10 : 'option_10' ) + (id)).val();

	var grammar = `
{
`
	+ (champs.champ_1 ? (( grammar ? grammar : "_this.grammar" ) + ".cl1 = '" + cl1 + "';\n") : '')
	+ (champs.champ_2 ? (( grammar ? grammar : "_this.grammar" ) + ".cl2 = '" + cl2 + "';\n") : '')
	+ (champs.champ_3 ? (( grammar ? grammar : "_this.grammar" ) + ".cl3 = '" + cl3 + "';\n") : '')
	+ (champs.champ_4 ? (( grammar ? grammar : "_this.grammar" ) + ".cl4 = '" + cl4 + "';\n") : '')
	+ (champs.champ_5 ? (( grammar ? grammar : "_this.grammar" ) + ".cl5 = '" + cl5 + "';\n") : '')
	+ (champs.champ_6 ? (( grammar ? grammar : "_this.grammar" ) + ".cl6 = " + (cl6 != '' ? cl6 : '0.00') + ";\n") : '')
	+ (champs.champ_7 ? (( grammar ? grammar : "_this.grammar" ) + ".cl7 = " + (cl7 != '' ? cl7 : '0.00') + ";\n") : '')
	+ (champs.champ_8 ? (( grammar ? grammar : "_this.grammar" ) + ".cl8 = " + (cl8 != '' ? cl8 : '0.00') + ";\n") : '')
	+ (champs.champ_9 ? (( grammar ? grammar : "_this.grammar" ) + ".cl9 = " + (cl9 != '' ? cl9 : '0.00') + ";\n") : '')
	+ (champs.champ_10 ? (( grammar ? grammar : "_this.grammar" ) + ".cl10 = " + (cl10 != '' ? cl10 : '0.00') + ";\n") : '')
+ `
}

Expression
  = Func / Operation
Operation
  =  _ head:Factor tail:(_ ("+" / "-" / "*" / "/") _ Factor)* _  {
      var result = head, i;
      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "+") { result += tail[i][3]; }
        if (tail[i][1] === "-") { result -= tail[i][3]; }
        if (tail[i][1] === "*") { result *= tail[i][3]; }
		if (tail[i][1] === "/") { result /= tail[i][3]; }
      }

      return result;
    }

Factor
  = Func 
  / "(" _ expr:Operation _ ")" { return expr; }
  / variable
  / Float
  / FloatFR
  / Integer


Func
  = si
  / arrondi

si
  = "si" _ "(" _ boolExpr:BooleanOperation _ ";" _ arg1:Operation _ ";" _ arg2:Operation _ ")" _ {
  	if(boolExpr){
    	return arg1;
    }else{
    	return arg2;
    }
  }

arrondi
  = "arrondi" _ "(" _ expr:Operation _ ";" _ precision:Integer _ ")" _ {
  	var factor = Math.pow(10, precision);
    var tempNumber = expr * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
  }

BooleanOperation
  = _ head:Factor tail:(_ ("<=" / ">=" / "<" / ">" / "!=" / "==" / "=" ) _ Factor)* _ {
      var result,i;
      for (i = 0; i < tail.length; i++) {
        if (tail[i][1] === "<=") { result = (head <= tail[i][3]); }
        if (tail[i][1] === ">=") { result = (head >= tail[i][3]); }
        if (tail[i][1] === "<") { result = (head < tail[i][3]); }
		if (tail[i][1] === ">") { result = (head > tail[i][3]); }
		if (tail[i][1] === "!=") { result = (head != tail[i][3]); }
		if (tail[i][1] === "==" || tail[i][1] === "=") { result = (head == tail[i][3]); }
      }

	return result;
}

variable
    = s:word _ {
        var str = '';
        for (var i = 0; i < s.length; i++) {
           str = str + s[i];
        }
		str = str.toLowerCase();
        if(_this.grammar[str]){
            return _this.grammar[str];
        }else{
            return 0;
        }
    }

word
    = firstLetter:letter rest:alNum* { 
        var str = firstLetter;
        for (var i = 0; i < rest.length; i++) {
           str = str + rest[i];
        }
        
        return str;
      }
alNum
    = [a-zA-Z0-9_]
letter
    = [a-zA-Z]
Integer "integer"
    = [0-9]+ { return parseInt(text(), 10); }
Float "float"
    = left:[0-9]+ "." right:[0-9]+ { return parseFloat(left.join("") + "." +   right.join("")); }
FloatFR "floatFR"
    = left:[0-9]+ "," right:[0-9]+ { return parseFloat(left.join("") + "." +   right.join("")); }

_ "whitespace" = [ \t]*
/***********************************************************************
_ "whitespace" = [ \t\r\n]*
_ "whitespace" = ( ([ \t])* \n\r ([ \t])* ) /  ( ([ \t])* \n ([ \t])* )
***********************************************************************/
whitespace "whitespace"
    = _
	`;

	return grammar;
}
