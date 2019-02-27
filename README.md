# manage

Manage your bash configuration from a CLI

### Note:

This project might grow... or not. I pretty much built it to make it easier to manage my own bash environment, but it's pretty neat.

Anyway...

## Running locally

`yarn install` | `npm -i`

`yarn manage --help` | `npm run manage --help`

## Installing in your path

`npm install -g`

Then you can use it like this:

`manage --help`

## Usage

Currently only manages your bash aliases:

`manage alias list`

`manage alias add my-alias "echo 1234"`