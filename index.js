var addon = require('./build/Release/dht');

const DHT11 = 11;
const DHT22 = 22;

console.log("addon.dht()", addon.dht(DHT11, 4));

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-dht-rpi", "dht-rpi", Accessory);
}

/**
 * The DHT accessory.
 */
class Accessory {

  /**
   * Create a new accessory instance.
   *
   * @param {Homebridge.Logger} log
   * @param {Object} config
   */
  constructor(log, config) {
    log.debug("Accessory()", config);
    this.log = log;
    this.config = config;
    this.name = config.name;
    this.pin = config.pin || 4;
  }

  identify(callback) {
    this.log.debug("identify()");
    callback();
  }

  getServices() {
    this.log.debug("getServices()");

    const info = new Service.AccessoryInformation();
    info
      .setCharacteristic(Characteristic.FirmwareRevision, require('./package.json').version)
      .setCharacteristic(Characteristic.Manufacturer, "🤪")
      .setCharacteristic(Characteristic.Model, "💥")
      .setCharacteristic(Characteristic.SerialNumber, "🤷‍♂️")

    this.temperature = new Service.TemperatureSensor(this.name);
    this.temperature
      .getCharacteristic(Characteristic.CurrentTemperature);

    this.humidity = new Service.HumiditySensor(this.name);

    this.update();
    setInterval(() => this.update(), 30000);

    return [info, this.temperature, this.humidity];
  }

  update() {
    this.temperature
      .getCharacteristic(Characteristic.CurrentTemperature)
      .updateValue(addon.dht(DHT11, this.pin));

    this.humidity
      .getCharacteristic(Characteristic.CurrentRelativeHumidity)
      .updateValue(addon.dht(DHT11, this.pin));
  }
}
