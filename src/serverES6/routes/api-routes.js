import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import assert from 'assert';

import Hotel from '../models/hotels';
import secret from '../jwt-config';


dotenv.config({silent: true});

const app = express.Router();

app.post(
	'/api/zomato',
	(req, res) => {
		const { results } = req.body;
		
		//console.log('the data ', results);




		Hotel.find(
			{},
			(err, docs) => {
				assert.equal( null, err,'Error while connecting!!');
				if(!err ){

					// console.log(docs[docs.length - 1]);

					let restaurants = docs.map(
						item => ({ id:item.id, attendees: item.attendees })
					);

					const payload = {
						data: results,
						attendance: restaurants
					};


					res.status(201).json(payload);
				}
			}
		);
	}
);



app.post(
	'/api/attend',
	(req, res, next) => {
		const { res_id, userID, token } = req.body;

		// console.log(userID, ' ',res_id, ' ',token);

		jwt.verify(
			token,
			secret,
			(err, decoded) => {
				if(!err){

					// console.log('aaaaaaaaaaaaaaaaaaaaa', decoded);

					Hotel.findOne(
						{
							id: res_id
						},
						(err, hotel) => {

							if(err) return next(err);

							let d = new Date();

							let today = 
								d.getDate().toString() + ' '+
								d.getMonth().toString()+' '+ 
								d.getFullYear().toString();

							if( hotel ){
								const present = item => item == userID;

								
								if(hotel.date !== today ){
									hotel.date = today;
									hotel.attendees = [];
								}

								if(hotel.attendees.find(present)){
									console.log('user not going');
									let index = hotel.attendees.findIndex(present);

									hotel.attendees.splice(index, 1);

									hotel.save(
										err => {
											if(err) throw err;
										}
									);
									res.end();
								}
								else{
									console.log('user going');
									hotel.attendees.push(userID);
									hotel.save(
										err => {
											if(err) throw err;
										}
									);
									res.end();
								}
								
							}

							else if(!hotel) {
								hotel = new Hotel(
									{
										id: res_id,
										attendees: [userID],
										date: today
									}
								);


								hotel.save(
									err => console.log(err)
								);

								res.end();
							}
						}
					);
				}
				else {
					res.status(401).send('User not Authenticated!!');
				}
			}
		);
	}
);

export default app;

