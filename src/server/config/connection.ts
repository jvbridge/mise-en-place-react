import { connect, connection } from 'mongoose';

process.env.MONGODB_URI
  ? connect(process.env.MONGODB_URI, { dbName: 'miseEnPlace' })
  : connect('mongodb://127.0.0.1:27017/miseEnPlace');

export default connection;
