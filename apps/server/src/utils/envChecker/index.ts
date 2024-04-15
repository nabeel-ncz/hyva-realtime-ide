export const envChecker = async () => {
    if (!process.env.MONGO_HOST) {
        throw new Error("Mongo host is required!");
    }
    if (!process.env.MONGO_DB) {
        throw new Error("Mongo db name is required!");
    }
    if(!process.env.GOOGLE_CLIENT_ID) {
        throw new Error("Google client id is required!");
    }
    if(!process.env.GOOGLE_CLIENT_SECRET) {
        throw new Error("Google client secret is required!");
    }
    if(!process.env.GOOGLE_REDIRECT_URL) {
        throw new Error("Google redirect url is required!");
    }
}