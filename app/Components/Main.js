var React = require("react-native");
var api = require("../Utils/api");
var Dashboard = require("./Dashboard");

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  navigator,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

class Main extends React.Component {
  constructor(props){
    super(props);
    // initial state
    this.state = {
      username: "meycry",
      isLoading: false,
      error: false
    }
  }
  handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }
  handleSubmit(){
    // update our IndicatorIOS spinner
    this.setState({isLoading: true});

    // fetch date form github
    //api.getUserFromGithub(this.state.username);
    api.getBio(this.state.username)
      .then( (jsonRes ) => {
          if (jsonRes.message === "Not Found"){
            this.setState({
              error: "User not found",
              isLoading: false
            })
          } else {
            // reroute to next passing github info

            this.props.navigator.push({
              title: jsonRes.name || "Select an option",
              component: Dashboard,
              passProps: {
                userInfo: jsonRes,
              }
            });

            this.setState({
              isLoading: false,
              error: false,
              username: ""
            });
          }
      });
  }
  render(){
    var ShowError = (
      this.state.error ? <Text style={styles.title}>{this.state.error}</Text> : <View></View>
    );



    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this.handleChange.bind(this)}
          />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white"
          >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          collor="#111"
          size="large"
          />
        {ShowError}
      </View>
    );
  }
}

module.exports = Main;