// Initialize your app
var myApp = new Framework7({
    animateNavBackIcon: true,
    // Enable templates auto precompilation
    precompileTemplates: true,
    // Enabled pages rendering using Template7
	swipeBackPage: false,
	swipeBackPageThreshold: 1,
	swipePanel: "left",
	swipePanelCloseOpposite: true,
	pushState: true,
	pushStateRoot: undefined,
	pushStateNoAnimation: false,
	pushStateSeparator: '#!/',
    template7Pages: true
});


// Export selectors engine
var $$ = Dom7;

// Add main View
var mainView = myApp.addView('.view-main', {
    // Enable dynamic Navbar
    dynamicNavbar: false
});



$(document).on('pageInit', function (e) {
	
	
	
	/*$('.page-content').load('offerslides.php', function() {*/
	$(".swipebox").swipebox();
	/*});*/
	
			
	$('#mainpage').click (function(){
	
	//alert("click");
	window.location.replace('main.html');
	});
	
	$('#showstat').load('stat.html', function() {
		//alert("done");
		$('#fromdate, #todate').datepicker({
		changeMonth: true,
		});
		var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/statementapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												//$("#liststatement").html("laded");
							//$('#liststatement').html(''+
											var tran = "";
											var result = "";
												 $.each(msg.Result_data, function(key,value)
                            {
                                //if(key != "View"){
                                
								tran ='<h3>Date: '+value.Transaction_date+'</h3><h3>Transaction Type: '+value.Transaction_type_name+'</h3><h3>Description:'+value.Description+'</h3><h3>Transaction Amount: '+value.Transaction_amount+'</h3><h3>Points Gained: '+value.Loyalty_points+'</h3><h3>Bonus Points: '+value.Bonus_points+'</h3><h3>Points Redeemed: '+value.Total_redeem_points+'</h3><h3>Points Tranfered: '+value.Transfer_points+'</h3><hr>'	
								//}
							result = result + tran; 	
							});
							
							$('#liststatement').html(result);					
												
												}
												else {
													$("#liststatement").html("No record found");
												}
											}
											}
		});
	});
		//alert("done");
	//});
//$('#showauction').on('click','.bidbtn', function() {
$('#showstat').on('click', '#btnstatement', function () {
	//alert("click")
	var fromdate = $('#fromdate').val();
	var todate = $('#todate').val();
	
	if (fromdate =="") {
		alert("Enter From Date");
		return false;
	}
	else if (todate == ""){
		alert("Enter To Date")
		return false;
	}
	else if (Date.parse(todate) <= Date.parse(fromdate)) {
		alert("From Date should be lower than To date");
		return false;
	}
	else{
		var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/statementapi.php",
											data: {memberid:memberid, fromdate:fromdate, todate:todate},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												//$("#liststatement").html("laded");
							//$('#liststatement').html(''+
											var tran = "";
											var result = "";
												 $.each(msg.Result_data, function(key,value)
                            {
                               // if(key != "status"){
                                
								tran ='<h3>Date: '+value.Transaction_date+'</h3><h3>Transaction Type: '+value.Transaction_type_name+'</h3><h3>Description:'+value.Description+'</h3><h3>Transaction Amount: '+value.Transaction_amount+'</h3><h3>Points Gained: '+value.Loyalty_points+'</h3><h3>Bonus Points: '+value.Bonus_points+'</h3><h3>Points Redeemed: '+value.Total_redeem_points+'</h3><h3>Points Tranfered: '+value.Transfer_points+'</h3><hr>'	
								//}
							result = result + tran; 
							tran = "";	
							});
							
							$('#liststatement').html(result);					
												
												}
												else {
													$("#liststatement").html("No record found");
												}
											}
											}
		});
	return false;
	}
});

$('#showsurvey').load('blank.html', function() {
	//alert("survey");
	
	var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/listsurveyapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												
											var tran = "";
											var result ="";
												 $.each(msg.Survey_details, function(key,value)
                            {
                               // if(key != "status"){
                                
								tran ='<h3 id="'+value.Survey_id+'" class="survey_name">'+value.Survey_name+'</h3><hr>'	;
								//}
							result = result + tran; 
							tran ="";	
							});
							//alert(tran);
							$('#showsurvey').html(result);					
												
												}
												else {
													$("#showsurvey").html("No record found");
												}
											}
											}
		});
});

$('#showsurvey').on('click','.survey_name', function() {
	var surveyid = $(this).attr('id');
	alert(surveyid);
	var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/listsuquestionsapi.php",
											data: {memberid:memberid, surveyid:surveyid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												
											var tran = "";
											var result ='<h2>No of Questions: <div id="quesno">'+msg.Result_count+'</div> Survey id <div id="suid">'+msg.Survey_id+'</div></h2>';
												 $.each(msg.Question_details, function(key,value)
                            {
                                //if(key != "status" && key != "Survey_id" && key != "Result_count"){
                                
								tran ='<h3 class="question_name">'+value.Question+'</h3>'	;
									var r1 = "";
									var t1 ="";
									if (value.Response_type == 1 ) {
									$.each(value.Value_id, function(key1,value1){
										t1 ='<input type="radio" class="ansid" value="'+key1+'" name="'+value.Question_id+'">'+value1+'';
									r1= r1 + t1;
									t1 ="";
									});
									
									}
									
									else {
									r1 = '<textarea class="ansid" name="'+value.Question_id+'"></textarea>';	
									}
								tran = tran + r1;
								//}
							result = result + tran; 
							tran ="";	
							});
							//alert(tran);
							var subtn = '<input type="submit" name="submit" id="btnsubmitsu" class="form_submit surveybtn" value="Submit" />';
							result = result + subtn;
							$('#showsurvey').html(result);					
												
												}
												else {
													$("#showsurvey").html(msg.status);
												}
											}
											}
		});
	
});

