import {Router} from 'express';

const apiRouter = Router();apiRouter.get('/', (req, res)=>{
    res.json({
        "hey":"jude"
    })
});

export default apiRouter;