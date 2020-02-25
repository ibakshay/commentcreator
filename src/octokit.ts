import { GitHub } from '@actions/github'
import { installationAccessToken } from "./main"

export function test() {
    console.log("installation token in octokit file is " + installationAccessToken)
}

//octokit = new GitHub(installationAccessToken as string)

const octokit = new GitHub(installationAccessToken as string)

export { octokit } 