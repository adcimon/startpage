"use strict";

function main()
{
    let container = document.querySelector(".item-container");

    let tabindex = 3;
    Links.forEach(link =>
    {
        let cell = createCell(tabindex);

        let a = cell.querySelector("a");
        a.style.background = link.background;
        a.href = link.url;
        a.target = link.target;

        let img = a.querySelector("img");
        img.src = link.icon;

        container.appendChild(cell);

        tabindex++;
    });

    let focusguard1 = document.querySelector("#focusguard1");
    focusguard1.addEventListener("focus", () =>
    {
        let last = document.querySelector(`[tabindex="${tabindex - 1}"]`);
        last.focus();
    });

    let focusguard2 = document.querySelector("#focusguard2");
    focusguard2.tabIndex = tabindex;
    focusguard2.addEventListener("focus", () =>
    {
        let first = document.querySelector(`[tabindex="2"]`);
        first.focus();
    });
}

function createCell( tabindex )
{
    let html = `<div class="item-cell"><a class="item" tabindex="${tabindex}"><img/></a></div>`;
    let template = document.createElement("template");
    template.innerHTML = html;

    let cell = template.content.firstChild;
    return cell;
}

window.addEventListener("load", main);