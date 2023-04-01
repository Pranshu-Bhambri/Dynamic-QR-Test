const path = require('path');
const { app, BrowserWindow, Menu } = require('electron');

const express = require("express");
// const bodyParser = require("body-parser");
const ejse = require('ejs-electron')
// const mongoose = require('mongoose');

const expressApp = express();

expressApp.set('view engine', 'ejs');

// app.use(bodyParser.urlencoded({extended: true}));
expressApp.use(express.static("public"));

const isDev= process.env.NODE_ENV !== 'production';

const isMac= process.platform === 'darwin';


//Create the main window
function createMainWindow () {
  const mainWindow = new BrowserWindow({
    title: 'Image Reader',
    width: isDev ? 1040 : 600,
    height: 1000,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  //Open devtools id in dev env
  // if(isDev){
  //   mainWindow.webContents.openDevTools();
  // }

  mainWindow.loadFile(path.join(__dirname, './views/index.ejs'));
  // mainWindow.loadFile(path.join(__dirname, './public/index.html'));
}

//Create about window
function createAboutWindow(){
    const aboutWindow = new BrowserWindow({
        title: 'About Image Reader',
        width: 400,
        height: 400,
      });
    
      aboutWindow.loadFile(path.join(__dirname, './views/about.ejs'));
      // aboutWindow.loadFile(path.join(__dirname, './public/about.html'));


      // const aboutMenu= Menu.buildFromTemplate([{
      //   label: null
      // }]);

      // Menu.setApplicationMenu(aboutMenu);

      //Removes Menu from about Window
      aboutWindow.setMenuBarVisibility(false);

}



// App is ready
app.whenReady().then(() => {
    createMainWindow();
  
    //Implement Menu
    const mainMenu= Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow();
      }
    })
})

//Menu template
const menu = [
    ...(isMac
      ? [
          {
            label: app.name,
            submenu: [
              {
                label: 'About',
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
    {
      role: 'fileMenu',
    },
    ...(!isMac
      ? [
          {
            label: 'Help',
            submenu: [
              {
                label: 'About',
                click: createAboutWindow,
              },
            ],
          },
        ]
      : []),
    // {
    //   label: 'File',
    //   submenu: [
    //     {
    //       label: 'Quit',
    //       click: () => app.quit(),
    //       accelerator: 'CmdOrCtrl+W',
    //     },
    //   ],
    // },
    // ...(isDev
    //   ? [
    //       {
    //         label: 'Developer',
    //         submenu: [
    //           { role: 'reload' },
    //           { role: 'forcereload' },
    //           { type: 'separator' },
    //           { role: 'toggledevtools' },
    //         ],
    //       },
    //     ]
    //   : []),
  ];

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit();
    }
})

// expressApp.post("/", function(req, res){

//   myCode= req.body.randomcode;
//   console.log(myCode);
// });

// expressApp.get("/establish-connection/:code", function(req, res){
//   console.log(myCode);
//   if(req.params.code=== myCode){
//       res.send("COOL !");
//   }
//   else{
//       res.send("NOT COOL !");
//   }
// })

