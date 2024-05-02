# Guidelines

If you intend to enhance this project, please ensure that your contributions are based on the latest LTS versions.

Pull requests that modify older LTS versions will not be approved. This policy is in place to maintain stability and data integrity for users already relying on the application for their company or job.

Your commit message must come in the format of `[LTS Version Number] <Your Commit message>`.

- The release notes must come inside the commit message as well. Remminder: Use the command `git commit` to be allow to write formated messages on commits.

- I will read, test your code and look for unexpected bugs. If any is find, I will refuse the pull request with the reason, so you can fix it.

- Try to not change the app architecture. If a architecture change is necessary, I will need to analize all the aspects of it, with patience, since many things were done for a reason. I can clarify why I wrote the in a specific format each part of the codebase if needed, so you can adapt in the new architecture.

Once the pull request is approved, I will create a new Build and publish on play store for production.