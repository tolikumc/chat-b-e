import express from 'express';
import {DialogModel, MessageModel} from "../models";

class DialogController {
    //all dialogs
    index(req: express.Request, res: express.Response) {
        const authorId: string = req.params.id;
        DialogModel
            .find({author: authorId})
            .populate('author', 'partner')
            .exec((err, dialogs) => {
                if (err) {
                    return res.status(404).json({
                        message: 'Dialogs not found'
                    })
                }
                return res.json(dialogs)
            })
    }

    //create dialog
    create(req: express.Request, res: express.Response) {
        const postData = {
            author: req.body.author,
            partner: req.body.partner
        };
        const dialog = new DialogModel(postData);

        dialog.save().then((dialogObj: any) => {
            const message = new MessageModel({
                text: req.body.text,
                dialog: dialogObj._id,
                user: req.body.author
            });

            message.save().then(() => {
                res.json(dialogObj);
            }).catch((err: any) => {
                res.json(err)
            })
        }).catch((err: any) => {
            res.json(err)
        })
    }

    //delete dialog
    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        DialogModel.findByIdAndRemove({_id: id}).then((dialog) => {
            if (dialog) {
                res.json({
                    message: `Dialog removed`
                })
            }
        }).catch(() => {
            res.json({
                message: `Dialog doesn't founded`
            })
        })
    }
}

export default DialogController;