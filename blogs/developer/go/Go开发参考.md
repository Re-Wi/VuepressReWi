---
title: Go开发参考
date: 2023-03-02 00:00:00
tags:
  - 开发参考
categories:
  - Go
---

## go mod 使用方法

- 参考： <http://docs.iris.elevue.easygoadmin.vip/#/started?id=backend>

```shell
# 初始化模块
go mod init <项目模块名称>

go mod edit:编辑go.mod文件，选项有-json、-require和-exclude，可以使用帮助 go help mod edit

go mod graph:以文本模式打印模块需求图

# 依赖关系处理 ,根据go.mod文件
go mod tidy

# 将依赖包复制到项目下的 vendor目录。
go mod vendor
# 如果包被屏蔽(墙),可以使用这个命令，随后使用 go build -mod=vendor编译

# 验证依赖是否正确
go mod verify

# 查找依赖
go mod why

# 显示依赖关系
go list -m all

# 显示详细依赖关系
go list -m -json all

# 下载依赖
go mod download [path@version]
```

## Golang Cobra Command 详解（三）

- <https://blog.csdn.net/Meyerheim1/article/details/121530390>

```go
type Command struct {
 // Use 表示用一句话来描述这个命令作用，这段话的第一个单词会被作为这个命令的名称
 // 这个设置在子命令中生效，对于根命令则没有意义
 Use string

 // Alias 可以用来给子命令定义别名，除了使用 Use 中的第一个单词作为子命令外，你还可以使用这个 Alias
 // 里面定义的任何一个名称作为子命令名称
 Aliases []string

 // SuggestFor 定义一组提示命令，当输入匹配其中任何一个命令的时候，会提示是否希望输入的为 echo 命令
 SuggestFor []string

 // Short 是用来在帮助信息位置显示的简短命令帮助
 Short string

 // Long 是用来在使用命令 'help <this-command>' 显示帮助信息时显示的长文字
 Long string

 // Example 用来定义子命令使用的具体示例，可以在里面定义多行不同的命令使用样例，供用户参考，这一点在
 // Kubectl 命令中体现的非常明显，因为 Kubectl 命令很复杂，参数也很多，所有样例会极大方便用户
 Example string

 // ValidArgs 是一组可用在 Bash 补全中的合法的非选项参数
 ValidArgs []string
 // ValidArgsFunction is an optional function that provides valid non-flag arguments for shell completion.
 // It is a dynamic version of using ValidArgs.
 // Only one of ValidArgs and ValidArgsFunction can be used for a command.
 ValidArgsFunction func(cmd *Command, args []string, toComplete string) ([]string, ShellCompDirective)

 // Args 表示期望的参数
 Args PositionalArgs

 // ArgAliases 是 ValidArgs 的一组别名
 // 这些参数不会在 Bash 补全中提示给用户，但是如果手动输入的话，也是允许的
 ArgAliases []string

 // BashCompletionFunction 是 Bash 自动补全生成器使用的自定义函数
 BashCompletionFunction string

 // Deprecated 不为空的时候，在命令执行时都会提示命令已废弃，并且输出这段文字
 Deprecated string

 // Annotations 定义一些键值对，应用可以用这些注解来分组命令，主要用于标注上面的分组
 Annotations map[string]string

 // Version 定义这个命令的版本。当 Version 值不为空，且命令没有定义 version 选项的时候，会自动给这个命令增加一个
 // boolean 类型，名称为 version 的选项。如果指定这个选项，就会输出这里 Version 的值。
 Version string

 //  下面的这组 Run 函数执行顺序为：
 //   * PersistentPreRun()
 //   * PreRun()
 //   * Run()
 //   * PostRun()
 //   * PersistentPostRun()
 // 所有的函数传入的参数都相同，都是命令名称之后的参数
 //
 // PersistentPreRun 这个命令的子命令都将继承并执行这个函数
 PersistentPreRun func(cmd *Command, args []string)

 // PersistentPreRunE 和 PersistentPreRun 一样，但是遇到错误时可以返回一个错误
 // 一旦这个函数返回的 error 不为 nil，那么执行就中断了。所以你可以在这个函数里面
 // 做诸如权限验证等等全局性的工作
 PersistentPreRunE func(cmd *Command, args []string) error

 // PreRun 这个命令的子命令不会继承和运行这个函数
 PreRun func(cmd *Command, args []string)

 // PreRunE 和 PreRun 一样，但是遇到错误时可以返回一个错误
 // 一旦这个函数返回的 error 不为 nil，那么执行就中断了。所以你可以在这个函数里面
 // 做一些和该命令相关的输入参数检测之类的工作
 PreRunE func(cmd *Command, args []string) error

 // Run 命令核心工作所在的函数，大多数情况下只实现这个命令即可
 Run func(cmd *Command, args []string)

 // RunE 和 Run 一样，但是遇到错误时可以返回一个错误
 // 一旦这个函数返回的 error 不为 nil，那么执行就中断了。
 RunE func(cmd *Command, args []string) error

 // PostRun 在 Run 函数执行之后执行
 PostRun func(cmd *Command, args []string)

 // PostRunE 在 PostRun 之后执行，但是可以返回一个错误
 // 一旦这个函数返回的 error 不为 nil，那么执行就中断了。
 PostRunE func(cmd *Command, args []string) error

 // PersistentPostRun 在 PostRun 之后执行，这个命令的子命令都将继承并执行这个函数
 PersistentPostRun func(cmd *Command, args []string)

 // PersistentPostRunE 和 PersistentPostRun 一样，但是可以返回一个错误
 // 一旦这个函数返回的 error 不为 nil，那么执行就中断了。
 PersistentPostRunE func(cmd *Command, args []string) error

 // args is actual args parsed from flags.
 args []string
 // flagErrorBuf contains all error messages from pflag.
 flagErrorBuf *bytes.Buffer
 // flags is full set of flags.
 flags *flag.FlagSet
 // pflags contains persistent flags.
 pflags *flag.FlagSet
 // lflags contains local flags.
 lflags *flag.FlagSet
 // iflags contains inherited flags.
 iflags *flag.FlagSet
 // parentsPflags is all persistent flags of cmd's parents.
 parentsPflags *flag.FlagSet
 // globNormFunc is the global normalization function
 // that we can use on every pflag set and children commands
 globNormFunc func(f *flag.FlagSet, name string) flag.NormalizedName

 // usageFunc is usage func defined by user.
 usageFunc func(*Command) error
 // usageTemplate is usage template defined by user.
 usageTemplate string
 // flagErrorFunc is func defined by user and it's called when the parsing of
 // flags returns an error.
 flagErrorFunc func(*Command, error) error
 // helpTemplate is help template defined by user.
 helpTemplate string
 // helpFunc is help func defined by user.
 helpFunc func(*Command, []string)

 //helpCommand “help”的命令。不自定义使用默认
 helpCommand *Command
 // versionTemplate is the version template defined by user.
 versionTemplate string

 // inReader is a reader defined by the user that replaces stdin
 inReader io.Reader
 // outWriter is a writer defined by the user that replaces stdout
 outWriter io.Writer
 // errWriter is a writer defined by the user that replaces stderr
 errWriter io.Writer

 //FParseErrWhitelist 定义可以被忽略的解析错误
 FParseErrWhitelist FParseErrWhitelist

 // CompletionOptions is a set of options to control the handling of shell completion
 CompletionOptions CompletionOptions

 // commandsAreSorted defines, if command slice are sorted or not.
 commandsAreSorted bool
 // commandCalledAs 用于调用此命令的名称或别名值。
 commandCalledAs struct {
  name   string
  called bool
 }

 ctx context.Context

 //commands 支持的命令列表。
 commands []*Command
 // parent是此命令的父命令。
 parent *Command
 // Max lengths of commands' string lengths for use in padding.
 commandsMaxUseLen         int
 commandsMaxCommandPathLen int
 commandsMaxNameLen        int

 // TraverseChildren 在执行该命令子命令前，解析所有父命令的选项
 TraverseChildren bool

 // Hidden 参数设置为 true 的时候，将无法在命令帮助列表中看到这个命令，但是实际这个命令仍然是可用的，一般用于
 // 对命令做向下兼容的处理，在未来的版本中如果这个命令会废弃，那么先让它隐藏起来会比直接删除较好
 Hidden bool

 // SilenceErrors 设置为 true 时可以在命令执行过程中遇到任何错误时，不显示错误
 SilenceErrors bool

 // SilenceUsage 设置为 true 时可以在命令执行遇到输入错误时，不显示使用方法
 SilenceUsage bool

 // DisableFlagParsing 设置为 true 时将禁用选项解析功能，这样命令之后所有的内容
 DisableFlagParsing bool

 // DisableAutoGenTag 在生成命令文档的时候是否显示 gen tag
 DisableAutoGenTag bool

 // DisableFlagsInUseLine 设置为 true 的时候，将不会在命令帮助信息或者文档中显示命令支持的选项
 DisableFlagsInUseLine bool

 // DisableSuggestions 禁用命令提示
 DisableSuggestions bool

 // SuggestionsMinimumDistance 定义显示命令提示的最小的 Levenshtein 距离
 SuggestionsMinimumDistance int
}
```

