// ライブラリごとの言語リスト
const langList = {
  prism: [
    "javascript",
    "markup",
    "html",
    "xml",
    "svg",
    "mathml",
    "ssml",
    "atom",
    "rss",
    "css",
    "clike",
    "javascript",
    "js",
    "abap",
    "abnf",
    "actionscript",
    "ada",
    "agda",
    "al",
    "antlr4",
    "g4",
    "apacheconf",
    "apex",
    "apl",
    "applescript",
    "aql",
    "arduino",
    "ino",
    "arff",
    "armasm",
    "arm-asm",
    "arturo",
    "art",
    "asciidoc",
    "adoc",
    "aspnet",
    "asm6502",
    "asmatmel",
    "autohotkey",
    "autoit",
    "avisynth",
    "avs",
    "avro-idl",
    "avdl",
    "awk",
    "gawk",
    "bash",
    "sh",
    "shell",
    "basic",
    "batch",
    "bbcode",
    "shortcode",
    "bbj",
    "bicep",
    "birb",
    "bison",
    "bnf",
    "rbnf",
    "bqn",
    "brainfuck",
    "brightscript",
    "bro",
    "bsl",
    "oscript",
    "c",
    "csharp",
    "cs",
    "dotnet",
    "cpp",
    "cfscript",
    "cfc",
    "chaiscript",
    "cil",
    "cilkc",
    "cilk-c",
    "cilkcpp",
    "cilk-cpp",
    "cilk",
    "clojure",
    "cmake",
    "cobol",
    "coffeescript",
    "coffee",
    "concurnas",
    "conc",
    "csp",
    "cooklang",
    "coq",
    "crystal",
    "css-extras",
    "csv",
    "cue",
    "cypher",
    "d",
    "dart",
    "dataweave",
    "dax",
    "dhall",
    "diff",
    "django",
    "jinja2",
    "dns-zone-file",
    "dns-zone",
    "docker",
    "dockerfile",
    "dot",
    "gv",
    "ebnf",
    "editorconfig",
    "eiffel",
    "ejs",
    "eta",
    "elixir",
    "elm",
    "etlua",
    "erb",
    "erlang",
    "excel-formula",
    "xlsx",
    "xls",
    "fsharp",
    "factor",
    "false",
    "firestore-security-rules",
    "flow",
    "fortran",
    "ftl",
    "gml",
    "gamemakerlanguage",
    "gap",
    "gcode",
    "gdscript",
    "gedcom",
    "gettext",
    "po",
    "gherkin",
    "git",
    "glsl",
    "gn",
    "gni",
    "linker-script",
    "ld",
    "go",
    "go-module",
    "go-mod",
    "gradle",
    "graphql",
    "groovy",
    "haml",
    "handlebars",
    "hbs",
    "mustache",
    "haskell",
    "hs",
    "haxe",
    "hcl",
    "hlsl",
    "hoon",
    "http",
    "hpkp",
    "hsts",
    "ichigojam",
    "icon",
    "icu-message-format",
    "idris",
    "idr",
    "ignore",
    "gitignore",
    "hgignore",
    "npmignore",
    "inform7",
    "ini",
    "io",
    "j",
    "java",
    "javadoc",
    "javadoclike",
    "javastacktrace",
    "jexl",
    "jolie",
    "jq",
    "jsdoc",
    "js-extras",
    "json",
    "webmanifest",
    "json5",
    "jsonp",
    "jsstacktrace",
    "js-templates",
    "julia",
    "keepalived",
    "keyman",
    "kotlin",
    "kt",
    "kts",
    "kumir",
    "kum",
    "kusto",
    "latex",
    "tex",
    "context",
    "latte",
    "less",
    "lilypond",
    "ly",
    "liquid",
    "lisp",
    "emacs",
    "elisp",
    "emacs-lisp",
    "livescript",
    "llvm",
    "log",
    "lolcode",
    "lua",
    "magma",
    "makefile",
    "markdown",
    "md",
    "markup-templating",
    "mata",
    "matlab",
    "maxscript",
    "mel",
    "mermaid",
    "metafont",
    "mizar",
    "mongodb",
    "monkey",
    "moonscript",
    "moon",
    "n1ql",
    "n4js",
    "n4jsd",
    "nand2tetris-hdl",
    "naniscript",
    "nani",
    "nasm",
    "neon",
    "nevod",
    "nginx",
    "nim",
    "nix",
    "nsis",
    "objectivec",
    "objc",
    "ocaml",
    "odin",
    "opencl",
    "openqasm",
    "qasm",
    "oz",
    "parigp",
    "parser",
    "pascal",
    "objectpascal",
    "pascaligo",
    "psl",
    "pcaxis",
    "px",
    "peoplecode",
    "pcode",
    "perl",
    "php",
    "phpdoc",
    "php-extras",
    "plant-uml",
    "plantuml",
    "plsql",
    "powerquery",
    "pq",
    "mscript",
    "powershell",
    "processing",
    "prolog",
    "promql",
    "properties",
    "protobuf",
    "pug",
    "puppet",
    "pure",
    "purebasic",
    "pbfasm",
    "purescript",
    "purs",
    "python",
    "py",
    "qsharp",
    "qs",
    "q",
    "qml",
    "qore",
    "r",
    "racket",
    "rkt",
    "cshtml",
    "razor",
    "jsx",
    "tsx",
    "reason",
    "regex",
    "rego",
    "renpy",
    "rpy",
    "rescript",
    "res",
    "rest",
    "rip",
    "roboconf",
    "robotframework",
    "robot",
    "ruby",
    "rb",
    "rust",
    "sas",
    "sass",
    "scss",
    "scala",
    "scheme",
    "shell-session",
    "sh-session",
    "shellsession",
    "smali",
    "smalltalk",
    "smarty",
    "sml",
    "smlnj",
    "solidity",
    "sol",
    "solution-file",
    "sln",
    "soy",
    "sparql",
    "rq",
    "splunk-spl",
    "sqf",
    "sql",
    "squirrel",
    "stan",
    "stata",
    "iecst",
    "stylus",
    "supercollider",
    "sclang",
    "swift",
    "systemd",
    "t4-templating",
    "t4-cs",
    "t4",
    "t4-vb",
    "tap",
    "tcl",
    "tt2",
    "textile",
    "toml",
    "tremor",
    "trickle",
    "troy",
    "turtle",
    "trig",
    "twig",
    "typescript",
    "ts",
    "typoscript",
    "tsconfig",
    "unrealscript",
    "uscript",
    "uc",
    "uorazor",
    "uri",
    "url",
    "v",
    "vala",
    "vbnet",
    "velocity",
    "verilog",
    "vhdl",
    "vim",
    "visual-basic",
    "vb",
    "vba",
    "warpscript",
    "wasm",
    "web-idl",
    "webidl",
    "wgsl",
    "wiki",
    "wolfram",
    "mathematica",
    "nb",
    "wl",
    "wren",
    "xeora",
    "xeoracube",
    "xml-doc",
    "xojo",
    "xquery",
    "yaml",
    "yml",
    "yang",
    "zig",
  ],
  highlight: [
    "javascript",
    "1c",
    "abnf",
    "accesslog",
    "actionscript",
    "ada",
    "angelscript",
    "apache",
    "applescript",
    "arcade",
    "arduino",
    "armasm",
    "asciidoc",
    "aspectj",
    "autohotkey",
    "autoit",
    "avrasm",
    "awk",
    "axapta",
    "bash",
    "basic",
    "bnf",
    "brainfuck",
    "c",
    "cal",
    "capnproto",
    "ceylon",
    "clean",
    "clojure-repl",
    "clojure",
    "cmake",
    "coffeescript",
    "coq",
    "cos",
    "cpp",
    "crmsh",
    "crystal",
    "csharp",
    "csp",
    "css",
    "d",
    "dart",
    "delphi",
    "diff",
    "django",
    "dns",
    "dockerfile",
    "dos",
    "dsconfig",
    "dts",
    "dust",
    "ebnf",
    "elixir",
    "elm",
    "erb",
    "erlang-repl",
    "erlang",
    "excel",
    "fix",
    "flix",
    "fortran",
    "fsharp",
    "gams",
    "gauss",
    "gcode",
    "gherkin",
    "glsl",
    "gml",
    "go",
    "golo",
    "gradle",
    "graphql",
    "groovy",
    "haml",
    "handlebars",
    "haskell",
    "haxe",
    "hsp",
    "http",
    "hy",
    "inform7",
    "ini",
    "irpf90",
    "isbl",
    "java",
    "javascript",
    "jboss-cli",
    "json",
    "julia-repl",
    "julia",
    "kotlin",
    "lasso",
    "latex",
    "ldif",
    "leaf",
    "less",
    "lib",
    "lisp",
    "livecodeserver",
    "livescript",
    "llvm",
    "lsl",
    "lua",
    "makefile",
    "markdown",
    "mathematica",
    "matlab",
    "maxima",
    "mel",
    "mercury",
    "mipsasm",
    "mizar",
    "mojolicious",
    "monkey",
    "moonscript",
    "n1ql",
    "nestedtext",
    "nginx",
    "nim",
    "nix",
    "node-repl",
    "nsis",
    "objectivec",
    "ocaml",
    "openscad",
    "oxygene",
    "parser3",
    "perl",
    "pf",
    "pgsql",
    "php-template",
    "php",
    "plaintext",
    "pony",
    "powershell",
    "processing",
    "profile",
    "prolog",
    "properties",
    "protobuf",
    "puppet",
    "purebasic",
    "python-repl",
    "python",
    "q",
    "qml",
    "r",
    "reasonml",
    "rib",
    "roboconf",
    "routeros",
    "rsl",
    "ruby",
    "ruleslanguage",
    "rust",
    "sas",
    "scala",
    "scheme",
    "scilab",
    "scss",
    "shell",
    "smali",
    "smalltalk",
    "sml",
    "sqf",
    "sql",
    "stan",
    "stata",
    "step21",
    "stylus",
    "subunit",
    "swift",
    "taggerscript",
    "tap",
    "tcl",
    "thrift",
    "tp",
    "twig",
    "typescript",
    "vala",
    "vbnet",
    "vbscript-html",
    "vbscript",
    "verilog",
    "vhdl",
    "vim",
    "wasm",
    "wren",
    "x86asm",
    "xl",
    "xml",
    "xquery",
    "yaml",
    "zephir",
  ]
};

