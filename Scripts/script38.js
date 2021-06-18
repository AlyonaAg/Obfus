hexColor = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
function mOut() {
for (i = 0; i < 13; i++) {
setTimeout ('document.kolbasa.button.style.background = "#'+hexColor[12-i]+'0'+hexColor[12-i]+'FFF";', i * 40);
}
}
function mOver() {
document.kolbasa.button.value = "Нажми!";
for (i = 0; i < 12; i++) {
setTimeout ('document.kolbasa.button.style.background = "#'+hexColor[i]+'0'+hexColor[i]+'E31";', i * 40);
}
}