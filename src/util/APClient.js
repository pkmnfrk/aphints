
export default class APClient {
    /**
     * @type {WebSocket}
     */
    #socket;
    roomInfo;
    dataPackage;
    #listeners = {};

    connect(server, port) {
        return new Promise((resolve, reject) => {
            const onSecureConnectError = ((e) => {
                console.error("Can't connect on WSS, trying WS", e);
                this.#socket = new WebSocket(`ws://${server}:${port}`);
                this.#socket.addEventListener("message", onMessage);
                this.#socket.addEventListener("error", onInsecureConnectError)
                this.#socket.addEventListener("open", onOpen)
            }).bind(this);

            const onInsecureConnectError = ((e) => {
                console.error("Can't connect on WS either", e);
                this.#socket = null;
                reject(e);
            }).bind(this);

            const onOpen = (() => {
                this.#socket.removeEventListener("error", onSecureConnectError);
                this.#socket.removeEventListener("error", onInsecureConnectError);

                this.addSingleEventListener("RoomInfo", (message) => {
                    delete message.cmd;
                    this.roomInfo = message;

                    this.sendMessage({
                        cmd: "GetDataPackage",
                        games: message.games,
                    });

                    this.addSingleEventListener("DataPackage", (message) => {
                        delete message.cmd;
                        this.dataPackage = message;
    
                        this.#dispatch("connected");
                    })
                })


                resolve();
            }).bind(this);

            const onMessage = this.#onMessage.bind(this);

            this.#socket = new WebSocket(`wss://${server}:${port}`);
            this.#socket.addEventListener("message", onMessage);
            this.#socket.addEventListener("error", onSecureConnectError);
            this.#socket.addEventListener("open", onOpen);
        })
    }

    authenticate(game, user) {
        this.sendMessage({
            password: "",
            cmd: "Connect",
            game,
            name: user,
            uuid: "4b8eadc0-12a7-4750-99fa-c34bbe60ffa9",
            version: {
                major: 0,
                minor: 4,
                build: 2,
                class: "Version",
            },
            items_handling: 0b011,
            tags: ["Tracker", "Hints"],
            slot_data: true,
        });
        
        this.addSingleEventListener("Connected", (message) => {
            this.#dispatch("authenticated");
        })
    }

    #onMessage(e) {
        const messageBundle = JSON.parse(e.data);
        if(Array.isArray(messageBundle)) {
            for(const message of messageBundle) {
                console.log("from server", message);

                this.#dispatch(message.cmd, message);
            }
        }
        
    }

    disconnect() {
        if(this.#socket && this.#socket.readyState == this.#socket.OPEN) {
            this.#socket.close();
            this.socket = null;
        }
    }

    #dispatch(event, message) {
        if(!(event in this.#listeners)) {
            return;
        }

        const toRemove = [];
        for(const listener of this.#listeners[event]) {
            listener(message);
            if(listener.single) {
                toRemove.push(listener);
            }
        }

        for(const listener of toRemove) {
            this.removeEventListener(event, listener);
        }
    }

    sendMessage(data) {
        console.log("to server", data);
        this.#socket.send(JSON.stringify([data]));
    }

    addEventListener(event, handler) {
        if(!(event in this.#listeners)) {
            this.#listeners[event] = [];
        }

        this.#listeners[event].push(handler);
    }

    addSingleEventListener(event, handler) {
        handler.single = true;
        this.addEventListener(event, handler);
    }

    removeEventListener(event, handler) {
        if(!(event in this.#listeners)) {
            return;
        }

        let ix = this.#listeners[event].indexOf(handler);
        while(ix !== -1) {
            this.#listeners[event].splice(ix, 1);
            ix = this.#listeners[event].indexOf(handler);
        }
    }
}