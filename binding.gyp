{
  "targets": [
    {
      "target_name": "dht",
      "sources": [
        "dht/common_dht_read.c",
        "dht/Raspberry_Pi/pi_dht_read.c",
        "dht/Raspberry_Pi/pi_mmio.c",
        "dht/Raspberry_Pi_2/pi_2_dht_read.c",
        "dht/Raspberry_Pi_2/pi_2_mmio.c",
        "dht.cpp"
      ],
      "include_dirs": [
          "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}