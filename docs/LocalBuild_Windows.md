- You can follow this tutorial, but you may require help from ChatGPT to figure out the errors if you receive any.
- The important is:
  - Have WSL or any other linux enviroment
  - Inside the linux enviroment:
    - Install Node
    - Install JAVA
    - Install Android SDK
    - Install EAS Cli

# Ubunt Clean install:

- In powershell, List all installed distros: `wsl -l -v`
- Destroy distros: `wsl --unregister <ubuntu-name>`

# WSL Instalation

- Make sure virtualization is enable for your processor.
- run `wsl --install` on powershell
- Reboot PC

# Installing Local Build Enviroment (Expo SDK 54):

We always try to replicate the latest ubuntu image Expo uses for online builds.

Usually, all it needs is the list bellow, and everything else missing, expo tends to install on the fly during a new build (And that's why is good to do this process again from time to time):

- ubuntu 24.04
- Node.js 20.19.4
- Java 17
- Latest Android SDK

### On powershell (as administrator):
- `wsl --install -d Ubuntu-24.04`

### On WSL terminal (as administrator):

- 1: Update the system
```
sudo apt update && sudo apt upgrade -y
sudo apt autoremove -y
```

- 2: Basic build tools:
```
sudo apt install git wget unzip zip curl -y
```

- 3: Install node:
```
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

- 4: Install JDK 17:
```
sudo apt install openjdk-17-jdk -y
```

- 5: JDK Eviroment variables:
```
echo 'export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64' >> ~/.bashrc
echo 'export PATH=$JAVA_HOME/bin:$PATH' >> ~/.bashrc
source ~/.bashrc

```

- 6: Create Android SDK folder & install command-line tools
  - Check on official android page wich command line is the [lastest](https://developer.android.com/studio?utm_source=chatgpt.com)
  - Usually you can find this as `Command line tools only` close to the page footer
```
mkdir -p ~/Android/Sdk/cmdline-tools
cd ~/Android/Sdk/cmdline-tools
# Download the latest command-line tools (Linux)
wget https://dl.google.com/android/repository/commandlinetools-linux-13114758_latest.zip
unzip commandlinetools-linux-13114758_latest.zip
mv cmdline-tools latest
rm commandlinetools-linux-13114758_latest.zip
```

- 7: Set Android SDK environment variables
```
echo 'export ANDROID_SDK_ROOT=$HOME/Android/Sdk' >> ~/.bashrc
echo 'export PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH' >> ~/.bashrc
source ~/.bashrc
```

- 8: Update Android SDK manager and install base components
```
sdkmanager --update
sdkmanager "platform-tools" "cmdline-tools;latest"
```

- 9: Detect the latest Android SDK build-tools and platform
```
LATEST_BUILD_TOOLS=$(sdkmanager --list | grep "build-tools;" | tail -n 1 | awk '{print $1}')
LATEST_PLATFORM=$(sdkmanager --list | grep "platforms;android-" | tail -n 1 | awk '{print $1}')
```

- 10: Install the latest Android SDK build-tools
```
sdkmanager "$LATEST_BUILD_TOOLS" "$LATEST_PLATFORM"
```

- 11: Accept Android SDK licenses
```
yes | sdkmanager --licenses
```

- 12: Install EAS:
```
sudo npm install -g eas-cli
```

- 13: Login to EAS:
```
eas login
```

- 14: Clone any expo repo with dev client, and try a local build adding a `--local` flag