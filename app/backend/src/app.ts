import * as express from 'express';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;
express().listen(PORT,  () => console.log(`Service online in port ${PORT}`))
