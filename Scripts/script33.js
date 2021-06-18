function checkAGE()  {
if (!confirm("Вы действительно хотите войти?"))
history.go(-1);
return " ";
}
document.writeln(checkAGE());