#! bin/bash

protoc --plugin=./node_modules/.bin/protoc-gen-ts_proto \
  --ts_proto_out=generates/hero \
  --ts_proto_opt=nestJs=true \
  --ts_proto_opt=outputClientImple=true \
  --ts_proto_opt=addGrpcMetadata=true \
  -Iprotos \
  protos/hero.proto
