"use strict";

const UPDATE_TIME_INTERVAL = 30;

const DAYS =
[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const MONTHS =
[
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

function main()
{
    updateTime();
    window.setInterval(() => updateTime(), UPDATE_TIME_INTERVAL * 1000);

    createItems();
}

function updateTime()
{
    let date = new Date();

    let timeElement = document.querySelector(".clock-time");
    timeElement.innerHTML = date.getHours() + ":" + date.getMinutes();

    let dateElement = document.querySelector(".clock-date");
    let weekday = DAYS[date.getDay()];
    let day = date.getDate();
    let month = MONTHS[date.getMonth()];
    let year = date.getFullYear();
    dateElement.innerHTML = `${weekday}, ${day} ${month} ${year}`;
}

function createItems()
{
    let list = document.querySelector(".item-list");

    let tabindex = 3;
    LINKS.forEach(link =>
    {
        let cell = createCell(tabindex);

        let a = cell.querySelector("a");
        a.style.background = link.background;
        a.href = link.url;
        a.target = link.target;

        let img = a.querySelector("img");
        img.src = link.icon;

        list.appendChild(cell);

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