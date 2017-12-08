import React, { PureComponent } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { BarCodeScanner, Permissions } from "expo";

export default class ScanQRCode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      lastScanned: null
    };
  }

  componentDidMount() {
    this._requestCameraPermission();
  }

  // Request CAMERA PERMISSION
  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted"
    });
  };

  // Handle When Read
  _handleBarCodeRead = result => {
    if (result.data !== this.state.lastScanned) {
      LayoutAnimation.spring();
      this.setState({
        lastScanned: result.data
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ? (
          <Text>Requesting for camera permission</Text>
        ) : this.state.hasCameraPermission === false ? (
          <Text style={{ color: "#fff" }}>
            Camera permission is not granted
          </Text>
        ) : (
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width
                }}
              />
            )}

        {this._maybeRenderUrl()}

        <StatusBar hidden />
      </View>
    );
  }

  // When URL Click
  _handlePressUrl = () => {
    Alert.alert(
      "Open this URL?",
      this.state.lastScanned,
      [
        {
          text: "Yes",
          onPress: () => Linking.openURL(this.state.lastScanned)
        },
        { text: "No", onPress: () => { } }
      ],
      { cancellable: false }
    );
  };

  // When Cancel
  _handlePressNext = () => {
    this.props.navigation.navigate('ScanResult', {
      code: this.state.lastScanned
    });
  };

  // When Cancel
  _handlePressTryAgain = () => {
    this.setState({ lastScanned: null });
  };

  // When Cancel
  _handlePressCancel = () => {
    this.props.navigation.goBack();
  };

  // will render the URL
  _maybeRenderUrl = () => {
    if (!this.state.lastScanned) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <View style={styles.url}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScanned}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={this._handlePressNext}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this._handlePressTryAgain}
        >
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 15,
    flexDirection: "row"
  },
  url: {
    flex: 1
  },
  urlText: {
    color: "#fff",
    fontSize: 20
  },
  button: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18
  }
});
