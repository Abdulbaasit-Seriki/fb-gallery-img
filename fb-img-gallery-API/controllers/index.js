const User = require('../models/User')

const getUserImg = async (req, res) => {

    const { id } = req.params
    if (!id) {
        res.status(401).json({
            success: false,
            err: {
                code: 401,
                msg: `Unauthorised Access, Please include a username`
            }
        })
    }
    try {
        const user = await User.findOne({ fbId: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                err: {
                    code: 404,
                    msg: `Oooppss!!, User with ${id} Not Found`
                }
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        console.log(err.message)
    }

}

const createUserImg = async (req, res) => {

    const { fbName, img, fbId } = req.body
    if (!fbName || !img || !fbId) {
        return res.status(400).json({
            success: false,
            err: {
                code: 400,
                msg: `Eroor, Missing Parameter`
            }
        })
    }

    try {
        const user = await User.findOne({ fbId })
        if (user) {
            return updateUserImg(req, res)
        }
        

        const newUser = await User.create({
            fbUserName: fbName,
            fbId,
            imgs: [img]
        })
        res.status(200).json({
            success: true,
            data: newUser
        })    
    } catch (err) {
        console.log(err.message)
        res.status(400).json({
            success: false,
            err: {
                code: err.code,
                msg: err.message
            }
        })
    }

}

const updateUserImg = async (req, res) => {

    const { fbName, img, fbId } = req.body
    if (!fbName || !img || !fbId) {
        return res.status(400).json({
            success: false,
            err: {
                code: 400,
                msg: `Error, Missing Parameter`
            }
        })
    }

    const user = await User.findOne({ fbId }).lean()
    const userObj = {...user}
    userObj.imgs.push(img)

    const updatedUser = await User.findOneAndUpdate({fbId}, userObj, {
        new: true
    }).lean()

    res.status(203).json({
        success: true,
        data: updatedUser 
    })

}

module.exports = {
    getUserImg,
    createUserImg,
    updateUserImg
}