


export class CreatedTodoDto{
    

    private constructor( // al ponerlo como privado solo se puede llamar dentro de la misma clase
        public readonly text:string,
    ){}



    static create(props:{[key:string]:any}) : [string?,CreatedTodoDto?]{ // se pone estatica para q esta clase se pueda llamar de cualquie lado y de aqui se llaame al constructor
 
        const {text}=props;

        if(!text) return ['text property is requared',undefined]

        return[undefined,new CreatedTodoDto(text)];
    }
}