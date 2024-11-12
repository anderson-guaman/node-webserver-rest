
import { Request, Response } from "express"
import { prisma } from "../../data/postgres";
import { CreatedTodoDto, UpdateTodoDto } from "../../domain/dtos";



const todos = [
    {id:1, text: 'Buy milk',createdAt: new Date()},
    {id:2, text: 'Buy bread',createdAt: null },
    {id:3, text: 'Buy butter',createdAt: new Date()},
];

export class TodosController{

    //* DI
    constructor(){}


    public getTodos = async (req:Request, res:Response)=>{ // req and res of express

        // res.json(todos);
        const todos = await prisma.todo.findMany();      
        res.json(todos);
    };





    public getTodoById = async(req:Request, res:Response) =>{
        const id = +req.params.id;
        if( isNaN(id) ) res.status(400).json({error:'Id argument is not a number'});
        
        // const todo = todos.find( todo => todo.id === id );
        const todo = await prisma.todo.findUnique({
            where:{id : id},
        });


        // validacion si existe 
        ( todo )
        ? res.json(todo)
        : res.status(404).json({error:`TODO with id ${ id } not found`})
    };




    public createdTodo = async (req:Request,res:Response) =>{
        
        const [error,createTodoDto] = CreatedTodoDto.create(req.body);

        if( error) {
            res.status(400).json({error});
            return;
        }
        const todo = await prisma.todo.create({
            data: createTodoDto! // data:{text:text}
        });
        res.json(todo);
    };



    public updateTodo = async (req:Request, res:Response)=>{

        const id = +req.params.id;

        // ... req.body = igual como si abriera el contenido y lo pusiera como llave : valor
        const [error,updateTodoDto]=UpdateTodoDto.create({...req.body, id}); // envia el json de las peticion req y adjunta la key id con su valor
       
        if ( error ){
            res.status(400).json({error})
            return;
        };

        const todo = await prisma.todo.findFirst({
            where:{id}
        });

        if(!todo){
            res.status(404).json({error:`Todo with ${id} not found`})
            return;
        };
        
        const updateTodo = await prisma.todo.update({
            where:{id},
            data:updateTodoDto!.values
        });
        res.json( updateTodo );
    }





    public deleteTodo = async(req:Request, res:Response)=>{
        const id = +req.params.id;

        if( isNaN(id) ){
            res.status(400).json({error:'Id property is requared'})
            return; 
        }

        const todo = await prisma.todo.findFirst({
            where:{id}
        });


        if(!todo){
            res.status(400).json({error:`Todo with ${id} not found`})
            return;
        }
        
       const deletedTodo = await prisma.todo.delete({
        where: {id}
       });


       res.json(deletedTodo);
    }
}