import React from "react";
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

export default class App extends React.Component {
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
        { text: "No", onPress: () => {} }
      ],
      { cancellable: false }
    );
  };

  // When Cancel
  _handlePressCancel = () => {
    this.setState({ lastScanned: null });
  };

  // will render the URL
  _maybeRenderUrl = () => {
    if (!this.state.lastScanned) {
      return;
    }

    return (
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
          <Text numberOfLines={1} style={styles.urlText}>
            {this.state.lastScanned}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={this._handlePressCancel}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  cancelButton: {
    marginLeft: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  cancelButtonText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 18
  }
});
