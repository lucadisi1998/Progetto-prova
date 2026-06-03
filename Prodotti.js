
document.querySelector(".filtrimobile p").addEventListener("click", () => {

  const filtri = document.querySelector(".filtri");

  filtri.classList.add("attivo");



  document.body.classList.add("noscroll");



});


document.querySelector(".chiusurafiltri").addEventListener("click", () => {

  const filtri = document.querySelector(".filtri");

  filtri.classList.remove("attivo");

  document.body.classList.remove("noscroll");
  
  document.querySelectorAll(".filtriscomparsa").forEach(filtri2 => {

     filtri2.style.display = "none";

  });
  

  


});





document.querySelectorAll(".boxacquisti2").forEach(prodotto => {

  const fotoPrincipale = prodotto.querySelector(".boxacquistifoto img");
  const miniature = prodotto.querySelectorAll(".boxacquisticolori img");

  miniature.forEach(mini => {
    mini.addEventListener("click", () => {
      fotoPrincipale.src = mini.src;
    });
  });

});


document.querySelectorAll(".filtri2").forEach(lista => {

  const titoli = lista.querySelector(".titolofiltri");
  const menu = lista.querySelector(".filtriscomparsa");

  titoli.addEventListener("click", (event) => {

    event.stopPropagation();

    if (menu.style.display === "flex") {

      menu.style.display = "none";

    } else {
      menu.style.display = "flex";
    }
  });


});