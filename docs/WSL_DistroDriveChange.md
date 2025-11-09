- 1. Create the directories:

You can use any drive you prefer — this example uses `D:`
```
mkdir D:\WSL\
mkdir D:\WSL\BACKUP
```

- 2. Export your current distro to the targeted Driver:

This creates a `.tar` file of your current distro
```
wsl --export <distro_name> D:\WSL\BACKUP\<distro_name>.tar
```

- 3. Unregister current distro:
(Only do this if you want to reuse the same name — this will permanently delete the existing installation)
```
wsl --unregister <distro_name>
```

- 4. Install the distro from the backup you made:
(This restores your distro in the new location)
```
wsl --import <distro_name> D:\WSL\<distro_name> D:\WSL\BACKUP\<distro_name>.tar
```