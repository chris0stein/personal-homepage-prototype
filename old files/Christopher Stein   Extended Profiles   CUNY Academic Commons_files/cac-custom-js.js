jQuery(document).ready( function($) {

	// unregister then reregister click events for nav tabs
	// this is to prevent the Create Group button from firing ajax
	$('div.item-list-tabs').unbind( 'click' );
	$('div.item-list-tabs').click( function(event) {
		var targetElem = ( event.target.nodeName == 'SPAN' ) ? event.target.parentNode : event.target;

		if ( $(targetElem).hasClass( 'button' ) || $(targetElem).closest( '.button' ).length ) {
			return;
		}

		if ( $(this).hasClass('no-ajax') )
			return;

		var target = $( targetElem ).parent();
		if ( 'LI' == target[0].nodeName && !target.hasClass('last') ) {
			var css_id = target.attr('id').split( '-' );
			var object = css_id[0];

			if ( 'activity' == object )
				return false;

			var scope = css_id[1];
			var filter = $("#" + object + "-order-select select").val();
			var search_terms = $("#" + object + "_search").val();

			bp_filter_request( object, filter, scope, 'div.' + object, search_terms, 1, $.cookie('bp-' + object + '-extras') );

			return false;
		}
	});

	// prefill the New Folder field on BP Group Documents
	$('input.bp-group-documents-new-folder').attr( 'placeholder','New Folder...').val('').css('color','#999').focus(function(){
		$(this).val('').css('color','inherit');
	});

	// Confirmation of file deletion
	$('#bp-group-documents a.delete-file').on( 'click', function(){
		var $clicked = $( this );
		var $dconfirm = $clicked.closest( 'td' ).find( '.delete-confirm' );
		var answer = $dconfirm.dialog( {
			buttons: {
				'Delete': function() {
					var delete_url = $clicked.attr( 'href' );
					if ( $dconfirm.find( '.bp-group-documents-silent-delete' ).is(':checked') ) {
						delete_url += '&silent=1';
					}
					window.location = delete_url;
					$( this ).dialog( 'destroy' );
				},
				Cancel: function() {
					$( this ).dialog( 'destroy' );
				}
			}
		} );
		return false;
	});

	/* Group Document Replace */
	$( '#bp-group-documents a.replace-file' ).on( 'click', function() {
		var $clicked_document = $(this).closest( 'tr' );

		// Display Name
		$( '#bp-group-documents-name' ).val( $clicked_document.find( 'a.group-documents-title' ).data( 'document-title' ) );

		// Description
		$( '#bp-group-documents-description' ).html( $clicked_document.find( 'p.description' ).html() );

		// Replace Exsting File gloss
		$( '#bp-group-documents-replace-existing-file-name' ).html( $clicked_document.find( 'a.group-documents-title' ).data( 'document-title' ) );

		// Hidden ID
		$( 'input[name="bp_group_documents_id"]' ).val( $( this ).data( 'document-id' ) );
		$( '#bp-group-documents-replace-existing-file' ).val( $( this ).data( 'document-id' ) );
		$( 'input[name="bp_group_documents_operation"]' ).val( 'edit' );

		$( '#bp-group-documents-replace-existing-file-wrapper' ).fadeIn();
		$( '#bp-group-documents-upload-button' ).trigger( 'click' );
		return false;
	} );

	$( '#bp-group-documents-upload-cancel' ).on( 'click', function() {
		$( '#bp-group-documents-name' ).val( '' );
		$( '#bp-group-documents-description' ).val( '' );
		$( 'input[name="bp_group_documents_id"]' ).val( '' );
		$( '#bp-group-documents-replace-existing-file' ).val( '' );
		$( 'input[name="bp_group_documents_operation"]' ).val( 'add' );
		$( '#bp-group-documents-replace-existing-file-wrapper' ).fadeOut();
		$( '#bp-group-documents-upload-new' ).slideUp( 500, function() {
			$( '#bp-group-documents-upload-button' ).show().css( 'display', 'inline' );
		} );
		return false;
	} );

	/* Mod bp-groupblog stuff */
	var gbdivs = [ 'blog-details-fields', 'groupblog-blog-privacy', 'groupblog-member-options' ];
	var gbtoggle = $('#groupblog-enable-blog');

	if(!$(gbtoggle).is(':checked')) {
		$.each(gbdivs, function(index,value){
			$('#group-create-body #' + value).slideUp();
		});
	}

	$(gbtoggle).bind('click',function(){
		var gbon = $(this).is(':checked');
		$.each(gbdivs, function(index,value){
			if ( gbon ) {
				$('#group-create-body #' + value).slideDown();
			} else {
				$('#group-create-body #' + value).slideUp();
			}
		});

	});

	$('span.highlight span').click( function() {
		if ( !$('div.help').length ) {
			$(this).parent().after( '<div id="message" class="info help"><p>' + CAC_Strings.mention_explain + '</p></div>' );
			$('div.help').hide().slideDown(200);
		} else {
			$('div.help').hide().remove();
		}
	});

	/* long group blog name warning */
	$('#blogname').css('margin-top', '10px'); // put a little space between the inputs

	// check the length of the blog name
	check_blog_name();

	// add an event listener to keep checking the length of the blog name
	$('#blogname').keyup(function(){
		check_blog_name();
	});

},(jQuery));

/**
 * This function checks the value of the group blog name input field to see if it's too long
 */
function check_blog_name() {
	$blogNameInput = jQuery('#blogname');
	blogName = $blogNameInput.val();

	// if a group blog already exists a hidden blog name input still exists on the page
	// so we'll bail here if that's the case
	if ($blogNameInput.attr('type') == 'hidden') { return false; }

	// subdomains cannot be longer than 63 characters so we need to enforce that
	if (blogName && blogName.length > 63) {

		// remove any existing warning
		jQuery('#blog-name-warning').remove();

		// alert the user tha their subdomain is too long
		$blogNameInput.css('borderColor', 'red')
									.next()
									.after('<p>This blog name is over 63 characters. This is not allowed, choose something a bit shorter.</p>')
									.next('p')
									.attr('id', 'blog-name-warning')
									.css('color', 'red');

		// hide the next button
		jQuery('#group-creation-next').hide()

		// else, check if the blog's subdomain is over 15 characters
	} else if (blogName && blogName.length >= 15) {

		// remove any existing warning
		jQuery('#blog-name-warning').remove();

		// alert the user that their subdomain should probably be shortened
		$blogNameInput.css('borderColor', 'red')
									.next()
									.after('<p>This blog name is over 15 characters. For a URL that is more memorable and easier to type, consider something a bit shorter.</p>')
									.next('p')
									.attr('id', 'blog-name-warning')
									.css('color', 'red');

		// show the next button
		jQuery('#group-creation-next').show()

	} else {
		//reset inputs
		jQuery('#blog-name-warning').remove();
		$blogNameInput.css('borderColor', '#eee');
		jQuery('#group-creation-next').show();
	}

	/* @mention Compose Scrolling */
	if ( jQuery.query.get('r') && jQuery('textarea#whats-new').length ) {
		jq.scrollTo( jq('textarea#whats-new'), 500, {
			offset:-325,
			easing:'easeOutQuad'
		} );
	}
}
