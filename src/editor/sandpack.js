
define(function (require, exports, module) {
    "use strict";
    // var smooshpack = require("smooshpack");
    // console.log(smooshpack);
    
    // var Manager = Manager2.Manager;
    // var manager;    
    
    function printChanged() {
        console.log("called every 3 secs..");
    }

    function initFileTree() {
        console.log("init file tree called only once.. !");
        // now try initiating the manager here..
        // manager = new Manager(
        //     'iframe #bramble-iframe-browser',
        //     {
        //         files: {
        //             '/public/index.html': {
        //                 code: `<html><body><h2 id="div">from inside the iframe</h2> </body></html>`,
        //             },
        //             '/script/index.js': {
        //                 code: `import uuid from 'uuid'; import a from './module/hello.js'; console.log("hello from iframe"); console.log(document.getElementById("div")); console.log(a); console.log(uuid)`,
        //             },
        //             '/script/module/hello.js': {
        //                 code: `var a=5; export default a`,
        //             },
        //         },
        //         entry: '/script/index.js',
        //         dependencies: {
        //             uuid: 'latest',
        //         },
        //     }
        // )
    }

    exports.printChanged = printChanged;
    exports.initFileTree = initFileTree;
});

// imports
// var $ = require("jquery");
// var constants = require("../../../shared/scripts/constants");
// var { Manager } = require('smooshpack');

// var AJAX_DEFAULT_TIMEOUT_MS = constants.AJAX_DEFAULT_TIMEOUT_MS;

// let filesTree = {}

// helper functions
// const updateFileTree = (path, file) => {
//     filesTree[path] = {
//         code: file.toString()
//     }
// }

// const buildTree = (data) => {
//     console.log("building tree")
//     console.log(data)
    
//     data.forEach((path) => {
//         path = path.filename
//         // /nas/projects/newdat2/index.html - need
//         // /nas/projects/newdat2/dat-projects/nas/newdat2/index.html - path

//         let arr1 = path.split('/')

//         // console.log(arr1)


//         arr1.splice(4, 3);
//         arr1.shift()

//         let filePath = arr1.join('/')
//         filePath = `/${filePath}`

//         // console.log(s2)

//         Bramble.getFileSystem().readFile(filePath, (err, file) => {
//             if (err) {
//                 console.log(err)
//             } else {
//                 console.log(file);
//                 updateFileTree(filePath, file)
//             }
//         })
//     })
// }

// const printChanged = () => {

    // console.log("Bramble")
    // console.log(Bramble);

    // Bramble.getFileSystem().readFile(path, (err, files) => {
    //     console.log(files);
    // })
    // console.log("called every 3 secs..")
    // console.log(document.querySelector('iframe').contentWindow.document)
    // const manager = new Manager (
    //     // '#bramble-iframe-browser',
    //     // validate if the inner iframe is accessable
    //     'iframe #bramble-iframe-browser',
    //     {
    //         files: {
    //             '/public/index.html': {
    //                 code: `<html><body><h2 id="div">from inside the iframe</h2> </body></html>`,
    //             },
    //             '/script/index.js': {
    //                 code: `import uuid from 'uuid'; import a from './module/hello.js'; console.log("hello from iframe"); console.log(document.getElementById("div")); console.log(a); console.log(uuid)`,
    //             },
    //             '/script/module/hello.js': {
    //                 code: `var a=5; export default a`,
    //             },
    //         },
    //         entry: '/script/index.js',
    //         dependencies: {
    //             uuid: 'latest',
    //         },
    //     }
    // );
    
// }

// const initFileTree = () => {
//     console.log("init file tree called only once.. !")
    // let url = `/project/${document.location.pathname.split('/')[2]+'/'+document.location.pathname.split('/')[3]}/files/meta`
    
    // var request = $.ajax({
    //     type: "GET",
    //     headers: {
    //       Accept: "application/json"
    //     },
    //     url: url,
    //     timeout: AJAX_DEFAULT_TIMEOUT_MS
    //   });
    //   request.done(function(data) {
    //     // console.log(data);
    //     buildTree(data);
    //   });
    //   request.fail(function(jqXHR, status, err) {
    //     err = err || new Error("unknown network error");
    // });
// }

// module.exports = {
//     printChanged,
//     initFileTree,
// }
