// @ts-nocheck
import { readFileSync, writeFileSync } from 'fs';
import Yargs, { config } from 'yargs';
import { configure, render} from 'nunjucks';

type BuildJSONDockerfile = {
    PreInstallCommands: string[];
}

type BuildJSON = {
    Dockerfile: BuildJSONDockerfile;
    ServiceName: string;
    ServiceType: string;
}

function main() {

    var argv = Yargs(process.argv.slice(2)).argv;

    const buildPath = argv["config"]; 

    // configContent is a format that can be parsed and excessed in the applicaiton
    const configContent = JSON.parse(readFileSync(buildPath, 'utf8')) as BuildJSON;

    configure("templates", { autoescape: true });

    const dockerfileTemplate = render("Dockerfile", configContent)

    writeFileSync("Dockerfile", dockerfileTemplate);


}

main();