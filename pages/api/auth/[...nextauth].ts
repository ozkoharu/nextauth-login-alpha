import NextAuth from 'next-auth'
import  CredentialProvider  from 'next-auth/providers/credentials';


export default NextAuth({
    providers: [
        CredentialProvider({
            name: "credentials",
            credentials: {
                username: { 
                    label: "Email",
                    type: "text", 
                    placeholder: "watanabe@test.com",
                },
                password: { label: "Password", type: "password"},
            },
            authorize: (credentials) => {
                //database look up
                if (credentials.username === "watanabe" && credentials.password === "test") {
                    return {
                        id: 2,
                        name: "watanabe",
                        email: "watanabe@test.com",
                    };
                }

                //login failed
                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }) => {
            // first time jwt callback is run, user object is available
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                session.id = token.id;
            }
            return session;
        }
    },
    secret: "test",
    jwt: {
        secret: "test",
        encryption: true,
    },

});