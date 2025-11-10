# 🧩 My .wslconfig Setup

If you’re using WSL 2 on Windows, you can greatly improve performance and stability during builds by configuring a `.wslconfig` file.

# 📁 File Location

Create a file named .wslconfig in:
```makefile
C:\Users\<your_username>\
```

Then add the following configuration (Change it accordingly to your needs):
```
[wsl2]
# 💾 Storage
# Defines where WSL stores temporary data before writing to your distro drive.
# It's best to keep this on the same drive where your WSL distro is located,
# since read/write speeds are a major performance factor during builds.
# If your Linux subsystem is already on your fastest drive, you can skip this.
swapFile=D:\\WSL\\swap.vhdx
swap=10GB

# 🧠 Memory
# Limits how much RAM WSL can use.
# Check Task Manager while building to ensure your system has enough memory left.
# I personally leave around 4 GB free to keep my browser, IDE, and other apps responsive.
memory=6GB

# ⚙️ CPU
# Controls how many CPU cores WSL can use.
# My Ryzen 3600 has 6 cores / 12 threads — I allocate 8 threads and leave 4 free
# to prevent other applications from stuttering.
processors=8

# 🌐 Networking
localhostForwarding=true

# 🚀 Performance Tweaks
guiApplications=false
nestedVirtualization=true
```

# 💻 My System Specs

For reference, here’s my hardware setup:
- CPU: Ryzen 5 3600 (6 cores / 12 threads)
- RAM: 16 GB DDR4 @ 3200 MHz
- GPU: RX 5700 XT
- OS: Windows 11

# ⚡ Performance Notes

It’s highly recommended to keep your WSL distro on an NVMe drive.

When I was using a SATA SSD, my builds took 20–30 minutes — and sometimes didn’t even finish.
After moving my distro to my NVMe drive (which isn’t my main drive but is the fastest), builds now complete in about 7 minutes.

# 🧩 Why This Matters

Without a `.wslconfig` file, WSL can use all your system resources —
for example, I used to see 95% CPU usage and only 2 GB of free RAM during builds.

After applying the configuration above:
- Builds take only 1-2 minute longer than before.
- My system remains smooth and responsive.
- I can browse the web, use VS Code, or multitask comfortably.

In short: A small performance nerf for a much better experience while waiting for builds to finish. 🧘‍♂️