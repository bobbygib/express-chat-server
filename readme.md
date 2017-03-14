	# Your First Full-Stack Application

This project is to build a full-stack application in the style of pastebin or txt.fyi. In fact, for a basically-complete version of this website, visit http://txt.fyi.

Essentially, you will build a web application from scratch that allows users to anonymously upload text, and share those text documents with the internet.

The specification for the site is :

  * Users visiting the site should be presented with a text area that they can type into, and a button to "save" the text.
  * Upon saving the text, the user should be sent to a new page, which contains the text (hint: you may want to template the text into the page using string replacement. Or, use document.location to retrieve the ID of the text on the frontend and AJAX the text into the page -- up to you).
  * Example. I save some text, and the site sends me to `localhost:8080/abcde`. If I share that link with someone, they can load up `localhost:8080/abcde` and it will show the text that I saved.
  * If a user loads up a page with a text id that does not exist, they should be redirected to the homepage
  * No need to implement login/auth unless you want to. If you do, you can allow logged in users to edit their own uploads.