// ライブラリとテーマの選択肢をシンプルに定義
const themes = {
    prism: [
        "prism-okaidia.css",
        "prism-dark.css",
        "prism-funky.css",
        "prism-twilight.css",
        "prism-solarizedlight.css",
        "prism-tomorrow.css",
        "prism.css",
        "prism-coy.css",
    ],
    highlight: [
      "tomorrow-night-bright.min.css",
      "a11y-dark.min.css",
      "agate.min.css",
      "an-old-hope.min.css",
      "androidstudio.min.css",
      "arta.min.css",
      "atom-one-dark-reasonable.min.css",
      "atom-one-dark.min.css",
      "codepen-embed.min.css",
      "dark.min.css",
      "devibeans.min.css",
      "far.min.css",
      "felipec.min.css",
      "github-dark-dimmed.min.css",
      "github-dark.min.css",
      "gml.min.css",
      "gradient-dark.min.css",
      "hybrid.min.css",
      "ir-black.min.css",
      "isbl-editor-dark.min.css",
      "kimbie-dark.min.css",
      "lioshi.min.css",
      "monokai-sublime.min.css",
      "monokai.min.css",
      "night-owl.min.css",
      "nnfx-dark.min.css",
      "nord.min.css",
      "obsidian.min.css",
      "panda-syntax-dark.min.css",
      "paraiso-dark.min.css",
      "pojoaque.min.css",
      "qtcreator-dark.min.css",
      "rainbow.min.css",
      "shades-of-purple.min.css",
      "srcery.min.css",
      "stackoverflow-dark.min.css",
      "sunburst.min.css",
      "tokyo-night-dark.min.css",
      "tomorrow-night-blue.min.css",
      "tomorrow-night-bright.min.css",
      "vs2015.min.css",
      "xt256.min.css",
      "panda-syntax-light.min.css",
      "paraiso-light.min.css",
      "qtcreator-light.min.css",
      "stackoverflow-light.min.css",
      "tokyo-night-light.min.css",
      "arduino-light.min.css",
      "atom-one-light.min.css",
      "brown-paper.min.css",
      "gradient-light.min.css",
      "intellij-light.min.css",
      "isbl-editor-light.min.css",
      "kimbie-light.min.css",
      "lightfair.min.css",
      "nnfx-light.min.css",
      "ascetic.min.css",
      "color-brewer.min.css",
      "default.min.css",
      "docco.min.css",
      "foundation.min.css",
      "github.min.css",
      "googlecode.min.css",
      "grayscale.min.css",
      "idea.min.css",
      "magula.min.css",
      "mono-blue.min.css",
      "purebasic.min.css",
      "routeros.min.css",
      "school-book.min.css",
      "vs.min.css",
      "xcode.min.css",
    ]
};


