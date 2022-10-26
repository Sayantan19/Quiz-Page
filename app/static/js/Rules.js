function Function1() {
    // Get the checkbox
    var checkBox = document.getElementById("accept");
    // Get the output button
    var button = document.getElementById("submit-button");
  
    // If the checkbox is checked, display the output button
    if (checkBox.checked == true){
      button.style.display = "block";
      checkBox.style.backgroundColor = "black";
    } 
    else {
      button.style.display = "none";
      checkBox.style.backgroundColor = "white";
    }
  }