import mongoose from 'mongoose';

const schema = mongoose.Schema;

const hotelSchema = new schema(
	{
		id: String,
		attendees: Array,
		date: String
	}
);

const Hotel = mongoose.model('Hotel', hotelSchema);

export default Hotel;