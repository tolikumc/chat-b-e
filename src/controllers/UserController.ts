import express from 'express';
import {UserModel} from "../schemas";

class UserController {
    //another user detail
    show(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.find(id, (err, user) => {
            if (err) {
                return res.status(404).json({
                    message: 'User not founded'
                })
            }
            res.json(user)
        })
    }

    //myself detail

    getMe() {
        //TODO functionality
    }

    create(req: express.Request, res: express.Response) {
        const postData = {
            email: req.body.email,
            fullName: req.body.fullName,
            password: req.body.password,
        };
        const user = new UserModel(postData);
        user.save().then((obj: object) => {
            res.json(obj)
        }).catch((err: any) => {
            res.json(err)
        })
    }

    //delete user
    delete(req: express.Request, res: express.Response) {
        const id: string = req.params.id;
        UserModel.findByIdAndRemove({_id: id}).then((user) => {
            if (user) {
                res.json({
                    message: `User ${user.fullName} removed`
                })
            }
        }).catch(() => {
            res.json({
                message: `User doesn't founded`
            })
        })
    }
}

export default UserController;