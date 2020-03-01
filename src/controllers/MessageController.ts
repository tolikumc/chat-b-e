import express from 'express';
import {MessageModel} from "../models";

class MessageController {
    //all dialogs
    index(req: express.Request, res: express.Response) {
        const dialogId: string = req.query.dialog;
        MessageModel
            .find({dialog: dialogId})
            .populate('dialog')
            .exec((err, messages) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Messages not found'
                    })
                }
                return res.json(messages)
            })
    }
    // create dialog
    create(req: express.Request, res: express.Response) {
        const postData = {
            text: req.body.text,
            dialog: req.body.dialog_id,
            user: req.body.user
        };
        const message = new MessageModel(postData);

        message.save().then((obj: object) => {
            res.json(obj)
        }).catch((err: any) => {
            res.json(err)
        })
    }

    //delete message
    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        MessageModel.findByIdAndRemove({_id: id}).then((message) => {
            if (message) {
                res.json({
                    message: `Message removed`
                })
            }
        }).catch(() => {
            res.json({
                message: `Message doesn't founded`
            })
        })
    }
}

export default MessageController;