import { Format } from './../util/Format';
import { CameraController } from './CameraController';
import { MicrophoneController } from './MicrophoneController';
import { DocumentPreviewController } from './DocumentPreviewController';

export class WhatssappController {

    constructor() {

        this.elementsPrototype();
        this.loadElements();
        this.initEvents();

    }

    loadElements() {

        //Vai receber todos os elementos 
        this.el = {};

        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.getCamelCase(element.id)] = element;
        });

    }

    elementsPrototype() {

        Element.prototype.hide = function () {
            this.style.display = 'none';
            return this;
        }

        Element.prototype.show = function () {
            this.style.display = 'block';
            return this;
        }

        Element.prototype.toggle = function () {
            this.style.display = (this.style.display === 'none') ? 'block' : 'none';
            return this;
        }

        Element.prototype.on = function (events, fn) {
            events.split(' ').forEach(event => {
                this.addEventListener(event, fn);
            });
            return this;
        }

        Element.prototype.css = function (styles) {
            for (let name in styles) {
                this.style[name] = styles[name];
            }
            return this;
        }

        Element.prototype.addClass = function (name) {
            this.classList.add(name);
            return this;
        }

        Element.prototype.removeClass = function (name) {
            this.classList.remove(name);
            return this;
        }

        Element.prototype.hasClass = function (name) {
            return this.classList.contains(name);
            return this;
        }

        HTMLFormElement.prototype.getForm = function () {
            return new FormData(this);
        }

        HTMLFormElement.prototype.toJSON = function () {

            let json = {};

            this.getForm().forEach((value, key) => {

                json[key] = value;

            });

            return json;

        }

    };

    initEvents() {

        this.el.myPhoto.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelEditProfile.show();
            setTimeout(() => {
                this.el.panelEditProfile.addClass('open');
            }, 300);

        });

        this.el.btnNewContact.on('click', e => {

            this.closeAllLeftPanel();
            this.el.panelAddContact.show();
            setTimeout(() => {
                this.el.panelAddContact.addClass('open');
            }, 300);

        });

        this.el.btnClosePanelEditProfile.on('click', e => {

            this.el.panelEditProfile.removeClass('open');

        });

        this.el.btnClosePanelAddContact.on('click', e => {

            this.el.panelAddContact.removeClass('open');

        });

        this.el.photoContainerEditProfile.on('click', e => {

            this.el.inputProfilePhoto.click();

        });

        this.el.inputNamePanelEditProfile.on('keypress', e => {

            if (e.key === 'Enter') {

                e.preventDefault();
                this.el.btnSavePanelEditProfile.click();

            };

        });

        this.el.btnSavePanelEditProfile.on('click', e => {

            console.log(this.el.inputNamePanelEditProfile.innerHTML)

        });

        this.el.formPanelAddContact.on('submit', e => {

            e.preventDefault();
            let formData = new FormData(this.el.formPanelAddContact);

        });

        this.el.contactsMessagesList.querySelectorAll('.contact-item').forEach((item) => {

            item.on('click', e => {

                this.el.home.hide();
                this.el.main.css({
                    display: 'flex'
                });

            });

        });

        this.el.btnAttach.on('click', e => {

            e.stopPropagation();
            this.el.menuAttach.addClass('open');
            document.addEventListener('click', this.closeMenuAttach.bind(this));

        });

        this.el.btnAttachPhoto.on('click', e => {

            this.el.inputPhoto.click();

        });

        this.el.inputPhoto.click('change', e => {

            [...this.el.inputPhoto].files.forEach(file => {

                console.log(file);

            });

        });

        this.el.btnAttachCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelCamera.addClass('open');
            this.el.panelCamera.css({
                'height': 'calc(100% - 120px)'
            });
            // instanciando minha camera e passando o elemento onde o video vai ser executado
            this._camera = new CameraController(this.el.videoCamera);

        });

        this.el.btnClosePanelCamera.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
            //quando fechar o painel a camera será parada
            this._camera.stop();

        });

        this.el.btnTakePicture.on('click', e => {
            // chamando o metodo quando eu clicar no botão de tirar a foto
            // com isso ele me retorna a imagem
            let dataUrl = this._camera.takePicture();
            // passando a imagem que veio do takePicture para dentro do meu elemento
            this.el.pictureCamera.src = dataUrl;
            // agora eu mostro o meu elemento com a minha imagem
            this.el.pictureCamera.show();
            // ocultando o video
            this.el.videoCamera.hide();
            // aparecendo o botão para tirar a foto novamente 
            this.el.btnReshootPanelCamera.show();
            // ocultar o botão de tirar a foto
            this.el.containerTakePicture.hide();
            // mostrar o botão de enviar a foto
            this.el.containerSendPicture.show();

        });

        this.el.btnReshootPanelCamera.on('click', e => {

            this.el.pictureCamera.hide();
            this.el.videoCamera.show();
            this.el.btnReshootPanelCamera.hide();
            this.el.containerTakePicture.show();
            this.el.containerSendPicture.hide();

        });

        //Enviar a foto
        this.el.btnSendPicture.on('click', e => {
            console.lof(this.el.pictureCamera.src);
        });

        this.el.btnAttachDocument.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelDocumentPreview.addClass('open');
            this.el.panelDocumentPreview.css({
                'height': 'calc(100% - 120px)'
            });
            this.el.inputDocument.click();

        });

        // O evento change é acionado quando o valor de um elemento de entrada (<input>) muda.
        this.el.inputDocument.on('change', e => {
            // se o input for true ele executa o codigo abaixo
            if (this.el.inputDocument.files.length) {

                this.el.panelDocumentPreview.css({
                    'height': '1%'
                });
                // file recebe os files que vem no pc do usuário
                let file = this.el.inputDocument.files[0];
                // crio um atributo que vai receber a minha classe para mostrar o documentos na tela
                // a classe recebe como paramentro o meu file para tratar o arquivo
                this._documentPreviewController = new DocumentPreviewController(file);
                //retorno da minha promessa
                this._documentPreviewController.getPreviewData().then(result => {

                    this.el.imgPanelDocumentPreview.src = result.src;
                    // incluo o nome do arquivo 
                    this.el.infoPanelDocumentPreview.innerHTML = result.info;
                    this.el.imagePanelDocumentPreview.show();
                    this.el.filePanelDocumentPreview.hide();

                    this.el.panelDocumentPreview.css({
                        'height' : 'calc(100% - 120px)'
                    });

                }).catch(err => {

                    this.el.panelDocumentPreview.css({
                        'height' : 'calc(100% - 120px)'
                    });

                    switch (file.type) {
                        case 'application/nd.ms-excel':
                        case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-xls';
                            break;

                        case 'application/vnd.ms-powerpoint':
                        case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-ppt';
                            break;

                        case 'application/msword':
                        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-doc';
                            break;
                        // Se não for nenhum dos arquivos de cima, cai nesse default com uma imagem padrão
                        default:
                            this.el.iconPanelDocumentPreview.className = 'jcxhw icon-doc-generic';
                            break;
                    }

                    this.el.filenamePanelDocumentPreview.innerHTML = file.name
                    this.el.imagePanelDocumentPreview.hide();
                    this.el.filePanelDocumentPreview.show();
                }

                );

            }
        });
        // fecha o elemento de escolher os documentos
        this.el.btnClosePanelDocumentPreview.on('click', e => {

            this.closeAllMainPanel();
            this.el.panelMessagesContainer.show();
        })
        // envia o documento
        this.el.btnSendDocument.on('click', e => {

        })
        // mostra os contatos
        this.el.btnAttachContact.on('click', e => {

            this.el.modalContacts.show()

        });
        // retira o modal dos contatos
        this.el.btnCloseModalContacts.on('click', e => {

            this.el.modalContacts.hide()

        });
        // inicia a gravação do audio
        this.el.btnSendMicrophone.on('click', e => {

            this.el.recordMicrophone.show();
            this.el.btnSendMicrophone.hide();
            this.startRecordMicrophoneTime();

            this._microphoneController = new MicrophoneController();

        });
        // cancela o audio
        this.el.btnCancelMicrophone.on('click', e => {

            this._microphoneController.stop();
            this.closeRecordMicrophone();

        });
        //envia o audio
        this.el.btnFinishMicrophone.on('click', e => {

            this._microphoneController.stop();
            this.closeRecordMicrophone();

        });

        // ao precionar enter executa o if e da um console do valor digitado e limpa o campo de texto
        this.el.inputText.on('keypress', e => {

            if (e.key === 'Enter' && !e.ctrlKey) {

                e.preventDefault();
                this.el.btnSend.click();

            }

        });


        // quando qualquer tecla for solta ele faz a validação se o inputText está true ou false
        // se for true executa o primeiro if 
        this.el.inputText.on('keyup', e => {

            if (this.el.inputText.innerHTML.length) {

                this.el.inputPlaceholder.hide();
                this.el.btnSendMicrophone.hide();
                this.el.btnSend.show();

            } else {

                this.el.inputPlaceholder.show();
                this.el.btnSendMicrophone.show();
                this.el.btnSend.hide();
            }

        });

        this.el.btnSend.on('click', e => {

        });

        // configurando o botão para abrir e fechear os emojis
        this.el.btnEmojis.on('click', e => {

            this.el.panelEmojis.classList.toggle('open');

        });

        // ao clicar no emoji ele aparece no console
        // faz um forEach de cada emoji e configurando o evento para que ele busque o emoji clicado e
        // exiba no console
        this.el.panelEmojis.querySelectorAll('.emojik').forEach(emoji => {

            emoji.on('click', e => {
                // img recebe o clone do emoji para adicionar ao texto
                let img = this.el.imgEmojiDefault.cloneNode();
                // neste trecho copio o estilo css, o dataset unicode que seria o emoji
                img.style.cssText = emoji.style.cssText;
                img.dataset.unicode = emoji.dataset.unicode;
                img.alt = emoji.dataset.unicode;
                // busca o nome da classe do emoji e adicionar na img o nome da classe do emoji
                emoji.classList.forEach(name => {
                    img.classList.add(name);
                });

                //Localizar o cursor 
                let cursor = window.getSelection();
                // se o campo que o user estiver digitando não for o inputText ele foca no inputText
                if (!cursor.focusNode || !cursor.focusNode.id == 'input-text') {
                    this.el.inputText.focus();
                    cursor = window.getSelection();
                }
                // cria um intervalo para manipular o texto
                let range = document.createRange();
                // busca a posição atual do cursor
                range = cursor.getRangeAt(0);
                // limpa o texto selecionado pelo user
                range.deleteContents();
                // cria um documento vazio para incluir depois no campo texto
                let frag = document.createDocumentFragment();

                frag.appendChild(img);
                // coloca a imagem do fragmento na posição exata
                range.insertNode(frag);
                // ajusta o cursor para depois da imagem incluida
                range.setStartAfter(img);
                // força com que o javascript execute o evento ao clicar ou soltar o botão
                this.el.inputText.dispatchEvent(new Event('keyup'));

            });

        });


    }

    // contato o tempo do audio
    startRecordMicrophoneTime() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.el.recordMicrophoneTimer.innerHTML = Format.toTime((Date.now() - start));

        }, 1000)

    }

    closeRecordMicrophone() {

        this.el.recordMicrophone.hide();
        this.el.btnSendMicrophone.show();
        clearInterval(this._recordMicrophoneInterval);

    }

    closeAllMainPanel() {

        this.el.panelMessagesContainer.hide();
        this.el.panelDocumentPreview.removeClass('open');
        this.el.panelCamera.removeClass('open');

    }

    closeMenuAttach(e) {

        document.removeEventListener('click', this.closeMenuAttach);
        this.el.menuAttach.removeClass('open');

    }

    closeAllLeftPanel() {

        this.el.panelEditProfile.hide();
        this.el.panelAddContact.hide();

    }

}