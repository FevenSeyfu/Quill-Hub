import mongoose from 'mongoose'
// add jwt later

const userSchema = mongoose.Schema(
    {
        firstName : { type :String, required: true},
        lastName :  { type :String, required: true},
        birthDate :  { type : Date, required: true},
        profileImage : { type :String,},
        userName :  { type :String, required: true},
        email :  { type :String, required: true},
        password :  { type :String, required: true},
        registeredDate : { type : Date, default:Date.now}
    },
    {
        timestamps: true,
    }
)

export const User =  mongoose.model('User', userSchema)