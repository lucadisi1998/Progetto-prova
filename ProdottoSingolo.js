




document.getElementById("aggiungiCarrello").addEventListener("click", () => {


  const id = document.getElementById("aggiungiCarrello").dataset.id;

  const prodotto = prodotti.find(p => p.id === id);

  const tagliaAttiva = document.querySelector(".misurebottone.attivo");

  const errore = document.querySelector(".erroretaglia");

  const haTaglie = document.querySelectorAll(".misurebottone").length > 0;

  if (haTaglie && !tagliaAttiva) {

    errore.querySelector("p").textContent = "Aggiungi una taglia";
    errore.style.display = "flex";

    return;
  }

  errore.querySelector("p").textContent = "";
  errore.style.display = "none";


  aggiungiAlCarrello(prodotto, tagliaAttiva);

  document.getElementById("carrello").click();
});



document.querySelectorAll(".misurebottone").forEach(bottone => {

  bottone.addEventListener("click", () => {

    const errore = document.querySelector(".erroretaglia");

    if (bottone.classList.contains("attivo")) {

      bottone.classList.remove("attivo");


      if (errore) {


        errore.querySelector("p").textContent = "";
        errore.style.display = "none";

      }

      return;
    }

    document.querySelectorAll(".misurebottone").forEach(btn => {

      btn.classList.remove("attivo");
    })

    bottone.classList.add("attivo");

    if (errore) {

      errore.querySelector("p").textContent = "";
      errore.style.display = "none";
    }





  });

});




function aggiungiAlCarrello(prodotto, tagliaAttiva) {

  const prodottoConTaglia = {

    ...prodotto,

    taglia: tagliaAttiva
      ? tagliaAttiva.textContent
      : null
  };

  const esistente = carrello.find(item =>

    item.id === prodottoConTaglia.id &&
    item.taglia === prodottoConTaglia.taglia
  );

  if (esistente) {

    esistente.quantita += 1;

  } else {

    carrello.push({

      ...prodottoConTaglia,
      quantita: 1
    });
  }

  localStorage.setItem("carrello", JSON.stringify(carrello));

  renderCarrello();
}




document.querySelectorAll(".fotosecondarie img").forEach(foto => {

  const fotoPrincipale = document.querySelector(".fotoPrincipale img");

  foto.addEventListener("click", () => {

    fotoPrincipale.src = foto.src;
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
