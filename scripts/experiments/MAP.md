# 🐍 Python Injection 💉: Map

<!-- TOC start (generated with https://github.com/derlin/bitdowntoc) -->

- [Main Agents](#main-agents)
   * [`config.py`](#configpy)
   * [`injector.py`](#injectorpy)
   * [`uninstall.py`](#uninstallpy)
- [Other components and files](#other-components-and-files)
   * [`templates.py`](#templatespy)
   * [`minify.py`](#minifypy)
   * [`config.owl.json`](#configowljson)

<!-- TOC end -->

<!-- TOC --><a name="main-agents"></a>
## Main Agents

<!-- TOC --><a name="configpy"></a>
### [`config.py`](./config.py)

This script does two things:

1. It creates a configuration file `config.owl.json` with default values (hard coded) from the passed-in template `CONFIG_TEMPLATE` (in [`templates.py`](./templates.py)).
2. It dynamically populates a pre-defined JS file from `JS_TEMPLATE` with the values in `config.owl.json`. This dynamically created JS file is named `script.owl.js`, and it is the heart of our application: it records all the event/session/browser data and sends it to the backend, in order to be processed and sent to the database. Our frontend application will then ask the backend for the session data, the backend will retrieve it from the database, to then send it to the frontend, so it can reproduce the session and display all the logs, session info, etc.

<!-- TOC --><a name="injectorpy"></a>
### [`injector.py`](./injector.py)

This is the main muscle of our application. It will recursively inject two `script` elements in the `head` element of every HTML file in the target app. These two scripts are:

1. The rrweb script, which makes the rrweb functionality available all throughout our application (via the `window.rrweb` property).
2. Our own script, `script.owl.js`, created dynamically in the `config.py` script, according the `config.owl.json` file.

<!-- TOC --><a name="uninstallpy"></a>
### [`uninstall.py`](./uninstall.py)

This script follows the inverse process of install_scripts (see `injector.py`)
Looks recursively for every HTML file in the target app, and everything we injected, leaving no trace. It also removes our script files.

<!-- TOC --><a name="other-components-and-files"></a>
## Other components and files

<!-- TOC --><a name="templatespy"></a>
### [`templates.py`](./templates.py)

It contains the templates to create the configuration file and the JS code, in the form of strings, assigned to constants. The constant `JS_TEMPLATE` will contain the entirety of our script; every placeholder (in blue, between `{}`) value will be filled with the appropriate `config.owl.json` value by `config.py`. Note that normal JS curly braces have to be _escaped_ by doubling them.

<!-- TOC --><a name="minifypy"></a>
### [`minify.py`](./minify.py)

A very simple script that compresses JS files. Will be optimized and expanded in the future. Good compressions achieve between 30% and 90% of compression rate.

<!-- TOC --><a name="configowljson"></a>
### [`config.owl.json`](./config.owl.json)

The configuration file that will determine how our script will behave. The idea is to provide the user with some default values, and later implement a prompt if the user run the installation script with appropriate flags. (The same we do with Linux CLIs)