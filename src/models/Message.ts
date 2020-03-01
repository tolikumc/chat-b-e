import mongoose, {Schema, Document} from 'mongoose';

interface IMessage extends Document {
    user:{
        type: Schema.Types.ObjectId,
        required: boolean
    }
    text: {
        type: string,
        required: boolean,
        ref: string
    },
    unread: {
        type: boolean,
        default: boolean
    },
    dialog: {
        type: Schema.Types.ObjectId,
        ref: string,
        required: boolean
    }
}


const MessageSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    text: {type: String, required: true},
    unread: {type: false, default: false},
    dialog: {
        type: Schema.Types.ObjectId,
        ref: 'Dialog',
        required: true
    }
}, {
    timestamps: true
});

const MessageModel = mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;