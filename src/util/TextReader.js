export default class TextReader {
    #text = "";
    #pos = 0;
    constructor(text) {
        this.#text = text;
    }

    readLine()
    {
        if(this.#pos >= this.#text.length) {
            return null;
        }

        let ret = "";

        while(this.#pos < this.#text.length) {
            let c = this.#text[this.#pos++];
            
            if(c === "\r") {
                // ignore it
            } else if(c === "\n") {
                break;
            } else {
                ret += c;
            }
        }

        return ret;
    }
}