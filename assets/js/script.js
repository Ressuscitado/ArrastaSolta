let areas = {
    a: null,
    b: null,
    c: null
};

//EVENTS
document.querySelectorAll('.item').forEach((item) => {
//Dragstar Evento a ser disparado quando começa a arrastar
    item.addEventListener('dragstart', dragStart);
//Dragend Evento a ser disparado quando termina a arrastar
    item.addEventListener('dragend', dragEnd);
});

document.querySelectorAll('.area').forEach((area) => {
 //Toda area onde vamos jogar algo tem que ter no mínimo esses 3 eventos abaixo   
    area.addEventListener('dragover', dragOver);//Arrastar o item e passar por cima da area do evento
    area.addEventListener('dragleave', dragLeave);//Quando estando dentro, saimos da area do evento, ele contabiliza para cada uma das áreas diferentes mas que tem o mesmo evento.
    area.addEventListener('drop', drop);//Ele libera o item arrastado mas que esteja dentro da area do dragover.
})
//para quando os elementos forem voltar para o local original
document.querySelector('.neutralArea').addEventListener('dragover', dragOverNeutral);
document.querySelector('.neutralArea').addEventListener('dragleave', dragLeaveNeutral);
document.querySelector('.neutralArea').addEventListener('drop', dropNeutral);


//FUNCTIONS ITEM
function dragStart(e) {
    e.currentTarget.classList.add('dragging');
}
function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

//FUNCTIONS AREA

//O motivo pelo qual o currentTarget está aplicando o estilo .hover apenas a um único elemento (a área específica onde o item foi arrastado) é porque o evento dragOver é registrado individualmente em cada uma das divs com a classe .area. Cada vez que você arrasta o item sobre uma dessas divs, o evento só se aplica àquela div específica que está sob o mouse naquele momento. Por isso da impressão de ser só o TARGET que foca no elemento mesmo que seja apenas o filho, nesse caso não tem filho, é o própio elemento pai, e currentTarget aplica individualmente para cada uma das divs devido ao padrão do dragOver.
function dragOver(e) {
    //o comportamento padrão dele é negar o DROP, por isso retiramos, agora ele aceita CASO esteja vazio o espaço
    if(e.currentTarget.querySelector('.item') === null) {//apenas se for igual a NULL
        e.preventDefault();
        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
//Pois como não sai do elemento, só joga dentro o remove de dragLeave não seria aplicado.    
    e.currentTarget.classList.remove('hover');

//Se o elemento estiver vazio, o item será colocado dentro da div, com o appendChild não estamos clonando o elemento, estamos literalmente pegando ele e adicionando no novo local, ou seja todos os eventos originais dele permanecem.   
    if(e.currentTarget.querySelector('.item') === null) {
//aproveitando a class dragging que irá surgir apenas quando o item estiver sendo arrastado e dps removida.    
        let dragItem = document.querySelector('.item.dragging');
        e.currentTarget.appendChild(dragItem);
        updateAreas();
    }
}

//FUNCTIONS NEUTRAL AREA

function dragOverNeutral(e) {
    e.preventDefault();
    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    let dragItem = document.querySelector('.item.dragging');
    e.currentTarget.appendChild(dragItem);
    updateAreas();
}

//LOGIC FUNCTIONS

function updateAreas() {
    document.querySelectorAll('.area').forEach((area) => {
        let name = area.getAttribute('data-name');
//Isso funciona pois o item é arrastado para dentro de cada area, logo area terá o .item
        if(area.querySelector('.item') !== null) {
//A linha if(area.querySelector('.item') !== null) verifica dinamicamente, após a movimentação, se um .item foi de fato inserido dentro da área. Se houver um item, a área será atualizada no objeto areas para refletir qual item está nela.
            areas[name] = area.querySelector('.item').innerHTML;
//areas[name] aqui terá como chave A, B ou C, colocando seu valor como o innerHTML do ITEM, sendo o valor o conteudo do item que está dentro da div (1, 2 ou 3) passando para AREAS ou se não tiver valor algum deixando NULL.

//let name = area.getAttribute('data-name');
//Essa linha extrai o valor de data-name (que será "a", "b", ou "c") e o armazena na variável name. Isso acontece para todas as áreas, independentemente de elas conterem um item ou não, por isso que ele identifica corretamente a chave abaixo e se não houver um item ele fica NULL.
        } else {
            areas[name] = null;
        }
    });
//Pois no HTML eles são strings e são passados como strings para o objeto AREAS por isso as aspas
//verificando se as areas estão corretas
    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else {
        document.querySelector('.areas').classList.remove('correct');
    }
}
