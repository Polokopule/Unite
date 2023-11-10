	
						 $(document).ready(function() {
						 	
            // Define your Firebase project URL
            
            var PostsURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
            // Function to add data to Firebase
             function getAll(){
             	  
                $.ajax({
                    url: PostsURL + "Posts.json",
                    type: "GET",
                    success: function(data) {
             //Clear the loading Posts           
           
						$("#feed").empty();  
     
                  
           //Fetch All Posts
               $.each(data, function(key, value) {
                     	
                    var idP = value.idP;
                  
                    
                    var title = value.title;
                    var dis = value.dis;
                    var id = value.id;
                    
                    var time = value.time;
                    var date= new Date();
          
            
            var timeNow = date.getMinutes();
            
                    
                    if(time == timeNow){
                   time = "1";
                    }
                    var ptags = value.tags;
                    var byletter = value.fletter;
                    var bybg = value.bg;
                    
                    
                    	var tag =ptags;
                   
                    var username = value.username;
      localStorage.setItem('toN',username);
         localStorage.setItem('toId',id);
                  localStorage.setItem('idP',idP);
                
         
var href = title +"/id="+idP;
localStorage.setItem('thisPost',href);
             
var commentCount = Object.keys(data).length;
             var formId = "CommentForm" + commentCount;
                      
                   var html = `	<div class="card">
	<div class="Cdetail">
		<div class="pp" style="background:${bybg};">${byletter} 
	</div>
		<span class="user">
			<b style="font-weight: bolder;">${username}  <img src="img/5k.png" alt="" width="10px"></b> <i>${time} ago - ${idP}</i>
			</span>
		</div>
		<br>
	<div class="Cimg">
		<div class='productView'>
			
					<div  class="text" style="border-left:2px solid ${bybg};">
			<b>@ ${title}</b><br><article>
${dis}</div>
		<div class="btn" id="tags">
			
				  
					
				<!-- Check if 'tag' is true before displaying the label -->
${tag ? `<label>${tag}</label>` : ''}	 
						
				
						</article>
		
			</div></div>
		
		<a href="#${href}">Opinions </a>
	
						<div id="${href}" class="comments">
				<div class="card">
	<div class="Cdetail">
		<div class="pp" style="background:${bybg};">${byletter}</div>
		<span class="user">
			<b>[@]/${username}</b> <i>${time} ago </i>
			</span>
		</div>
		<br>
	<div class="Cimg">
		<div class='productView'>
			
					<div class="text">
			<b>@ ${title}</b><br><p>
${dis}</p>
		<div class="btn" id="tags">
			
				  
					
				<!-- Check if 'tag' is true before displaying the label -->
${tag ? `<label>${tag}</label>` : ''}	
						
				
						</div>
		
			</div></div>
		

					</div>
	Others Opinion
	
	 <form class="CommentForm" data-idp="${idP}" action="javascript:void(0);">
      <div class="Cmon" id="Cmon1">
        <input type="text" placeholder="Comment to User ${idP} Experience" id="commentText" name="commentText">
        <input type="submit" value="Comment">
      </div>
    </form>
    <div id="All${idP}">
	
			</div>
			</div>
					`;var CommentsURL= 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
$.ajax({
                url: CommentsURL + "Comments.json",
                type: "GET",
                success: function(commentsData) {
             


                
                    $.each(commentsData, function(commentKey, comment) {
                        var commentId = comment.idComment;
                        var byUser = comment.username;
                        var byText = comment.CText;
                        var postId = comment.idPost;
                     
    
       var htm = `
                                <div class="Someone">
                                    <div class="Spp">
                                    </div>
                                    <span><b>${byUser} | ${postId}(${byUser}) commented to ${idP}</b> <p>${byText}</p></span>
                                </div>`;
                                
                      if(idP === postId){
                      //$("#All" + postId).empty();  
                    //  function Cget(){
    	$("#All" + postId).append(htm);
    }  //  }
   // setInterval(Cget,1000);
                      
               });
                },
                error: function(error) {
                    console.error("Error retrieving comments data:", error);
                }
            });
   
					
					$(".CommentForm").off().submit(function(event) {
  event.preventDefault();
  $(this).prop('disabled', true);
  var form = $(this);
  var idP = form.data('idp');
  var CText = form.find('input[name="commentText"]').val();
  
  var idComment = Math.floor(Math.random() * 1000000);
  var Fletter = localStorage.getItem('Fletter');
  var bg = localStorage.getItem('bg');
  var idby = localStorage.getItem('id');
  var username = localStorage.getItem('user');

  // Fetch existing comments from the database
  $.ajax({
    url: PostsURL + "Comments.json",
    type: "GET",
    success: function(existingComments) {
      var commentExists = false;
      
      // Loop through existing comments to check if idComment already exists
      for (var commentId in existingComments) {
        if (existingComments[commentId].idComment === idComment) {
          commentExists = true;
          break;
        }
      }
      
      if (commentExists) {
        alert("Duplicates are not allowed,this means your opinion is already Added to some of Expriences in tge feed");
        $(this).prop('disabled', false); // Re-enable the form
      } else {
        // Add the new comment to the database
        $.ajax({
          url: PostsURL + "Comments.json",
          type: "POST",
          data: JSON.stringify({
            username: username,
            idby: idby,
            CText: CText,
            Fletter: Fletter,
            idComment: idComment,
            bg: bg,
            idPost: idP
          }),
          contentType: "application/json",
          success: function(response) {
            alert("Comment added: " + CText);
            $(this).prop('disabled', false); // Re-enable the form
          },
          error: function(error) {
            console.error("Error adding data:", error);
            alert(error);
            $(this).prop('disabled', false); // Re-enable the form
          }
        });
      
      var toN = localStorage.getItem('toN');
         var toId= localStorage.getItem('toId');
        var thisPost = localStorage.getItem('thisPost');
         var id= localStorage.getItem('id');
     var NotifyId = Math.floor(Math.random()*100000);
         $.ajax({
          url: PostsURL + "Notify.json",
          type: "POST",
          data: JSON.stringify({
            fromN: username,
            fromId:id,
            toN: toN,
            toId:toId,
            thisPost:thisPost,
            NotifyId:NotifyId,
            said:CText
          }),
          contentType: "application/json",
          success: function(response) {
            alert("Notifications sent: ");
            $(this).prop('disabled', false); // Re-enable the form
          },
          error: function(error) {
            console.error("Error adding data:", error);
            alert(error);
            $(this).prop('disabled', false); // Re-enable the form
          }
        });
      }
      
      
    },
    error: function(error) {
      console.error("Error fetching existing comments:", error);
      alert(error);
      $(this).prop('disabled', false); // Re-enable the form
    }
  });
});
          
                      $("#feed").append(html); 	
                      
           });
          
                    },
                    error: function(error) {
                        console.error("Error retrieving data:", error);
                        
                    }
                    
                    
                    
                });
                
                  }
                      setInterval(getAll,100);    
          
          
     
     
     
            
});
		
