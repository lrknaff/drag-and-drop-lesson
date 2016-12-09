#Drag and Drop Kanban Board
> Create a drag and drop Kanban board, with micro-interactions, utlizing jQuery's draggable functionality, HTML and CSS. Inspired by [this codepen.](https://codepen.io/ettrics/pen/QbPEeg)

###Step 1: Setup
Feel free to clone down this repo and follow along at your own pace or create a new codepen and code along with us.

First, let's grab this boilerplate HTML:

````
<html>
  <head>
    <meta charset="utf-8">
    <link rel="stylesheet" href="reset.css">
    <title>Drag and Drop List</title>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans|Roboto:400,500" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  </head>

    <body>
      <header>
        <h1>Drag and Drop List</h1>
        <h4>Inspired by <a href="https://codepen.io/ettrics/pen/QbPEeg">this codepen.</a></h4>
      </header>

      <div class="kanban-container">
        <ul class="kanban-list">
          <li class="kanban-column kanban-column-onhold">
          <span class="kanban-column-header header-onhold">
            <h2>To Do</h2>
          </span>
          <div class="kanban-options"></div>
          <ul class="drag-inner-list">
            <li class="drag-item"></li>
            <li class="drag-item"></li>
            <li class="drag-item"></li>
            <li class="drag-item"></li>
            <li class="drag-item"></li>
          </ul>
          </li>

          <li class="kanban-column kanban-column-approved">
          <span class="kanban-column-header header-approved">
            <h2>Approved</h2>
          </span>
          <div class="kanban-options"></div>

          <ul class="drag-inner-list">
            <li class="drag-item" draggable="true"></li>
          </ul>
          </li>

        </ul>
      </div>

    <script src="https://code.jquery.com/jquery-1.11.2.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.0/jquery-ui.min.js"></script>
    <script src="scripts.js"></script>
  </body>

</html>
````

and CSS:

 ````
 * {
 	box-sizing: border-box;
 }

 body {
 	background: #33363D;
 	color: white;
 	font-family: 'Roboto', sans-serif;
 	font-weight: 400;
 	line-height: 1.5;
   text-align: center;
 	-webkit-font-smoothing: antialiased;
 }

 h1 {
   font-size: 40px;
   font-weight: 500;
   letter-spacing: 1px;
 }

 h2 {
 	font-size: 16px;
 	margin: 0;
 	text-transform: uppercase;
 	font-weight: 400;
 }

 h4 {
 	font-size: 18px;
 }

 a {
 	color: #00BCD4;
 	font-weight: 500;
 	text-decoration: none;
 }

 /* Intro */

 header {
 	padding: 20px;
 	text-align: center;
 }

 /* Kanban board */

 .kanban-container {
 	margin: 20px auto;
 	max-width: 1000px;
 }

 ul {
 	list-style-type: none;
 	padding: 0;
 }

 .kanban-list {
 	display: flex;
 	align-items: flex-start;
 }

 .kanban-column {
 	flex: 1;
 	margin: 0 10px;
 	position: relative;
 	background: rgba(0, 0, 0, 0.2);
 	overflow: hidden;
 }

 .kanban-column-header {
 	display: flex;
 	align-items: center;
 	justify-content: space-between;
 	padding: 10px;
 }

 .header-onhold {
 	background: #FF9800;
 }

 .header-inprogress {
 	background: #009688;
 }

 .header-approved {
 	background: #8BC34A;
 }

 .drag-inner-list {
 	min-height: 50px;
 }

 .drag-item {
 	margin: 10px;
 	height: 100px;
 	background: rgba(0, 0, 0, 0.4);
 }


 /* micro-interactions */
/* add glowing border here */


 /* mobile */

 @media (max-width: 690px) {
 	.kanban-list {
 		display: block;
 	}

 	.kanban-column {
 		margin-bottom: 30px;
 	}
 }
````


###Step 2: Making Item Draggable
Elements on the page can be made draggable simply by adding a *draggable* attribute:

`<li draggable="true>Lorem Ipsum Dolor Set Amet</li>`

Let's add a **draggable="true"** property to all of the li elements

###Step 3: Working with Drag Events
Now that we have our draggable elements, we need to wire up the drop zone and define the data that we want to transfer upon dropping an element. Both of these require that we hook into several of the built-in drag events available to us.

The events that make drag and drop possible are similar to your standard mouse events that you might already be familiar with. (e.g. ‘click’, ‘mouseover’, etc.) Drag events build on top of this and offer us a very detailed lifecycle to work with. Here are the various events fired as you perform a drag with your mouse:

* **dragstart**: User clicks down the mouse button and holds
* **drag:** User has their mouse button held down, and is moving the mouse
* **dragenter:** User drags an element into a valid drop target
* **dragover:** User is moving their mouse while dragging an item within a valid drop target. This event is fired every few hundred milliseconds.
* **dragleave:** User drags an element outside a valid drop target
* **dragend** and **drop:** User releases their mouse button, effectively “letting go” of whatever they were dragging. If they do this while hovering over a valid drop target, the drop event will fire as well.

