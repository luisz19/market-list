import UserRepository from "../repositories/UserRepository.js";
import bcrypt from 'bcrypt';

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

        const user = {
            name,
            email, 
            password: hashedPassword
        }

        const row = await UserRepository.create(user)

        return res.status(201).json(row)
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