## mysql 操作

```shell
#登录mysql
mysql -u<用户名> -p<密码>
#查看数据库
show databases;

drop DATABASE GinMasterReWi;
CREATE DATABASE IF NOT EXISTS GinMasterReWi DEFAULT CHARSET utf8 COLLATE utf8_general_ci;

use GinMasterReWi;
show tables;
```

## GoLang 使用文档

- <https://www.runoob.com/go/go-functions.html>
- <http://c.biancheng.net/view/124.html>
- <https://haicoder.net/golang/golang-string-contains.html>

## 扫描文件夹

- <https://blog.csdn.net/HYZX_9987/article/details/100072442>

## Go 语言获取文件的名称、前缀、后缀

- <https://www.jb51.net/article/211509.htm>

## golang 字符串转大小写

- <https://blog.csdn.net/eight_eyes/article/details/117695853>

## Go 语言读写 Excel

- <https://blog.csdn.net/mrxuri/article/details/53842834>
- <https://www.jb51.net/article/264269.htm>

## go 获取当前时间，以及时间格式转换

- <https://blog.csdn.net/weixin_48536164/article/details/126760855>

## Go 局部变量&全局变量

- <https://blog.csdn.net/wangming520liwei/article/details/122136288>

## go 判断字符串里是否包含子字符串 支持费操作

