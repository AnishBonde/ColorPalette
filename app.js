const colorsDivs = document.querySelectorAll(".color");
const hexText = document.querySelectorAll(".color .control h2");
const generateBtn = document.querySelector(".generate");

function hexCode() {
    // let hex="0123456789ABCDEF";
    // let code="#";
    // for(let i=0;i<6;i++)
    // {
    //     code+=hex[Math.floor(Math.random()*16)];
    // }
    let code = chroma.random();
    return code;
}
generateBtn.addEventListener("click", function () {
    colorsDivs.forEach(function (color, index) {
        const hext = color.children[0].children[0];
        hext.innerText = hexCode();
        color.style.background = hexCode();
        checkText(hexCode(), hext);

        const sliders = color.querySelectorAll(".sliders input");
        console.log(sliders);
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];
        const hexcolor = chroma(hexCode());
        colorizesliders(hexcolor, hue, brightness, saturation);
    });
});

function colorizesliders(color, hue, brightness, saturation) {
    const nosat = color.set("hsl.s", 0);
    const sat = color.set("hsl.s", 1);
    const scalesat = chroma.scale([nosat, color, sat]);
    //scale brightness
    const midbright = color.set("hsl.l", 0.5);
    const scaleBright = chroma.scale(["black", midbright, "white"]);
    //updating input color
    saturation.style.backgroundImage = `linear-gradient(to right,${scalesat(0)},${scalesat(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right,${scaleBright(0)},${scaleBright(0.5)},${scaleBright(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;

}


function checkText(color, text) {
    const lumi = chroma(color).luminance();
    if (lumi > 0.5) {
        text.style.color = "black";
    } else {
        text.style.color = "white";
    }
}