import mongoose, {Schema, Document} from 'mongoose';

interface IDialog extends Document{
    author: {
        type: Schema.Types.ObjectId,
        ref: string
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: string
    },
    lastMessage: {
        type: Schema.Types.ObjectId,
        ref: string
    },
}


const DialogSchema = new Schema({
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    partner: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    lastMessage: {type: Schema.Types.ObjectId, ref: 'Message'}
}, {
    timestamps: true
});

const DialogModel = mongoose.model<IDialog>('Dialog', DialogSchema);

export default DialogModel;