- <https://blog.csdn.net/m0_37684037/article/details/106243897>

## golang 读取文件，按行读取，写入文件

- <https://blog.csdn.net/raoxiaoya/article/details/117998066>
- <https://www.jb51.net/article/262878.htm>
- <https://www.cnblogs.com/ljymoonlight/p/15820236.html>

## go 语言中常用的功能之四（正则匹配）

- <https://blog.csdn.net/wujiangwei567/article/details/86593396>
- <https://www.jb51.net/article/181664.htm>
- <https://c.runoob.com/front-end/854/>

## GO 简单入门：返回和处理一个错误

- <https://www.runoob.com/go/go-error-handling.html>
- <https://blog.csdn.net/hefrankeleyn/article/details/126415972>

## golang go 中字符串和各种 int 类型之间的相互转换方式

- <https://www.cnblogs.com/zhaoyingjie/p/15702174.html>

## 添加可执行文件图标

- <https://www.shuzhiduo.com/A/rV57RaeXJP/>

## Go 语言 JSON

- <https://zhuanlan.zhihu.com/p/393998886>
- <https://blog.csdn.net/arv002/article/details/116029758>
- <https://www.mianshigee.com/question/127883drr/>
  JSON 文件
- <https://blog.csdn.net/weixin_41670928/article/details/122569045>
- <https://blog.csdn.net/weixin_44328568/article/details/120517480>

