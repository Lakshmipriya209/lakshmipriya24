let currentUser = null;
const users = ['priya', 'kowsi', 'manju', 'Divya'];
let followers = [];

function registerOrLogin() {
    const username = document.getElementById('username').value;
    if (username) {
        currentUser = username;
        document.getElementById('current-user').innerText = currentUser;
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('user-section').style.display = 'block';
        loadUserList();
        loadFollowerList();
    }
}

function logout() {
    currentUser = null;
    document.getElementById('username').value = '';
    document.getElementById('auth-section').style.display = 'block';
    document.getElementById('user-section').style.display = 'none';
}

function createPost() {
    const postContent = document.getElementById('post-content').value;
    const postImage = document.getElementById('post-image').files[0];
    const feed = document.getElementById('feed');

    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    
    // Initialize like and dislike counts
    const post = {
        user: currentUser,
        content: postContent,
        image: postImage ? URL.createObjectURL(postImage) : null,
        likes: 0,
        dislikes: 0
    };

    postDiv.innerHTML = `
        <strong>${post.user}</strong>: ${post.content}
        <div class="post-buttons">
            <button onclick="likePost(this)">Like (<span class="like-count">0</span>)</button>
            <button onclick="dislikePost(this)">Dislike (<span class="dislike-count">0</span>)</button>
            <button onclick="toggleCommentSection(this)">Comment</button>
        </div>
        <div class="comments" style="display: none;">
            <textarea placeholder="Write a comment..."></textarea>
            <button onclick="addComment(this)">Add Comment</button>
            <div class="comment-list"></div>
        </div>
    `;
    
    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.style.width = '100px'; // Example style
        postDiv.appendChild(img);
    }

    feed.prepend(postDiv);
    document.getElementById('post-content').value = '';
    document.getElementById('post-image').value = '';
}

function likePost(button) {
    const likeCount = button.querySelector('.like-count');
    likeCount.innerText = parseInt(likeCount.innerText) + 1;
    button.disabled = true; // Disable after liking
}

function dislikePost(button) {
    const dislikeCount = button.querySelector('.dislike-count');
    dislikeCount.innerText = parseInt(dislikeCount.innerText) + 1;
    button.disabled = true; // Disable after disliking
}

function toggleCommentSection(button) {
    const commentSection = button.parentElement.nextElementSibling;
    commentSection.style.display = commentSection.style.display === 'none' ? 'block' : 'none';
}

function addComment(button) {
    const commentInput = button.previousElementSibling;
    const commentText = commentInput.value;
    const commentList = button.parentElement.querySelector('.comment-list');

    if (commentText) {
        const commentDiv = document.createElement('div');
        commentDiv.innerText = commentText;
        commentList.appendChild(commentDiv);
        commentInput.value = ''; // Clear input
    }
}

function loadUserList() {
    const userList = document.getElementById('user-list');
    users.forEach(user => {
        if (user !== currentUser && !followers.includes(user)) {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <span>${user}</span>
                <button onclick="followUser('${user}')">Follow</button>
            `;
            userList.appendChild(userDiv);
        }
    });
}

function followUser(user) {
    if (!followers.includes(user)) {
        followers.push(user);
        loadFollowerList();
        loadUserList(); // Update user list to remove followed user
    }
}

function loadFollowerList() {
    const followerList = document.getElementById('follower-list');
    followerList.innerHTML = ''; // Clear existing list
    followers.forEach(follower => {
        const followerDiv = document.createElement('div');
        followerDiv.innerText = follower;
        followerList.appendChild(followerDiv);
    });
}