$('#showsurvey').on('click','#btnsubmitsu', function() {
	
var quescount = $("#showsurvey #quesno").html();
var surveyid = $("#showsurvey #suid").html();
var memberid = localStorage.getItem('memberid').trim();
//alert(quescount);
var suans = {};
$("#showsurvey input[type='radio'][class=ansid]:checked").each(function() {
//selected.push($(this).val());
suans[$(this).attr('name')] =$(this).val(); 
});

$("#showsurvey textarea[class=ansid]").each(function() {
//selected.push($(this).val());
var blankcheck = $(this).val();
if (blankcheck != "") {
suans[$(this).attr('name')] =$(this).val(); 
}
});

alert(JSON.stringify(suans));
surveyresponse = JSON.stringify(suans);

objlenght = Object.keys(suans).length;
//alert(Object.keys(suans).length);	

$.ajax({
			type:"POST",
			url:"http://rewardsboxnigeria.com/perx/api/submitsurveyapi.php",
			data:{memberid:memberid, surveyresponse:surveyresponse, surveyid:surveyid},
			dataType:"json",
			success: function(msg){
				
				if (msg == false) {
											alert("There was an error submitting the form. Please try again.");
											} else {
												//alert("focus out one");
												if (msg.status ==1001){
													alert("Survey Sumited sucessfully");
												} 
												else if (msg.status ==2021) {
													alert("Kindly answer all the questions");	
												}
												
												else {
													alert(msg.status);
													
												}
												
											}
			}
			
});
});
$('#showauction').load('blank.html', function() {
	//$('#showbid').ready(function(e) {
        var memberid = localStorage.getItem('memberid').trim();
//alert("loading");
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/listauctionapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												//	alert("load");
			
			
			
			var Highest_bid_text = "";
			var result ="";
			var tran =""
                            $.each(msg.Auction_details, function(key,value)
                            {
                                //if(key != "status")
                               // {
                                    if(value.Highest_bid_flag == 1)
                                    {
                                        Highest_bid_text = "You Currently the Highest Bidder";
                                    }
                                    if(value.Highest_bid_flag == 2)
                                    {
                                        Highest_bid_text = "You are no longer the Highest Bidder. Bid again.";
                                    }
                                    
                                    if(value.Highest_bid_flag == 0)
                                    {
                                        Highest_bid_text = "Not Bidded for Auction. Bid now to become first bidder.";
                                    }
                                    
                                    tran='<div class="auction-item"><div class="bid-pic"><img src="'+value.Prize_image+'"/></div><div class="bid-item-desc"><h3>'+value.Auction_name+'</h3><p class="bid-timer">End Date:'+value.End_date +' '+ value.End_time +'  </p></div><div class="col-lg-4"><h4 class="winner-note">'+Highest_bid_text+'</h4><p>Minimum Amount To Bid</p><h3 id="'+value.Auction_id+'" class="minbid">'+ (+value.Min_bid_value + +value.Min_increment) +'</h3><input type="text" id="'+value.Auction_id+'" class="form_input"/><br/><input type="submit" name="submit" class="form_submit bidbtn" id="'+value.Auction_id+'" value="BID" /></div></div>';
							result = result + tran; 
							tran ="";	
                                //}										
							});
							$('#showauction').html(result);
		
												}
												
												else if(msg.status ==2001){
													alert("Unabele to locate company");
												}
												else if(msg.status ==2002){
													alert("Invalid acces credentials");
												}
												else if(msg.status ==2003){
													alert("Unable to locate account");
												}
												else if(msg.status ==2004){
													alert("Account Disabled");
												}
												else if(msg.status ==2006){
													alert("No id passed");
												}
												else if(msg.status ==2012){
													alert("No auction Found");
												}
												
												else {
												alert(msg.status);
																								}													
											}
															
											}
										});
		
		//return false;
    });
	
	
$('#showauction').on('click','.bidbtn', function() {
	var auctionid = $(this).attr('id');
	var memberid = localStorage.getItem('memberid').trim();
	var minbid = parseInt($('#' + auctionid+'.minbid').html());
	var auctionval = $('#' + auctionid+'.form_input').val();
		
	if (auctionval =="") {
	alert("Kindly enter amount to bid");
	return false;	
	}
	else if (!$.isNumeric(auctionval)){
	alert("Kindly enter a numberic value to bid");
	return false;	
	}
	else if (auctionval < minbid) {
		alert("Kindly enter a value greater or equal to the Minimum Bid")
	return false;
	}

	else{
	//alert(auctionval);	
	$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/auctionbidapi.php",
											data: {memberid:memberid, auctionval:auctionval, auctionid:auctionid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												
												if (msg.status == 1001){
													alert("bid sucessfully placed");
							//Beginning load auction						
											$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/listauctionapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
													//alert("load");
			
			
			
			var Highest_bid_text = "";
			var tran="";
			var result="";
                            $.each(msg.Auction_details, function(key,value)
                            {
                               // if(key != "status")
                                //{
                                    if(value.Highest_bid_flag == 1)
                                    {
                                        Highest_bid_text = "You Currently the Highest Bidder";
                                    }
                                    if(value.Highest_bid_flag == 2)
                                    {
                                        Highest_bid_text = "You are no longer the Highest Bidder. Bid again.";
                                    }
                                    
                                    if(value.Highest_bid_flag == 0)
                                    {
                                        Highest_bid_text = "Not Bidded for Auction. Bid now to become first bidder.";
                                    }
                                    
                                    tran='<div class="auction-item"><div class="bid-pic"><img src="'+value.Prize_image+'"/></div><div class="bid-item-desc"><h3>'+value.Auction_name+'</h3><p class="bid-timer">End Date:'+value.End_date +' '+ value.End_time +'  </p></div><div class="col-lg-4"><h4 class="winner-note">'+Highest_bid_text+'</h4><p>Minimum Amount To Bid</p><h3 id="'+value.Auction_id+'" class="minbid">'+ (+value.Min_bid_value + +value.Min_increment) +'</h3><input type="text" id="'+value.Auction_id+'" class="form_input"/><br/><input type="submit" name="submit" class="form_submit bidbtn" id="'+value.Auction_id+'" value="BID" /></div></div>';
							result = result + tran; 
							tran ="";	
                             //   }										
							});
							$('#showauction').html(result);
		
												}
												
												else if(msg.status ==2001){
													alert("Unabele to locate company");
												}
												else if(msg.status ==2002){
													alert("Invalid acces credentials");
												}
												else if(msg.status ==2003){
													alert("Unable to locate account");
												}
												else if(msg.status ==2004){
													alert("Account Disabled");
												}
												else if(msg.status ==2006){
													alert("No id passed");
												}
												else if(msg.status ==2012){
													alert("No auction Found");
												}
												
												else {
												alert(msg.status);
																								}													
											}
															
											}
										});
		
