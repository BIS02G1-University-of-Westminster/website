function showPreview() {
    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var satisfy = document.querySelector('input[name="satisfy"]:checked').value;
    var info = document.getElementById("info").value;
    var easy = document.querySelector('input[name="easy"]:checked').value;
    var message = document.getElementById("message").value;

    // Update preview content
    document.getElementById("previewContent").innerHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Information Reliability:</strong> ${satisfy}</p>
        <p><strong>How Found Us:</strong> ${info}</p>
        <p><strong>Website Navigation:</strong> ${easy}</p>
        <p><strong>Comment:</strong> ${message}</p>
    `;

    // Show preview and hide form
    document.getElementById("preview").classList.add("visible");
    document.getElementById("FeedbackForm").style.display = "none";
}

function editForm() {
    // Hide preview and show form
    document.getElementById("preview").classList.remove("visible");
    document.getElementById("FeedbackForm").style.display = "block";
}

function submitForm() {
    // Submit form
    document.getElementById("FeedbackForm").submit();
}