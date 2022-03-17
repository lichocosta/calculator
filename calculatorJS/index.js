const MIN_QUOTA_QUANTITY = 12;
const MAX_QUOTA_QUANTITY = 48;

const cardsContainer = document.getElementById('containerCards');
const quotasContainer = document.getElementById('quotasContainer');

let selectedCard = "VISA";
let dataCards = JSON.parse(localStorage.getItem('dataCards'));

function createQuotaElement(quotaNumber) {
    const newQuotaDiv = document.createElement('div');
    newQuotaDiv.className = 'list-group-item list-group-item-action py-3 d-flex align-items-center gap-2';
    newQuotaDiv.innerHTML = `
            <div class="interestInput input-group">
                <input id="inputQuota${quotaNumber}" class="form-control" type="number" name="" title="Introduzca el valor del recargo"/>
                <span class="input-group-text">%</span>
            </div>
            <strong class="flex-grow-1 ">${quotaNumber} CUOTA${quotaNumber == "1" ? "" : "S"} DE:</strong>
            <h5 class="fw-bold mb-0">$<span id="quotaPrice${quotaNumber}"></span></h5>
    `;
    return newQuotaDiv;
}

for (let quotaNumber = 1; quotaNumber <= MAX_QUOTA_QUANTITY; quotaNumber++) {
    const quotaElement = createQuotaElement(quotaNumber);
    quotasContainer.appendChild(quotaElement);
    const inputQuota = document.getElementById(`inputQuota${quotaNumber}`);
    
    inputQuota.addEventListener('input', (event) => {
        const card = dataCards.find(card => card.title == selectedCard);
        card.quotas[quotaNumber - 1].interestPercentage = event.target.value;
        localStorage.setItem('dataCards', JSON.stringify(dataCards))
    })
}

if (!dataCards) {
    dataCards = [
        { quotas: [], quotasQuantity: 12, urlImage: 'img/tarjeta-visa.jpg', title: "VISA" },
        { quotas: [], quotasQuantity: 25, urlImage: 'img/Mastercard-logo.svg.png', title: "MasterCard" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/ahora-12-logo.png', title: "Ahora12" },
        { quotas: [], quotasQuantity: 18, urlImage: 'img/ahora-18-logo.png', title: "Ahora18" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/cabal-logo.png', title: "CABAL" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/cabal24.png', title: "CABAL24" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/Maestro.png', title: "Maestro" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/NARANJANUEVA.png', title: "Naranja" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/Naranja.png', title: "Naranja VISA" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/american_express.png', title: "American Express" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/Nativa.jpg', title: "Nativa VISA" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/NATIVAMASTER.jpg', title: "Nativa MasterCard"},
        { quotas: [], quotasQuantity: 12, urlImage: 'img/credito-argentino.jpg', title: "Crédito Argentino" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/logo-consumax.png', title: "Consumax" },
        { quotas: [], quotasQuantity: 12, urlImage: 'img/BERSA.jpg', title: "VISA BERSA"},
        { quotas: [], quotasQuantity: 12, urlImage: 'img/VISAELECTRON.png', title: "Visa Electron"},
        { quotas: [], quotasQuantity: 12, urlImage: 'img/SIDECREER.png', title: "Sidecreer"},
        { quotas: [], quotasQuantity: 12, urlImage: 'img/SIDECREERCABAL.jpg', title: "Sidecreer CABAL"},
    ];

    dataCards.forEach(card => {
        for (let quotaNumber = 1; quotaNumber <= MIN_QUOTA_QUANTITY; quotaNumber++) {
            card.quotas.push({ number: quotaNumber, interestPercentage: "" });
        }
    });

    localStorage.setItem('dataCards', JSON.stringify(dataCards))
}

fillInputQuotas();
toggleQuotasVisibility();

function createCardElement(card) {
    const newQuotaDiv = document.createElement('div');
    newQuotaDiv.className = 'col';
    newQuotaDiv.innerHTML = `
        <input id="${card.title}" class="d-none credit-card-radio" type="radio" name="creditCard" value="" ${card.title == "VISA" ? "checked" : ''} />
        <label for="${card.title}" class="col d-flex justify-content-center text-center pe-auto credit-card-label">
            <div class="creditCard d-flex flex-column text-decoration-none link-dark card align-items-center justify-content-start gap-3 px-2 py-3 border">
                <div class="creditCardImg mx-2 border rounded">
                    <img src="${card.urlImage}" class="card-img-top w-100 h-100 img-fluid" alt="...">
                </div>
                <div class="pb-0 px-0">
                    <h5 class="card-title text-break mb-0">${card.title}</h5>
                </div>
            </div>
        </label>`;
    return newQuotaDiv;
}

function renderCards() {
    dataCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });
};

