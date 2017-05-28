# Ultimate texting services

## About

Ultimate texting services - or UTS if you prefer - is a text sending web application utilizing an LCD connected to a Raspberry pi to present the text. Simply write your name and surname in the web application. When pressing submit it will send your entered information to an API on the Raspberry pi where it will be processed and sent to an LCD. As proof that your text has been sent a camera takes a picture of the LCD. That picture is in turn sent back to the web application and displayed on the page for you to behold the glory of our creation.

## Try it out
The client can be found [here](http://backpackvagabond.com/tillf/uni/pi/).

Due to some problems with the LCD hardware where we have experienced freezing of the display and also that the backlighting of the display has turned itself off, we would appreciate if any problems are reported to us so we could try to fix it. The connectors aren't the most stable since we haven't soldered them on and just use a breadboard.

## Box setup
For a description about the hardware we used, visit our wiki: https://github.com/1dv527/project-group-A/wiki/box-setup

## Devices

* Raspberry Pi3
* Raspberry Pi Camera Board
* 16x2 LCD
* Breadbord
* Cables
* Some basic knowledge of electronics

## Is our implementation really a Web of Thing implementation?
While a REST API should use https we had to revert to http since yaler didn't support https out of the box. Because of this the client is also deployed using regular unencrypted http.

According to w3.org a Web Thing MUST:

- At least be an HTTP/1.1
Our Web Thing is deployed on a Raspberry Pi with Restify which is an HTTP/1.1 server

- Have a root resource accessible via an HTTP URL
Our Web Thing is accessible through: http://gsiot-kqp9-e4pf.try.yaler.io/

- Support GET, POST, PUT and DELETE HTTP verbs
Where applicable HTTP verbs GET and POST are supported.
GET /
GET /images/:id
POST /message

- Implement HTTP status codes 200, 400, 500
Where applicable status codes 200 and 500 are used.

- Support JSON as default representation
All responses that contains a body are represented in JSON

- Support GET on its root URL
A GET to the root http://gsiot-kqp9-e4pf.try.yaler.io/ will return a description of the API with a link to next action e.i. /message.

### Architecture:

Our architecture implements four of the layers presented in "Building the Web of Things" by Guinard and Trifa. We start with the layer called "Layer 1: Access".

####  Layer 1: Access

The idea with this layer is to make a way for the application and the device to talk with each other. We have in our project exposed our service trough a REST API. The REST API is receiving HTTP-request to trigger the camera and LCD.

####  Layer 2: Find

The second layer makes a client "understand" what kind of service our REST API offers. We have used a HATEOAS-like approach where a JSON representation gives the user or other clients information.

####  Layer 3: Share

Layer three is about sharing data in a secure and efficient way ofer the internet. We have not implemented any way to secure use of our API. In this case it's not necessary. We do understand the need for this in bigger and more complex applications, but since we don't offer any unsafe operations (and since yaler doesn't want to play ball for free) we decided to leave it out.

### Integration Pattern
We chose the most straightforward implementation of a Web Thing where the API is deployed directly on the Raspberry Pi. This is the Direct Integration Pattern.

## Setting up a development environment
The npm package lcd that we use does not work on Windows OS. Therefore we need to set up a vagrant environment.

Install latests versions of:
* [Vagrant](https://www.vagrantup.com/)
* [VirtualBox](https://www.virtualbox.org/)

Clone or download this repo.

### OS-Dependent settings
Symlinks don't work very well on all operationg systems when using vagrant's shared folders and we have to make some special settings when the host is windows. Edit following lines and remove the #-sign before the line for your OS.

The example below is for Windows
```
  # Use for Mac/Linux host
  #config.vm.synced_folder "./", "/home/vagrant/project"
  # Use for Windows host
  config.vm.synced_folder "./", "/home/vagrant/project", type: "smb", mount_options: ["vers=3.02","mfsymlinks"]
```

### Initialize your vbox
Start your favourite command line tool.

NB! In Windows start your command line tool **as administrator**! (Or get [cmder](http://cmder.net/) and just hit ctrl+t and check the *run as administrator* box)

Clone this project, make sure you are in the project folder and run:
```
vagrant up
```

Take a cuppa! This will take some time.

### Make sure it worked
When it's done then ssh to your new vagrant maschine and check that node/npm is installed:
```
vagrant ssh
node -v
npm -v
```

### Finalize
Go to project folder and edit files depending on your OS
```
cd project
```

Then while in the project folder install packages:
```
npm install
```

### Do some work, finally
To start developing/testing:
```
-- Start client
npm run devc
```

```
-- Start server
npm run devs
```

```
-- Start test server
npm run devts
```
