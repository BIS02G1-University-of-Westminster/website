const template = "My name is ";

function updateName() {
    var name = document.getElementById("name").value;
    document.getElementById("output").textContent = template + name 
}