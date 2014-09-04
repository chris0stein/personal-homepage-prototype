
//$( ".item-list .item" ).accordion();
hideCards();
$("#commons-information").show();

$("#everything").click(function(e){
  e.preventDefault();
  selectFilter("everything");
  $('#my-activity p').text("what's happening related to you");
  $(".side-nav li a").removeClass('selected');
  $(this).addClass('selected');
  hideCards();
  $("#commons-information").show();
})
$("#groups").click(function(e){
  e.preventDefault();
  selectFilter("groups");
  $('#my-activity p').text("what's happening with your groups");
  $(".side-nav li a").removeClass('selected');
  $(this).addClass('selected');
  hideCards();
  $("#active-groups").show();
})
$("#sites").click(function(e){
  e.preventDefault();
  selectFilter("blogs");
  $('#my-activity p').text("what's happening with your sites");
  $(".side-nav li a").removeClass('selected');
  $(this).addClass('selected');
  hideCards();
  $("#following").show();
})
$("#friends").click(function(e){
  e.preventDefault();
  selectFilter("friends");
  $('#my-activity p').text("what's happening with your friends");
  $(".side-nav li a").removeClass('selected');
  $(this).addClass('selected');
  hideCards();
  $("#whos-online").show();
})

function hideCards(){
  $("#commons-information, #following, #active-groups, #whos-online").hide();
}

function selectFilter(filterOn){
  switch(filterOn) {
      case "groups":
          filterActivity("groups");console.log('groups');
          $('#my-activity h2').text("My Group Activity");
          $('.relatedContent').slideUp();
          $('#relatedGroups').slideDown('400');
          break;
      case "blogs":
          filterActivity("blogs");console.log('blogs');
          $('#my-activity h2').text("My Blogs Activity");
          $('.relatedContent').slideUp();
          $('#relatedBlogs').slideDown('400');
          break;
      case "friends":
          filterMultipleActivity(["friends", "profile", "xprofile"]);console.log('friends');
          $('#my-activity h2').text("My Friends Activity");
          $('.relatedContent').slideUp();
          $('#relatedFriends').slideDown('400');
          break;
      case "personal":
          filterActivity("personal");console.log('personal');
          $('#my-activity h2').text("My Personal Activity");
          break;
      default:
          $('#my-activity h2').text("My Activity");
          showAll();console.log('all');
          $('.relatedContent').slideUp();
  }
}



$( "#activity-filter select" )
  .change(function() {
    var str = "";
    str = $('#activity-filter select option').filter(":selected").val();
    console.log('str', str);

    switch(str) {
	    case "groups":
	        filterActivity("groups");console.log('groups');
	        $('#my-activity h2').text("My Group Activity");
	        $('.relatedContent').slideUp();
	        $('#relatedGroups').slideDown('400');
	        break;
	    case "blogs":
	        filterActivity("blogs");console.log('blogs');
	        $('#my-activity h2').text("My Blogs Activity");
	        $('.relatedContent').slideUp();
	        $('#relatedBlogs').slideDown('400');
	        break;
	    case "friends":
	        filterMultipleActivity(["friends", "profile", "xprofile"]);console.log('friends');
	        $('#my-activity h2').text("My Friends Activity");
	        $('.relatedContent').slideUp();
	        $('#relatedFriends').slideDown('400');
	        break;
	    case "personal":
	        filterActivity("personal");console.log('personal');
	        $('#my-activity h2').text("My Personal Activity");
	        break;
	    default:
	        $('#my-activity h2').text("My Activity");
	        showAll();console.log('all');
	        $('.relatedContent').slideUp();
	}

  });
  //.trigger( "change" );

//multiple classes $( "div, span, p.myClass" ).
//$( "li" ).not( ":even" )

//this function gets parameter of what to look for and also uses if statement to now reshow something already visible or hidden
function filterActivity(className){
  $('#activity-stream li').each(function(){
    //check to see if has the class we're looking for
    if($(this).hasClass(className)){
      //now show if it is not visible
      if($(this).is(':visible')==false){
        //show
        $(this).slideDown('400', function() {

        });
        // $(this).show("scale",{percent:100},500,callback);
      }
    }else{
      //doesn't have the class so hide if it is visible
      if($(this).is(':visible')){
        //hide
        $(this).slideUp(400);
        // $(this).hide("scale",{percent:0},500,callback);
      }
    }
  });//end each
}//end filterActivity


function filterMultipleActivity(classes){
  $('#activity-stream li').each(function(){
  	var isFiltered = false;
  	for (var i in classes) {
        if ($(this).hasClass(classes[i]))
            isFiltered = true;
    }
    //check to see if has the class we're looking for
    if(isFiltered){
      //now show if it is not visible
      if($(this).is(':visible')==false){
        //show
        $(this).slideDown('400', function() {

        });
        // $(this).show("scale",{percent:100},500,callback);
      }
    }else{
      //doesn't have the class so hide if it is visible
      if($(this).is(':visible')){
        //hide
        $(this).slideUp(400);
        // $(this).hide("scale",{percent:0},500,callback);
      }
    }
  });//end each
}//end filterMultipleActivity

function showAll (e) {
	console.log('showing all');
	$('#activity-stream li').each(function(index){
      //$(this).fadeIn();
      //$(this).show("scale",{percent:100},500,callback);
	  if($(this).is(':visible')){
      	//nothing for now
      }else{
      	$(this).slideDown(400);
      }
	});//end each
}
