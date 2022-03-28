const MIN_QUOTA_QUANTITY = 12;
const MAX_QUOTA_QUANTITY = 48;

const DEFAULT_DATA_CARDS = [
    { quotas: [], title: "VISA", urlImage: 'img/tarjeta-visa.jpg' },
    { quotas: [], title: "MasterCard", urlImage: 'img/Mastercard-logo.svg.png' },
    { quotas: [], title: "Ahora12", urlImage: 'img/ahora-12-logo.png' },
    { quotas: [], title: "Ahora18", urlImage: 'img/ahora-18-logo.png' },
    { quotas: [], title: "CABAL", urlImage: 'img/cabal-logo.png' },
    { quotas: [], title: "CABAL24", urlImage: 'img/cabal24.png' },
    { quotas: [], title: "Maestro", urlImage: 'img/Maestro.png' },
    { quotas: [], title: "Naranja", urlImage: 'img/NARANJANUEVA.png' },
    { quotas: [], title: "Naranja VISA", urlImage: 'img/Naranja.png' },
    { quotas: [], title: "American Express", urlImage: 'img/american_express.png' },
    { quotas: [], title: "Nativa VISA", urlImage: 'img/Nativa.jpg' },
    { quotas: [], title: "Nativa MasterCard", urlImage: 'img/NATIVAMASTER.jpg'},
    { quotas: [], title: "Crédito Argentino", urlImage: 'img/credito-argentino.jpg' },
    { quotas: [], title: "Consumax", urlImage: 'img/logo-consumax.png' },
    { quotas: [], title: "VISA BERSA", urlImage: 'img/BERSA.jpg' },
    { quotas: [], title: "Visa Electron", urlImage: 'img/VISAELECTRON.png' },
    { quotas: [], title: "Sidecreer", urlImage: 'img/SIDECREER.png'},
    { quotas: [], title: "Sidecreer CABAL", urlImage: 'img/SIDECREERCABAL.jpg' },
];

const cardsContainer = document.getElementById('cardsContainer');
const quotasContainer = document.getElementById('quotasContainer');
const addQuotasBtn = document.getElementById('addQuotasBtn');

let dataCards = null;
let selectedCard = "VISA";
let newCardsCounter = null;

function initialize() {
    dataCards = JSON.parse(localStorage.getItem('dataCards'))

    // Si no existe dataCards en el Local Storage, asignarle el array por defecto.
    if (!dataCards) {
        dataCards = DEFAULT_DATA_CARDS;
        insertEmptyQuotasInCards()
    }

    // Guardar en Local Storage el nuevo array para dataCards.
    localStorage.setItem('dataCards', JSON.stringify(dataCards))

    // Contiene el conteo necesario para agregar nuevas tarjetas (Ej. Nueva tarjeta 3, Nueva tarjeta 4, etc.).
    // Si no se encuentra en el Local Storage, comienza en 1.
    newCardsCounter = localStorage.getItem('newCardsCounter') || 1;

    renderCards();
    renderQuotas();
    fillInputQuotas();
    toggleQuotasVisibility();

    // Agrega el listener para el cambio de tarjeta seleccionada.
    cardsContainer.addEventListener('change', changeSelectedCard);

    initializeTyped();
}

initialize()

function insertEmptyQuotasInCards() {
    dataCards.forEach(card => {
        if (card.title == 'Ahora12') {
            card.quotas.push({ number: 12, interestPercentage: "" });
            return
        }
        if (card.title == 'Ahora18') {
            card.quotas.push({ number: 18, interestPercentage: "" });
            return
        }
        for (let quotaNumber = 1; quotaNumber <= MIN_QUOTA_QUANTITY; quotaNumber++) {
            card.quotas.push({ number: quotaNumber, interestPercentage: "" });
        }
    });
}