## golang 字符串 去首尾字符

- <https://blog.csdn.net/whatday/article/details/109278821>

## 判断子串

- <https://blog.csdn.net/HYZX_9987/article/details/100072442>

## 条件编译

- <https://www.cnblogs.com/ksir16/p/9050721.html>
- <https://www.xhyonline.com/?p=1182>

```shell
# 安装依赖
go mod tidy

# 运行项目
go run main.go

# 构建执行命令
go build -o BOEVXAGoScreenTester.exe ./BOEVXAGoScreenTester.go
go build -o BOEVXAGoTouchReader.exe ./BOEVXAGoTouchReader.go
go build -o BOEVXAGoReader.exe .
```

## go 字符串切割方法小结

- <https://www.cnblogs.com/zxqblogrecord/p/13303212.html>

## Go 语言测试

- <https://blog.csdn.net/qq_46284579/article/details/121367133>

go test 命令会遍历所有的\*\_test.go 文件中符合上述命名规则的函数，然后生成一个临时的 main 包用于调用相应的测试函数，然后构建并运行、报告测试结果，最后清理测试中生成的临时文件。
测试函数的名字必须以 Test 开头，可选的后缀名必须以大写字母开头
我们都知道可以通过-run=RegExp 来指定运行的测试用例，还可以通过/来指定要运行的子测试用例，例如：go test -v -run=Split/simple 只会运行 simple 对应的子测试用例。

```go
func TestMoreSplit(t *testing.T) {
type test struct { // 定义test结构体
input string
sep   string
want  []string
}
tests := map[string]test{ // 测试用例使用map存储
"simple":      {input: "a:b:c", sep: ":", want: []string{"a", "b", "c"}},
"wrong sep":   {input: "a:b:c", sep: ",", want: []string{"a:b:c"}},
"more sep":    {input: "abcd", sep: "bc", want: []string{"a", "d"}},
"leading sep": {input: "沙河有沙又有河", sep: "沙", want: []string{"河有", "又有河"}},
}
for name, tc := range tests {
t.Run(name, func (t *testing.T) { // 使用t.Run()执行子测试
got := Split(tc.input, tc.sep)
if !reflect.DeepEqual(got, tc.want) {
t.Errorf("expected:%#v, got:%#v", tc.want, got)
}
})
}
}
```

```shell
#-v参数，查看测试函数名称和运行时间
#-run参数，它对应一个正则表达式，只有函数名匹配上的测试函数才会被go test命令执行。
#-cover来查看测试覆盖率
#-coverprofile参数，用来将覆盖率相关的记录信息输出到一个文件。
go test -v -run="More" -cover -coverprofile=c.out
```

上面的命令会将覆盖率相关的信息输出到当前文件夹下面的 c.out 文件中，然后我们执行 go tool cover -html=c.out，使用 cover 工具来处理生成的记录信息，该命令会打开本地的浏览器窗口生成一个 HTML 报告。

### 基准测试

- <https://blog.csdn.net/qq_46284579/article/details/121367133>

基准测试以 Benchmark 为前缀，需要一个\*testing.B 类型的参数 b，基准测试必须要执行 b.N 次，这样的测试才有对照性，b.N 的值是系统根据实际情况去调整的，从而保证测试的稳定性。 testing.B 拥有的方法如下：

