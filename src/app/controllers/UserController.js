import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET

class UserController {
    async index(req, res) {
        const row = await UserRepository.findAll()
        res.json(row)
    }

    async show (req, res) {
        const id = req.params.id
        const row = await UserRepository.findById(id)
        res.json(row)
    }

    async store (req, res) {
        const saltRounds = 10;
        const {name, email, password} = req.body
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        if(!name || !email || !password) {
            return res.status(400).json({message: 'Preencha todos os campos'})
        }

        const existingUser = await UserRepository.findByEmail(email)
        if(existingUser) {
            return res.status(409).json({message: 'Email já cadastrado'})
        }

        const user = {
            name,
            email, 
            password: hashedPassword
        }

        const row = await UserRepository.create(user)

        return res.status(201).json(row)
    }

    async login (req, res) {
        const {email, password} = req.body
        
        if (!email || !password) return res.status(400).json({message: 'Preencha todos os campos'})

        const user = await UserRepository.findByEmail(email)
        if (!user) return res.status(404).json({message: 'Usuário não encontrado'})

        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (!isPasswordValid) return res.status(401).json({message: 'Senha incorreta'})

        const token = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: '1h'})

        return res.status(200).json({user, token})

    } 

    async update (req, res) {
        console.log(req.body)
        const user = req.body
        const id = req.params.id
        const row = await UserRepository.update(user, id)
        console.log(row)
        res.json(row)
    }

    async delete (req, res) {
        const id = req.params.id
        const row = await UserRepository.delete(id)
        res.json(row)
    }
}

export default new UserController