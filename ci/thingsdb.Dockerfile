# Use the latest Ubuntu image
FROM ubuntu:22.04

# Install build dependencies
RUN apt-get update && \
    apt-get install -y \
        libuv1-dev \
        libpcre2-dev \
        libyajl-dev \
        libcurl4-nss-dev \
        build-essential \
        git \
        libwebsockets-dev \
        cmake

# Switch to the lws branch
RUN git clone --branch user-info-collection https://github.com/thingsdb/ThingsDB.git ThingsDB

# Compile ThingsDB
WORKDIR ThingsDB
RUN ./release-build.sh

# Copy the executable
RUN cp thingsdb /usr/local/bin/thingsdb

# Volume mounts
VOLUME ["/data"]
VOLUME ["/modules"]

# Expose port (can be customized)
EXPOSE 9200
EXPOSE 9270
EXPOSE 9001

ENV THINGSDB_BIND_CLIENT_ADDR=0.0.0.0
ENV THINGSDB_BIND_NODE_ADDR=0.0.0.0
ENV THINGSDB_LISTEN_CLIENT_PORT=9200
ENV THINGSDB_HTTP_STATUS_PORT=9001
ENV THINGSDB_WS_PORT=9270
ENV THINGSDB_MODULES_PATH=/modules
ENV THINGSDB_STORAGE_PATH=/data

# Entrypoint
ENTRYPOINT ["sh", "-c", "/usr/local/bin/thingsdb --init" ]

# docker build -t thingsdb_ws  . -f ci/thingsdb.Dockerfile
# docker run --name ThingsDB_ws -d -p 9200:9200 -p 9001:9001 -p 9270:9270 -v .\thingsdb\data:/data -v .\thingsdb\modules:/modules thingsdb_ws
