



fetch("Header.html")
  .then(Response => Response.text())
  .then(html => {

    document.getElementById("Header").innerHTML = html;
    attivaHeader();
  });

function chiudiMenu() {
  document.querySelectorAll(".menuscomparsa").forEach(menu => {
    menu.classList.remove("attivo");
  });
}


function attivaHeader() {


  function aggiornaOverlay() {

    const overlay = document.getElementById("overlay");
    const ricerca = document.querySelector(".ricercascomparsa");
    const carrello = document.querySelector(".menucarrello");


    if (ricerca.classList.contains("attivo") ||
      carrello.classList.contains("attivo") ||
      document.querySelector(".menuscomparsa.attivo")) {

      overlay.classList.add("attivo");
    }

    else {

      overlay.classList.remove("attivo");
    }
  }


  function aggiornaNoscroll() {

    const body = document.body;
    const carrello = document.querySelector(".menucarrello");
    const lista = document.querySelector(".lista");

    if (carrello.classList.contains("attivo") ||
      lista.classList.contains("attivo")) {

      body.classList.add("noscroll");
    }

    else {

      body.classList.remove("noscroll");
    }

  }

  let menutimer = null;

  document.querySelectorAll(".lista a").forEach(link => {

    if (window.innerWidth > 900) {

      link.addEventListener("mouseenter", () => {

        clearTimeout(menutimer);

        document.querySelector(".ricercascomparsa").classList.remove("attivo");

        chiudiMenu();

        const menu = document.getElementById("menu" + link.id);
        if (menu) menu.classList.add("attivo");

        aggiornaOverlay();

      });

    }

  });




  if (window.innerWidth > 900) {
    document.querySelectorAll(".menuscomparsa").forEach(menu => {

      menu.addEventListener("mouseleave", () => {

        menutimer = setTimeout(() => {

          document.querySelectorAll(".menuscomparsa").forEach(menu2 => {

            menu2.classList.remove("attivo");
          })

          aggiornaOverlay();

        }, 300);
      });

    });
  }

  if (window.innerWidth > 900) {

    const overlay = document.getElementById("overlay");

    overlay.addEventListener("click", () => {

      document.querySelectorAll(".menuscomparsa").forEach(menu => {

        menu.classList.remove("attivo");
      });
    });
  }





  document.getElementById("ricerca").addEventListener("click", () => {
    const barra = document.querySelector(".ricercascomparsa");

    barra.classList.toggle("attivo");

    aggiornaOverlay();

    chiudiMenu();

    document.querySelector(".lista").classList.remove("attivo");
    document.querySelectorAll(".menuscomparsa.attivo").forEach(menu => menu.classList.remove("attivo"));
  });


  document.addEventListener("click", (e) => {
    const barra = document.querySelector(".ricercascomparsa");
    const icona = document.getElementById("ricerca");
    const overlay = document.getElementById("overlay")

    // Se la barra è aperta e clicco fuori da barra + icona, allora chiudi
    if (barra.classList.contains("attivo") &&
      !barra.contains(e.target) &&
      !icona.contains(e.target)) {
      barra.classList.remove("attivo");

      aggiornaOverlay();


    }


  });

  const inputRicerca = document.getElementById("inputRicerca");



  inputRicerca.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

      e.preventDefault();

      const ricerca = inputRicerca.value.toLowerCase().trim();

      const prodottoTrovato = prodotti.find(prodotto =>

        prodotto.nome.toLowerCase().includes(ricerca)
      );

      if (prodottoTrovato) {

        window.location.href = prodottoTrovato.link;

      }

      else {

        alert("Prodotto non trovato");
      }
    }
  });







  const carrello = document.getElementById("carrello");
  const menucarrello = document.querySelector(".menucarrello");
  const chiusuracarrello = document.querySelector(".chiusuracarrello");
  const overlay = document.getElementById("overlay");




  carrello.addEventListener("click", () => {



    menucarrello.classList.add("attivo");
    document.body.classList.add("carrello-aperto");

    aggiornaOverlay();
    aggiornaNoscroll();
    renderCarrello();


  });


  chiusuracarrello.addEventListener("click", () => {

    menucarrello.classList.remove("attivo");
    document.body.classList.remove("carrello-aperto");

    aggiornaOverlay();
    aggiornaNoscroll();


  });


  overlay.addEventListener("click", () => {

    menucarrello.classList.remove("attivo");
    document.body.classList.remove("carrello-aperto");

    aggiornaOverlay();
    aggiornaNoscroll();


  });




  document.querySelectorAll(".icon-remove").forEach(icone => {

    icone.addEventListener("click", () => {

      const prodotto = icone.closest(".prodotti");

      if (prodotto) {
        prodotto.style.display = "none";
      }
    });
  });


  document.getElementById("carrello").addEventListener("click", () => {

    document.querySelectorAll(".menuscomparsa").forEach(menu => {

      menu.classList.remove("attivo");
    });


    chiudiMenu();

    const lista = document.querySelector(".lista");

    lista.classList.remove("attivo");
  });


  document.querySelector(".hamburger").addEventListener("click", () => {

    const lista = document.querySelector(".lista");

    lista.classList.toggle("attivo");

    document.querySelectorAll(".menuscomparsa.attivo")
      .forEach(menu => menu.classList.remove("attivo"));

    aggiornaNoscroll();


  });






  document.querySelectorAll(".bottonefreccia").forEach(bottone => {
    bottone.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const linkId = bottone.closest("li").querySelector("a").id;

      const menuMap = {
        esche: "menuesche",
        abbigliamento: "menuabbigliamento",
        accessori: "menuaccessori"
      };

      const menu = document.getElementById(menuMap[linkId]);

      // chiudi tutti
      document.querySelectorAll(".menuscomparsa").forEach(m => {
        if (m !== menu) {
          m.classList.remove("attivo");
        }
      });

      // toggle
      menu.classList.toggle("attivo");
    });
  });


  document.querySelectorAll(".chiusuramenu").forEach(chiudi => {
    chiudi.addEventListener("click", (e) => {
      // trova il menu più vicino
      const menu = chiudi.closest(".menuscomparsa");
      if (menu) {
        menu.classList.remove("attivo");
      }
    });
  });

  renderCarrello();
};