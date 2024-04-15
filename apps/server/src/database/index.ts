import mongoose from "mongoose";

export const connectToDatabase = async () => {
    try {
        const host = process.env.MONGO_HOST as string;
        const db = process.env.MONGO_DB as string;
        const conn = await mongoose.connect(`${host}/${db}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log(`🍃 Database Established connection with MongoDB`);
        console.log(`@-${conn.connection.host}`)
    } catch (error: any) {
        console.error(`❌ Database Connection failed`);
        console.error(error.message);
        process.exit(1);
    }
}