// Crea y devuelve un elemento para una tarjeta.
function createCardElement(card) {
    const newQuotaDiv = document.createElement('div');
    newQuotaDiv.className = 'col';
    newQuotaDiv.innerHTML = `
        <input id="${card.title}" class="d-none credit-card-radio" type="radio" name="creditCard" ${card.title == "VISA" ? "checked" : ''} />
        <label for="${card.title}" class="col d-flex justify-content-center text-center pe-auto credit-card-label">
            <div class="creditCard d-flex flex-column text-decoration-none link-dark card align-items-center justify-content-start gap-3 px-2 py-3 border">
                <div class="creditCardImg mx-2 border rounded">
                    <img src="${card.urlImage}" class="card-img-top w-100 h-100 img-fluid" alt="Logo de tarjetas de crédito">
                </div>
                <div class="pb-0 px-0">
                    <h5 class="card-title text-break mb-0">${card.title}</h5>
                </div>
            </div>
        </label>`;
    return newQuotaDiv;
}

// Agrega los elementos de las tarjetas al container de tarjetas.
function renderCards() {
    cardsContainer.innerHTML = '';
    dataCards.forEach(card => {
        const cardElement = createCardElement(card);
        cardsContainer.appendChild(cardElement);
    });
};

// Agrega una nueva tarjeta genérica de acuerdo al contador newCardsCounter (Ej. Nueva tarjeta 3, Nueva tarjeta 4, etc.).
function addCard() {
    // Estructura básica de un objeto para una tarjeta.
    const card = { quotas: [], urlImage: 'img/credit-card.svg', title: `Nueva tarjeta ${newCardsCounter}` };

    // Una vez usado el contador, lo incrementa y lo guarda en el Local Storage.
    newCardsCounter++;
    localStorage.setItem('newCardsCounter', newCardsCounter);
    
    // Agrega los 12 objetos de las cuotas a la tarjeta.
    for (let quotaNumber = 1; quotaNumber <= MIN_QUOTA_QUANTITY; quotaNumber++) {
        card.quotas.push({ number: quotaNumber, interestPercentage: "" });
    }

    // Agrega el objeto de la tarjeta en dataCards y lo guarda en el Local Storage.
    dataCards.push(card);
    localStorage.setItem('dataCards', JSON.stringify(dataCards));

    // Renderiza todas las tarjetas.
    renderCards();
};

function changeSelectedCard(event) {
    selectedCard = event.target.id;
    fillInputQuotas();
    toggleQuotasVisibility();
    clearQuotas();
    localStorage.setItem('dataCards', JSON.stringify(dataCards));

    if (selectedCard == 'Ahora12' || selectedCard == 'Ahora18') {
        addQuotasBtn.classList.add('disabled');
        addQuotasBtn.disabled = true;
    } else {
        addQuotasBtn.classList.remove('disabled');
        addQuotasBtn.disabled = false;
    }
    
}

// Crea y devuelve un elemento para una cuota.
function createQuotaElement(quotaNumber) {
    const newQuotaDiv = document.createElement('div');
    newQuotaDiv.className = 'list-group-item list-group-item-action py-3 d-flex align-items-center gap-2';
    newQuotaDiv.innerHTML = `
            <div class="interestInput input-group">
                <input id="inputQuota${quotaNumber}" class="form-control inputQuota" type="number" name="" title="Introduzca el valor del recargo"/>
                <span class="input-group-text">%</span>
            </div>
            <strong class="flex-grow-1 ">${quotaNumber} CUOTA${quotaNumber == "1" ? "" : "S"} DE:</strong>
            <h5 class="fw-bold mb-0">$<span class="quotaPrice" id="quotaPrice${quotaNumber}"></span></h5>
    `;
    return newQuotaDiv;
}

