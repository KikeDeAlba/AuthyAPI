import { Router } from "express";

export const authRouter = Router()

authRouter.get('/', (_, res) => {
    res.send('Auth Router');
})

authRouter.post('/register', async (req, res) => {

})

authRouter.post('/login', async (req, res) => {

})

authRouter.post('/refresh', async (req, res) => {

})

authRouter.get('/sessions', async (req, res) => {

})

authRouter.post('/logout', async (req, res) => {

})