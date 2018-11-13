var addon = require("./build/Release/dht");

const DHT11 = 11;
const DHT22 = 22;

// console.log("addon.dht()", addon.dht(DHT11, 4));

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-dht-rpi", "dht-rpi", Accessory);
};

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
    log.debug("constructor()", config);
    this.log = log;
    this.config = config;
    this.name = config.name;
    this.type = config.type === "DHT22" ? DHT22 : DHT11;
    this.pin = config.pin || 4;
    log.debug(`DHT${this.type} configured on pin ${this.pin}`);
  }

  identify(callback) {
    this.log.debug("identify()");
    callback();
  }

  getServices() {
    this.log.debug("getServices()");

    const info = new Service.AccessoryInformation();
    info
      .setCharacteristic(Characteristic.Manufacturer, "🤪")
      .setCharacteristic(Characteristic.Model, "💥")
      .setCharacteristic(Characteristic.SerialNumber, "🤷‍♂️")
      .setCharacteristic(Characteristic.FirmwareRevision, require("./package.json").version);

    this.temperature = new Service.TemperatureSensor(this.name);

    this.humidity = new Service.HumiditySensor(this.name);

    this.update();
    setInterval(() => this.update(), 30000);

    return [info, this.temperature, this.humidity];
  }

  update() {
    this.temperature
      .getCharacteristic(Characteristic.CurrentTemperature)
      .updateValue(addon.dht(this.type, this.pin));

    this.humidity
      .getCharacteristic(Characteristic.CurrentRelativeHumidity)
      .updateValue(addon.dht(this.type, this.pin));
  }
}
