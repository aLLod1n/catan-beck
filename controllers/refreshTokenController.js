const Player = require('../models/Player');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const generateToken = require('../config/generateToken');

dotenv.config();

const refreshToken = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(401).json({ "message": "Unauthorized" });
    
    const refresh_token = cookies.jwt;
    /*res.clearCookie(
        'jwt', 
        { 
            httpOnly: true,
            sameSite: 'None',
            secure: true
        }
    );*/

    const player = await Player.find({ refresh_token });

    jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err || player[0]?._id.toString() !== decoded.UserInfo._id) {
                return res.status(403).json({ "message": "Forbidden" });
            }

            const roles = Object.values(player[0]?.roles);
            const access_token = generateToken(
                {
                    "UserInfo": {
                        "_id": decoded.UserInfo._id, 
                        "roles": roles
                    }
                },
                "access_token", 
                "30d"
            );
            
            res.json({ roles, access_token });
        }
    )
};

module.exports = {
    refreshToken
}