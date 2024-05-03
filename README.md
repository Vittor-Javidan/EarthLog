# What is Earth Log?

Earth Log is a client that can connect to any server. It was created with the purpose of reducing company costs when they need to develop a mobile app to allow their employees to collect data in the field (such as in cities, farms, etc.). The app features synchronization, high-accuracy GPS acquisition, picture acquisition, and multiple server connections. For more details, visit the [Play Store page](https://play.google.com/store/apps/details?id=com.lonewispapps.earthlog).

# How to Install the Project

All you need to do is simply run `npm install`. If you need to use an emulator, install Android Studio and use its built-in emulator.

# How to Run the Project

Since the project uses expo-dev-client, a dev build is necessary to run the app locally. Using Expo Go will not work due to some dependencies not being supported by it.

I'm not entirely sure if anyone can create a dev build using their own EAS account, so I will always share the APK of the latest dev build on my drive as a shared link.

# I'm Lost in How to Do Something

Since this project was not initially meant to be open source, some guidance might be missing or incorrect. Please let me know if you encounter any issues in the repository's issues section so that I can address them.

# Download a Dev Build APK

Dev builds available for download: [Dev Build APKs](https://drive.google.com/drive/folders/1aOryZwBQTGlB-6MSTYQdALV58tawYyYD?usp=sharing)

# Guidelines for contribute

If you intend to enhance this project, please ensure that your contributions are based on the latest LTS versions.

Pull requests that modify older LTS versions will not be approved. This policy is in place to maintain stability and data integrity for users already relying on the application for their company or job.

Your commit message must come in the format of `[LTS Version Number] <Your Commit message>`.

- The release notes must be included inside the commit message as well. Reminder: Use the command `git commit` to be allowed to write formatted messages on commits.

- I will read, test your code, and look for unexpected bugs. If any are found, I will refuse the pull request with a reason, so you can fix it.

- Try not to change the app architecture. If an architecture change is necessary, I will need to analyze all aspects of it with patience since many things were done for a reason. I can clarify why I wrote each part of the codebase in a specific format if needed, so you can adapt in the new architecture.

- If you need new dependencies to be installed, just let me know. I will analyze who made the dependency, if it's really necessary to have, and if approved, I will create a new branch for you and publish a new dev build APK for download. 

Once the pull request is approved, I will create a new build and publish it on the Play Store for production.
