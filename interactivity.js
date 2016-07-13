/*

jQuery("#greeting-form").on("submit", function(event_details) {
    var greeting = "Hello ";
    var name = jQuery("#fullName").val();
    var greeting_message = greeting + name;
    jQuery("#greeting-form").hide();
    jQuery("#greeting").append("<p>" + greeting_message + " (" +
        jQuery("#email").val() + "): " + jQuery("#score").val() + "</p>");
    event_details.preventDefault();
});
*/

function addScore(score)
{
  jQuery("#highScores").empty();
  jQuery("#highScores").append(

    "<li>" + score + "</li>"
  );



}
