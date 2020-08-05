import { useMediaQuery } from "react-responsive";
//class Device {
function Device() {
  //constructor() {}
  var isDesktopOrLaptop = useMediaQuery({
    query: "(min-device-width: 1224px)",
  });

  var isBigScreen = useMediaQuery({ query: "(min-device-width: 1824px)" });
  var isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });
  var isTabletOrMobileDevice = useMediaQuery({
    query: "(max-device-width: 1224px)",
  });
  var isPortrait = useMediaQuery({ query: "(orientation: portrait)" });
  var isRetina = useMediaQuery({ query: "(min-resolution: 2dppx)" });
}

//var device = new Device();
export default Device;
