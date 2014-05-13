##说明文档：

**Redirector.uc.js** 是脚本文件，为了统一管理自用配置，我把配置路径设为本地Firefox配置文件夹下的chrome\Local\

_redirector.js 是规则文件，如果你想使用此处这个自用版脚本,那么要把配置文件放到自己建立的 chrome\Local\ 文件夹下

**规则格式如下：**

	{
		name: "about:haoutil",                  // 规则名称
		from: "about:haoutil",                  // 需要重定向的地址
		to: "https://haoutil.googlecode.com",   // 目标地址
		wildcard: false,                        // 可选，true 表示 from 是通配符
		regex: false,                           // 可选，true 表示 from 是正则表达式
		resp: false                             // 可选，true 表示替换 response body
	}
