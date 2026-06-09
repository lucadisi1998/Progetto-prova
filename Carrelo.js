const carrello = JSON.parse(localStorage.getItem("carrello")) || [];


function renderCarrello() {

  const container = document.querySelector(".menucarrello2");

  if (!container) return;

  const boxAttuale = container.querySelector(".boxprodotti");

  const scrollAttuale = boxAttuale
    ? boxAttuale.scrollTop
    : 0;

  if (carrello.length === 0) {

    container.innerHTML = `
    <div class="carrellovuoto">

    <p>Il tuo carrello è vuoto</p>

    </div>
  `;

    return;
  }

  container.innerHTML = "";

  let totale = 0;

  let html = `<div class="boxprodotti">`;




  carrello.forEach(item => {

    totale += item.prezzo * item.quantita;

    html += `
     
    
     

      <div class="prodotti">

        <div class="prodottifoto">
          <a href="${item.link}">
            <img src="${item.immagine}">
          </a>
        </div>

        <div class="prodotti2">

          <div class="prodottiinfo">

            <div class="prodottititolo">
              <h3>${item.nome}</h3>
            </div>

            <div class="prodotticolore">
              <h3>Colore</h3>
              <p>${item.colore}</p>
            </div>

            ${item.taglia ? `
              <div class="prodottitaglia">
                <h3>Taglia</h3>
                <p>${item.taglia}</p>
              </div>
            ` : ""}
            

            <div class="quantita">   

              <button class="meno" onclick="diminuisciQuantita('${item.id}' , '${item.taglia}')">
                <svg viewBox="0 0 24 24" class="icon-qty">
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

              <input type="number" value="${item.quantita}" readonly>

              <button class="piu" onclick="aumentaQuantita('${item.id}', '${item.taglia}')">
                <svg viewBox="0 0 24 24" class="icon-qty">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </button>

            </div>

          </div>

          <div class="prodottiprezzo">

            <div>
              <p>€${item.prezzo}</p>
            </div>

            <button onclick="rimuoviProdotto('${item.id}' , '${item.taglia}')">
              <svg viewBox="0 0 24 24" class="icon-remove">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>

          </div>

        </div>

      </div>
  
    `;
  });

  html += `</div>`;

  const paginaCassa = window.location.pathname.includes("Cassa.html");

  html += `
    <div class="finalecarrello">

    <div class="totale">
      <p>Totale</p>
      <p>€${totale.toFixed(2)}</p>
    </div>
    `;
  if (!paginaCassa) {

    html += ` <div class="pagamento">
      <a href="Cassa.html">
        <button>Acquista Ora</button>
      </a>
    </div>
  `;
  }

  html += `
    </div>
  `;

  container.innerHTML = html;

  requestAnimationFrame(() => {

    const nuovaBox = container.querySelector(".boxprodotti");

    if (nuovaBox) {

      nuovaBox.scrollTop = scrollAttuale;
    }
  });

}



function rimuoviProdotto(id, taglia) {

  if (taglia === "null" || taglia === "undefined" || taglia === "")
    taglia = null;

  const indice = carrello.findIndex(item =>

    item.id === id &&
    (item.taglia || null) === (taglia || null)
  );

  if (indice !== -1) {

    carrello.splice(indice, 1);

    localStorage.setItem("carrello", JSON.stringify(carrello));

    renderCarrello();
  }
}


function aumentaQuantita(id, taglia) {

  if (taglia === "null" || taglia === "undefined" || taglia === "")
    taglia = null;


  const item = carrello.find(p =>

    p.id === id &&
    (p.taglia || null) === (taglia || null)
  );

  if (item) {
    item.quantita += 1;
  }

  localStorage.setItem("carrello", JSON.stringify(carrello));
  renderCarrello();
}


function diminuisciQuantita(id, taglia) {

  if (taglia === "null" || taglia === "undefined" || taglia === "")
    taglia = null;


  const item = carrello.find(p =>

    p.id === id &&
    (p.taglia || null) === (taglia || null)
  );

  if (!item) return;

  item.quantita -= 1;

  if (item.quantita <= 0) {

    const index = carrello.indexOf(item);
    carrello.splice(index, 1);
  }

  localStorage.setItem("carrello", JSON.stringify(carrello));
  renderCarrello();
}