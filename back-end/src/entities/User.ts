import {Schema, model} from 'mongoose';
import Counter from './Counter'

interface IUser {
    _id : number,
    email: string,
    password: string
}

const UserSchema = new Schema({
    _id : {type: Number} ,
    email : {type: String, required: true} ,
    password : {type: String, required: true} 
 })

 UserSchema.pre('save', async function (next) {
    const doc = this;
    try {
      if (!doc.isNew) return next(); 
  
      const counter = await Counter.findOneAndUpdate(
        { id: 'users' }, 
        { $inc: { seq: 1 } }, 
        { new: true, upsert: true } 
      ).lean();
  
      doc._id = counter.seq; 
      next();
    } catch (error) {
      next();
    }
  });

  const User = model<IUser>('User', UserSchema)
  
  export default User