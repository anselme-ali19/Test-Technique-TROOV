import User from '../../entities/User'
import bcrypt  from 'bcryptjs'
interface IUser {
    _id? : number,
    email: string,
    password: string
}

export class UserDao {
    // create user

    public static async create(user : IUser) {
        const existingUser  = await User.findOne({email : user.email}).exec()
        if(existingUser) {
            throw new Error(`UserAlreadyExists--${existingUser.email}`)
        }
        // Encryption of the string password
        const newUser = user
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        newUser.password=hash
        return await (new User(newUser)).save()
    }

    // login
    public static async login(user: IUser) {
        const existingUser  = await User.findOne({email : user.email}).exec()
        if(!existingUser) {
            throw new Error(`UserDontExist--${user.email}`)
        }
        // decrypt user password
        if(!bcrypt.compareSync(user.password, existingUser.password)){
            throw new Error('BadPassword')
        }
        return await existingUser
    }

    // reset user password
    public static async resetPassword (email : string, password : string) {
        const existingUser  = await User.findOne({email : email}).exec() 
        if(!existingUser) {
            throw new Error(`UserDontExist--${email}`)
        } 

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        existingUser.password = hash
        return await existingUser.save()
    }
}