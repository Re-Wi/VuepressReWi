---
title: C_C++项目文档自动生成
date: 2024-12-2 7:00:00
tags:
  - 自动文档
categories:
  - C_C++
---

## MkDocs 与 Doxygen 和 Breathe 插件

使用 **MkDocs** 生成文档的最佳方案取决于你的项目需求、文档的复杂性以及是否希望集成其他工具或插件。以下是一个基于常见使用场景的最佳方案，适用于 C/C++ 项目和需要从代码注释中生成文档的情况。

在 Windows 上使用 MkDocs、Doxygen 和 Breathe 插件来生成文档的过程与在 Linux 系统上类似。以下是详细步骤，帮助你在 Windows 上设置并生成文档。

这种方案适用于希望将 **MkDocs** 的简洁、可定制性与 **Doxygen** 的强大文档生成功能结合起来，生成精美且易于维护的文档。

### 步骤一：安装工具

1. **安装 Doxygen**

- Doxygen 是用于从 C/C++ 代码中提取文档的工具。首先需要在项目中添加注释，然后使用 Doxygen 来生成接口文档（通常是 HTML 或 LaTeX 格式）。
- 安装 Doxygen：

:::: code-group
::: code-group-item linux

```bash
sudo apt install doxygen
```

:::
::: code-group-item window

```bash
https://www.doxygen.nl/download.html
# 选择 Add to PATH 选项，确保可以在命令行中直接使用 doxygen 命令。
```

:::
::::

