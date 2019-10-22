// ==UserScript==
// @name         AWS Label Shortener
// @namespace    https://github.com/BenDutton
// @version      1.1.0
// @description  Shorten AWS Header Labels
// @author       Benjamin Dutton
// @match        https://*.console.aws.amazon.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function () {
    let replaceLabel = function (item) {

        let outputString = item.innerHTML;

        const stringsToRemove = ['AWS', 'Amazon'];
        for (let string of stringsToRemove) {
            outputString = outputString.replace(new RegExp(string, 'g'), '');
        }

        outputString = outputString.trim();

        let acronymRegex = outputString.match(/\(\w+\)/g);
        if (acronymRegex) {
            outputString = acronymRegex[0].replace(/[()]/g, '')
        } else {
            outputString = outputString.replace(/[a-z\s]/g, '');
        }

        if (outputString.length > 1) {
            outputString = outputString.slice(0, 5);
        } else if (outputString.length > 5) {
            outputString = `${outputString.slice(0, 5)}..`;
        }

        item.innerHTML = outputString;
    };

    document.querySelectorAll("#nav-menubar .service-label").forEach(replaceLabel);

    window.dispatchEvent(new Event("resize"));
})
();
