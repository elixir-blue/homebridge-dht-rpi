#include <cmath>
#include <nan.h>

extern "C" {
#include "dht/common_dht_read.h"
#include "dht/Raspberry_Pi/pi_dht_read.h"
#include "dht/Raspberry_Pi_2/pi_2_dht_read.h"
}

/**
 * @param {Number} type 11 or 22
 * @param {Number} pin GPIO pin number
 */
void Dht(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
  static const v8::Local<v8::String> humidity_key = Nan::New("humidity").ToLocalChecked();
  static const v8::Local<v8::String> temperature_key = Nan::New("temperature").ToLocalChecked();

  if (info.Length() < 2)
  {
    Nan::ThrowTypeError("2 arguments required");
    return;
  }

  if (!info[0]->IsNumber() || !info[1]->IsNumber())
  {
    Nan::ThrowTypeError("arg0 and arg1 must be numbers");
    return;
  }

  int arg0 = info[0].As<v8::Number>()->Value();
  if (DHT11 != arg0 && DHT22 != arg0)
  {
    Nan::ThrowRangeError("arg0 must be 11 or 22");
    return;
  }

  int arg1 = info[1].As<v8::Number>()->Value();

  float temperature = 0.0;
  float humidity = 0.0;

  int rc = pi_2_dht_read(arg0, arg1, &humidity, &temperature);
  printf("pi_2_dht_read returned %d!!\n", rc);
  // if (DHT_SUCCESS != rc)
  // {
  //   Nan::ThrowError("dht_read returned non-success");
  //   return;
  // }

  v8::Local<v8::Object> obj = Nan::New<v8::Object>();
  obj->Set(humidity_key, Nan::New(humidity));
  obj->Set(temperature_key, Nan::New(temperature));

  info.GetReturnValue().Set(obj);
}

void Init(v8::Local<v8::Object> exports)
{
  exports->Set(Nan::New("dht").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Dht)->GetFunction());
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
