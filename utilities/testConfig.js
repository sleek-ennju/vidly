const config = require('config');
const debug = require('debug')("testConfig:app");
const debugDb = require('debug')("testConfig:db");


const projectName = config.get("name");
const projectPassword = config.get("mail.password");
debug(projectName);
debug(projectPassword);
debugDb(projectPassword);