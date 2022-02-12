let dataCards = [
    {urlImage:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Former_Visa_%28company%29_logo.svg/288px-Former_Visa_%28company%29_logo.svg.png', title:"VISA"},
    {urlImage:'https://dbdzm869oupei.cloudfront.net/img/sticker/preview/6574.png', title:"MasterCard"},
    {urlImage:'http://1.bp.blogspot.com/-z_wE47R_c24/U262ZeVS5wI/AAAAAAAAAV8/o35d_NtYpmE/s1600/cabal.jpg', title:"CABAL"},
    {urlImage:'https://i0.wp.com/opticagalileo.com.ar/wp-content/uploads/2017/07/naranja.png?w=1080&ssl=1', title:"Naranja"},
];


function cardFunction(cards) {
    let arrayCards = [];
    
    let ulContainer = document.getElementById('containerCards');
    
    cards.map(ele => {
        arrayCards.push(
            `<li class="col">
                <a class="text-decoration-none link-dark card align-items-center text-center pt-3     border border-success" style="cursor: pointer;">
                    <div class="creditCardImg">
                        <img src="${ele.urlImage}" class="card-img-top w-100 h-100 img-fluid" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-break">${ele.title}</h5>
                        <input id="percentageInput" class="w-75 mx-auto form-control" type="number" name="" id="" placeholder="%" title="Introduzca el recargo de ésta tarjeta">
                    </div>
                </a>
            </li>`
                    );
                })

    ulContainer.innerHTML = "";           
    
    arrayCards.map(ele => {
        ulContainer.innerHTML += ele;
    });
    
};

function addCard() {
    const card = {urlImage:'https://i0.wp.com/opticagalileo.com.ar/wp-content/uploads/2017/07/naranja.png?w=1080&ssl=1', title:"Naranja"};
    dataCards.push(card);
    cardFunction(dataCards);
};

cardFunction(dataCards);