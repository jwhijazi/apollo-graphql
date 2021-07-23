This is a GraphQL NodeJS project using Apollo-Server-Express

JWT Token is added for authentication.
We wrote a middleware to fetch the token and verify it. if it's ok we added the userID from JwtPayload to req.userId.
So that req.userId can be used any where in the code.

https://www.youtube.com/watch?v=RUZB8tpyDbQ
#
Kindly read more about express sessions.