// function addCard() {
//     const card = { urlImage: 'img/credit-card.svg', title: "Nueva tarjeta" };
//     dataCards.push(card);
//     renderCards();
// };

renderCards();

function addQuotas() {
    const card = dataCards.find(card => card.title == selectedCard)
    if (card.quotasQuantity >= MAX_QUOTA_QUANTITY) return;
    card.quotasQuantity += 12;
    for (let quotaNumber = card.quotasQuantity; quotaNumber <= card.quotasQuantity + 12; quotaNumber++) {
        card.quotas.push({ number: quotaNumber, interestPercentage: "" });
    }
    toggleQuotasVisibility();
    quotasContainer.classList.add('scrollarea');
}

function fillInputQuotas() {
    const card = dataCards.find(card => card.title == selectedCard)

    card.quotas.forEach(quota => {
        const inputQuota = document.getElementById(`inputQuota${quota.number}`);
        inputQuota.value = quota.interestPercentage
    })
}

function toggleQuotasVisibility() {
    const card = dataCards.find(card => card.title == selectedCard)
    const quotaElements = Array.from(quotasContainer.children);

    quotaElements.forEach((quotaElement, index) => {
        const quotaNumber = index + 1;
        const showQuota = quotaNumber > card.quotasQuantity;
        quotaElement.classList.toggle('d-none', showQuota);
    });
}

function changeSelectedCard(event) {
    selectedCard = event.target.id;
    fillInputQuotas();
    toggleQuotasVisibility();
    localStorage.setItem('dataCards', JSON.stringify(dataCards));
}

cardsContainer.addEventListener('change', changeSelectedCard);

function calculateAllQuotasPrice() {
    const articlePrice = document.getElementById("InputArticle");
    const articlePriceValue = articlePrice.value;

    for (let quotaNumber = 1; quotaNumber <= MAX_QUOTA_QUANTITY; quotaNumber++) {
        calculateQuotaPrice(quotaNumber, articlePriceValue);
    }

    if (articlePriceValue === "") {
        articlePrice.setAttribute("placeholder", "Agregá un monto!!");
        articlePrice.classList.add('border-danger');
    } else {
        articlePrice.setAttribute("placeholder", "Ingresá el valor del artículo");
        articlePrice.classList.remove('border-danger');
    }
}

function calculateQuotaPrice(quotaNumber, articlePriceValue) {
    let inputQuota = document.getElementById(`inputQuota${quotaNumber}`);
    let quotaPrice = document.getElementById(`quotaPrice${quotaNumber}`);
    
    const quotaInterestPercentage = inputQuota.value;
    
    if (quotaInterestPercentage === '') {
        quotaPrice.innerHTML = "0";
        inputQuota.classList.add('border-danger');
    } else if (articlePriceValue === '') {
        quotaPrice.innerHTML = "0";
    } else {
        inputQuota.classList.remove('border-danger');

        const productPriceInterestPercentage = parseFloat(quotaInterestPercentage) / 100 * parseFloat(articlePriceValue);
        
        const productPricePlusInterest = productPriceInterestPercentage + parseFloat(articlePriceValue);
        
        quotaPrice.innerHTML = Math.round(productPricePlusInterest / quotaNumber);
    }
}




// ---------------------- TYPED CONFIG ----------------------
const typed = new Typed('.typed', {
    strings: [
        'CALCULADOR DE CUOTAS',
        'FÁCIL, RÁPIDO Y SIMPLE',
        'JUBILÁ TU CALCULADORA',
        'NO LE GASTES LAS PILAS ;)',
    ],
    stringsElement: '#cadenas-texto',
    typeSpeed: 50,
    startDelay: 300,
    backSpeed: 50,
    smartBackspace: true,
    shuffle: false, 
    backDelay: 1600, 
    loop: true, 
    loopCount: false,
    showCursor: true,
    cursorChar: '.',
    contentType: 'html',
});