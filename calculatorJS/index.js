function calc() {
    const articlePrice = document.getElementById("InputArticle");
    const articlePriceValue = articlePrice.value;

    for (let quotaNumber = 1; quotaNumber <= 48; quotaNumber++) {
        calcQuota(quotaNumber, articlePriceValue);
    }

    if (articlePriceValue === "") {
        articlePrice.setAttribute("placeholder", "Agregá un monto!!");
        articlePrice.classList.add('border-danger');
    } else {
        articlePrice.setAttribute("placeholder", "Ingresá el valor del artículo");
        articlePrice.classList.remove('border-danger');
    }
    
}

function calcQuota(quotaNumber, articlePriceValue) {
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


// ---------------------- CARD COMPONENT ----------------------



const quotasContainer = document.getElementById('quotasContainer');


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

for (let quotaNumber = 1; quotaNumber <= 48; quotaNumber++) {
    const quotaElement = createQuotaElement(quotaNumber);
    quotasContainer.appendChild(quotaElement);
    const inputQuota = document.getElementById(`inputQuota${quotaNumber}`);
    
    inputQuota.addEventListener('input', (event) => {
        const card = dataCards.find(card => card.title == selectedCard);
        card.quotas[quotaNumber - 1].interestPercentage = event.target.value;
        localStorage.setItem('dataCards', JSON.stringify(dataCards))
    })
}

let selectedCard = "VISA";

const cardContainer = document.getElementById('containerCards');

cardContainer.addEventListener('change', changeSelectedCard);

function changeSelectedCard(event) {
    selectedCard = event.target.id;
    fillInputQuotas();
}

function fillInputQuotas() {
    const card = dataCards.find(card => card.title == selectedCard)

    card.quotas.forEach(quota => {
        const inputQuota = document.getElementById(`inputQuota${quota.number}`);
        inputQuota.value = quota.interestPercentage
    })
}

let dataCards = JSON.parse(localStorage.getItem('dataCards'));

if (!dataCards) {
    dataCards = [
        { quotas: [], urlImage: 'img/tarjeta-visa.jpg', title: "VISA" },
        { quotas: [], urlImage: 'img/Mastercard-logo.svg.png', title: "MasterCard" },
        { quotas: [], urlImage: 'img/ahora-12-logo.png', title: "Ahora12" },
        { quotas: [], urlImage: 'img/ahora-18-logo.png', title: "Ahora18" },
        { quotas: [], urlImage: 'img/cabal-logo.png', title: "CABAL" },
        { quotas: [], urlImage: 'img/cabal24.png', title: "CABAL24" },
        { quotas: [], urlImage: 'img/Maestro.png', title: "Maestro" },
        { quotas: [], urlImage: 'img/NARANJANUEVA.png', title: "Naranja" },
        { quotas: [], urlImage: 'img/Naranja.png', title: "Naranja VISA" },
        { quotas: [], urlImage: 'img/american_express.png', title: "American Express" },
        { quotas: [], urlImage: 'img/Nativa.jpg', title: "Nativa VISA" },
        { quotas: [], urlImage: 'img/NATIVAMASTER.jpg', title: "Nativa MasterCard"},
        { quotas: [], urlImage: 'img/credito-argentino.jpg', title: "Crédito Argentino" },
        { quotas: [], urlImage: 'img/logo-consumax.png', title: "Consumax" },
        { quotas: [], urlImage: 'img/BERSA.jpg', title: "VISA BERSA"},
        { quotas: [], urlImage: 'img/VISAELECTRON.png', title: "Visa Electron"},
        { quotas: [], urlImage: 'img/SIDECREER.png', title: "Sidecreer"},
        { quotas: [], urlImage: 'img/SIDECREERCABAL.jpg', title: "Sidecreer CABAL"},
    ];

    dataCards.forEach(card => {
        for (let quotaNumber = 1; quotaNumber <= 48; quotaNumber++) {
            card.quotas.push({ number: quotaNumber, interestPercentage: "" });
        }   
    });
} else {
    fillInputQuotas();
}


function cardFunction(cards) {
    let arrayCards = [];

    let cardContainer = document.getElementById('containerCards');

    cards.map(ele => {
        arrayCards.push(
            `<div class="col">
                <input id="${ele.title}" class="d-none credit-card-radio" type="radio" name="creditCard" value="" ${ele.title == "VISA" ? "checked" : ''} />
                <label for="${ele.title}" class="col d-flex justify-content-center text-center pe-auto credit-card-label">
                    <div class="creditCard d-flex flex-column text-decoration-none link-dark card align-items-center justify-content-between py-3 border">
                        <div class="creditCardImg mx-2 border rounded">
                            <img src="${ele.urlImage}" class="card-img-top w-100 h-100 img-fluid" alt="...">
                        </div>
                        <div class="pb-0 px-0">
                        <h5 class="card-title text-break mb-0">${ele.title}</h5>
                        </div>
                        <div class="pb-0 px-0">
                            <button onclick="calc()" title="Calcular cuotas con ésta tarjeta" class="btn btn-outline-primary">Calcular!</button>
                        </div>
                    </div>
                </label>
            </div>`
        );
    })

    cardContainer.innerHTML = "";

    arrayCards.map(ele => {
        cardContainer.innerHTML += ele;
    });

};

function addCard() {
    const card = { urlImage: 'img/credit-card.svg', title: "Nueva tarjeta" };
    dataCards.push(card);
    cardFunction(dataCards);
};

cardFunction(dataCards);




// ---------------------- QUOTAS COMPONENT ----------------------

    
function addQuotas() {
    const newQuotas = [];
    
    for (let quotaNumber = quotas.length + 1; quotaNumber <= quotas.length + 12; quotaNumber++) {
        newQuotas.push({ number: quotaNumber, interestPercentage: "" })
    }

    renderQuotas(newQuotas);

    quotas.push(...newQuotas);

    quotasContainer.classList.add('scrollarea');
};


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