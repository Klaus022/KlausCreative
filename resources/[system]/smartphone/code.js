var db_code = require('./config.json');

let dbdrv = db_code.db_driver

createDB();

function createDB()
{
    if(dbdrv == '')
    {
        console.error("Não foi encontrado um sistema de banco de dados, o smartphone  GHMattiMySQL")
        dbdrv = 'GHMattiMySQL'
        //return;
    }
    else if(dbdrv == 'oxmysql')
    {
        exports.oxmysql.execute("CREATE TABLE IF NOT EXISTS smartphone_extracts(id INTEGER AUTO_INCREMENT,user_id INTEGER,extrato VARCHAR(255),data VARCHAR(255),PRIMARY KEY (`id`),KEY `id` (`id`))ENGINE=InnoDB DEFAULT CHARSET=latin1;")
    }
    else if(dbdrv == 'ghmattimysql')
    {
        return global.exports.ghmattimysql.execute("CREATE TABLE IF NOT EXISTS smartphone_extracts(id INTEGER AUTO_INCREMENT,user_id INTEGER,extrato VARCHAR(255),data VARCHAR(255),PRIMARY KEY (`id`),KEY `id` (`id`))ENGINE=InnoDB DEFAULT CHARSET=latin1;")
    }
    else if(dbdrv == 'GHMattiMySQL')
    {
        return global.exports.ghmattimysql.execute("CREATE TABLE IF NOT EXISTS smartphone_extracts(id INTEGER AUTO_INCREMENT,user_id INTEGER,extrato VARCHAR(255),data VARCHAR(255),PRIMARY KEY (`id`),KEY `id` (`id`))ENGINE=InnoDB DEFAULT CHARSET=latin1;")
    }

    console.log("\033[1;34m[SMARTPHONE] Identificamos o seguinte banco de dados: " + dbdrv)
}