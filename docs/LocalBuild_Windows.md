# WSL CLean Uninstall

full docs: https://gist.github.com/4wk-/889b26043f519259ab60386ca13ba91b
- In powershell, List all installed distros: `wsl -l -v`
- Destroy distros: `wsl --unregister Ubuntu`
- In Settings > Apps > Apps & Features: Search for ubuntu and linux, and unistall all results
- Reboot PC
- If the linux fodler still showing on Home folder, search for `Turn Windows features on or off`, and enable `Windows Subsystem for linux`, reboot your pc, disable `Windows Subsystem for linux` again, and reboot the pc again.

# WSL Instalation

- Make sure virtualization is enable for your processor.
- run `wsl --install` on powershell
- Reboot PC

# Node Instalation

full docs: https://learn.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-wsl
- install curl: `sudo apt-get install curl`
- install nvm: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash`
- close and reopen the WSL terminal
- install last node lts version: `nvm install --lts`

# JAVA and Android SDK

full docs: https://medium.com/@pierre.viara/install-java-on-windows-10-linux-subsystem-875f1f286ee8
full docs: https://halimsamy.com/wsl-for-developers-installing-the-android-sdk

- run `sudo apt update`
- install gradle: `sudo apt install openjdk-17-jdk gradle`
- manually add JAVA_HOME variable on `home/[linux user]/.bashrc` by copying and paste the line:
```
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

- Install android command line tool:
```
cd ~ # Make sure you are at home!
curl https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip -o /tmp/cmd-tools.zip
mkdir -p android/cmdline-tools
unzip -q -d android/cmdline-tools /tmp/cmd-tools.zip
mv android/cmdline-tools/cmdline-tools android/cmdline-tools/latest
rm /tmp/cmd-tools.zip # delete the zip file (optional)

```

- manually add Setup the enviroments variables on `home/[linux user]/.bashrc` by copying and paste the line:
```
export ANDROID_HOME=$HOME/android
export ANDROID_SDK_ROOT=${ANDROID_HOME}
export PATH=${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools:${ANDROID_HOME}/tools:${ANDROID_HOME}/tools/bin:${PATH}
```

- install sdkmanager: `sudo apt install sdkmanager`
- Close and reopen terminal, and accept the lincenses: `yes | sdkmanager --licenses`
- update sdkmanager: `sdkmanager --update`

# EAS CLI

- install eas cli: `npm install --global eas-cli`