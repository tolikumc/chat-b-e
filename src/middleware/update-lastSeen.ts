import {UserModel} from "../models";
import express from 'express';


export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
  UserModel.findByIdAndUpdate({_id: 'sdds'}, {last_seen: new Date()}, {new: true}, () => {
  });

  next();
}