"use strict";

var timeZone = "Europe/Madrid";

function main()
{
    initClock();
    initSearch();
    initLinks();
}

function initClock()
{
    let zoneElement = document.querySelector(".clock-zone");
    let index = 0;
    TimeZones.forEach(zone =>
    {
        let option = document.createElement("option");
        option.value = index;
        option.innerHTML = zone.replace('_', ' ');
        zoneElement.appendChild(option);

        index++;
    });

    zoneElement.selectedIndex = TimeZones.indexOf(timeZone);
    zoneElement.addEventListener("change", () =>
    {
        timeZone = TimeZones[zoneElement.selectedIndex];
        updateTime(timeZone);
    });

    updateTime(timeZone);
    window.setInterval(() => updateTime(timeZone), 1 * 1000);
}

function updateTime( timeZone )
{
    const locale = "en-UK";
    let date = new Date();

    let timeElement = document.querySelector(".clock-time");
    let timeLocale = date.toLocaleTimeString(locale,
    {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: timeZone
    });
    timeElement.innerHTML = timeLocale;

    let dateElement = document.querySelector(".clock-date");
    let dateLocale = date.toLocaleDateString(locale,
    {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    dateElement.innerHTML = dateLocale;
}

function initSearch()
{
    let input = document.querySelector(".search-input");
    let cancel = document.querySelector(".search-cancel");
    cancel.style.visibility = "hidden";

    input.addEventListener("input", () =>
    {
        if( input.value !== "" && cancel.style.visibility !== "visible" )
        {
            cancel.style.visibility = "visible";
        }

        if( input.value === "" && cancel.style.visibility !== "hidden" )
        {
            cancel.style.visibility = "hidden";
        }
    });

    cancel.addEventListener("click", () =>
    {
        input.value = "";
        cancel.style.visibility = "hidden";
        input.focus();
    });

    input.focus();
}

function initLinks()
{
    let list = document.querySelector(".link-list");

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
    let html = `<div class="link-cell"><a class="link" tabindex="${tabindex}"><img/></a></div>`;
    let template = document.createElement("template");
    template.innerHTML = html;

    let cell = template.content.firstChild;
    return cell;
}

window.addEventListener("load", main);