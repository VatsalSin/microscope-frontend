
# Microspoce Frontend
This is the frontend of the microscope problem which helps simulate a remote microscope.

---
## Requirements

For development, you will need React.js, npm and Node.js installed in your environement.

### Node

- #### Node installation
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).


## Install

    $ git clone https://github.com/VatsalSin/microscope-frontend.git
    $ cd microscope-frontend
    $ npm install

### In case of issues with dependancy, a quick fix can be

    $ npm install --force

## Running the project on port 3000

    $ npm start

## Assumptions
Following assumptions were taken while solving the problem:
- The start point will be (0,0) in CS terms and (1,1) on pathologist slide shown on UI
- The starting point won't be marked as visited initially, only if we visit it again it will be marked as visited and other operation will happen
- Machine (in this case backend) is source of truth, if miscofiguration happens at any place (only frontend in this case) will sync with backend.

## UI Snapshot
![Screenshot 2023-04-08 at 5 42 04 PM](https://user-images.githubusercontent.com/33460761/230724158-36213dff-01b3-4b80-96c8-fd5194d41dc8.png)

