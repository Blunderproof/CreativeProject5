$(document).ready(function(){
  $("#createSite").click(function(){
      var myobj = {URI:$("#uriInput").val(),bio:$("#bioInput").val(), imgURL:""};
      jobj = JSON.stringify(myobj);
      // $("#json").text("Your comment: " + $("#comment").val());
      // $("#json").addClass("alert alert-success");
      // $("#comments").removeClass("alert alert-success");
      // $("#comments").html("");
      var url = "submit";
      $.ajax({
        url:url,
        type: "POST",
        data: jobj,
        contentType: "application/json; charset=utf-8",
        success: function(data,textStatus) {
          $.getJSON('site', function(data) {
            var everything = "<ul class='list-group'>";
            for(var site in data) {
              info = data[site];
              everything += "<li class='list-group-item'> URI: " + info.URI + " -- Bio: " + info.bio + "</li>";
            }
            everything += "</ul>";
            $("#cardList").html(everything);
        })
      }
    })
  });

  $.getJSON('site', function(data) {
    var everything = "<ul class='list-group'>";
    for(var site in data) {
      info = data[site];
      everything += "<li class='list-group-item'> URI: " + info.URI + " -- Bio: " + info.bio + "</li>";
    }
    everything += "</ul>";
    $("#cardList").html(everything);


  // $("#getComments").click(function() {
  //   $.getJSON('comment', function(data) {
  //     console.log(data);
  //     var everything = "<ul class='list-group'>";
  //     for(var comment in data) {
  //       com = data[comment];
  //       everything +="<li class='list-group-item'> Name: " + com.Name + " -- Comment: " + com.Comment + "</li>";
  //     }
  //     everything += "</ul>";
  //     $("#comments").html(everything);
  //     $("#json").text("");
  //     $("#json").removeClass("alert alert-success");
  //     $("#comments").removeClass("alert alert-success");
  //     $("#done").text("");
  //   })
  // })

  // $("#deleteComments").click(function() {
  //   console.log("DELETING ALL COMMENTS");
  //   var url = "deleteAll";
  //
  //   $.ajax({
  //     url:url,
  //     type: "GET",
  //     success: function(data, textStatus) {
  //       $("#comments").html("Successfully deleted all comments");
  //       $("#comments").addClass("alert alert-success");
  //       $("#json").text("");
  //       $("#json").removeClass("alert alert-success");
  //       $("#done").text("");
  //     }
  //   });
  // });

});
