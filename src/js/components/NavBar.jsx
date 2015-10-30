import React, {Component} from 'react';

class NavBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top" role="navigation">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed"
                            dataToggle="collapse"
                            dataTarget="#js-navbar-collapse">
                            <span className="sr-only">{'Toggle navigation'}</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#/">{'react-seed'}</a>
                    </div>

                    <div className="collapse navbar-collapse" id="js-navbar-collapse">
                        <ul className="nav navbar-nav">
                          <li className="active"><a href="#">{'Home'}</a></li>
                          <li><a href="#">{'Settings'}</a></li>
                          <li><a href="#">{'Reports'}</a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.displayName = 'NavBar';

export default NavBar;
