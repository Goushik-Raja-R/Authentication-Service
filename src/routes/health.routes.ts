import {Router} from 'express';

const router = Router();

router.get("/",(req,res)=>{
    res.json({
        message:"Authentication Service Running in Health"
    })
})

export default router;