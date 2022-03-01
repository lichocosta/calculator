function calc(idInput){
 
    var	m1 = document.getElementById("InputArticulo").value;

    var m2 = document.getElementById(idInput).value;

    var m5 = parseInt(m2) / 100 * parseInt(m1);

    //El 5% de 2 = 2*(5/100) = 2*0.05 = 0.1

    var suma = parseInt(m5) + parseInt(m1);
     
    document.getElementById("resultado1").innerHTML = m1;
    document.getElementById("resultado2").innerHTML = Math.round(suma / 2);
    document.getElementById("resultado3").innerHTML = Math.round(suma / 3);
    document.getElementById("resultado4").innerHTML = Math.round(suma / 4);
    document.getElementById("resultado5").innerHTML = Math.round(suma / 5);
    document.getElementById("resultado6").innerHTML = Math.round(suma / 6);
    document.getElementById("resultado7").innerHTML = Math.round(suma / 7);
    document.getElementById("resultado8").innerHTML = Math.round(suma / 8);
    document.getElementById("resultado9").innerHTML = Math.round(suma / 9);
    document.getElementById("resultado10").innerHTML = Math.round(suma / 10);
    document.getElementById("resultado11").innerHTML = Math.round(suma / 11);
    document.getElementById("resultado12").innerHTML = Math.round(suma / 12);
}
     





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
                <a class="text-decoration-none link-dark card align-items-center text-center pt-3 border border-success" style="cursor: pointer;">
                    <div class="creditCardImg">
                        <img src="${ele.urlImage}" class="card-img-top w-100 h-100 img-fluid" alt="...">
                    </div>
                    <div class="card-body">
                        <h5 class="card-title text-break">${ele.title}</h5>
                        <input id="InputTarjeta${ele.title}" class="w-75 mx-auto form-control" type="number" placeholder="%" title="Introduzca el recargo de ésta tarjeta">
                        <button onclick="calc('InputTarjeta${ele.title}')">CALCULAR CUOTA</button>
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