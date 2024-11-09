import { Router } from "express";
import { TodosController } from './todos/controller';
import { TodoRoutes } from "./todos/routes";


export class AppRoutes{


    static get routes() : Router {

        const router = Router();
        
        const todosController = new TodosController();

        router.use('/api/todos',TodoRoutes.routes); //(req,res)=> todosController.getTodos(req,res) = todoController.getTodos
        // router.use('/api/auth',TodoRoutes.routes);
        // router.use('/api/products',TodoRoutes.routes);
        // router.use('/api/clients',TodoRoutes.routes);
        // router.use('/api/users',TodoRoutes.routes);

        return router;
    }
}