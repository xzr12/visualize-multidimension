import os
state = 'HI';
r = state + ".txt";
w = state + ".json";

rf = file(r,'r');
str = "{\n\t\"cities\":[";

line = rf.readline();
while line:
	str = str + "\"" + line.replace("\n","") + "\", ";
	line = rf.readline();

str = str[0:len(str)-2] + "]\n}";

wf = file(w,'w+');
wf.write(str);
wf.close();