//end of load auction again													
													
													
													
												}
												else if(msg.status ==2015){
													alert("Unabele to identify auction");
												}
												else if(msg.status ==2012){
													alert("Auction Not found");
												}
													else if(msg.status ==2013){
													alert("Bid value should be greater than minimum amount to build");
												}
													else if(msg.status ==2014){
													alert("Insuffecient Balance to lace bid");
												}
													else {
														alert(msg.status);
													}
											}
											}
											});
	}
return false
});



$('#showtransfer').on('focusout','#transferto', function() {
	//alert("focus out");
	var memberid = localStorage.getItem('memberid').trim();
	var transferto = $("#transferto").val();
	
	if (transferto == "")
	{
		alert("Enter Membership ID to tranfer to");
		return false;
	}
	else {
		
		$.ajax({
			type:"POST",
			url:"http://rewardsboxnigeria.com/perx/api/showtransferapi.php",
			data:{memberid:memberid, transferto:transferto},
			dataType:"json",
			success: function(msg){
				
				if (msg == false) {
											alert("There was an error submitting the form. Please try again.");
											} else {
												//alert("focus out one");
												if (msg.status ==2016){
												alert("Enter Membership ID of Account to Transfer");
												$("#transferto").focus();
												}
												else if (msg.status ==2017){
												alert("Membership id is Invalid");
												$("#transferto").focus();
												}
												else if (msg.status ==1001){
													$("#transferto").attr('readonly', true);
													$("#points").focus();
													
													$('#showtdetails').html('<h3>Name: '+msg.First_name+' '+msg.Last_name+'</h3> <h3>Phone no: '+msg.Phone_no+'</h3>');
												}
												else {
												alert(msg.status);	
												}
												
												}
												
												
											}
			
		});
	return false;
	}

});

$('#showtransfer').on('click','#btntransfer', function() {
	//alert("clicked");
	var memberid = localStorage.getItem('memberid').trim();
	var transferto = $("#transferto").val();
	var points = $("#points").val();
	var mempin = $("#mempin").val()
	
	if (transferto == "")
	{
		alert("Enter Membership ID to tranfer to");
		return false;
	}
	
	else if (points == ""){
		alert("Enter amount of points to transfer");
		return false;
	}
	else if (mempin == ""){
		alert("Enter member pin");
		return false;
	}
	else {
		
		$.ajax({
			type:"POST",
			url:"http://rewardsboxnigeria.com/perx/api/transferapi.php",
			data:{memberid:memberid, transferto:transferto, points:points, mempin:mempin},
			dataType:"json",
			success: function(msg){
				
				if (msg == false) {
											alert("There was an error submitting the form. Please try again.");
											} else {
												//alert("focus out one");
												if (msg.status ==2016){
												alert("Enter Membership ID of Account to Transfer");
												$("#points").focus();
												}
												else if (msg.status ==2017){
												alert("Membership id is Invalid");
												$("#points").focus();
												}
												
												else if (msg.status ==2014){
												alert("You do not have enough points to make tranfer " +points);
												$("#points").focus();
												}
												else if (msg.status ==2018){
												alert("Kindly enter valid number of points");
												$("#points").focus();
												}
												else if (msg.status ==1001){
													alert("Points tranfered sucessfully."); 
													$("#transferto").val('');
													$("#points").val('');
													$("#mempin").val('');
													$('#showtdetails').html('');
													$('#currentbal').html(msg.Current_balance);
													
													
												}
												else {
												alert(msg.status);	
												}
												
												}
												
												
											}
			
		});
	return false;
	}

});

$('#shownotify').load('blank.html', function() {
	
	var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(){
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("show");
    }
}
	//alert("survey");
	
	var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/notifyapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												if (msg.status ==1001){
												
											var tran = "";
											var result ="";
												 $.each(msg.Notification_details, function(key,value)
                            {
                             //   if(key != "status"){
                                
								tran ='<div id="'+value.User_notification_id+'" class="linenotify"><input value="'+value.User_notification_id+'" type ="checkbox" class ="notificationid"/><button class ="accordion" id="'+value.User_notification_id+'"><i>'+value.Creation_date+'</i><b class="not-topic">'+value.Transaction_type_name+'</b></button><div class="not-panel">'+value.Contents+'</div><br/></div>'	;
								//}
							result = result + tran; 
							tran ="";	
							});
							//alert(tran);
							$('#shownotify').html(result);					
								var acc = document.getElementsByClassName("accordion");
								var i;
								
								for (i = 0; i < acc.length; i++) {
									acc[i].onclick = function(){
										this.classList.toggle("active");
										this.nextElementSibling.classList.toggle("show");
									}
								}					
												}
												else {
													$("#shownotify").html("No record found");
												}
											}
											}
		});
});

