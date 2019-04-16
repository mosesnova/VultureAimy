import React from 'react';
class App extends React.Component {

    render() {
        return (
            <div>

                <h1>App</h1>
                <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
    }
}
export default App;