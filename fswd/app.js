let currentUser = null;
let users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];

// Register or login a user
function registerOrLogin() {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        alert("Please enter a username.");
        return;
    }

    let user = users.find(user => user.username === username);
    if (!user) {
        user = { username, following: [], followers: [] };
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
    }

    currentUser = user;
    document.getElementById('current-user').textContent = currentUser.username;
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('user-section').style.display = 'block';

    loadUserList();
    loadFeed();
}

// Log out the current user
function logout() {
    currentUser = null;
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
}

// Create a new post
function createPost() {
    const content = document.getElementById('post-content').value.trim();
    if (!content) {
        alert("Post content cannot be empty.");
        return;
    }

    const post = {
        content,
        author: currentUser.username,
        likes: 0,
        dislikes: 0,
        comments: []
    };
    posts.push(post);
    localStorage.setItem('posts', JSON.stringify(posts));
    document.getElementById('post-content').value = ''; // Clear input after posting
    loadFeed();
}

// Load the feed of posts from followed users
function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    let followedPosts = posts.filter(post => currentUser.following.includes(post.author) || post.author === currentUser.username);

    followedPosts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <strong>${post.author}</strong><br>
            ${post.content}<br>
        `;

        // Like button for posts with icon
        const likeBtn = document.createElement('button');
        likeBtn.innerHTML = `<i class="fa fa-thumbs-up"></i> Like (${post.likes})`;
        likeBtn.classList.add('like-btn');
        likeBtn.onclick = function () {
            post.likes++;
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };

        // Dislike button for posts with icon
        const dislikeBtn = document.createElement('button');
        dislikeBtn.innerHTML = `<i class="fa fa-thumbs-down"></i> Dislike (${post.dislikes})`;
        dislikeBtn.classList.add('dislike-btn');
        dislikeBtn.onclick = function () {
            post.dislikes++;
            localStorage.setItem('posts', JSON.stringify(posts));
            loadFeed();
        };

        postDiv.appendChild(likeBtn);
        postDiv.appendChild(dislikeBtn);

        // Comment section with comment count and input
        const commentCount = post.comments.length;
        const commentBtn = document.createElement('button');
        commentBtn.innerHTML = `<i class="fa fa-comments"></i> Comment (${commentCount})`;
        commentBtn.classList.add('comment-btn');
        commentBtn.onclick = function () {
            const commentText = prompt("Add your comment:");
            if (commentText) {
                post.comments.push({ author: currentUser.username, comment: commentText });
                localStorage.setItem('posts', JSON.stringify(posts));
                loadFeed();
            }
        };

        postDiv.appendChild(commentBtn);

        // Display comments under the post
        post.comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.innerHTML = `<strong>${comment.author}</strong>: ${comment.comment}`;
            commentDiv.classList.add('comment');
            postDiv.appendChild(commentDiv);
        });

        feed.appendChild(postDiv);
    });
}


