import { envinfo, error, info, success } from "../utils";
import Spinner from "../utils/loader";
import BaseCommand from "./BaseCommand";

const spinner = new Spinner().spinner;

class InfoCommand extends BaseCommand {
  constructor() {
    super({
      name: "info",
      description: "Print debugging information about your environment",
      usage: "info",
    });
  }

  public async run(_appName?: string): Promise<void> {
    spinner.start("Searching the environment information...\n");
    await envinfo
      .run(
        {
          System: ["OS", "CPU"],
          Binaries: ["Node", "Yarn", "npm"],
          Browsers: ["Chrome", "Edge", "Firefox", "Safari"],
          npmPackages: "/**/{typescript,*react*,@blitzcorvinato/*/}",
          npmGlobalPackages: ["@blitzcorvinato/koda"],
        },
        {
          showNotFound: true,
          duplicates: true,
          fullTree: true,
        }
      )
      .then((filled) => {
        spinner.succeed("Founded informations!\n");
        console.log(filled);
      })
      .catch((onReject) => {
        spinner.fail(
          error(
            `Could not find informations!\n The last thing I saw was ...\n\n${onReject}}`
          )
        );
        spinner.stop();
      });
  }
}

export default InfoCommand;
