export class FormMessage {

    key: string = '';
    verb: string = '';
    keyMessage: string = '';
    characters: number = 0;

    getMessage(){

        if(this.characters > 0){
            return this.key + ' ' + this.keyMessage + ' ' + this.characters;
        }else{
            if(this.verb){
                return this.key + ' ' + this.verb + ' ' + this.keyMessage;
            }else{
                return this.key + ' ' + this.keyMessage;
            }
        }
        
        
    }

    setKey(key: string){
        this.key = key;
    }

    getKey(){
        return this.key;
    }

}