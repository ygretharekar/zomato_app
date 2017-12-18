import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import assert from 'assert';
import zomato from 'zomato';
import mongodb from 'mongodb';

import secret from '../jwt-config';
import hotels from '../models/hotels';

dotenv.config({silent: true});

const mongoClient = mongodb.MongoClient;

const url = process.env.MONGO_HOST;

const app = express.Router();

const client = zomato.createClient(
	{
		userKey: process.env.ZOMATO_API_KEY
	}
);