$('.page_title').on('click','#delnotify', function() {
	var memberid = localStorage.getItem('memberid').trim();
	var noteid = new Array();
$("#shownotify input:checkbox[class=notificationid]:checked").each(function() {
noteid.push($(this).val());
});

if (noteid ==""){
	alert("Select a Notification to delete");
} else{
	//alert(noteid);
	//alert(JSON.stringify(noteid));
	
	var memberid = localStorage.getItem('memberid').trim();
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/delnotifyapi.php",
											data: {memberid:memberid, noteid:noteid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												
	 $.each(noteid, function(key,value)
                            {
							//alert(value);
							$('#'+value+'.linenotify').remove();	
							});
							
											}
											}
											});
}
});


$('.promo').on('click','#btnpromo', function() {
	//alert("clicked");
	var memberid = localStorage.getItem('memberid').trim();
	var promocode = $("#promocode").val();
	
	
	if (promocode == "")
	{
		alert("Enter Promo Code");
		return false;
	}
	
	else {
		
		$.ajax({
			type:"POST",
			url:"http://rewardsboxnigeria.com/perx/api/promoapi.php",
			data:{memberid:memberid, promocode:promocode},
			dataType:"json",
			success: function(msg){
				
				if (msg == false) {
											alert("There was an error submitting the form. Please try again.");
											} else {
												//alert("focus out one");
												if (msg.status ==2028){
												alert("Promo Code already used");
												$("#promocode").focus();
												}
												else if (msg.status ==2023){
												alert("Invalid Promo Code");
												$("#promocode").focus();
												}
												
												else if (msg.status ==2024){
												alert("You have entered an invalid code 3 times");
												$("#promocode").focus();
												}
												
												else if (msg.status ==1001){
													alert("Promo Code sucessful you just gained " +msg.Promo_points+" Points"); 
													$("#promocode").val('');
													$("#promocode").focus();
													
													
													
												}
												else {
												alert(msg.status);	
												}
												
												}
												
												
											}
			
		});
	return false;
	}

});


$('#showcatalogue').load('blank.html', function() {

var memberid = localStorage.getItem('memberid').trim();
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/catalogueapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
											if (msg.status ==1001){
												//alert(msg.Total_items_incart);
												$('#mycartcount').html(msg.Total_items_incart);
												var tran = "";
											var result ="";
												 $.each(msg.Catalogue_details, function(key,value)
                            {
                                //if(key != "status" && key != "Current_balance" && key != "Total_Redeem_points_incart" && key != "Total_items_incart"){
                                
								tran ='<div class="catalogue-item"><div class="catalogue-pic"><img src="'+value.Item_image+'" class="catalogue-item-pic"/></div><div class="catalogue-item-desc"><h3 class="catalogue-item-name">'+value.Merchandize_item_name+'</h3><h3 class="catalogue-price">'+value.Billing_price_in_points+'</h3><div class="delivery-mode">';

									var t2 ="";
									if (value.Delivery_method == 1 ) {
									t2 ='<input type="radio" class="rd-redeem" value="1" name="'+value.Merchandize_item_code+'" id="'+value.Merchandize_item_code+'">Collect in Store</div>';
									var r1 = '<div id="'+value.Merchandize_item_code+'" class="hidedropdown" style="display: none;"><p class="lbl-location">Select Location:</p><select class="drp-delivery-location" id="'+value.Merchandize_item_code+'">';
									var t1 ="";
									$.each(value.Branch_details, function(key1,value1){
									t1 ='<option value ="'+value1.Branch_code+'">'+value1.Branch_name+'</option> ';
									r1= r1 + t1;
									t1 ="";
									});
									r1 = r1 + '</select></div>';
									t2 = t2 + r1;
									}
									
									else if (value.Delivery_method == 3 ) {

t2 ='<input type="radio" class="rd-redeem" value="1" name="'+value.Merchandize_item_code+'" id="'+value.Merchandize_item_code+'">Collect in Store<input type="radio" class="rd-redeem" value="2" name="'+value.Merchandize_item_code+'">Delivery</div>';
									var r1 = '<div id="'+value.Merchandize_item_code+'" class="hidedropdown" style="display: none;"> <p class="lbl-location">Select Location:</p><select class="drp-delivery-location">';
									var t1 ="";
									$.each(value.Branch_details, function(key1,value1){
										t1 ='<option value ="'+value1.Branch_code+'">'+value1.Branch_name+'</option>';
									r1= r1 + t1;
									t1 ="";
									});
									r1 = r1 + '</select></div>';
									t2 = t2 + r1;
									}
									else {
									t2 ='<input type="radio" class="rd-redeem" value="2" name="'+value.Merchandize_item_code+'">Delivery</div>';	
									}

								tran = tran + t2;
								
							var endbtn = '<div class="col-lg-4"><input type="submit" name="submit" class="form_submit btn-add2cart"  value="Add To Cart" id="'+value.Merchandize_item_code+'"/></div></div></div>';
							result = result + tran + endbtn; 
							tran ="";
							endbtn ="";	
								//}
							});
							//alert(tran);
							$('#showcatalogue').html(result);		
											}
											else {
												alert(msg.status);
											
											}
											}
											}
		});


});

