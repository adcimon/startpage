"use strict";

import { Links } from "./links.js";

function main()
{
    let container = document.querySelector(".item-container");

    Links.forEach(link =>
    {
        let cell = createCell();

        let a = cell.querySelector("a");
        a.style.backgroundColor = link.color;
        a.href = link.url;

        let img = a.querySelector("img");
        img.src = link.icon;

        container.appendChild(cell);
    });
}

function createCell()
{
    let html = '<div class="item-cell"><a class="item"><img/></a></div>';
    let template = document.createElement("template");
    template.innerHTML = html;

    let cell = template.content.firstChild;
    return cell;
}

window.addEventListener("load", main);