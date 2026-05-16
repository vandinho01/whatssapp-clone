class WhatssappController{

    constructor(){

        this.loadElements();

    }

    loadElements(){

        //Vai receber todos os elementos 
        this.el = {};

        document.querySelectorAll('[id').forEach(element=>{

            this.el[Format.getCamelCase(element.id)] = element;

        });

    }

}