$('#showcatalogue').on('click','.rd-redeem', function() {
	var deliveryid = $(this).attr('name');
	
	if($("#showcatalogue input[type='radio'][name='"+deliveryid+"']:checked") ){
	if($(this).val() == 1){
	//alert(deliveryid);
	
	$('#' +deliveryid+'.hidedropdown').show();
	} else {
		$('#' +deliveryid+'.hidedropdown').hide();
	}
	
	}
	
});

$('#showcatalogue').on('click','.btn-add2cart', function() {
	var cartid = $(this).attr('id');
	//alert(cartid);
	var memberid = localStorage.getItem('memberid').trim();
	//var minbid = parseInt($('#' + auctionid+'.minbid').html());
	//var auctionval = $('#' + auctionid+'.form_input').val();
	var redmethod = $("#showcatalogue input[type='radio'][name='"+cartid+"']:checked").val();
	if (redmethod == 1) {
	var branch = $('#' + cartid+'.drp-delivery-location').val();
	} else {
	var branch ="";
	}
	
	if (redmethod ==null) {
	alert("Kindly select redemption option");
	return false;	
	}
	else if (redmethod == 1 && branch =="") {
	alert("Kindly select Branch");
	}
	
	
	//alert (redmethod);
	//alert(branch);
	
		

	else{
	if ($('#loading_image').length == 0) {	
		$('#mycartcount').before('<img src="images/loader.gif" style="display: none;" alt="loading" id="loading_image">');
		}
	$('#loading_image').show();     
    $('#mycartcount').hide();
	//alert(auctionval);	
	$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/add2cartapi.php",
											data: {memberid:memberid, redmethod:redmethod, cartid:cartid, branch:branch},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
												
												if (msg.status == 1001){
													$('#mycartcount').html(msg.Total_items_incart);
													$('#loading_image').hide();     
    												$('#mycartcount').show();
													
												} else {
												alert(msg.status+ ":Invalid Request ");	
												$('#loading_image').hide();     
    												$('#mycartcount').show();
												}
											}
											}
	});
	return false;
	}
});

$('#showcheckout').load('blank.html', function() {
$('#showcheckout').html('<div class="div-loading"><img src="images/loader.gif"/></div>');
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcountryapi.php",
											data: {},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select Country</option>';
												 $.each(msg1.Country_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.Country_id+'">'+value1.Country_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcountry').html(result1);
												}
											}
})
var memberid = localStorage.getItem('memberid').trim();
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/showcheckoutapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
											if (msg.status ==1001){
												//alert(msg.Total_items_incart);
												//$('#mycartcount').html(msg.Total_items_incart);
												var tran = "";
											var result ="";
												 $.each(msg.Cart_details, function(key,value)
                            {
							//if(key != "status" && key != "Total_points" && key != "Total_shipping_points" && key != "Grand_Total_Points" && key != "Cart_quantity" && key != "Current_address" && key != "Country_name" && key != "State_name" && key != "City_name" && key != "City_id" && key != "State_id" && key != "Country_id" && key != "Merchandize_item_array" && key != "Remark_item_count" && key != "Delivery_item_count")
                              //  {
								
								tran = '<div class="cart-item" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'"><img src="'+value.Item_image+'"" class="cart-item-pic"/><img src="images/delete.png" class="cart-item-delete" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'"/><div class="cart-item-info"><p>'+value.Merchandize_item_name+'</p><b class="cart-points">'+value.Total_Redeemable_points+'</b><br /><i>Shipping: <div class="shippoints" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'">'+value.Shipping_points+'</div></i><div class="div-change"><input type="text" placeholder="QTY" class="txtquantity" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'" value="'+value.Quantity+'"/><i class="btnchangeqty" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'">Change</i>';
							 var t1 = "";
							 if(value.Enable_remark == 1){
								t1='<div><input type="text" class="remarkfield" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'" placeholder="'+value.Remark_label+'" value="'+value.Remark+'"/><i class="btnaddremark" data-code="'+value.Company_merchandize_item_code+'" data-redeem="'+value.Delivery_Method+'" data-branch="'+value.Branch+'">Update</i></div>'; 
							 }
							 tran = tran + t1 + '</div></div></div>';
							 t1="";
							
							result = result + tran; 
							tran ="";
							//	}
							
							});
							$('#showcheckout').html(result);
							$('#totalpoints').val(msg.Status_array.Total_points);
							$('#totalshippingpoints').val(msg.Status_array.Total_shipping_points);
							$('#grandtotalpoints').val(msg.Status_array.Grand_Total_Points);
							$('#useraddress').html(msg.Status_array.Current_address);
							$('#sameaddress').attr('data-address',msg.Status_array.Current_address);
							$('#sameaddress').attr('data-country',msg.Status_array.Country_id);
							$('#sameaddress').attr('data-state',msg.Status_array.State_id);
							$('#sameaddress').attr('data-city',msg.Status_array.City_id);
											}
											else {
											alert(msg.status);	
											}
											}
											}
});
});
								
								
$('#showcheckout').on('click','.cart-item-delete', function() {
var itemcode = $(this).attr('data-code');
var redmethod = $(this).attr('data-redeem');
var branch = $(this).attr('data-branch');
var memberid = localStorage.getItem('memberid').trim();
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/removecheckoutapi.php",
											data: {memberid:memberid,itemcode:itemcode, redmethod:redmethod, branch:branch},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
											if (msg.status ==1001){
												alert("Item removed for cart");
												$("#showcheckout [class=cart-item][data-code='"+itemcode+"'][data-redeem='"+redmethod+"'][data-branch='"+branch+"']").remove();
												$('#totalpoints').val(msg.Total_points);
												$('#totalshippingpoints').val(msg.Total_shipping_points);
												$('#grandtotalpoints').val(msg.Grand_Total_Points);
											}
											else {
												alert(msg.status +' An error has occured');
											}
											}
											
											}
});
});

