rules = [
	{
		name: "about:haoutil",                  // 规则名称
		from: "about:haoutil",                  // 需要重定向的地址
		to: "https://haoutil.googlecode.com",   // 目标地址
		wildcard: false,                        // 可选，true 表示 from 是通配符
		regex: false,                           // 可选，true 表示 from 是正则表达式
		resp: false                             // 可选，true 表示替换 response body
	},
	{
		name: "wiki中文>>简体中文",
		from: /\:\/\/zh\.wikipedia\.org\/(?!zh\-cn\/)[^\/]+/i,
		exclude: /favicon\.ico/i,  
		to: '://zh.wikipedia.org/zh-cn',
		regex: true
	},
	{
		name: "userscripts:8080",
		from: /^https?:\/\/userscripts\.org\/(.*)/i,
		to: "http:\/\/userscripts.org:8080/$1",
		regex: true
	},
	{
		name: "WiKi链接加密",
		from: /^http:\/\/([^\/]+\.wikipedia\.org\/.+)/i,
		to: "https://$1",
		regex: true
	},
	{
	    // 包含手机版界面
	    name: "百度随心听（音质改320）",
	    from: /^http:\/\/music\.baidu\.com\/data\/music\/fmlink(.*[&\?])rate=[^3]\d+(.*)/i,
	    to: "http://music.baidu.com/data/music/fmlink$1rate=320$2",
	    regex: true
	}
];