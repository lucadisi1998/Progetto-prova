


fetch("Footer.html")
.then(Response => Response.text())
.then(html => {

  document.getElementById("Footer").innerHTML = html;

});