$('#showcheckout').on('click','.btnchangeqty', function() {
var itemcode = $(this).attr('data-code');
var redmethod = $(this).attr('data-redeem');
var branch = $(this).attr('data-branch');
var quantity = $("#showcheckout [class=txtquantity][data-code='"+itemcode+"'][data-redeem='"+redmethod+"'][data-branch='"+branch+"']").val();
var memberid = localStorage.getItem('memberid').trim();
//alert(quantity);
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/changeqtyapi.php",
											data: {memberid:memberid,itemcode:itemcode, redmethod:redmethod, branch:branch,quantity:quantity},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
											if (msg.status ==1001){
												alert("changed");
									
												$('#totalpoints').val(msg.Total_points);
												$('#totalshippingpoints').val(msg.Total_shipping_points);
												$('#grandtotalpoints').val(msg.Grand_Total_Points);
											}
											else {
												alert(msg.status +' An error has occured');
											}
											}
											
											}
});
});

$('#showcheckout').on('click','.btnaddremark', function() {
var itemcode = $(this).attr('data-code');
var redmethod = $(this).attr('data-redeem');
var branch = $(this).attr('data-branch');
var remark = $("#showcheckout [class=remarkfield][data-code='"+itemcode+"'][data-redeem='"+redmethod+"'][data-branch='"+branch+"']").val();
var memberid = localStorage.getItem('memberid').trim();
//alert(remark);
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/addremarkapi.php",
											data: {memberid:memberid,itemcode:itemcode, redmethod:redmethod, branch:branch,remark:remark},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													
											} else {
											if (msg.status ==1001){
												//alert("updated");
									$("#showcheckout [class=remarkfield][data-code='"+itemcode+"'][data-redeem='"+redmethod+"'][data-branch='"+branch+"']").val(msg.Remark);
												
											}
											else {
												alert(msg.status +' An error has occured');
											}
											}
											
											}
});
});

$('#showcountry').change (function() {
var countryid = $('#showcountry').val();
//alert(countryid);
if (countryid == ""){
	
	$('#showstate').html('<option value="">Select State</option>');
	$('#showcity').html('<option value="">Select City</option>');
}
else {

$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchstateapi.php",
											data: {countryid:countryid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select State</option>';
												 $.each(msg1.State_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.State_id+'">'+value1.State_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showstate').html(result1);
												}
											}
});

	
}

});


$('#showstate').change (function() {
var stateid = $('#showstate').val();
//alert(countryid);
if (stateid == ""){
	
	//$('#showstate').html('<option value="">Select State</option>');
	$('#showcity').html('<option value="">Select City</option>');
}
else {

$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcityapi.php",
											data: {stateid:stateid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select City</option>';
												 $.each(msg1.City_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.City_id+'">'+value1.City_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcity').html(result1);
												}
											}
});

	
}

});

$('#showcity.drp-city').change (function() {
var cityid = $('#showcity').val();
//alert(countryid);
if (cityid != ""){

var stateid = $('#showstate').val();
var countryid = $('#showcountry').val();
var memberid = localStorage.getItem('memberid').trim();
//alert(stateid);
//alert(countryid);

$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/calshippingapi.php",
											data: {stateid:stateid, countryid:countryid, memberid:memberid},
											dataType:"json",
											
											success: function(msg){
												if (msg.status ==1001){
													
												$('#totalpoints').val(msg.Total_points);
												$('#totalshippingpoints').val(msg.Total_shipping_points);
												$('#grandtotalpoints').val(msg.Grand_Total_Points);	
												 $.each(msg.Shipping_details, function(key,value)
                            {
										$("#showcheckout [class=shippoints][data-code='"+value.Item_code+"'][data-redeem='"+value.Delivery_method+"']").html(value.shipping_points);
										
										
							});
							alert(JSON.stringify(msg.Shipping_details));
												
							
												}
											}
});

	
}

});

$('#submitcheckout').click(function(){
var memberid = localStorage.getItem('memberid').trim();	
var address= $('#address').val();
var countryid= $('#showcountry').val();
var stateid= $('#showstate').val();
var cityid= $('#showcity').val();
var mempin=	$('#mempin').val();
//alert(address);
//alert(countryid);
//alert(stateid);
//alert(cityid);
if (address =="") {
	
	alert("Enter Shipping address");
} else if (countryid ==""){
	alert("Select Shipping Country");
	
} else if (stateid == "") {
	alert("Select Shipping State");
} else if (cityid =="") {
	alert("Select Shipping City");	
}
 else if (mempin =="") {
	alert("Enter your pin");	
}
else {

$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/submitcheckoutapi.php",
											data: {stateid:stateid, countryid:countryid, memberid:memberid,cityid:cityid,address:address, mempin:mempin},
											dataType:"json",
											
											success: function(msg){
												if (msg.status ==1001){
												alert("Order Sucessful\nCurrent Balance: "+msg.Current_balance+"\nShipping Address:"+msg.Shipping_Address);
												$('#currentbal').html(msg.Current_balance);
												}
												else if (msg.status ==2025) {
												alert("Invalid Pin");	
												}
											}
});
}

});


