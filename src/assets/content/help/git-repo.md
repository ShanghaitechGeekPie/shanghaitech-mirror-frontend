## Repo镜像使用帮助

您应当首先考虑使用您的Linux发行版中的官方软件包。

如果您发现软件包版本已过时，或您的Linux发行版中没有可用的官方软件包，您可以从Google官方（参见`AOSP`帮助文档）或我们的镜像源获取`Repo`：

```bash
export REPO=$(mktemp /tmp/repo.XXXXXXXXX)
curl -o ${REPO} https://mirrors.shanghaitech.edu.cn/git-repo/repo
install -m 755 ${REPO} ~/bin/repo
```

`Repo`会在初始化仓库前尝试从官方源获取更新，如果您无法访问官方源，可设置以下环境变量以使用我们的镜像源：

```bash
export REPO_URL="https://mirrors.shanghaitech.edu.cn/git/git-repo"
```