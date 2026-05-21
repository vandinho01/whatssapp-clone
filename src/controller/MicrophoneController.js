import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor() {
        // chama o construtor do pai dele (classEvent)
        super()
        // mimetype com o formato de audio
        this._mimeType = 'audio/webm'
        // valida se o audio está disponível
        this._available = false;
        // pegar o audio do dispositivo e solicita a permissão no navegador
        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream => {
            // microfone disponível
            this._available = true;
            // pegar o stream que vem da promessa do audio
            this._stream = stream
            // evento ready diz que eu já iniciei a gravação e na gravação eu gravo o stream
            this.trigger('ready', this._stream);

        }).catch(err => {
            console.error(err);
        });
    }
    // retorna se o microfone esta disponível
    isAvailable() {

        return this._available

    }
    // metodo para parar uma gravação
    stop() {
        this._stream.getTracks().forEach(track => {
            track.stop();
        });
    }
    // metodo para iniciar a gravação
    startRecorder() {
        // valida se inicou com o metodo
        if (this.isAvailable()) {
            // meu atributo recebe o MediaRecorder para gravação, passo meu stream e o objeto do mimetype
            this._mediaRecorder = new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });
            // com este atributo vou adicionar cada trecho do audio, quando inicio a gravação o MediaRecorder vai me 
            // enviando pedaços do audio, então eu coloco dentro de um array e depois juntos estar partes 
            // para gravar o audio inteiro
            this._recordedChunks = [];
            // evento que guarda os pedaços de audio
            this._mediaRecorder.addEventListener('dataavailable', e => {

                if (e.data.size > 0) this._recordedChunks.push(e.data);  // se o dado recebido for maior que 0 faz um push no array

            });
            // quando parar a gravação com o blob ele cria um arquivo binário do meu array e o formato que passei
            this._mediaRecorder.addEventListener('stop', e => {

                let blob = new Blob(this._recordedChunks, {
                    type: this._mimeType
                });
                // variavel que tem o nome do arquivo gerado
                let filename = `rec${Date.now()}.webm`;
                // file gera um arquivo do blob, com o nome, tipo do arquivo e a data da ultima modificação
                let file = new File([blob], filename, {
                    type: this._mimeType,
                    lastModified: Date.now()
                });

                console.log('file', file);

            });
            // chama a midia para gravar
            this._mediaRecorder.start()
            //chama a inicilização do timer
            this._startTimer()

        }

    }

    stopRecorder() {

        if (this.isAvailable()) {

            this._mediaRecorder.stop();
            this.stop();
            this.stopTimer();

        }

    }

    startTimer() {

        let start = Date.now();

        this._recordMicrophoneInterval = setInterval(() => {

            this.trigger('recordtimer', (Date.now() - start))

        }, 1000)

    }

    stopTimer(){
        clearInterval(this._recordMicrophoneInterval);
    }

}
