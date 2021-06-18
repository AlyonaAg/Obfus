if (document.images) {
clickme1 = new Image(75,22); clickme1.src = "clickme1.gif";
clickme2 = new Image(75,22); clickme2.src = "clickme2.gif";
}
function hiLite(imgName,imgObjName)
{
if (document.images) {
document.images[imgName].src = eval(imgObjName + ".src");
}}