```go
package split

import "strings"

// split package with a single split function.

// Split slices s into all substrings separated by sep and
// returns a slice of the substrings between those separators.
func Split(s, sep string) (result []string) {
  i := strings.Index(s, sep)

  for i > -1 {
    result = append(result, s[:i])
    s = s[i+len(sep):] // 这里使用len(sep)获取sep的长度
    i = strings.Index(s, sep)
  }
  result = append(result, s)
  return
}

//使用make函数将result初始化为一个容量足够大的切片，而不再像之前一样通过调用append函数来追加。看一下这个改进会带来多大的性能提升：减少了2/3的内存分配次数，并且减少了一半的内存分配。

func Split(s, sep string) (result []string) {
result = make([]string, 0, strings.Count(s, sep)+1)
i := strings.Index(s, sep)
for i > -1 {
result = append(result, s[:i])
s = s[i+len(sep):] // 这里使用len(sep)获取sep的长度
i = strings.Index(s, sep)
}
result = append(result, s)
return
}

func BenchmarkSplit(b *testing.B) {
  for i := 0; i < b.N; i++ {
    Split("沙河有沙又有河", "沙")
  }
}
```

```shell
#基准测试并不会默认执行，需要增加-bench参数
#-benchmem参数，来获得内存分配的统计数据。
go test -bench=Split -benchmem
```

112 B/op 表示每次操作内存分配了 112 字节，3 allocs/op 则表示每次操作进行了 3 次内存分配。

### 性能比较函数

上面的基准测试只能得到给定操作的绝对耗时，但是在很多性能问题是发生在两个不同操作之间的相对耗时，比如同一个函数处理 1000 个元素的耗时与处理 1 万甚至 100 万个元素的耗时的差别是多少？
通常需要对两个不同算法的实现使用相同的输入来进行基准比较测试。
性能比较函数通常是一个带有参数的函数，被多个不同的 Benchmark 函数传入不同的值来调用。举个例子如下：

```go
// fib.go
// Fib 是一个计算第n个斐波那契数的函数
func Fib(n int) int {
if n < 2 {
return n
}
return Fib(n-1) + Fib(n-2)
}

// fib_test.go

func benchmarkFib(b *testing.B, n int) {
for i := 0; i < b.N; i++ {
Fib(n)
}
}

func BenchmarkFib1(b *testing.B)  { benchmarkFib(b, 1) }
func BenchmarkFib2(b *testing.B)  { benchmarkFib(b, 2) }
func BenchmarkFib3(b *testing.B)  { benchmarkFib(b, 3) }
func BenchmarkFib10(b *testing.B) { benchmarkFib(b, 10) }
func BenchmarkFib20(b *testing.B) { benchmarkFib(b, 20) }
func BenchmarkFib40(b *testing.B) { benchmarkFib(b, 40) }
```

```shell
#-benchtime标志增加最小基准时间，以产生更准确的结果。
go test -bench=.
go test -bench=Fib40 -benchtime=20s
```

### 重置时间

b.ResetTimer 之前的处理不会放到执行时间里，也不会输出到报告中，所以可以在之前做一些不计划作为测试报告的操作。

```go
func BenchmarkSplit(b *testing.B) {
 time.Sleep(5 * time.Second) // 假设需要做一些耗时的无关操作
 b.ResetTimer()              // 重置计时器
 for i := 0; i < b.N; i++ {
  Split("沙河有沙又有河", "沙")
 }
}
```

### 并行测试

func (b *B) RunParallel(body func(*PB))会以并行的方式执行给定的基准测试。
RunParallel 会创建出多个 goroutine，并将 b.N 分配给这些 goroutine 执行， 其中 goroutine 数量的默认值为 GOMAXPROCS。用户如果想要增加非 CPU 受限（non-CPU-bound）基准测试的并行性， 那么可以在 RunParallel 之前调用 SetParallelism 。RunParallel 通常会与-cpu 标志一同使用。

```go
func BenchmarkSplitParallel(b *testing.B) {
 // b.SetParallelism(1) // 设置使用的CPU数
 b.RunParallel(func(pb *testing.PB) {
  for pb.Next() {
   Split("沙河有沙又有河", "沙")
  }
 })
}
```

```shell
go test -bench=.
#还可以通过在测试命令后添加-cpu参数如go test -bench=. -cpu 1来指定使用的CPU数量。
```

