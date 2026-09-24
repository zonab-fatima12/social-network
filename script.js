// ===============================
// Social Network - Task 4
// ===============================


// ===============================
// Get HTML Elements
// ===============================

const postInput = document.getElementById("postInput");
const postButton = document.getElementById("postButton");
const postsContainer = document.getElementById("postsContainer");

const friendRequestBtn = document.getElementById("friendRequestBtn");

const notificationBtn = document.getElementById("notificationBtn");
const notificationCount = document.getElementById("notificationCount");
const notificationBox = document.getElementById("notificationBox");
const notificationList = document.getElementById("notificationList");


// ===============================
// Create Post
// ===============================

postButton.addEventListener("click", function () {

    const postText = postInput.value.trim();

    if (postText === "") {
        alert("Please write something first!");
        return;
    }

    createPost(postText);

    postInput.value = "";

});


// ===============================
// Create Post Function
// ===============================

function createPost(text) {

    // Main Post
    const post = document.createElement("div");
    post.classList.add("post");


    // ===============================
    // Post Header
    // ===============================

    const postHeader = document.createElement("div");
    postHeader.classList.add("post-header");

    postHeader.innerHTML = `
        <div class="post-user">
            👤
            <div>
                <strong>Zonab Fatima</strong>
                <small>Just now</small>
            </div>
        </div>
    `;


    // ===============================
    // Post Content
    // ===============================

    const postContent = document.createElement("p");

    postContent.classList.add("post-content");

    postContent.textContent = text;


    // ===============================
    // Post Actions
    // ===============================

    const postActions = document.createElement("div");

    postActions.classList.add("post-actions");


    // ===============================
    // Like Button
    // ===============================

    const likeButton = document.createElement("button");

    likeButton.innerHTML = "❤️ Like";

    let liked = false;
    let likeCount = 0;

    likeButton.addEventListener("click", function () {

        if (!liked) {

            liked = true;
            likeCount++;

            likeButton.innerHTML =
                `❤️ Liked (${likeCount})`;

        } else {

            liked = false;
            likeCount--;

            likeButton.innerHTML =
                `❤️ Like (${likeCount})`;
        }

    });


    // ===============================
    // Comment Button
    // ===============================

    const commentButton = document.createElement("button");

    commentButton.innerHTML = "💬 Comment";


    // ===============================
    // Comments Section
    // ===============================

    const commentsSection = document.createElement("div");

    commentsSection.classList.add("comments");


    // ===============================
    // Comment Input
    // ===============================

    const commentInput = document.createElement("input");

    commentInput.type = "text";

    commentInput.placeholder =
        "Write a comment...";


    // ===============================
    // Add Comment Button
    // ===============================

    const addCommentButton = document.createElement("button");

    addCommentButton.textContent = "Send";


    // ===============================
    // Comment Form
    // ===============================

    const commentForm = document.createElement("div");

    commentForm.classList.add("comment-form");

    commentForm.appendChild(commentInput);
    commentForm.appendChild(addCommentButton);

    commentForm.style.display = "none";


    // ===============================
    // Show / Hide Comment Form
    // ===============================

    commentButton.addEventListener("click", function () {

        if (commentForm.style.display === "none") {

            commentForm.style.display = "flex";

        } else {

            commentForm.style.display = "none";

        }

    });


    // ===============================
    // Add Comment
    // ===============================

    addCommentButton.addEventListener("click", function () {

        const commentText =
            commentInput.value.trim();

        if (commentText === "") {
            return;
        }


        const comment = document.createElement("div");

        comment.classList.add("comment");


        // Safe way to add comment
        const commentUser = document.createElement("strong");
        commentUser.textContent = "You";

        const commentTextElement = document.createElement("span");
        commentTextElement.textContent = commentText;

        comment.appendChild(commentUser);
        comment.appendChild(commentTextElement);


        commentsSection.appendChild(comment);

        commentInput.value = "";

    });


    // ===============================
    // Add Buttons
    // ===============================

    postActions.appendChild(likeButton);

    postActions.appendChild(commentButton);


    // ===============================
    // Add Everything to Post
    // ===============================

    post.appendChild(postHeader);

    post.appendChild(postContent);

    post.appendChild(postActions);

    post.appendChild(commentForm);

    post.appendChild(commentsSection);


    // ===============================
    // Add Post to Top
    // ===============================

    postsContainer.prepend(post);

}


// ==================================================
// FRIEND REQUEST + NOTIFICATIONS
// ==================================================

let friendRequestSent = false;
let notifications = 0;


// ===============================
// Friend Request
// ===============================

