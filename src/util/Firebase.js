import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export class Firebase {

    constructor() {
        this._config = {
            apiKey: "AIzaSyAbMJAqkj44SIPQHe7Cqk7ouiDsOuuouOU",
            authDomain: "whatssapp-clone-a31cf.firebaseapp.com",
            projectId: "whatssapp-clone-a31cf",
            storageBucket: "whatssapp-clone-a31cf.firebasestorage.app",
            messagingSenderId: "335772200172",
            appId: "1:335772200172:web:889f53b8efbe0acbfd09c9",
            measurementId: "G-S9FC7445BK"
        };
        this.init();
    }

    init() {
        if (!this._initializeApp) {
            Firebase._app = initializeApp(this._config);
            this._initializeApp = true;
        }
    }

    static db() {
        return getFirestore(Firebase._app);
    }

    static hd() {
        return getStorage(Firebase._app);
    }

}