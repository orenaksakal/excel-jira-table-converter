/**
 * 19.01.2018 by Oren Aksakal
 * Excel to JIRA Converter, written in like 15min;
 * inspired from an internet resource, feel free to contribute.
 */
// main functionality
function excelToJira() {
    var text = document.querySelector('#text-given').value;
    var columns;
    var splitter;
    var divider;
    var columnTrim;
    switch (document.querySelector('#delimiter').value) {
        case 'comma':
            splitter = /,/g;
            text = text.replace(/,/g, ' ,');
            break;
        case 'semicolon':
            splitter = /;/g;
            text = text.replace(/;/g, ' ;');
            break;
        case 'tab':
        default:
            splitter = /\t/g;
            text = text.replace(/\t/g, ' \t');
            break;
    }
    text = text.replace(/\n/g, ' \n');
    text = text.split('\n');

    for (var i = 0; i < text.length; i++) {
        divider = i === 0 ? '|' : '|';

        text[i] = divider + text[i].replace(splitter, divider) + divider;
        columns = text[i].split(divider);
        for (var j = 0; j < columns.length; j++) {
            columnTrim = columns[j].trim();
            if (columnTrim === 'NULL') {
                columnTrim = '_' + columnTrim + '_';
            }
            columns[j] = columnTrim !== '' ? columnTrim : ' ';
        }
        text[i] = columns.join(divider).trim();
    }
    text = text.join("\r\n");

    // insert results
    document.querySelector('#result').innerHTML = text;
}

// run function on input
document.querySelector('#text-given').addEventListener('input', function () {
    excelToJira();
});

// selection helper
document.querySelector('#result').addEventListener('click', function () {
    document.querySelector('#result').select();
});
