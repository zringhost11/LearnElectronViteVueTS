import { exec } from "child_process";
export class NativeTooles {
    static execCommand(command: string, args: string[]) {
        let retData: string[] = [];
        return new Promise((resolve, reject) => {
            let cp: any = exec(command + " " + args.join(" "));
            //let cp = exec();

            cp.stdout.on('data', (data: string) => {
                console.log(data);
                retData.push(data);
                //console.log('oo_qrcode_pid:' + cp.pid);
            });

            cp.stderr.on('data', (data: string) => {
                console.log(`stderr: ${data}`);
                // reject();
            });

            cp.on('close', (code: string) => {
                console.log(`子进程退出码：${code}`);
                // rpk是否生成成功
                // let distRpkPath = path.join(projDir, "dist", `${config.oppoInfo.package}${config.oppoInfo.useReleaseSign ? ".signed" : ""}.rpk`);
                // if (!fs.existsSync(distRpkPath)) {
                //     throw new Error("rpk生成失败，请检查！");
                // }
                resolve({ code: code, data: retData });
            });
        });
    }
}