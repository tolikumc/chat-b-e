import mongoose, {Schema, Document} from 'mongoose';
import isEmail from 'validator/lib/isEmail';

interface IUser extends Document{
    email: string,
    fullName: string,
    password: string,
    confirmed: boolean,
    avatar: string,
    confirm_hash: string,
    last_seen: Date
}


const UserSchema = new Schema({
    email: {type: String, required: 'Email is required', validate: [isEmail, 'Invalid email'], unique: true},
    fullName: {type: String, required: 'Name is required'},
    password: {type: String, required: 'Password is required'},
    confirmed: {type: Boolean, default: false},
    confirmed_hash: String,
    avatar: String,
    last_seen: Date

}, {
    timestamps: true
});

const UserModel = mongoose.model<IUser>('User', UserSchema);

export default UserModel;