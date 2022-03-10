let totalQuotaNumber = 12;

function calc() {
    const articlePrice = document.getElementById("InputArticle").value;

    for (let quotaNumber = 1; quotaNumber <= quotas.length; quotaNumber++) {
        calcQuota(quotaNumber, articlePrice);
    }

    // let inputQuota = document.getElementById('inputQuota${quotaNumber}');
    // let quotaPrice = document.getElementById('quotaPrice${quotaNumber}');

    // if (inputQuota === '') {
    //     quotaPrice.innerHTML = "0";
    // }

}

function calcQuota(quotaNumber, articlePrice) {

    const quotaInterestPercentage = document.getElementById("inputQuota" + quotaNumber).value;

    const productPriceInterestPercentage = parseFloat(quotaInterestPercentage) / 100 * parseFloat(articlePrice);

    const productPricePlusInterest = productPriceInterestPercentage + parseFloat(articlePrice);

    document.getElementById("quotaPrice" + quotaNumber).innerHTML = Math.round(productPricePlusInterest / quotaNumber);
}




// ---------------------- CARD COMPONENT ----------------------

let dataCards = [
    { urlImage: 'img/tarjeta-visa.jpg', title: "VISA" },
    { urlImage: 'img/Mastercard-logo.svg.png', title: "Master Card" },
    { urlImage: 'img/cabal-logo.png', title: "CABAL" },
    { urlImage: 'img/ahora-12-logo.png', title: "Ahora12" },
    { urlImage: 'img/ahora-18-logo.png', title: "Ahora18" },
    { urlImage: 'img/cabal24.png', title: "CABAL24" },
    { urlImage: 'img/Maestro.png', title: "Maestro" },
    { urlImage: 'img/Naranja.png', title: "Naranja" },
    { urlImage: 'img/american_express.png', title: "American Express" },
    { urlImage: 'img/Nativa.jpg', title: "Nativa" },
    { urlImage: 'img/credito-argentino.jpg', title: "Crédito Argentino" },
    { urlImage: 'img/logo-consumax.png', title: "Consumax" },
    { urlImage: 'img/tarjeta-visa.jpg', title: "VISA", subtitle:"AGRO" },
];

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
                        <!--<small>${ele.subtitle}</small>-->
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



const quotasContainer = document.getElementById('quotasContainer');

const quotas = [];

for (let quotaNumber = 1; quotaNumber <= totalQuotaNumber; quotaNumber++) {
    quotas.push({ number: quotaNumber, interestPercentage: "" });

}


function createQuotaElement(quotaNumber) {
    const newQuotaDiv = document.createElement('div');
    newQuotaDiv.className = 'list-group-item list-group-item-action py-3 lh-tight d-flex align-items-center justify-content-between';
    newQuotaDiv.innerHTML = `
        <div class="d-flex flex-row align-items-center">
            <div class="input-group">
                <input id="inputQuota${quotaNumber}" class="form-control" type="number" name="" title="Introduzca el valor del recargo"/>
                <span class="input-group-text">%</span>
            </div>
            <strong class="ms-2 ms-md-3">${quotaNumber} CUOTA${quotaNumber == "1" ? "" : "S"} DE:</strong>
        </div>
        <div>
            <h5 class="fw-bold mb-0">$<span id="quotaPrice${quotaNumber}"></span></h5>
        </div>
    `;
    return newQuotaDiv;
}

function renderQuotas(quotas) {

    quotas.forEach(quota => {
        const quotaElement = createQuotaElement(quota.number);
        quotasContainer.appendChild(quotaElement);

        const inputQuota = document.getElementById(`inputQuota${quota.number}`);

        inputQuota.addEventListener('input', (event) => {
            quota.interestPercentage = event.target.value;
        })

    })
}
renderQuotas(quotas);


function addQuotas() {
    const newQuotas = [];

    for (let quotaNumber = quotas.length + 1; quotaNumber <= quotas.length + 12; quotaNumber++) {
        newQuotas.push({ number: quotaNumber, interestPercentage: "" })
    }

    renderQuotas(newQuotas);

    quotas.push(...newQuotas);
};
