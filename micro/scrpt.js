document.addEventListener('DOMContentLoaded', () => {
    const postButton = document.getElementById('postButton');
    const postContent = document.getElementById('postContent');
    const feedList = document.getElementById('feedList');

    // Load posts from localStorage
    function loadPosts() {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        feedList.innerHTML = '';
        posts.forEach(post => {
            const listItem = document.createElement('li');
            listItem.textContent = post;
            feedList.appendChild(listItem);
        });
    }

    // Save a new post to localStorage
    function savePost(content) {
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(content);
        localStorage.setItem('posts', JSON.stringify(posts));
        loadPosts();
    }

    // Handle post button click
    postButton.addEventListener('click', () => {
        const content = postContent.value.trim();
        if (content) {
            savePost(content);
            postContent.value = '';
        }
    });

    // Load posts on page load
    loadPosts();
});
