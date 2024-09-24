document.getElementById("postButton").addEventListener("click", function() {
    const postInput = document.getElementById("postInput");
    const postContent = postInput.value.trim();
    
    if (postContent) {
        const postContainer = document.getElementById("posts");
        const postDiv = document.createElement("div");
        postDiv.className = "post";
        




        const likeButton = document.createElement("span");
        likeButton.className = "like";
        likeButton.innerHTML = "👍 Like (0)";
        let likeCount = 0;
        likeButton.addEventListener("click", function() {
            likeCount++;
            likeButton.innerHTML = `👍 Like (${likeCount})`;
        });
        
        const dislikeButton = document.createElement("span");
        dislikeButton.className = "dislike";
        dislikeButton.innerHTML = "👎 Dislike (0)";
        let dislikeCount = 0;
        dislikeButton.addEventListener("click", function() {
            dislikeCount++;
            dislikeButton.innerHTML = `👎 Dislike (${dislikeCount})`;
        });



        postDiv.innerHTML = `<p>${postContent}</p>`;
        postDiv.appendChild(likeButton);
        postDiv.appendChild(dislikeButton);
        postContainer.appendChild(postDiv);

        postInput.value = ""; // Clear input
    }
        
});
