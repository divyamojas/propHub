#!/bin/sh

# Default values
host="localhost"
chainId="1337"
port="9000"

# Parse command-line arguments
while [ $# -gt 0 ]; do
  key="$1"
  case $key in
    --host)
      host="$2"
      shift
      shift
      ;;
    --chainId)
      chainId="$2"
      shift
      shift
      ;;
    --port)
      port="$2"
      shift
      shift
      ;;
    *)
      echo "Invalid option: $key" >&2
      exit 1
      ;;
  esac
done

# Print the selected options
echo "Host: $host"
echo "Chain ID: $chainId"
echo "Port: $port"


ganache-cli 
--account="0x6aed29038dcbb04ca8c7e0faa88648fc59cea9f04851d1bb72018edf72ad3ec0,100000000000000000000000" 
--account="0x32818561f12ed9cfdda19ebf94a9c8a8d467f25c6e2c3068eaf37288b9412890,100000000000000000000000" 
--account="0x270da7e52ee7cfd5db344a6dc846da6f3eb80b795c31eed0f25737398b64ded0,100000000000000000000000" 
--account="0x3fbfbd6c19c33a66ee4d99c2b86e008f3a6ceaff543b0861a7cd75bc1c57b3c0,100000000000000000000000" 
--account="0xc987b4a0a0aaef569bc38f93b47627bff7236c708caab00059a51e37b60f1b00,100000000000000000000000" 
--account="0xabf8f312aba272687182237ac1afb1ed52ef0b1478dc8ad9fcdd1a1f53a3de70,100000000000000000000000" 
--account="0xc7502574494a8f7c93162b976bbcde34dc3c10afb1842ed6df128e34eccf72d0,100000000000000000000000" 
--account="0xa4a9ffa45caa108a279728d880bbd251dce6a9147efe101c52718a273948c6e0,100000000000000000000000" 
--account="0xcebcb67deda6656ee406ab0e3578bdcdeee961ee504ed721afa5966024035b70,100000000000000000000000" 
--account="0x1c8b59b18999734d669f3e64a38a8542ce3f09527c92cdccec6cb61189d42e50,100000000000000000000000" 
--host $host  --port $port --chainId $chainId