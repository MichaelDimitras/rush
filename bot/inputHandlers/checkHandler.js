const checkHandler = (args, data) => {
    if (args.length !== 2) {
        return `ERROR: The check command should look like '!check [url]'`;
    }
    const url = args[1];

    const match = findUrlInData(data, url);
    if (match) {
        return `\nTarget price: ${match[0]}\nDescrption: ${match[2]}`
    } else {
        return `\n no listing found for that url`;
    }
}


const findUrlInData = (data, url) => {
    return data.find((item) => item[1] === url);
};


module.exports = checkHandler;