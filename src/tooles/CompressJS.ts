import { NativeTooles } from "./NativeTooles";
import fpath from "path";

export class CompressJS {
    constructor() {

    }
    static async init(id?: string) {
        let ret: any = await this.checkUglifyJS();
        if (null == ret || 1 == ret.code) {
            await this.installUglify();
        }

        if (id) {
            let fileTxtDom: any = document.querySelector("#fileTxt");
            if (fileTxtDom) {
                fileTxtDom.ondragenter = fileTxtDom.ondragleave = fileTxtDom.ondragover = function () {
                    return false;
                }
                fileTxtDom.ondrop = (event: DragEvent) => {
                    let files = event.dataTransfer?.files;
                    if (files) {
                        for (let i = files.length - 1; i >= 0; i--) {
                            let file = files[i];
                            if (file.path.endsWith(".js")) {
                                this.compressJS(file.path);
                            }
                        }
                    }

                }
            }
        }




    }
    static compressJS(path: string, toPath?: string) {
        if (null == toPath) {
            toPath = fpath.join(path, "..");
            let ext = fpath.extname(path);
            let file = fpath.basename(path, ext);
            toPath = fpath.join(toPath, file + ".min.js");
        }
        return NativeTooles.execCommand("uglifyjs", [path, "-m", "-o", toPath!]);
    }



    static checkUglifyJS() {
        return NativeTooles.execCommand("uglifyjs", ["-v"]);
    }

    static installUglify() {
        return NativeTooles.execCommand("npm", ["install", "uglify-js", "-g"]);
    }
}