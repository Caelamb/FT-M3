const fs = require("fs");
const utils = require("../utils/request");
const process = require("process");


function pwd(print) {
    print(process.cwd());
};

function date(print) {
    print(date());
};

function echo(print, args) {
    print(args);
};

function ls(print) {
    fs.readdir(`.`,(error, files)=>{
    if(error) throw error;
    print(files.toString())
    })
};

function cat(print, args) {
    fs.readdir(args,"utf-8", (error,data) =>{
        if(error) throw error;
        print(data);
    })
};

function head(print, args) {
    fs.readdir(args, "utf-8", (error,data) =>{
        if(error) throw error;
        const lines = data.split('\n').slice(0, 8).join('\n');
        print(lines); 
    })
}

function tail(print, args) {
    fs.readdir(args, "utf-8", (error,data) =>{
        if(error) throw error;
        const lines = data.trim().split('\n');
        const lastLine = lines[lines.length - 1];
         print(lastLine);
    })
}

function curl(print, args) {
    utils.request(args,(error, response) => {
        if(error) throw error;
        print(response.data)
    })
};

module.exports = {
    pwd,
    date,
    echo,
    ls,
    cat,
    head,
    tail,
    curl
};
