// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("scrollToTopBtn").style.display = "block";
    } else {
        document.getElementById("scrollToTopBtn").style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
document.getElementById("scrollToTopBtn").addEventListener("click", function() {
    window.scrollTo({top: 0, behavior: 'smooth'}); // For a smooth scrolling effect
});
