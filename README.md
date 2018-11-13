# homebridge-dht-rpi

DHT11/22 plugin for [Homebridge][homebridge] running on a Raspberry Pi GPIO pin.  Provides temperature and relative humidity.

## Requirements

Uses the [node-dht-sensor][node-dht-sensor] library to communicate w/sensors, it uses the [BCM2835 library][bcm2835-lib] to communicate, and that must be installed before installing the NPM module.

## Installation

1. Install [BCM2835 library][bcm2835-lib]
1. Install this plugin using: npm install -g homebridge-dht-rpi
1. Edit ``config.json`` and add the sensor(s).
1. Run Homebridge

### Config.json Example

```json
{
  ...
  "accessories": [
    {
      "accessory": "dht-rpi",
      "name": "My DHT"
    }
  ],
  ...
}
```

#### Optional Parameters

* `type` type of device, either `"DHT11"` or `"DHT22"`
* `pin` GPIO pin number, default `4`

[bcm2835-lib]: http://www.airspayce.com/mikem/bcm2835
[homebridge]: https://github.com/nfarina/homebridge
[node-dht-sensor]: https://github.com/momenso/node-dht-sensor