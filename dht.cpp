#include <cmath>
#include <nan.h>

#include "dht/common_dht_read.h"

/**
 * @param {Number} type 11 or 22
 * @param {Number} pin GPIO pin number
 */
void Dht(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
  if (info.Length() < 2)
  {
    Nan::ThrowTypeError("Wrong number of arguments");
    return;
  }

  if (!info[0]->IsNumber() || !info[1]->IsNumber())
  {
    Nan::ThrowTypeError("Both arguments should be numbers");
    return;
  }

  int arg0 = info[0].As<v8::Number>()->Value();
  if (DHT11 != arg0 && DHT22 != arg0)
  {
    Nan::ThrowRangeError("arg0 must be 11 or 22");
    return;
  }

  int arg1 = info[1].As<v8::Number>()->Value();
  printf("arg1: %d\n", arg1);

  v8::Local<v8::Object> ret = Nan::New<v8::Object>();
  v8::Local<v8::Number> num = Nan::New(25.0);
  ret->Set(Nan::GetCurrentContext(), Nan::New("temperature").ToLocalChecked(), Nan::New(25.0));
  ret->Set(Nan::GetCurrentContext(), Nan::New("humidity").ToLocalChecked(), Nan::New(5.0));

  info.GetReturnValue().Set(ret);
}

void Init(v8::Local<v8::Object> exports)
{
  exports->Set(Nan::New("dht").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Dht)->GetFunction());
}

NODE_MODULE(NODE_GYP_MODULE_NAME, Init)
