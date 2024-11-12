




export class UpdateTodoDto{
    

    private constructor( // al ponerlo como privado solo se puede llamar dentro de la misma clase
        public readonly id: number,
        public readonly text:string,
        public readonly createdAt?: Date,
    ){}

    // devuelve objeto con arreglo de llaves : valor
    get values(){ // este es el modelo del objeto para la data en el prima.object.update({data:returnObj})
        const returnObj : {[key:string]:any} ={};

        if (this.text) returnObj.text=this.text;
        if(this.createdAt) returnObj.createdAt = this.createdAt;

        return returnObj;
    }

// el created recibira una objeto dentro de el un arreglo o conjunto de llaves valor.
    static create( props:{ [key:string]:any } ) : [string?,UpdateTodoDto?]{ // se pone estatica para q esta clase se pueda llamar de cualquie lado y de aqui se llaame al constructor
 
        const {id,text,createdAt}=props;
        let newCreatedAt = createdAt;

        if (!id || isNaN( Number(id) ) ){
            return [ 'id must be a valid number' ]
        }

        if(createdAt){
            newCreatedAt = new Date(createdAt);
            if(newCreatedAt.toString()==='Invalid Date'){
                return['CreatedAt must be a valid date']
            }
        }




        return[undefined,new UpdateTodoDto(id,text,newCreatedAt)];
    }
}