### Setup 与 TearDown

测试程序有时需要在测试之前进行额外的设置（setup）或在测试之后进行拆卸（teardown）。
TestMain 运行在主 goroutine 中, 可以在调用 m.Run 前后做任何设置（setup）和拆卸（teardown）。退出测试的时候应该使用 m.Run 的返回值作为参数调用 os.Exit。
需要注意的是：在调用 TestMain 时, flag.Parse 并没有被调用。所以如果 TestMain 依赖于 command-line 标志 (包括 testing 包的标记), 则应该显示的调用 flag.Parse。

```go
func TestMain(m *testing.M) {
 fmt.Println("write setup code here...") // 测试之前的做一些设置
 // 如果 TestMain 使用了 flags，这里应该加上flag.Parse()
 retCode := m.Run()                         // 执行测试
 fmt.Println("write teardown code here...") // 测试之后做一些拆卸工作
 os.Exit(retCode)                           // 退出测试
}
```

### 示例函数

函数名以 Example 为前缀。它们既没有参数也没有返回值。标准格式如下：
为你的代码编写示例代码有如下三个用处：

1. 示例函数能够作为文档直接使用，例如基于 web 的 godoc 中能把示例函数与对应的函数或包相关联。
2. 示例函数只要包含了// Output:也是可以通过 go test 运行的可执行测试。
3. 示例函数提供了可以直接运行的示例代码，可以直接在 golang.org 的 godoc 文档服务器上使用 Go Playground 运行示例代码。

```go
func ExampleName() {
    // ...
}
//下面的代码是我们为Split函数编写的一个示例函数：
func ExampleSplit() {
fmt.Println(split.Split("a:b:c", ":"))
fmt.Println(split.Split("沙河有沙又有河", "沙"))
// Output:
// [a b c]
// [ 河有 又有河]
}
```

## go test 提示 no test files

- <https://www.sunzhongwei.com/go-test-suggests-no-test-files>

```go
//解决方法一
go test -v ./...
//解决方法二
//进入子目录执行：
cd utils/
go test -v
```

## go 语言主流开发框架参考

- <https://www.topgoer.com/>

```go

```

## go 语言递归创建目录

- <https://blog.csdn.net/inthat/article/details/123727180>

```go
os.Mkdir("abc", os.ModePerm) //创建目录
os.MkdirAll("dir1/dir2/dir3", os.ModePerm) //创建多级目录

//MkdirAll会创建一个名为path的目录以及任何必要的父项，并返回nil，否则返回错误。如果path已经是一个目录，MkdirAll什么也不做，并返回nil。
//basePath是固定目录路径,不包含具体的文件名，如果你传成了 /home/xx.txt, xx.txt也会被当成目录
func CreateDateDir(basePath string) (dirPath string) {
folderPath := filepath.Join(basePath)

err :=os.MkdirAll(folderPath, os.ModePerm)

if err!=nil{
fmt.Println("创建目录报错")
fmt.Println(err)
}

return folderPath
}
//go创建文件带目录,并写入特定内容
// create file with dir if dir is not exist
// path is dir
// name is file name
func createFileWithDir(path string, name string, content string) {
os.MkdirAll(path, os.ModePerm)
file, _ := os.OpenFile(path + "/" + name, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0666)
defer file.Close()
file.WriteString(content)
}

```

## Gin 模板

- <https://zhuanlan.zhihu.com/p/429647200>
- <https://blog.csdn.net/Gherbirthday0916/article/details/124796907>

## golang 中结构体当做函数参数或函数返回值都会被拷贝

- <http://www.manongjc.com/detail/26-mcscpivbfmypgug.html>

```go
package main
import "fmt"
type Person struct {
 name string
 age int
}
var p = Person{"武沛齐", 18}
func doSomething() *Person {
 // 结构体做函数的参数或返回值时，都会被重新拷贝一份，如果不想拷贝，可以传递结构体指针
 return &p
}
func main() {
 p1 := doSomething()
 p.name = "马亚南"
 fmt.Println(p1)
 fmt.Println(p)
}
```

