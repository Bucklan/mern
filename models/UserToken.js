import mongoose, {Schema} from "mongoose";

const UserTokenSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, required: true},
    token: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, expires: 86400}
});