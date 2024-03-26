
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseover', function() {
        const details = document.getElementById('member-details');
        details.innerHTML = this.getAttribute('data-student');
        details.style.visibility = 'visible';
        details.style.position = 'fixed';
        details.style.bottom = '20px';
        details.style.right = '20px'; 
        details.style.padding = '10px';
        details.style.border = '1px solid #000';
        details.style.backgroundColor = 'white';
    });

    member.addEventListener('mouseout', function() {
        document.getElementById('member-details').style.visibility = 'hidden';
    });

    member.addEventListener('click', function() {
        window.location.href = this.getAttribute('data-link');
    });
});








