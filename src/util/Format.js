class Format{

    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div>`;

        // Vai trazer um array com todas as chaves dentro de um elemento
        return Object.keys(div.firstChild.dataset)[0];

    }

}