// import { createApp } from 'vue'
// import "./style.css"
// import App from './App.vue'
// import './samples/node-api'

import fs from "fs";
import fpath from "path";
import { CompressJS } from "./tooles/CompressJS";

// createApp(App)
//   .mount('#app')
//   .$nextTick(() => {
//     postMessage({ payload: 'removeLoading' }, '*')
//   })

window.onload = () => {
  CompressJS.init("#fileTxt");
  postMessage({ payload: 'removeLoading' }, '*');


  setTimeout(() => {
    var MyModules = (function Manager() {
      var modules: any = {};
      function define(name: string, deps: any[], impl: Function) {
        for (var i = 0; i < deps.length; i++) {
          deps[i] = modules[deps[i]];
        }
        modules[name] = impl.apply(impl, deps);
      }
      function get(name: string) {
        return modules[name];
      }
      return {
        define: define,
        get: get,
      }
    })();

    MyModules.define("bar", [], function () {
      function hello(who: string) {
        return "Let me introduce:" + who;
      }
      return {
        hello: hello
      };
    });

    MyModules.define("foo", ["bar"], function (bar: { hello: (who: string) => string }) {
      var hungry = "hippo";
      function awesome() {
        console.log(bar.hello(hungry).toUpperCase());
      }
      return {
        awesome: awesome
      };
    });
    var bar = MyModules.get("bar");
    var foo = MyModules.get("foo");

    console.log(
      bar.hello("hippo")
    );
    foo.awesome();

  }, 100);


  // (function(){
  //   var a  = 2;
  //   console.log(a);
  // })();


  // let fileTxtDom: any = document.querySelector("#fileTxt");
  // if (fileTxtDom) {
  //   fileTxtDom.ondragenter = fileTxtDom.ondragleave = fileTxtDom.ondragover = function () {
  //     return false;
  //   }
  //   fileTxtDom.ondrop = (event: DragEvent) => {
  //     let files = event.dataTransfer?.files;
  //     if (files) {
  //       for (let i = files.length - 1; i >= 0; i--) {
  //         let file = files[i];
  //         console.log(file);
  //         if (file.path.endsWith(".js")) {
  //           //this.compressJS(file.path);
  //         }
  //       }
  //     }

  //   }
  // }

}