// Agrega los elementos de las cuotas al container de cuotas.
function renderQuotas() {
    for (let quotaNumber = 1; quotaNumber <= MAX_QUOTA_QUANTITY; quotaNumber++) {
        const quotaElement = createQuotaElement(quotaNumber);
        quotasContainer.appendChild(quotaElement);
    
        // Una vez agregada la cuota, agrega un listener al input del porcentaje
        // para guardar el número en dataCards y Local Storage.
        const inputQuota = document.getElementById(`inputQuota${quotaNumber}`);
        
        inputQuota.addEventListener('input', (event) => {
            const card = dataCards.find(card => card.title == selectedCard);
            card.quotas.find(quota => quota.number == quotaNumber).interestPercentage = event.target.value;
            localStorage.setItem('dataCards', JSON.stringify(dataCards))
        })
    }
}

function addQuotas() {
    const card = dataCards.find(card => card.title == selectedCard)
    //Límite de cuotas.
    if (card.quotas.length >= MAX_QUOTA_QUANTITY) {
        alert('No es posible agregar más de 48 cuotas');
        return;
    }
    //Agrega de a 12 cuotas.
    const currentQuotasQuantity = card.quotas.length;
    for (let quotaNumber = currentQuotasQuantity; quotaNumber <= currentQuotasQuantity + 12; quotaNumber++) {
        card.quotas.push({ number: quotaNumber, interestPercentage: "" });
    }
    toggleQuotasVisibility();
}

function fillInputQuotas() {
    const card = dataCards.find(card => card.title == selectedCard)

    card.quotas.forEach(quota => {
        const inputQuota = document.getElementById(`inputQuota${quota.number}`);
        inputQuota.value = quota.interestPercentage;
    })
}

//Quita display: none de las cuotas según la tarjeta seleccionada.
function toggleQuotasVisibility() {
    const card = dataCards.find(card => card.title == selectedCard)
    const quotaElements = Array.from(quotasContainer.children);

    quotaElements.forEach((quotaElement, index) => {
        const quotaNumber = index + 1;
        const showQuota = card.quotas.some(quota => quota.number == quotaNumber)
        quotaElement.classList.toggle('d-none', !showQuota);
    });
}

//Calcula todos los valores
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

//Calcula todos los valores con "Enter"
const articlePrice = document.getElementById("InputArticle");
articlePrice.addEventListener("keyup", function(event) {
  if (event.key === "Enter") {
   event.preventDefault();
   calculateAllQuotasPrice();
  }
});

//Cálculo principal
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
        //Cálculo de porcentaje %.
        const productPriceInterestPercentage = parseFloat(quotaInterestPercentage) / 100 * parseFloat(articlePriceValue);
        //Suma.
        const productPricePlusInterest = productPriceInterestPercentage + parseFloat(articlePriceValue);
        //División por cantidad de cuotas.
        const resultDivisionQuotas = productPricePlusInterest / quotaNumber;
        //Resultado con dos decimales.
        quotaPrice.innerHTML = resultDivisionQuotas.toFixed(2);
    }
}

//Resetea las cuotas a 0 y border-danger al selecionar otra tarjeta.
function clearQuotas() {
    const quotaPrices = Array.from(document.querySelectorAll('.quotaPrice')); 
    const inputQuotas = Array.from(document.querySelectorAll('.inputQuota'));
    
    quotaPrices.forEach(quotaPrice => {
        quotaPrice.textContent = "0";
    });

    inputQuotas.forEach(inputQuota => {
        inputQuota.classList.remove('border-danger');
    });
}

//Resetea la app por completo, limpia Local Storage y recarga la página.
function resetApp() {
    let resetAppConfirmation = confirm('¿Está seguro que desea reiniciar la aplicación? Se perderán todos los datos ingresados.');
    if (resetAppConfirmation) {
        localStorage.clear();
        window.location.reload()
    }  
}

function initializeTyped() {
    const typed = new Typed('.typed', {
        strings: [
            'CALCULADOR DE CUOTAS',
            'FÁCIL, RÁPIDO Y SIMPLE',
            'GUARDÁ TU CALCULADORA ;)',
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
}