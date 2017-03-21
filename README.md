# Autodoe

## Description

`autodoe` is a simple `nodejs` cli tool which monitors the directory you open it in. Whenever changes to files occur `autodoe` executes `/path/to/monitored/folder/.autodoe.sh`.

## Usage

```
$ autodoe --help

  Usage: autodoe [command]


  Commands:

    init        Initializes new .autodoe.sh in the working directory
    scr         Prints the .autodoe.sh script in the working directory
    run         Triggers monitoring the working directory.
    help [cmd]  display help for [cmd]

  Options:

    -h, --help     output usage information
    -V, --version  output the version number

```

## Installation

```
$ sudo npm install -g autodoe
```
