# homebridge-dht-rpi

DHT11/22 plugin for [Homebridge][homebridge] running on a Raspberry Pi GPIO pin.  Provides temperature and relative humidity.

## Installation

1. Install this plugin using: npm install -g homebridge-dht-rpi
1. Edit ``config.json`` and add the sensor(s).
1. Run Homebridge

### Config.json Example

...

#### Optional Parameters

* `type` type of device, either `"DHT11"` or `"DHT22"`
* `pin` GPIO pin number, default `4`

[homebridge]: https://github.com/nfarina/homebridge