These events are important not only for implementing the functionality, but also for providing user feedback at each phase of performing a drag-and-drop.

###Step 4: Creating a Drop Zone
The events we’ll need to work with when creating a drop zone are **dragenter**, **dragleave**, **dragover**, and **drop**.

####Drop
We want to target the approved ul element as our drop zone. In order to do this, we’ll attach a listener to this element for the drop event:

````
$('.kanban-column-approved').on('drop', function(event) {
  console.log('Dropped!');
});
````

So, when we drag and drop the item over the ul element why don't we see 'Dropped!' in the console?

Normally, elements on a page are not valid places to drop data. Therefore, the default behavior for these events is to not allow a drop. And how do we override the default behavior of an event? We add event.preventDefault().

Not only must we prevent the default behavior in our drop event, but we also must cancel any other drag events that are occurring at the same time. Remember we said that the dragover event could be fired every hundred milliseconds. If we do not cancel this event, it will continue to block our ability to fire the drop event. Let’s add event.preventDefault() to our drop event, and also handle the dragover event:

````
$('.kanban-column-approved')
.on('drop', function(e) {
  e.preventDefault();
  console.log('Dropped')
})
.on('dragover', function(e) {
   e.preventDefault();
 });
 ````

We should now see our ‘Dropped!’ message logged to the console when we try dragging a list element into the zone.

###Step 4: Drag Enter & Drag Leave
Remember we said that drag and drop functionality isn’t always intuitive for all users. Therefore, we must be very generous with the user feedback we provide throughout the drag-and-drop lifecycle. First, we’ll want to indicate to a user when they have successfully positioned their mouse over the drop zone by giving them some sort of visual cue. Let’s add a class to our CSS called **drop-zone-active** and set **border-color: grey;
  box-shadow: 0 0 10px grey**.

We can hook into the **dragenter** and **dragleave** events to toggle this class depending on if a user’s mouse is positioned within the drop zone:

````
.on('dragenter', function(e) {
   $(this).addClass('drop-zone-active');
 })
 .on('dragleave', function(e) {
   $(this).removeClass('drop-zone-active')
 })
 ````

Now, you should see the border highlite each time your mouse enters and leaves the drop zone. This behaves similarly to the hover effect in CSS, but we only want this class applied during a drag and drop operation. If we implemented this behavior with CSS hover, we’d notice the highlighted border every time our mouse entered the drop zone, regardless of whether or not we were holding an element to drop.

You’ll notice when you actually perform the drop event, the class remains activated. We’ll want to remove it after a drop event as well:

````
$('.kanban-column-approved')
.on('drop', function(e) {
  e.preventDefault();
  console.log('Dropped!')
  $(this).removeClass('drop-zone-active')
})
````

###Step 5: Defining Data
A good time to define the data we want to transfer is in the very beginning of the process, on the dragstart event. Because dragstart is fired as soon as we grab our draggable element, we need to attach a listener to our draggable elements to handle it:

````
$('.drag-item').on('dragStart', function(e) {
  e.originalEvent.dataTransfer.setData('listItem', $(this).index())
})
````

*NOTE: Because we are using jQuery, we are recieving a jQuery event object when we run our event handlers. This object is slightly different than the native event you get when using vanilla JavaScript. The jQuery event object does not have a dataTransfer property. Because of this, we have to call setData() on e.originalEvent.dataTransfer rather than just e.dataTransfer.*

Drag events give you access to an object called dataTransfer, that provides you with several methods for handling the data you want to work with. In this scenario, we want to call setData to define the information we want to transfer.

setData takes two arguments. The first is a string that identifies the type of data we are transferring. There are some preset types such as “text/plain”, “text/html”, etc. But you can also define an arbitrary string that more closely describes your data. In our case, we passed in “listItem” as our data type. We will use this string in our drop event to access our data.

The second argument is the actual data you are transferring. In our example, we’re actually only going to transfer the index value of the list item we’ve selected. So if we select the third item in the list, our data is going to be 2.

The getData method takes a single argument - the descriptive string you used as your data type when you called setData in the dragstart event. This will return the data that matches that descriptor.

Now, in our drop event, we can use that index value we receive from getData, and select the list item to append to our completed list:

````
$('.kanban-column-approved')
.on('drop', function(e) {
  e.preventDefault();
  console.log('Dropped!');
  $(this).removeClass('drop-zone-active');
  let listItemIndex = e.originalEvent.dataTransfer.getData('listItem');
  $(this).append($('.drag-item').eq(listItemIndex))
})
````

If we refresh our page, we should now be able to move to do list items into the completed box. This is a super basic example of implementing drag and drop. Interfaces can get much more complicated than this, and it’s important to keep your users in mind when you use this API.
