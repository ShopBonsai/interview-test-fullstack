const fs = require('fs');

function report(resultData) {
    const content = {};

    try {
        content.results = [...JSON.parse(fs.readFileSync('./testResults.json', 'utf-8')).results];
    } catch(e) {
        console.log("Error retrieving previous test results: ", e);
    }
    
    content.results = [...content.results, resultData];

    try {
        fs.writeFileSync('./testResults.json', JSON.stringify(content));
    } catch(e) {
        console.log('Error writing new test results: ', e);
    }

    return resultData;
}

module.exports = report;