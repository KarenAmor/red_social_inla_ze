import mongoose from 'mongoose';
const connectDB = async () => {
	await mongoose.connect(process.env.ATLAS_URI!);
	console.log('MongoDb Connected');
};
export default connectDB;