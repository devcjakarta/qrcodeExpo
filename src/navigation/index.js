import { StackNavigator } from 'react-navigation'

import Home from '../screens/Home'
import ScanQRCode from '../screens/ScanQRCode'
import ScanResult from '../screens/ScanResult'

export default StackNavigator({
  Home: {
    screen: Home
  },
  Scan: {
    screen: ScanQRCode,
    path: 'scan'
  },
  ScanResult: {
    screen: ScanResult,
    path: 'scan-result/:code'
  }
}, {
  initialRouteName: 'Home',
  headerMode: 'none'
})