2. **安装 Python**
访问 [Python 官网](https://www.python.org/downloads/)，下载并安装 Python。
在安装时勾选 Add Python to PATH 选项，方便在命令行中使用。

3. **安装 MkDocs**

- MkDocs 是一个使用 Markdown 来编写文档的静态站点生成器，特别适合生成简单、漂亮的项目文档。
- 安装 MkDocs：

     ```bash
     pip install mkdocs
     ```

4. **安装 Breathe 插件**

- **Breathe** 插件使得 MkDocs 可以与 Doxygen 生成的文档结合使用，渲染 Doxygen 输出到 MkDocs 页面中。
- 安装 Breathe 插件：

     ```bash
     pip install breathe
     ```

### 步骤二：配置 Doxygen

1. 在项目根目录下运行 Doxygen 配置命令，生成默认配置文件：

   ```bash
   doxygen -g Doxyfile
   ```

2. 打开 `Doxyfile` 配置文件，进行以下调整：
   - **EXTRACT_ALL = YES**：确保提取所有类、函数和变量的文档。
   - **INPUT = src/**：指定代码文件目录。
   - **RECURSIVE = YES**：如果有子目录，递归扫描。
   - **GENERATE_HTML = YES**：生成 HTML 文档。
   - **GENERATE_LATEX = NO**：关闭 LaTeX 文档生成（可以根据需要选择是否开启）。
   - **OUTPUT_DIRECTORY = docs/doxygen**：设置 Doxygen 输出的文件目录（推荐输出到 `docs/doxygen`，以便后续集成到 MkDocs 中）。

```ini
EXTRACT_ALL = YES
INPUT = src/
RECURSIVE = YES
GENERATE_HTML = YES
GENERATE_LATEX = NO
OUTPUT_DIRECTORY = docs/doxygen
```

### 步骤三：配置 MkDocs

1. 在项目根目录下初始化一个 MkDocs 项目：

   ```bash
   mkdocs new .
   ```

2. 修改 `mkdocs.yml` 配置文件，配置网站标题和其他设置：

在 `mkdocs.yml` 中添加 `breathe` 配置，指定 Doxygen 输出的目录：

   ```yaml
   site_name: My C++ Project Documentation
   theme:
     name: material
   plugins:
     - search
     - breathe
   markdown_extensions:
     - admonition
   breathe_projects:
     my_project: docs/doxygen/xml
   ```

3. 在 `docs/index.md` 文件中，使用 `.. doxygenindex::` 插入 Doxygen 生成的内容：

   ```markdown
   # Welcome to My C++ Project Documentation

   This is the home page for my C++ project's documentation.

   .. doxygenindex::
   ```

### 步骤四：生成文档

1. 运行 Doxygen 生成代码文档：

- 在项目根目录下运行 Doxygen 生成文档：

   ```bash
   doxygen Doxyfile
   ```

- 这会在 docs/doxygen/xml 目录下生成一个 XML 文件，Breathe 插件会用这个文件来渲染 Doxygen 文档。

2. 启动 MkDocs 开发服务器：

- 在项目根目录下运行 MkDocs 开发服务器，查看本地生成的文档：

   ```bash
   mkdocs serve
   ```

   这将启动一个本地服务器，通常可以通过 `http://127.0.0.1:8000` 来访问生成的文档。

### 步骤五：发布文档

- 如果你希望将文档发布到 GitHub Pages 或其他静态网站托管服务，可以使用以下命令：

  ```bash
  mkdocs gh-deploy
  ```

### 总结

在 Windows 上使用 MkDocs、Doxygen 和 Breathe 插件生成文档的步骤与在 Linux 上类似，只是工具的安装方式有所不同。通过结合这三个工具，你可以：

使用 Doxygen 从代码注释中生成详细的 API 文档。
使用 Breathe 插件将 Doxygen 输出集成到 MkDocs 项目中。
最终生成一个漂亮的文档网站，能够展示项目的 API、类、函数等信息，并可以进行部署。

结合 **MkDocs** 和 **Doxygen** 可以充分利用两者的优势：MkDocs 提供了一个漂亮、易于定制的文档展示平台，而 Doxygen 则能自动生成代码的详细文档。通过 **Breathe** 插件，MkDocs 能渲染 Doxygen 输出的内容，这样你就可以轻松地从注释中生成 API 文档，并且整合到一个统一的文档站点中。

这种方案的优势在于：

- **自动化**：Doxygen 自动提取代码中的注释，生成 API 文档。
- **可定制性**：MkDocs 提供了灵活的主题和插件，可以定制文档的外观。
- **易于维护**：只需要更新代码中的注释，Doxygen 和 MkDocs 可以自动生成和更新文档。

对于大多数 C/C++ 项目而言，这是一个非常高效和实用的文档生成方案。

这种方案的好处是可以自动化生成 API 文档，且支持自定义外观和交互式功能，特别适用于需要展示复杂 API 或大量代码注释的 C/C++ 项目。

## C/C++工程的文档自动生成工具

```text
在C/C++项目中，自动生成文档的工具主要有以下几种，分别适用于不同的需求和使用场景：

1. **Doxygen**
   - **简介**: Doxygen 是 C/C++ 等多种语言的文档生成工具，支持从注释中自动提取信息生成文档（支持 HTML, LaTeX 等格式）。
   - **特点**:
     - 自动化：通过分析代码中的注释来生成文档。
     - 支持多种输出格式：HTML、LaTeX、RTF、PDF等。
     - 可以生成类、函数、变量等的结构化文档。
     - 支持图表、继承关系图等可视化功能。
   - **使用方法**:
     - 在代码中使用特定格式的注释（如 `/** ... */`），然后运行 Doxygen，生成文档。
     - 配置文件可以通过 `doxygen -g` 命令生成，之后配置和运行。
   
   - **官网**: [https://www.doxygen.nl](https://www.doxygen.nl)

2. **Sphinx**
   - **简介**: Sphinx 是一个强大的文档生成工具，原本用于 Python，但也支持 C/C++ 项目，通过 `Breathe` 插件可以与 Doxygen 集成。
   - **特点**:
     - 主要通过 reStructuredText 来编写文档。
     - 集成 Doxygen 输出并渲染成更漂亮的 HTML 或 PDF 格式。
     - 强大的扩展性和主题支持。
   - **使用方法**:
     - 使用 `sphinx-quickstart` 创建项目，配置 Doxygen 作为源。
     - 使用 `breathe` 插件连接到 Doxygen 输出，生成更加定制化的文档。
   
   - **官网**: [https://www.sphinx-doc.org](https://www.sphinx-doc.org)

3. **MkDocs**
   - **简介**: MkDocs 是一个静态网站生成器，适用于文档生成，支持 Markdown 格式编写文档。虽然它主要是为 Python 项目设计的，但也可以用于 C/C++ 项目，使用插件来集成其他工具（如 Doxygen）。
   - **特点**:
     - 使用 Markdown 编写文档，配置简单。
     - 支持主题和插件，可以定制外观。
     - 支持将 Doxygen 输出与 MkDocs 集成，通过插件呈现生成的文档。
   - **使用方法**:
     - 配置 MkDocs 项目，通过 MkDocs 插件集成 Doxygen 输出。
   
   - **官网**: [https://www.mkdocs.org](https://www.mkdocs.org)

4. **Clang-Doc**
   - **简介**: Clang-Doc 是一个用于从 C/C++ 代码中生成文档的工具，依赖于 Clang 的解析能力。
   - **特点**:
     - 从 Clang 解析出来的抽象语法树 (AST) 中生成文档。
     - 专注于现代 C++ 标准，能够较好地支持 C++ 代码结构。
     - 可以生成 HTML 和 JSON 格式的文档。
   - **使用方法**:
     - 通过 Clang 的命令行工具生成文档。
   
   - **官网**: [https://clang.llvm.org](https://clang.llvm.org)

5. **NaturalDocs**
   - **简介**: NaturalDocs 是一个较为简单的文档生成工具，专门为 C/C++ 项目设计。
   - **特点**:
     - 直接从代码注释中提取文档。
     - 支持多种语言（包括 C/C++），并提供直观的网页查看。
     - 可以为类、方法、变量等生成文档。
   - **使用方法**:
     - 注释格式类似于 Javadoc，运行工具生成 HTML 文档。
   
   - **官网**: [https://www.naturaldocs.org](https://www.naturaldocs.org)

### 总结
- 如果你已经习惯了标准化注释格式，并且需要强大的功能，**Doxygen** 是最常用和推荐的工具。
- 如果你需要更现代、可定制化的文档格式，并希望通过插件集成 Doxygen 输出，可以考虑使用 **Sphinx** 或 **MkDocs**。
- 对于专注于 C++ 的开发者，**Clang-Doc** 提供了更贴合 C++ 标准的支持。

```