$('#sameaddress.chksameaddress').click (function() {
	
if ($('#sameaddress.chksameaddress').is(':checked')) {
//alert("checked");
var stateid = $('#sameaddress').attr('data-state');
var countryid = $('#sameaddress').attr('data-country');
var cityid = $('#sameaddress').attr('data-city');
var address = $('#sameaddress').attr('data-address');
var memberid = localStorage.getItem('memberid').trim();
//alert(stateid);
//alert(countryid);

$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/calshippingapi.php",
											data: {stateid:stateid, countryid:countryid, memberid:memberid},
											dataType:"json",
											
											success: function(msg){
												if (msg.status ==1001){
													
												$('#totalpoints').val(msg.Total_points);
												$('#totalshippingpoints').val(msg.Total_shipping_points);
												$('#grandtotalpoints').val(msg.Grand_Total_Points);	
												 $.each(msg.Shipping_details, function(key,value)
                            {
										$("#showcheckout [class=shippoints][data-code='"+value.Item_code+"'][data-redeem='"+value.Delivery_method+"']").html(value.shipping_points);
										
										
							});

												}//1001 calc shipping
																							}
});

													$('#address').val(address);
							$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcountryapi.php",
											data: {},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select Country</option>';
												 $.each(msg1.Country_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.Country_id+'">'+value1.Country_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcountry').html(result1);
							$('#showcountry').val(countryid);
												}
											}
})


$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchstateapi.php",
											data: {countryid:countryid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select State</option>';
												 $.each(msg1.State_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.State_id+'">'+value1.State_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showstate').html(result1);
							$('#showstate').val(stateid);
												}
											}
});


$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcityapi.php",
											data: {stateid:stateid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select City</option>';
												 $.each(msg1.City_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.City_id+'">'+value1.City_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcity').html(result1);
							$('#showcity').val(cityid);
												}
											}
});					
											
											
											


}else {
//alert("unchecked");	
}
});

$('#showprofile').load('blank.html', function() {

var memberid = localStorage.getItem('memberid').trim();
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/profileapi.php",
											data: {memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											
											if (msg.status ==1001){
												$('#firstname').val(msg.First_name);
												$('#middlename').val(msg.Middle_name);
												$('#lastname').val(msg.Last_name);
												$('#currentaddress').val(msg.Current_address);
												$('#phoneno').val(msg.Phone_no);
												$('#email').val(msg.User_email_id);
												$('#currentbal').val(msg.Current_balance);
												//$('#dateofbirth').val(msg.Date_of_birth)
												
											
											$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcountryapi.php",
											data: {},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select Country</option>';
												 $.each(msg1.Country_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.Country_id+'">'+value1.Country_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcountry').html(result1);
							$('#showcountry').val(msg.Country_id);
												}
											}
})

var countryid = msg.Country_id;
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchstateapi.php",
											data: {countryid:countryid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select State</option>';
												 $.each(msg1.State_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.State_id+'">'+value1.State_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showstate').html(result1);
							$('#showstate').val(msg.State_id);
												}
											}
});

var stateid = msg.State_id;
$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/fetchcityapi.php",
											data: {stateid:stateid},
											dataType:"json",
											
											success: function(msg1){
												if (msg1.status ==1001){
														var tran1 = "";
														var result1 ='<option value="">Select City</option>';
												 $.each(msg1.City_details, function(key1,value1)
                            {
								//if(key1 != "status") {
								tran1 = '<option value="'+value1.City_id+'">'+value1.City_name+'</option>';	
								//}
								result1 = result1 + tran1;
								tran1 ="";
							});
							$('#showcity').html(result1);
							$('#showcity').val(msg.City_id);
												}
											}
});

	
											}else {
												alert("Invalid Request"+ msg.status +" ");
											}
											}
});

});

$('#sendmsg').click (function() {
		//	alert("work");
var name = $( "#name").val();
var email = $( "#email").val();
var message = $( "#message").val();
//alert(storeid);
if (name ==""){
	alert("Kindly enter your name");
	$('#name').focus();
	return false;
}

else if 	(email == ""){
	alert("Kindly enter your email");
	$('#email').focus();
	return false;
	
}

else if (message ==""){
	$('#warn').text("Kindly enter your message");
	$('#message').focus();
	return false;
}
$.ajax({
									type: "POST",
									url: "http://rewardsboxnigeria.com/perx/api/send.php",
									//data: $("#contact").serialize(),
									data: {name:name, email:email, message:message},
																		
									success: function(msg){
									if (msg.success == false) {
									$("#warn").html("There was an error submitting the form. Please try again.");
									} else {
									alert(msg); 
									$('#name').val("");
									$('#email').val("");
									$('#message').val("");
										
									}
													
									}
									
								});
return false;
});




 		
		
		$("#ContactForm").validate({
		submitHandler: function(form) {
		ajaxContact(form);
		return false;
		}
		});
		
		//change password code
		
