export default class LinkedList {
    constructor(head = null) {
        this.head = head; //nodo iniziale-->testa
        this.tail = head; //nodo finale --> coda, indirizzato alla testa
    }

    //aggiungo nodo alla fine della lista
    addNode(node) {
        if (this.tail) {

            //prendo il nodo precedente e lo collego alla coda attuale
            node.prev = this.tail;

            //collego il nodo successivo della cosa al nuovo nodo
            this.tail.next = node;
        }

        //nuovo nodo come ultimo nodo-->coda
        this.tail = node;
    }

    get end() {
        return this.tail;
    }
}
 