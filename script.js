// ==UserScript==
// @name         AWS Label Shortener
// @namespace    https://github.com/BenDutton
// @version      1.0
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

        let capitalString = outputString.replace(/[a-z\s]/g, '');

        if (capitalString.length > 1) {
            outputString = capitalString.slice(0, 3);
        } else if (outputString.length > 5) {
            outputString = `${outputString.slice(0, 3)}..`;
        }

        item.innerHTML = outputString;
    };

    document.querySelectorAll("#nav-menubar .service-label").forEach(replaceLabel);

    window.dispatchEvent(new Event("resize"));
})
();