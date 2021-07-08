# Chrome extension to help you fill out some of the tedious parts of the application process.

I got tired of filling out the same information for every application, so I made a Chrome extension to help with the process.

Right now it works for:

1. Gender
2. Hispanic - which is a _yes_ or _no_
3. Race - which is only asked if you're not Hispanic.
4. Veteran Status

Currently this has been tested to work on:

1. Greenhouse - in some cases this does not work, as they seem to occassionally use hidden selects and change what is displayed in the input via javascript, although it might actually work for the form submission itself, as it is changing the underlying select's value. I have not tested this myself.


This is currently a w.i.p as I plan on having most of the major fields auto fill in - first name, last name, LinkedIn, etc. I also need to improve the styling as well as only have it perform when you click fill form - as I don't want it to autofill on non job application forms. 