function updateThemeOptions(selectedLibrary) {
    const themeSelector = document.getElementById('theme-selector');
    themeSelector.innerHTML = ''; // 既存の選択肢をクリア
    themes[selectedLibrary].forEach(themeFilename => {
        const option = document.createElement('option');
        option.value = themeFilename;
        // ファイル名から拡張子を除いた部分を表示名として使用
        option.textContent = themeFilename.split('.').shift();
        themeSelector.appendChild(option);
    });
}


function updatePreview() {
    const input = document.getElementById('code-input').value;
    const library = document.getElementById('library-selector').value;
    const language = document.getElementById('language-selector').value;
    const themeFilename = document.getElementById('theme-selector').value;
    const output = document.getElementById('code-output');

    // 過去のlinkタグをすべて消去し、新しいテーマを適用
    const existingLink = document.getElementById('theme-link');
    if (existingLink) {
        existingLink.remove();
    }
    const link = document.createElement('link');
    link.id = 'theme-link';
    link.rel = 'stylesheet';
    link.href = library === 'prism'
        ? `https://cdn.jsdelivr.net/npm/prismjs/themes/${themeFilename}`
        : `https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFilename}`;
    document.head.appendChild(link);

    // コードブロックのクラスを更新
    output.className = '';
    if (library === 'prism') {
        output.classList.add('language-' + language);
    } else {
        output.classList.add('language-' + language);
    }
    output.textContent = input;

    // ハイライトを適用
    if (library === 'prism') {
        Prism.highlightAll();
    } else {
        hljs.highlightAll();
    }
}
function updateEmbed() {
    const input = document.getElementById('code-input').value;
    const library = document.getElementById('library-selector').value;
    const language = document.getElementById('language-selector').value;
    const themeFilename = document.getElementById('theme-selector').value;
    const embedhead = document.getElementById('embed-head');
    const embedbody = document.getElementById('embed-body');
    embedhead.className = '';
    embedbody.className = '';
    if (library === 'prism') {
        embedhead.classList.add('language-html');
        embedbody.classList.add('language-html');
    } else {
        embedhead.classList.add('xml');
        embedbody.classList.add('xml');
    }

    // ハイライトを適用
    if (library === 'prism') {
        embedhead.textContent = "<link rel=\"stylesheet\" href=\"https://cdn.jsdelivr.net/npm/prismjs/themes/"+themeFilename+"\">";
        embedbody.textContent = "<code class=\"language-"+language+"\">\n"+input+"</code>";
        Prism.highlightAll();
    } else {
        embedhead.textContent = "<link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/"+themeFilename+"\">";
        embedbody.textContent = "<script src=\"https://cdn.jsdelivr.net/npm/prismjs/prism.js\"></script>\n<code class=\"language-"+language+"\">\n"+input+"</code>";
        hljs.highlightAll();
    }
}

// ライブラリ選択時に言語選択肢を更新する機能
function updateLanguageOptions(selectedLibrary) {
  const languageSelector = document.getElementById('language-selector');
  languageSelector.innerHTML = ''; // 既存の選択肢をクリア
  langList[selectedLibrary].forEach(language => {
    const option = document.createElement('option');
    option.value = language;
    option.textContent = language;
    languageSelector.appendChild(option);
  });
}

// ライブラリ選択、テーマ選択、言語選択、コード入力が変更されたらプレビューを更新
document.getElementById('library-selector').addEventListener('change', function() {
    updateLanguageOptions(this.value);
    updateThemeOptions(this.value);
    updatePreview();
    updateEmbed();
});
document.getElementById('theme-selector')   .addEventListener('change', function(){updatePreview();updateEmbed();});
document.getElementById('language-selector').addEventListener('change', function(){updatePreview();updateEmbed();});
document.getElementById('code-input')       .addEventListener('input' , function(){updatePreview();updateEmbed();});


// 初期化
window.onload = function(){
  document.getElementById('library-selector').dispatchEvent(new Event('change'));
}