friendRequestBtn.addEventListener("click", function () {

    if (!friendRequestSent) {

        friendRequestSent = true;

        friendRequestBtn.textContent = "Request Sent";

        friendRequestBtn.disabled = true;

        notifications++;

        notificationCount.textContent = notifications;


        // Show notification
        notificationList.innerHTML = `
            <div class="friend-notification">

                <p>
                    <strong>Ali</strong>
                    sent you a friend request.
                </p>

                <div class="request-buttons">

                    <button id="acceptBtn">
                        Accept
                    </button>

                    <button id="rejectBtn">
                        Reject
                    </button>

                </div>

            </div>
        `;

    }

});


// ===============================
// Open / Close Notifications
// ===============================

notificationBtn.addEventListener("click", function () {

    if (
        notificationBox.style.display === "none" ||
        notificationBox.style.display === ""
    ) {

        notificationBox.style.display = "block";

    } else {

        notificationBox.style.display = "none";

    }

});


// ===============================
// Accept / Reject Friend Request
// ===============================

document.addEventListener("click", function (event) {

    // Accept
    if (event.target.id === "acceptBtn") {

        notificationList.innerHTML = `
            <p class="accepted">
                ✅ Friend request accepted.
            </p>
        `;

        notifications = 0;

        notificationCount.textContent = "0";

    }


    // Reject
    if (event.target.id === "rejectBtn") {

        notificationList.innerHTML = `
            <p class="rejected">
                ❌ Friend request rejected.
            </p>
        `;

        notifications = 0;

        notificationCount.textContent = "0";

    }

});
// ==================================================
// PROFILE EDIT + PRIVACY
// ==================================================

const editProfileBtn =
    document.getElementById("editProfileBtn");

const profileSettings =
    document.getElementById("profileSettings");

const saveProfileBtn =
    document.getElementById("saveProfileBtn");

const cancelProfileBtn =
    document.getElementById("cancelProfileBtn");

const nameInput =
    document.getElementById("nameInput");

const bioInput =
    document.getElementById("bioInput");


// Open settings

editProfileBtn.addEventListener("click", function () {

    profileSettings.style.display = "block";

});


// Save profile

saveProfileBtn.addEventListener("click", function () {

    const newName = nameInput.value.trim();

    const newBio = bioInput.value.trim();

    if (newName === "" || newBio === "") {

        alert("Please fill all fields.");

        return;
    }

    document.querySelector(
        ".profile-info h2"
    ).textContent = newName;

    document.querySelector(
        ".profile-info p"
    ).textContent = newBio;

    profileSettings.style.display = "none";

    alert("Profile updated successfully!");

});


// Cancel

cancelProfileBtn.addEventListener("click", function () {

    profileSettings.style.display = "none";

});
// ==================================================
// PHOTO AND VIDEO SHARING
// ==================================================

const photoButton =
    document.getElementById("photoButton");

const videoButton =
    document.getElementById("videoButton");

const photoInput =
    document.getElementById("photoInput");

const videoInput =
    document.getElementById("videoInput");


// ===============================
// Photo Button
// ===============================

photoButton.addEventListener("click", function () {

    photoInput.click();

});


// ===============================
// Video Button
// ===============================

videoButton.addEventListener("click", function () {

    videoInput.click();

});


// ===============================
// Select Photo
// ===============================

photoInput.addEventListener("change", function () {

    const file = photoInput.files[0];

    if (!file) {
        return;
    }

    const imageURL = URL.createObjectURL(file);

    const post = document.createElement("div");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">

            <div class="post-user">

                👤

                <div>

                    <strong>Zonab Fatima</strong>

                    <small>Just now</small>

                </div>

            </div>

        </div>

        <p class="post-content">
            Shared a photo 📷
        </p>

        <img
            src="${imageURL}"
            class="shared-image"
        >
    `;

    postsContainer.prepend(post);

    photoInput.value = "";

});


// ===============================
// Select Video
// ===============================

videoInput.addEventListener("change", function () {

    const file = videoInput.files[0];

    if (!file) {
        return;
    }

    const videoURL = URL.createObjectURL(file);

    const post = document.createElement("div");

    post.classList.add("post");

    post.innerHTML = `
        <div class="post-header">

            <div class="post-user">

                👤

                <div>

                    <strong>Zonab Fatima</strong>

                    <small>Just now</small>

                </div>

            </div>

        </div>

        <p class="post-content">
            Shared a video 🎥
        </p>

        <video
            src="${videoURL}"
            class="shared-video"
            controls
        ></video>
    `;

    postsContainer.prepend(post);

    videoInput.value = "";

});