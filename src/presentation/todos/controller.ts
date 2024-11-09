import { Request, Response } from "express"


const todos = [
    {id:1, text: 'Buy milk',createdAt: new Date()},
    {id:2, text: 'Buy bread',createdAt: null },
    {id:3, text: 'Buy butter',createdAt: new Date()},
];

export class TodosController{

    //* DI
    constructor(){}


    public getTodos = (req:Request, res:Response)=>{ // req and res of express
        res.json(todos);
    }





    public getTodoById = (req:Request, res:Response) =>{
        const id = +req.params.id;
        if( isNaN(id) ) res.status(400).json({error:'Id argument is not a number'});
        const todo = todos.find( todo => todo.id === id );
        // validacion si existe 
        ( todo )
        ? res.json(todo)
        : res.status(404).json({error:`TODO with id ${ id } not found`})
    }




    public createdTodo = async (req:Request,res:Response) =>{
        //  res.json('POST created todo')
        const {text} = req.body;

        if( !text ) {
            res.status(400).json({error:"Text property is required"});
            return;
        } 

        const newTodo={
            id: todos.length +1,
            text:text,
            createdAt: null,
        }

        todos.push(newTodo);
        res.json(newTodo);
    }





    public updateTodo = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if ( isNaN(id)){
            res.status(400).json({error:'Id property is requared'});
            return;
        }
        
        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            res.status(404).json({error:`Todo with ${id} not found` })
            return;
        }

        const {text,createdAt}=req.body;
        if(!text){
            res.status(400).json({error:'Text property is requared'})
            return;
        }
        
        todo.text = text || todo.text;

        (createdAt === null)
        ? todo.createdAt = null
        : todo.createdAt = new Date( createdAt || todo.createdAt);
        res.json(todo)
    }





    public deleteTodo = (req:Request, res:Response)=>{
        const id = +req.params.id;

        if( isNaN(id) ){
            res.status(400).json({error:'Id property is requared'})
            return; 
        }

        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            res.status(400).json({error:`Todo with ${id} not found`})
            return;
        }
        
       todos.splice(todos.indexOf(todo),1)
       res.json(todo);
    }
}