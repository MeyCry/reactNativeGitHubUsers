var React = require('react-native');
var Profile = require("./Profile");
var Repositories = require("./Repositories");
var api = require("../Utils/api");

var {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class Dashboard extends React.Component{
  colorPalette(){
    return [
      "#48BBEC",
      "#E77AAE",
      "#758BF4"
    ]
  }

  makeBackground(btn){
    var obj = {
      flexDirection: "row",
      alignSelf: "stretch",
      justifyContent: "center",
      flex: 1,
      backgroundColor: this.colorPalette()[btn]
    };

    return obj;
  }
  goToProfile(){
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo, repos: this.props.repos}
    });
  }
  goToRepos(){
    api.getUserRepo(this.props.userInfo.login)
    .then((repos) => {
      this.props.navigator.push({
        component: Repositories,
        title: 'Repositories Page',
        passProps: {
          userInfo: this.props.userInfo,
          repos: repos
        }
      });
    });

  }
  goToNotes(){

  }
  render(){
    return (
      <View style={styles.container}>
        <Image
          source={{uri: this.props.userInfo.avatar_url}}
          style={styles.image}
          />
        <TouchableHighlight
          style={this.makeBackground(0)}
          onPress={this.goToProfile.bind(this)}
          underlayColor="#88D4F5"
          >
          <Text style={styles.buttonText}>View Profile</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(1)}
          onPress={this.goToRepos.bind(this)}
          underlayColor="#88D4F5"
          >
          <Text style={styles.buttonText}>View Repos</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={this.makeBackground(2)}
          onPress={this.goToNotes.bind(this)}
          underlayColor="#88D4F5"
          >
          <Text style={styles.buttonText}>View Notes</Text>
        </TouchableHighlight>
      </View>
    )
  }
};

module.exports = Dashboard;