$('#chpass').click (function(){
	//alert("chan");
		var npassword = $( "#npassword").val();
var cpassword = $( "#cpassword").val();
var opassword = $( "#opassword").val();
var memberid = localStorage.getItem('memberid').trim();
//alert(opassword);
if (opassword ==""){
	alert("Kindly enter your old password");
	$('#opassword').focus();
	return false;
}

else if 	(npassword == ""){
	alert("Kindly enter your new password");
	$('#npassword').focus();
	return false;
	
}

else if (cpassword ==""){
	$('#warn').text("Kindly confirm your new password");
	$('#cpassword').focus();
	return false;
}

else if (npassword.length < 3) {
	alert("Password must be atleast 3 characters");
	$('#npassword').focus();
	return false;	
}

else if (npassword != cpassword){
	alert("Passwords do not match");
	$('#npassword').focus();
	return false;
}
else {
if ($('#loading_image').length == 0) { //is the image on the form yet?
                // add it just before the submit button
	$('.validatebtn').before('<img src="images/loading.gif" style="display: none;" alt="loading" id="loading_image">')
	}
	$('#loading_image').show(); // show the animated image    
    $('.validatebtn').hide(); // disable double submits
		$.ajax({
											type: "POST",
											url: "http://rewardsboxnigeria.com/perx/api/pchangeapi.php",
											data: {npassword: npassword, opassword:opassword, memberid:memberid},
											dataType:"json",
											
											success: function(msg){
											if (msg == false) {
											$("#warn").html("There was an error submitting the form. Please try again.");
													$('#loading_image').hide(); // hide the animated image    
    												$('.validatebtn').show(); // enableable double submits
											} else {
												if (msg.status ==1001){
													alert("Password Changed Successfully");
													localStorage.setItem('password', npassword);
												window.location.replace('main.html');
												}
												
												else if(msg.status ==2006){
													alert("Identification error");
												}
												else if(msg.status ==2010){
													alert("Enter current password and new password");
												}
												else if(msg.status ==2011){
													alert("Invalid current password");
												}
												else {
												alert(msg.status);
												//alert("Application Error");
													$('#loading_image').hide(); // hide the animated image    
    												$('.validatebtn').show(); // enableable double submits
												}													
											}
															
											}
										});
		
		return false;
		
}

		});
		
		



$('#logout').click(function(){
	//alert("logout");
$.ajax({
									//type: "POST",
									url: "http://rewardsboxnigeria.com/perx/api/logout3.php",
									//data: $("#contact").serialize(),
									//data: {name:name, email:email, message:message},
																		
									success: function(msg){
									(msg); 
									$('#loggout').html("You have been Logged out");
									//document.getElementById('text').value = '';
									//document.getElementById('password').value = '';
												localStorage.removeItem('text');
												localStorage.removeItem('password');
												localStorage.removeItem('memberid');
												localStorage.removeItem('firstname');
												localStorage.removeItem('notify');
												localStorage.removeItem('bal');
									window.location.replace('index.html');
																												
									}	
	


});
});

		
		$('#twitter').click (function() {
			window.open("http://www.twitter.com/gloprive");
		});
		
		$('#facebook').click (function() {
			window.open("http://facebook.com/pages/Glo-Priv%C3%A9/908268655854350?fref=photo");
		});
		
		
		$('#google').click (function() {
			window.open("http://plus.google.com/b/109286898800305044593/109286898800305044593/posts");
		});
		
		
		$('#instagram').click (function() {
			window.open("http://www.instagram.com/gloprive");
		});
		
		
		
		
		
		



		
		//***end of gen voucher script
		$('a.backbutton').click(function(){
			parent.history.back();
			return false;
		});
		

		$(".posts li").hide();	
		size_li = $(".posts li").size();
		x=4;
		$('.posts li:lt('+x+')').show();
		$('#loadMore').click(function () {
			x= (x+1 <= size_li) ? x+1 : size_li;
			$('.posts li:lt('+x+')').show();
			if(x == size_li){
				$('#loadMore').hide();
				$('#showLess').show();
			}
		});
        

	$("a.switcher").bind("click", function(e){
		e.preventDefault();
		
		var theid = $(this).attr("id");
		var theproducts = $("ul#photoslist");
		var classNames = $(this).attr('class').split(' ');
		
		
		if($(this).hasClass("active")) {
			// if currently clicked button has the active class
			// then we do nothing!
			return false;
		} else {
			// otherwise we are clicking on the inactive button
			// and in the process of switching views!

  			if(theid == "view13") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_13_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_12");
				theproducts.addClass("photo_gallery_13");

			}
			
			else if(theid == "view12") {
				$(this).addClass("active");
				$("#view11").removeClass("active");
				$("#view11").children("img").attr("src","images/switch_11.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_12_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_11");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_12");

			} 
			else if(theid == "view11") {
				$("#view12").removeClass("active");
				$("#view12").children("img").attr("src","images/switch_12.png");
				
				$("#view13").removeClass("active");
				$("#view13").children("img").attr("src","images/switch_13.png");
			
				var theimg = $(this).children("img");
				theimg.attr("src","images/switch_11_active.png");
			
				// remove the list class and change to grid
				theproducts.removeClass("photo_gallery_12");
				theproducts.removeClass("photo_gallery_13");
				theproducts.addClass("photo_gallery_11");

			} 
			
		}

	});	
	
	document.addEventListener('touchmove', function(event) {
	   if(event.target.parentNode.className.indexOf('navbarpages') != -1 || event.target.className.indexOf('navbarpages') != -1 ) {
		event.preventDefault(); }
	}, false);
	
	// Add ScrollFix
	var scrollingContent = document.getElementById("pages_maincontent");
	new ScrollFix(scrollingContent);
	
	
	var ScrollFix = function(elem) {
		// Variables to track inputs
		var startY = startTopScroll = deltaY = undefined,
	
		elem = elem || elem.querySelector(elem);
	
		// If there is no element, then do nothing	
		if(!elem)
			return;
	
		// Handle the start of interactions
		elem.addEventListener('touchstart', function(event){
			startY = event.touches[0].pageY;
			startTopScroll = elem.scrollTop;
	
			if(startTopScroll <= 0)
				elem.scrollTop = 1;
	
			if(startTopScroll + elem.offsetHeight >= elem.scrollHeight)
				elem.scrollTop = elem.scrollHeight - elem.offsetHeight - 1;
		}, false);
	};
	
		
		
})
