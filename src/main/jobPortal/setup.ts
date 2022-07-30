import dotenv from 'dotenv';
import path from 'path';

const profilesDirectory = path.resolve('./src/main/resources/profiles');

// @ts-ignore
process.env.NODE_CONFIG_DIR = profilesDirectory;
dotenv.config();

// nconf.file('dev', profilesDirectory + '/dev.cjs');