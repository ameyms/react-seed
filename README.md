# react-seed
An opinionated starter kit for ReactJS.
_Batteries included_.

## What is this?
The project contains basic boilerplate for projects using [ReactJS](http://facebook.github.io/react), [Flux](http://facebook.github.io/flux) with [Webpack](http://webpack.github.io/) for packaging &amp; [Less](http://lesscss.org/) for styles.

## Getting started
### Prerequisites
Needless to say, you will need [Git](http://git-scm.com) and [NodeJS](http://nodejs.org) to clone and setup the environment. Additionally, you will also need [Grunt](http://gruntjs.com/) build tool. Once you have installed Node, you can install Grunt using:

```shell
npm install -g grunt-cli
```

### Getting the code
To download the code, you can clone the repo using git:
```shell
git clone https://github.com/ameyms/react-seed.git
cd react-seed
```

### Setting up the environment
The project uses [npm](https://www.npmjs.com) to manage not just the dev dependencies, but also front-end libraries. Do download and install libraries and dev tools, run:
```shell
npm install
```


### Running the dev server
This project uses [react-hot-loader](http://gaearon.github.io/react-hot-loader) and hence has the awesomeness of webpack's [hot module replacement](http://webpack.github.io/docs/hot-module-replacement.html) provided by it.
Start the dev server by running
```shell
grunt serve
```
The dev server would by default start on [localhost:9000](http://localhost:9000).
You can open your favorite IDE and make changes to any file **that exports a module** and see the changes being reflected on browser without refresh!

## Contributing
Found a bug? Notice an anti-pattern? PRs are most welcome! Or you can always [submit a bug](https://github.com/ameyms/react-seed/issues/new "Create new issue").
<br/>
However, if you do submit a PR, don't forget to conform to the style. To lint code, check for stylistic issues and run tests run:

```shell
grunt test
```


## Roadmap
- [ ] Adding sample routing logic
- [x] Add sample code for XHR along with response mocking in `grunt serve`
- [ ] Add animation samples


## License
This project and code is available under [MIT license](https://github.com/ameyms/react-seed/blob/master/LICENSE)
