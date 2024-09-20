import { backend } from "declarations/backend";

document.addEventListener("DOMContentLoaded", async () => {
    const newPostBtn = document.getElementById("new-post-btn");
    const postForm = document.getElementById("post-form");
    const submitPostBtn = document.getElementById("submit-post-btn");
    const postsContainer = document.getElementById("posts");

    // Initialize Quill editor
    const quill = new Quill('#editor', {
        theme: 'snow'
    });

    // Show the form when "New Post" button is clicked
    newPostBtn.addEventListener("click", () => {
        postForm.classList.toggle("hidden");
    });

    // Submit the new post
    submitPostBtn.addEventListener("click", async () => {
        const title = document.getElementById("post-title").value.trim();
        const author = document.getElementById("post-author").value.trim();
        const body = quill.root.innerHTML;

        if (title && author && body) {
            try {
                await backend.addPost(title, body, author);
                // Clear the form
                document.getElementById("post-title").value = "";
                document.getElementById("post-author").value = "";
                quill.setContents([]);
                postForm.classList.add("hidden");
                // Refresh the posts
                loadPosts();
            } catch (error) {
                console.error("Failed to add post:", error);
            }
        } else {
            alert("Please fill in all fields.");
        }
    });

    // Function to load and display posts
    async function loadPosts() {
        try {
            const posts = await backend.getPosts();
            postsContainer.innerHTML = "";
            posts.forEach(post => {
                const postElement = document.createElement("div");
                postElement.className = "post";
                postElement.innerHTML = `
                    <h2>${post.title}</h2>
                    <p class="author">By ${post.author} on ${new Date(Number(post.timestamp) / 1000000).toLocaleString()}</p>
                    <div class="post-body">${post.body}</div>
                `;
                postsContainer.appendChild(postElement);
            });
        } catch (error) {
            console.error("Failed to load posts:", error);
        }
    }

    // Initial load of posts
    loadPosts();
});
