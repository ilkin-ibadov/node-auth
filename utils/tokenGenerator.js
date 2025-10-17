import jwt from "jsonwebtoken"

export const generateAccessToken = (user, res) => {
	const accessToken = jwt.sign({
		id: user._id, role: user.role
	},
    process.env.ACCESS_TOKEN_SECRET,
    {
		expiresIn: '1h'
	})

	res.cookie(
		"accessToken", accessToken, {
		httpOnly: true,
		maxAge: 15 * 60 * 1000
	}
	)

	return accessToken
}