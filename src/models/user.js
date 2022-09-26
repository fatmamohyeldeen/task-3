const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    //properties
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        //value --> email
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 20,
        validate(ageValue) {
            if (ageValue <= 0) {
                throw new Error('Age must be positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        validate(passwordValue) {
            if (passwordValue == "") {
                throw new Error('password mustnt contain spaces')

            }
            if (passwordValue.length < 8) {
                throw new Error('password must be 8 digits at least')

            }
            for (i = 0; i < passwordValue.length; i++) {
                if (passwordValue[i] == passwordValue[i].toUpperCase()) {
                    uppercase = true;

                } else {
                    throw new Error('password must has 1 uppercase digits at least')
                }
            }

        }

    },
    phone: {
        type: Number,
        required: true,
    }
})

userSchema.pre('save', async function() {

    if (this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password, 8)
    }

})

////////////////////////////////////////////////////////////////

userSchema.statics.findByCredentials = async(email, password) => {

        const user = await User.findOne({ email })
        console.log(user)

        if (!user) {
            throw new Error('Please check email or password')
        }
        const isMatch = await bcryptjs.compare(password, user.password)
        if (!isMatch) {
            throw new Error('Please check email or password')
        }
        return user
    }
    /////////////////////////////////////////////////////////////////////////////

userSchema.methods.generateToken = function() {

    const token = jwt.sign({ _id: this._id.toString() }, 'nodeAPI')
    return token
}


const User = mongoose.model('User', userSchema)
module.exports = User