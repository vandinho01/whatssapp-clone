export class CameraController{
    //Criando o contructor da classe que recebe o elemento do VideoEl
    constructor(videoEl){
        //Cria um tributo privado
        this._videoEl = videoEl;
        // api navigator para media, acessar a media do user com o getUserMedia
        //  passo o objeto video dizendo qual o tipo de midia
        // ele me retorna uma promessa
        // agora no then recebo o stream
        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{
            this._stream = stream
            this._videoEl.srcObject = stream;
            // força o video a tocar
            this._videoEl.play();

        }).catch(err=>{
            console.error(err);
        });
    }

    stop (){
        this._stream.getTracks().forEach(track=>{
            track.stop();
        });
    }

}