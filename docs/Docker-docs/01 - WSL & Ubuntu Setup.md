# 01 — WSL & Ubuntu Setup

## Why WSL?
The Docker workflow we learned uses Linux concepts such as users, permissions, processes, filesystems, networking and command-line tools. On Windows, WSL provides a Linux environment, and we used Ubuntu as the distribution.

```text
Windows
  └── WSL
       └── Ubuntu
            └── Linux tools / Docker workflow
```

## Why this mattered
WSL/Ubuntu gave us a place to become comfortable with:
- Linux shell commands
- Linux users and permissions
- Files and directories
- Processes
- Package installation
- Host vs container

## Three environments
```text
1. Windows host
2. WSL / Ubuntu
3. Docker containers
```

Later, cloud deployment introduces another Linux host:

```text
Cloud Linux server
    └── Docker
         └── containers
```

> [!IMPORTANT]
> A container is an isolated runtime environment created from an image. It is not simply another folder on the host.