## golang 里面关于 map[string]interface{}取值问题

- <https://blog.csdn.net/begefefsef/article/details/126663175>

```go
a := data["int"].(int)
b := data["string"].(string)
```

## go 获取数据类型和类型转换

- <https://blog.csdn.net/liulanba/article/details/128781269>

```go
fmt.Println(reflect.TypeOf(x), x, string(x))
```

## golang 字符串 转 时间类型

- <http://www.manongjc.com/detail/63-mkweyxulayhwydm.html>
- <https://blog.csdn.net/yuezhilangniao/article/details/122763144>
- <https://blog.csdn.net/z_xiaocun/article/details/46934223>
- <https://blog.csdn.net/qq_42303254/article/details/117637436>

```go
//需要转换的 字符串 必须和时间常量 格式一致
//正确例子：
//“2006-01-02 15:04:05”, “2021-11-07 11:34:00”
//“2006-01-02”, “2021-11-07”
//错误例子：
//“2006-01-02 15:04:05”, “2021-11-07”
```

## map,切片,数组转 json 格式

- <https://blog.csdn.net/qq_36977923/article/details/124854677>
- <https://www.zhihu.com/question/582442340/answer/2882892085>

```go
 //map转json
 mapData := make(map[string]interface{})
 mapData["age"] = 18
 mapData["name"] = "沉默小管"
 fmt.Println(mapData)
 bytes,_ := json.Marshal(mapData)
 stringData := string(bytes)
 fmt.Println(stringData)

 var result map[string]interface{}
 // json转为map数据结构
 json.Unmarshal([]byte(stringData), &result)
 fmt.Println(result,"--mapData")

package main

import (
"encoding/json"
"fmt"
)

type Person struct {
Name string
Age  int
}

func main() {
jsonData := `{"Name": "John", "Age": 30}`
var person Person
err := json.Unmarshal([]byte(jsonData), &person)
if err != nil {
fmt.Println("Error decoding JSON:", err)
return
}
fmt.Println(person.Name, person.Age)
}

```

## go 语言 json 嵌套数组结构体用法

- <https://blog.csdn.net/m0_38004619/article/details/99661474>

```go

type Order struct{
 OrderId string `json:"order_id"`
 OrderPrice float64 `json:"order_price"`
 Goods []Good `json:"good"`
}

type Good struct{

 GoodsName string `json:"goods_name"`
 GoodsPrice float64 `json:"goods_price"`
 GoodsColor []Color `json:"Goods_color"`
}
```

## Golang 解析 json 对象时 time 类型解析异常的解决方法

- <https://blog.csdn.net/ttbro/article/details/120045194>

```go

```

## 配置文件(CSV 与 YAML）读写

- <https://blog.csdn.net/alwaysrun/article/details/128055427>

```go

```

## 如何扩展 go-yaml 以支持自定义标签

- <https://cloud.tencent.com/developer/ask/sof/804191>

```go

```

## YAML 格式

- <https://www.jianshu.com/p/2a777cbf0dfe>
- <https://blog.csdn.net/youngzil/article/details/125212861>

```yaml
#ISO 8601日期格式如下：
YYYY-MM-DDThh:mm:ss[.mmm]TZD
#其中：
#YYYY表示四位数的年份
#MM表示两位数的月份
#DD表示两位数的天(day of the month)，从01到31
#T是用来指示时间元素的开始字符
#hh表示两位数的小时，从00到23，不包括AM/PM
#mm表示两位数的分钟，从00到59
#ss表示两位数的秒，从00到59
#mmm表示三位数的毫秒数，从000到999
#TZD表示时区指示符：Z或+hh:mm或-hh:mm，+或-表示时区距离UTC(世界标准时间)时区多远。例如：
#CST(中国标准时间)：UTC +08:00，EST(东部标准时间)：UTC -05:00，CST(中部标准时间)：UTC -06:00。
2012-03-29T10:05:45-06:00
#表示：中部标准时间2012年3月29日10:05:45。
```

