// Load feed from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadFeed);

function createPost() {
    const content = document.getElementById('post-content').value;
    if (content.trim() === '') {
        alert("Post cannot be empty!");
        return;
    }

    const post = {
        content: content,
        timestamp: new Date().toLocaleString()
    };
    // Save the post in localStorage
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(post);
     let likes = JSON.parse(localStorage.getItem('likes')) || [];
    likes.push(like);
    localStorage.setItem('posts', JSON.stringify(posts));
     localStorage.setItem('likes', JSON.stringify(likes));

    // Clear the textarea
    document.getElementById('post-content').value = '';
  // Reload the feed
    loadFeed();
}

function loadFeed() {
    const feed = document.getElementById('feed');
    feed.innerHTML = '';

    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.textContent = ${post.content} (Posted on ${post.timestamp});
        feed.appendChild(postDiv);
    });
const feed=document.getElementId('feed');
feed.innerHTML='';
const Likes-JSON.parse(localstorage.getElement('likes')) ||[];
likes.forEach(post=>{
    const likediv=document.createElement('div');
    likesDiv.textContent=${like.content}(posted on ${lokes.timestamp});
});
}
