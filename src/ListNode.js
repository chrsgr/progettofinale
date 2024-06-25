export default class ListNode {

    next = null;
    prev = null; //precedente

    constructor (data){
        this.data = data;  // dati memorizzati nel nodo
        
    }

    //coda serpente
    LinkTo(node){
        this.next = node; //nodo successivo 
        node.prev = this;  //nodo precendete a quello corrente
    }
}