## go 泛型使用方法

- <https://blog.csdn.net/qq_42062052/article/details/123840525>
- <https://www.jb51.net/article/252009.htm>

> 需要 go 版本大于等于 1.18
> 泛型生命周期只在编译期，旨在为程序员生成代码，减少重复代码的编写
> 内置的泛型类型 any 和 comparable：
> any: 表示 go 里面所有的内置基本类型，等价于 interface{}
> comparable: 表示 go 里面所有内置的可比较类型：int、uint、float、bool、struct、指针等一切可以比较的类型

```go
//在比较两个数的大小时，没有泛型的时候，仅仅只是传入类型不一样，我们就要再写一份一模一样的函数，如果有了泛型就可以减少这类代码
// int
func GetMaxNumInt(a, b int) int {
if a > b {
return a
}
return b
}

// int8
func GetMaxNumInt8(a, b int8) int8 {
if a > b {
return a
}
return b
}
//只需要在函数后用中括号声明T可能出现的类型，中间用符号"|" 分隔
// 使用泛型
func GetMaxNum[T int | int8](a, b T) T {
    if a > b {
        return a
    }

    return b
}
```

## Golang 程序 将一个元素追加到一个数组中

- <https://geek-docs.com/go-tutorials/go-articles/golang-program-to-append-an-element-into-an-array.html>
- <https://blog.csdn.net/weixin_45728126/article/details/125708465>

## 【GORM】使用 GORM 连接各种数据库（2022）

- <https://blog.csdn.net/Gherbirthday0916/article/details/125024161>

## Golang 使用 github 托管 go 类库

- <https://www.zhihu.com/tardis/sogou/art/354147069>

## Golang 管理 go 类库版本 包及版本管理

- <https://www.zhihu.com/tardis/sogou/art/355318345>
- <https://blog.csdn.net/lyp256/article/details/115078745>
- <https://www.zhihu.com/tardis/sogou/art/354147069>

## go 私有模块管理

- <https://blog.csdn.net/lyp256/article/details/115078745>

## 如何解决 get 请求 url 参数中有+、空格、=、%、&、#等特殊符号的问题

- <https://lyzmz.blog.csdn.net/article/details/127347919>

```text
用其它字符替代吧,或用全角的。
| 符号  |             说明             | 全角  |
| :---: | :--------------------------: | :---: |
| 空格  | URL中的空格可以用+号或者编码 |  %20  |
|   +   |       URL中+号表示空格       |  %2B  |
|   /   |       分隔目录和子目录       |  %2F  |
|   ?   |     分隔实际的URL和参数      |  %3F  |
|   %   |         指定特殊字符         |  %25  |
|   #   |           表示书签           |  %23  |
|   &   |  URL中指定的参数间的分隔符Q  |  %26  |
|   =   |      URL中指定参数的值       |  %3D  |
```

## 使用 Go Module 时 go get 更新依赖包的方法记录

- <https://www.jianshu.com/p/84d4c4358710>

```bash
go get -u
go mod tidy
```

## Go 语言获取文件的文件路径、文件名、扩展名

- <https://blog.csdn.net/u012183747/article/details/73666363>

```go
import (
"fmt"
"os"
"path/filepath"
"path"
)
files := "E:\\data\\test.txt"
paths, fileName := filepath.Split(files)
fmt.Println(paths, fileName) //获取路径中的目录及文件名 E:\data\  test.txt
fmt.Println(filepath.Base(files)) //获取路径中的文件名test.txt
fmt.Println(path.Ext(files)) //获取路径中的文件的后缀 .txt
```

## 跨平台 gui

> <https://www.cnblogs.com/jiftle/p/15315488.html>
