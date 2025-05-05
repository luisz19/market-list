import UserRepository from "../repositories/UserRepository"

class AuthController {
    async login(req, res) {
        const { email, password } = req.body

        const user = await UserRepository.findByEmail(email)

        if(!user) return res.status(404).json({'error': 'user not found'})

        
    }
}

export default new AuthController()